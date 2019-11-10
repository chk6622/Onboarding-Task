using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Onboarding_Task.Dao;
using Onboarding_Task.Models;
using Onboarding_Task.Utils;
using Onboarding_Task.ViewModels;

namespace Onboarding_Task.Controllers
{
    public class SalesController : Controller
    {
        private readonly ISalesDao _salesDao = null;
        private readonly ICustomerDao _customerDao = null;
        private readonly IProductDao _productDao = null;
        private readonly IStoreDao _storeDao = null;
        public SalesController(ISalesDao salesDao,ICustomerDao customerDao,IProductDao productDao,IStoreDao storeDao)
        {
            this._salesDao = salesDao;
            this._customerDao = customerDao;
            this._productDao = productDao;
            this._storeDao = storeDao;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Query(SalesView salesView) 
        {
            IEnumerable saless = this._salesDao.QueryAll();
            //var sales = null;
            //object model=null;
            //foreach (var sales in saless)
            //{
            //    model = sales;
            //}
            return Json(saless);
        }

        public async Task<JsonResult> Edit(int id)
        {
            Sales sales = this._salesDao.GetObjectById(id);
            SalesView salesView = AppUtils.Mapper<SalesView, Sales>(sales);

            return Json(salesView);
        }

        [HttpPost]
        public async Task<JsonResult> Update([FromBody] SalesView salesView)
        {
            bool isSuccess = false;
            string rMessage = "Update sales success!";
            int customerId = salesView.CustomerId;
            if (customerId > 0)
            {
                Customer customer = _customerDao.GetObjectById(customerId);
                salesView.Customer = customer;
            }
            int productId = salesView.ProductId;
            if (productId > 0)
            {
                Product product = _productDao.GetObjectById(productId);
                salesView.Product = product;
            }
            int storeId = salesView.StoreId;
            if (storeId > 0)
            {
                Store store = _storeDao.GetObjectById(storeId);
                salesView.Store = store;
            }

            isSuccess = this._salesDao.Update(salesView);
            if (!isSuccess)
            {
                rMessage = "Update sales fail!";
            }
            return Json(rMessage);
        }

        [HttpPost]
        public async Task<JsonResult> Add([FromBody] SalesView salesView)
        {
            bool isSuccess = false;
            string rMessage = "Add sales success!";

            int customerId = salesView.CustomerId;
            if(customerId>0)
            {
                Customer customer = _customerDao.GetObjectById(customerId);
                salesView.Customer = customer;
            }
            int productId = salesView.ProductId;
            if (productId > 0)
            {
                Product product = _productDao.GetObjectById(productId);
                salesView.Product = product;
            }
            int storeId = salesView.StoreId;
            if (storeId > 0)
            {
                Store store = _storeDao.GetObjectById(storeId);
                salesView.Store = store;
            }

            //Sales sales = salesView;
            isSuccess =this._salesDao.Add(salesView);
            if (!isSuccess)
            {
                rMessage = "Add sales fail!";
            }
            return Json(rMessage);
        }

        public JsonResult Delete(int id)
        {
            bool isSuccess = false;
            string rMessage = "Delete sales success!";
            isSuccess = this._salesDao.Delete(id);
            if (!isSuccess)
            {
                rMessage = "Delete sales fail!";
            }
            return Json(rMessage);
        }
    }
}