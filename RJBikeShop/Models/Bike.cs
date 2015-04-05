using RJBikeShop.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        [Column("Make")]
        public string MakeString
        {
            get { return Make.ToString(); }
            private set { Make = EnumExtensions.ParseEnum<Make>(value); }
        }
        [NotMapped]
        public Make Make { get; set; }

        public string Model { get; set; }
        public int FrameSize { get; set; }
        public string Year { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }

        [Column("BikeType")]
        public string BikeTypeString
        {
            get { return BikeType.ToString(); }
            private set { BikeType = EnumExtensions.ParseEnum<BikeType>(value); }
        }
        [NotMapped]
        public BikeType BikeType { get; set; }

        [Column("Color")]
        public string ColorString
        {
            get { return Color.ToString(); }
            private set { Color = EnumExtensions.ParseEnum<Color>(value); }
        }
        [NotMapped]
        public Color Color { get; set; }

        [Column("Gender")]
        public string GenderString
        {
            get { return Gender.ToString(); }
            private set { Gender = EnumExtensions.ParseEnum<Gender>(value); }
        }
        [NotMapped]
        public Gender Gender { get; set; }
        
        public bool Sold { get; set; }
        public DateTime? DateSold { get; set; }
    }
}