using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RJBikeShop.Models
{
    public class Bike
    {
        public Bike()
        {
            this.Sold = false;
        }

        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int FrameSize { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public BikeType BikeType { get; set; }
        public Color Color { get; set; }
        public Gender Gender { get; set; }
        public Status Status { get; set; }
        public bool Sold { get; set; }
        public DateTime? DateSold { get; set; }
    }
}