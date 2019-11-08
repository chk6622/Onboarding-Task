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

        public async Task<JsonResult> Edit(int id)
        {
            Customer customer = this._customerDao.GetObjectById(id);
            return Json(customer);
        }

        [HttpPost]
        public async Task<JsonResult> Update([FromBody] CustomerView customerView)
        {
            bool isSuccess = false;
            string rMessage = "Update customer success!";
            Customer customer = customerView;
            isSuccess = this._customerDao.Update(customer);
            if (!isSuccess)
            {
                rMessage = "Update customer fail!";
            }
            return Json(rMessage);
        }

        [HttpPost]
        public async Task<JsonResult> Add([FromBody] CustomerView customerView)
        {
            bool isSuccess = false;
            string rMessage = "Add customer success!";
            Customer customer = customerView;
            isSuccess=this._customerDao.Add(customer);
            if (!isSuccess)
            {
                rMessage = "Add customer fail!";
            }
            return Json(rMessage);
        }

        public JsonResult Delete(int id)
        {
            bool isSuccess = false;
            string rMessage = "Delete customer success!";
            isSuccess = this._customerDao.Delete(id);
            if (!isSuccess)
            {
                rMessage = "Delete customer fail!";
            }
            return Json(rMessage);
        }
    }
}