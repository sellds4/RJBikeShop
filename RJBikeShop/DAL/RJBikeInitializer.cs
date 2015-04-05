using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using RJBikeShop.Controllers;
using RJBikeShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RJBikeShop.DAL
{
    public class RJBikeInitializer : System.Data.Entity.DropCreateDatabaseAlways<RJBikeContext>
    {
        protected override void Seed(RJBikeContext context)
        {
            if (!(context.Users.Any(u => u.UserName == "admin")))
            {
                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);
                var userToInsert = new ApplicationUser{ UserName = "admin", Email = "admin@admin.com" };
                userToInsert.FirstName = "Admin";
                userToInsert.LastName = "Admin";
                userManager.Create(userToInsert, "password123");
            }

            int numOfBikes = 200;
            decimal margin = .8M;

            Array makes = Enum.GetValues(typeof(Make));
            Array types = Enum.GetValues(typeof(BikeType));
            Array colors = Enum.GetValues(typeof(Color));
            Array genders = Enum.GetValues(typeof(Gender));

            var frames = new List<int> {13, 16, 20, 23, 26};

            for(int i= 0; i<=numOfBikes; i++)
            {
                Random random = new Random();
                var make = (Make)makes.GetValue(random.Next(makes.Length));
                int frameIndex = random.Next(0, 5);
                decimal price = random.Next(100, 1000);

                Bike newBike = new Bike
                {
                    Make = make,
                    Model = make + "model" + i,
                    FrameSize = frames[frameIndex],
                    Year = "2015",
                    Price = price,
                    Cost = price * margin,
                    BikeType = (BikeType)types.GetValue(random.Next(types.Length)),
                    Color = (Color)colors.GetValue(random.Next(colors.Length)),
                    Gender = (Gender)genders.GetValue(random.Next(genders.Length))
                };
                context.Bikes.Add(newBike);
            }

            context.SaveChanges();
        }

    }
}