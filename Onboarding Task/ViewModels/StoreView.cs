using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Onboarding_Task.Models;

namespace Onboarding_Task.ViewModels
{
    public class StoreView:Store
    {
        private string nameQry;
        public string NameQry
        {
            set { this.nameQry = value; }

            get { return this.nameQry == null ? "" : this.nameQry; }
        }

        private string addressQry;
        public string AddressQry
        {
            set { this.addressQry = value; }

            get { return this.addressQry == null ? "" : this.addressQry; }
        }
    }
}
