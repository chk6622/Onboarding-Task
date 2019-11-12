using System;
using System.Collections.Generic;
using System.Linq;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

namespace Onboarding_Task.Dao
{
    public class ProductDao : IProductDao
    {
        private readonly MyDbContext _context = null;

        public ProductDao(MyDbContext myDbContext)
        {
            this._context = myDbContext;
        }
        public bool Add(Product product)
        {
            bool bReturn = false;
            try
            {
                _context.Add<Product>(product);
                _context.SaveChanges();
                bReturn = true;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

        public bool Delete(int id)
        {
            bool bReturn = false;
            try
            {
                Product product=_context.Products.Find(id);
                _context.Remove<Product>(product);
                _context.SaveChanges();
                bReturn = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

        public Product GetObjectById(int id)
        {
            Product product = null;
            product = _context.Products.Find(id);
            return product;
        }

        public IEnumerable<Product> Query(ProductView queryObject)
        {
            List<Product> queryResults=null;
            if (queryObject != null)
            {
                queryResults=_context.Products.Where(p => p.Name.Contains(queryObject.NameQry)
                && p.Price == (queryObject.PriceQry == 0 ? p.Price : queryObject.PriceQry)).ToList();
                
            }
            else
            {
                queryResults = _context.Products.ToList();
            }
            return queryResults;
        }

        public IEnumerable<Product> QueryAll()
        {
            return this._context.Products;
        }

        public bool Update(Product product)
        {
            bool bReturn = false;
            try
            {
                var updateProduct = this._context.Products.Attach(product);
                updateProduct.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                this._context.SaveChanges();
                bReturn = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

    }
}
