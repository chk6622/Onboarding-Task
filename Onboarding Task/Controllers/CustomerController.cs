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
    public class CustomerController : Controller
    {
        private readonly ICustomerDao _customerDao = null;
        public CustomerController(ICustomerDao customerDao)
        {
            this._customerDao = customerDao;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Query(CustomerView customerView) 
        {
            IEnumerable customers = this._customerDao.QueryAll();
            //var customer = null;
            //object model=null;
            //foreach (var customer in customers)
            //{
            //    model = customer;
            //}
            return Json(customers);
        }

        public JsonResult Edit(int id)
        {
            Customer customer = this._customerDao.GetObjectById(id);
            return Json(customer);
        }
    }
}