using RJBikeShop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RJBikeShop.DAL
{
    public class RJBikeContext : DbContext
    {
        public RJBikeContext() : base("RJBikeContext", throwIfVISchema:false)
        {
        }

        public DbSet<Bike> Bikes { get; set; }
    }
}