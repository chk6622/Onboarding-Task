using System;
using System.Collections.Generic;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;

namespace Onboarding_Task.Dao
{
    public class CustomerDao : ICustomerDao
    {
        private readonly MyDbContext _context = null;

        public CustomerDao(MyDbContext myDbContext)
        {
            this._context = myDbContext;
        }
        public bool Add(Customer customer)
        {
            bool bReturn = false;
            try
            {
                _context.Add<Customer>(customer);
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
                Customer customer=_context.Customers.Find(id);
                _context.Remove<Customer>(customer);
                _context.SaveChanges();
                bReturn = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

        public Customer GetObjectById(int id)
        {
            Customer customer = null;
            customer = _context.Customers.Find(id);
            return customer;
        }

        public IEnumerable<Customer> Query(string queryString)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> QueryAll()
        {
            return this._context.Customers;
        }

        public bool Update(Customer customer)
        {
            bool bReturn = false;
            try
            {
                var updateCustomer = this._context.Customers.Attach(customer);
                updateCustomer.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
