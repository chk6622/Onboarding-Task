using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Onboarding_Task.Models
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }
        [Required]
        [StringLength(50)]
        public string Name { set; get; }
        [Required]
        [Range(0, 10000.0)]
        public double Price { set; get; }
        public List<Sales> ProductSold { set; get; }
    }
}
