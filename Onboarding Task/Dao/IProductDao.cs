﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

namespace Onboarding_Task.Dao
{
    public interface IProductDao:IBaseDao
    {
        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns>A collection including all data</returns>
        IEnumerable<Product> QueryAll();

        /// <summary>
        /// Query data by query string
        /// </summary>
        /// <param name="queryObject">query object including query params</param>
        /// <returns>A collection of data getted from the database</returns>
        QueryResultView<Product> Query(ProductView queryObject);

        /// <summary>
        /// Get a product by id 
        /// </summary>
        /// <param name="id">the id of product</param>
        /// <returns>the product or null</returns>
        Product GetObjectById(int id);

        /// <summary>
        /// Add a product to database
        /// </summary>
        /// <param name="product">the product which needs to add to the database</param>
        /// <returns>true if succeed, or false</returns>
        Boolean Add(Product product);

        /// <summary>
        /// Update a product
        /// </summary>
        /// <param name="product">the product which needs to be update</param>
        /// <returns>true if succeed, or false</returns>
        Boolean Update(Product product);

        /// <summary>
        /// Delete a product
        /// </summary>
        /// <param name="id">The product's primary key</param>
        /// <returns>true if succeed, or false</returns>
        Boolean Delete(int id);
    }
}
