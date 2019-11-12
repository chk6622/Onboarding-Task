using System;
using System.Collections.Generic;
using System.Linq;
using Onboarding_Task.AppDbContext;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

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

        public IEnumerable<Store> Query(StoreView queryObject)
        {
            List<Store> results = null;
            if (queryObject != null)
            {
                results = this._context.Stores.Where(s => s.Name.Contains(queryObject.NameQry) && s.Address.Contains(queryObject.AddressQry)).ToList();
            }
            else 
            {
                results = this._context.Stores.ToList();
            }
            return results;
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
