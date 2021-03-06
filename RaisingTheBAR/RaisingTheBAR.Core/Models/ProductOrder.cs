﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

//https://stackoverflow.com/questions/7050404/create-code-first-many-to-many-with-additional-fields-in-association-table
namespace RaisingTheBAR.Core.Models
{
    public class ProductOrder
    {
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [ForeignKey("Order")]
        public Guid OrderId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }

        public int Amount { get; set; }
        public decimal SinglePrice { get; set; }
    }
}
