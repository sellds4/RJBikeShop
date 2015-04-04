using Microsoft.AspNet.Identity.EntityFramework;
using RJBikeShop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RJBikeShop.DAL
{
    public class RJBikeContext : IdentityDbContext<ApplicationUser>
    {
        public RJBikeContext() : base("RJBikeContext", throwIfV1Schema: false)
        {
        }

        public static RJBikeContext Create()
        {
            return new RJBikeContext();
        }

        public DbSet<Bike> Bikes { get; set; }
    }
}