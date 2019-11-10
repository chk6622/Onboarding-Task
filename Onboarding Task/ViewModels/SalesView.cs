using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Onboarding_Task.Models;

namespace Onboarding_Task.ViewModels
{
    public class SalesView:Sales
    {
        private int customerId;
        public int CustomerId 
        {
            set
            {
                this.customerId = value;
            } 
            get 
            {
                if (this.Customer != null)
                {
                    return this.Customer.Id;
                }
                else
                {
                    return this.customerId;
                }
            } 
        }

        private int productId;
        public int ProductId 
        {
            set 
            {
                this.productId = value;
            } 
            get
            {
                if (this.Product != null)
                {
                    return this.Product.Id;
                }
                else
                {
                    return this.productId;
                }
            }
        }
        private int storeId;
        public int StoreId 
        {
            set
            {
                this.storeId = value;
            }
            get
            {
                if(this.Store!=null)
                {
                    return this.Store.Id;
                }
                else
                {
                    return this.storeId;
                }
            }
        }

    }
}
