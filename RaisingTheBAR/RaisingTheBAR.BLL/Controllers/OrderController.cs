﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Services;
using RaisingTheBAR.Core.Enums;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
    public class OrderController : Controller
    {
        public IConfiguration Configuration { get; }

        private readonly DbContext _dbContext;
        public OrderController(IConfiguration configuration, DbContext dbContext)
        {
            Configuration = configuration;
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult FinishOrder([FromBody]OrderRequest request)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts)
                .ThenInclude(pc => pc.Product);

            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userEmail == null)
            {
                return BadRequest("Your session has ended please try to login again");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);

            if (user == null)
            {
                return BadRequest("Your session has ended");
            }

            if (user.Cart == null || !user.Cart.ProductCarts.Any())
            {
                return BadRequest("Cart is empty");
            }
            
            var amountToPay = Math.Round(user.Cart.ProductCarts.Sum(y => y.Product.Price * y.Amount) * 100);

            //Get this error in PaymentService later
            if (amountToPay > 999999)
            {
                return BadRequest("You don't have enough funds in your bank");
            }
            var credentials = new PaymentServiceCredentials()
            {
                UserName = Configuration["PaymentServiceUserName"],
                Password = Configuration["PaymentServicePassword"]
            };

            var paymentData = new PaymentServiceRequest()
            {
                amount = Convert.ToInt32(amountToPay),
                holder = request.PaymentRequest.Holder,
                cvv = request.PaymentRequest.Cvv,
                exp_month = request.PaymentRequest.ExpMonth,
                exp_year = request.PaymentRequest.ExpYear,
                number = request.PaymentRequest.Number
            };

            var paymentResult = PaymentService.ExecutePayment(paymentData, credentials);
            if (!paymentResult)
            {
                return BadRequest("Your Payment was cancelled please check your data");
            }

            var orderContext = _dbContext.Set<Order>().Include(x => x.ProductOrders);

            var newOrder = new Order()
            {
                UserId = user.Id,
                Address = request.Address,
                StartedDate = DateTimeOffset.Now,
                State = OrderStateEnum.Ordered,
                FirstName = request.FirstName,
                LastName = request.LastName,
                TotalPrice = amountToPay,
                ProductOrders = user.Cart.ProductCarts.Select(x=> new ProductOrder()
                {
                    Amount = x.Amount,
                    ProductId = x.ProductId
                }).ToList()
            };

            _dbContext.Add(newOrder);
            _dbContext.Remove(user.Cart);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("[action]")]
        public IActionResult ApproveOrder([FromBody]OrderChangeRequest request )
        {
            return Ok();
        }
    }
}