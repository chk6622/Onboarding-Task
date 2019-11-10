﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Onboarding_Task.AppDbContext;

namespace Onboarding_Task.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20191110100045_migrate-to-azure")]
    partial class migratetoazure
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Onboarding_Task.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Onboarding_Task.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Onboarding_Task.Models.Sales", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CustomerId");

                    b.Property<string>("DateSold");

                    b.Property<int?>("ProductId");

                    b.Property<int?>("StoreId");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("Onboarding_Task.Models.Store", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("Onboarding_Task.Models.Sales", b =>
                {
                    b.HasOne("Onboarding_Task.Models.Customer", "Customer")
                        .WithMany("ProductSold")
                        .HasForeignKey("CustomerId");

                    b.HasOne("Onboarding_Task.Models.Product", "Product")
                        .WithMany("ProductSold")
                        .HasForeignKey("ProductId");

                    b.HasOne("Onboarding_Task.Models.Store", "Store")
                        .WithMany("ProductSold")
                        .HasForeignKey("StoreId");
                });
#pragma warning restore 612, 618
        }
    }
}
