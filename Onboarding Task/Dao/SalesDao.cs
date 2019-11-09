﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

namespace Onboarding_Task.Dao
{
    public class SalesDao : ISalesDao
    {
        private readonly MyDbContext _context = null;

        public SalesDao(MyDbContext myDbContext)
        {
            this._context = myDbContext;
        }
        public bool Add(Sales sales)
        {
            bool bReturn = false;
            try
            {
                _context.Add<Sales>(sales);
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
                Sales sales=_context.Sales.Find(id);
                _context.Remove<Sales>(sales);
                _context.SaveChanges();
                bReturn = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

        public Sales GetObjectById(int id)
        {
            Sales sales = null;
            try
            {
                sales = _context.Sales.Include(x => x.Customer).Include(x=>x.Product).Include(x=>x.Store).FirstOrDefault(x => x.Id == id);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            
            return sales;
        }

        public IEnumerable<Sales> Query(string queryString)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Sales> QueryAll()
        {
            return this._context.Sales;
        }

        public bool Update(Sales sales)
        {
            bool bReturn = false;
            try
            {
                var updateSales = this._context.Sales.Attach(sales);
                updateSales.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
