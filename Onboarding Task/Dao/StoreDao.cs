using System;
using System.Collections.Generic;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;

namespace Onboarding_Task.Dao
{
    public class StoreDao : IStoreDao
    {
        private readonly MyDbContext _context = null;

        public StoreDao(MyDbContext myDbContext)
        {
            this._context = myDbContext;
        }
        public bool Add(Store store)
        {
            bool bReturn = false;
            try
            {
                _context.Add<Store>(store);
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
                Store store=_context.Stores.Find(id);
                _context.Remove<Store>(store);
                _context.SaveChanges();
                bReturn = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return bReturn;
        }

        public Store GetObjectById(int id)
        {
            Store store = null;
            store = _context.Stores.Find(id);
            return store;
        }

        public IEnumerable<Store> Query(string queryString)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Store> QueryAll()
        {
            return this._context.Stores;
        }

        public bool Update(Store store)
        {
            bool bReturn = false;
            try
            {
                var updateStore = this._context.Stores.Attach(store);
                updateStore.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
