﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using RaisingTheBAR.Core.Enums;
using RaisingTheBAR.DAL;
using System;

namespace RaisingTheBAR.DAL.Migrations
{
    [DbContext(typeof(EFContext))]
    [Migration("20180421105851_FixedProductDiscountModel")]
    partial class FixedProductDiscountModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Cart", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.HasKey("UserId");

                    b.ToTable("Carts");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name");

                    b.Property<Guid?>("ParentCategoryId");

                    b.HasKey("Id");

                    b.HasIndex("ParentCategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Criteria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Values");

                    b.HasKey("Id");

                    b.ToTable("Criterias");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Discount", b =>
                {
                    b.Property<Guid>("ProductId");

                    b.Property<decimal>("DiscountedPrice");

                    b.HasKey("ProductId");

                    b.ToTable("Discount");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTimeOffset?>("FinishedDate");

                    b.Property<string>("FirstName");

                    b.Property<DateTimeOffset?>("LastModifiedDate");

                    b.Property<string>("LastName");

                    b.Property<Guid?>("ModifiedById");

                    b.Property<DateTimeOffset?>("StartedDate");

                    b.Property<int>("State");

                    b.Property<byte[]>("Timestamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<decimal>("TotalPrice");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ModifiedById");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("DisplayName");

                    b.Property<string>("Image");

                    b.Property<bool>("IsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Model");

                    b.Property<decimal>("Price");

                    b.Property<string>("Thumbnail");

                    b.Property<byte[]>("Timestamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCart", b =>
                {
                    b.Property<Guid>("ProductId");

                    b.Property<Guid>("CartId");

                    b.Property<int>("Amount");

                    b.HasKey("ProductId", "CartId");

                    b.HasIndex("CartId");

                    b.ToTable("ProductCart");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCategory", b =>
                {
                    b.Property<Guid>("ProductId");

                    b.Property<Guid>("CategoryId");

                    b.HasKey("ProductId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("ProductCategory");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCriteria", b =>
                {
                    b.Property<Guid>("ProductId");

                    b.Property<Guid>("CriteriaId");

                    b.Property<string>("Values");

                    b.HasKey("ProductId", "CriteriaId");

                    b.HasIndex("CriteriaId");

                    b.ToTable("ProductCriterias");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductOrder", b =>
                {
                    b.Property<Guid>("OrderId");

                    b.Property<Guid>("ProductId");

                    b.Property<int>("Amount");

                    b.HasKey("OrderId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductOrders");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RoleName");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Blocked");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<Guid>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Cart", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.User", "User")
                        .WithOne("Cart")
                        .HasForeignKey("RaisingTheBAR.Core.Models.Cart", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Category", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Category", "ParentCategory")
                        .WithMany("ChildCategories")
                        .HasForeignKey("ParentCategoryId");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Discount", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Product", "Product")
                        .WithOne("Discount")
                        .HasForeignKey("RaisingTheBAR.Core.Models.Discount", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.Order", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifiedById");

                    b.HasOne("RaisingTheBAR.Core.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCart", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Cart", "Cart")
                        .WithMany("ProductCarts")
                        .HasForeignKey("CartId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RaisingTheBAR.Core.Models.Product", "Product")
                        .WithMany("ProductCarts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCategory", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Category", "Category")
                        .WithMany("ProductCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RaisingTheBAR.Core.Models.Product", "Product")
                        .WithMany("ProductCategories")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductCriteria", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Criteria", "Criteria")
                        .WithMany("ProductCriterias")
                        .HasForeignKey("CriteriaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RaisingTheBAR.Core.Models.Product", "Product")
                        .WithMany("ProductCriterias")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.ProductOrder", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Order", "Order")
                        .WithMany("ProductOrders")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RaisingTheBAR.Core.Models.Product", "Product")
                        .WithMany("ProductOrders")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RaisingTheBAR.Core.Models.User", b =>
                {
                    b.HasOne("RaisingTheBAR.Core.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
