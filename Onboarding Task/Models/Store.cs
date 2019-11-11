using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Onboarding_Task.Models
{
    public class Store
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }
        [Required]
        [StringLength(50)]
        public string Name { set; get; }
        [Required]
        [StringLength(100)]
        public string Address { set; get; }

        public List<Sales> ProductSold { set; get; }
    }
}
