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
    public class SalesController : Controller
    {
        private readonly ISalesDao _salesDao = null;
        public SalesController(ISalesDao salesDao)
        {
            this._salesDao = salesDao;
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
            return Json(sales);
        }

        [HttpPost]
        public async Task<JsonResult> Update([FromBody] SalesView salesView)
        {
            bool isSuccess = false;
            string rMessage = "Update sales success!";
            Sales sales = salesView;
            isSuccess = this._salesDao.Update(sales);
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
            Sales sales = salesView;
            isSuccess=this._salesDao.Add(sales);
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