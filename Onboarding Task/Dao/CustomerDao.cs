using System;
using System.Collections.Generic;
using System.Linq;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

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

        public IEnumerable<Customer> Query(CustomerView queryCustomer)
        {
            List<Customer> queryResults = null;
            if (queryCustomer != null)
            {
                queryResults = _context.Customers.Where(c => c.Name.Contains(queryCustomer.NameQry) && c.Address.Contains(queryCustomer.AddressQry)).ToList();
            }
            else
            {
                queryResults = _context.Customers.ToList();
            }
            return queryResults;
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
