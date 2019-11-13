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
            QueryResultView<Customer> customers = this._customerDao.Query(customerView);
            Console.WriteLine("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            Console.WriteLine("Get {0} data.", customers.TotalData);
            foreach(Customer customer in customers.Results)
            {
                Console.WriteLine(customer.ToString());
            }
            Console.WriteLine("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
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
            ActionMessage rMessage = new ActionMessage()
            {
                Message = "Update customer success!",
                Result = true
            };
            Customer customer = customerView;
            isSuccess = this._customerDao.Update(customer);
            if (!isSuccess)
            {
                rMessage.Message = "Update customer fail!";
                rMessage.Result = false;
            }
            return Json(rMessage);
        }

        [HttpPost]
        public async Task<JsonResult> Add([FromBody] CustomerView customerView)
        {
            bool isSuccess = false;
            ActionMessage rMessage = new ActionMessage() 
            { 
                Message = "Add customer success!", 
                Result = true 
            };
            Customer customer = customerView;
            isSuccess=this._customerDao.Add(customer);
            if (!isSuccess)
            {
                rMessage.Message= "Add customer fail!";
                rMessage.Result = false;
            }
            return Json(rMessage);
        }

        public JsonResult Delete(int id)
        {
            bool isSuccess = false;
            ActionMessage rMessage = new ActionMessage()
            {
                Message = "Delete customer success!",
                Result = true
            };
            isSuccess = this._customerDao.Delete(id);
            if (!isSuccess)
            {
                rMessage.Message = "Delete customer fail!";
                rMessage.Result = false;
            }
            return Json(rMessage);
        }
    }
}