using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Onboarding_Task.Dao;
using Onboarding_Task.Models;
using Onboarding_Task.ViewModels;

namespace Onboarding_Task.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductDao _productDao = null;
        public ProductController(IProductDao productDao)
        {
            this._productDao = productDao;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Query(ProductView productView) 
        {
            IEnumerable products = this._productDao.QueryAll();
            //var customer = null;
            //object model=null;
            //foreach (var customer in customers)
            //{
            //    model = customer;
            //}
            return Json(products);
        }

        public JsonResult Edit(int id)
        {
            Product product = this._productDao.GetObjectById(id);
            return Json(product);
        }
    }
}