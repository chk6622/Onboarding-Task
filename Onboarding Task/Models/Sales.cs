using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Onboarding_Task.Models
{
    public class Sales
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }
        public Customer Customer { set; get; }
        public Product Product { set; get; }
        public Store Store { set; get; }
        [Required]
        [StringLength(10)]
        public string DateSold { set; get; }
    }
}
