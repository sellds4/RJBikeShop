using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using RJBikeShop.DAL;
using RJBikeShop.Models;
using System.Collections.Generic;
using System;

namespace RJBikeShop.Controllers
{
    [Authorize]
    [RoutePrefix("api/Bike")]
    public class BikeController : ApiController
    {
        private RJBikeContext db = new RJBikeContext();

        public class PagedResult<T>
        {
            public int PageNum { get; set; }
            public int PageSize { get; set; }
            public int PageCount { get; private set; }
            public int TotalBikeCount { get; set; }
            public List<T> BikeList { get; set; }

            public PagedResult(IEnumerable<T> bikeList, int pageNum, int pageSize, int totalBikeCount)
            {
                
                PageNum = pageNum;
                PageSize = pageSize;
                PageCount = totalBikeCount > 0 ? (int)Math.Ceiling(totalBikeCount / (double)PageSize) : 0;
                TotalBikeCount = totalBikeCount;
                BikeList = new List<T>(bikeList);
            }
        }

        // GET: api/Bike
        public IQueryable<Bike> GetBikes()
        {
            return db.Bikes;
        }

        // GET: api/Bike/Pages
        //[ResponseType(typeof(PagedResult<Bike>))]
        [Route("Pages")]
        public PagedResult<Bike> GetBikes(int pageNum, int pageSize, bool getSoldBikes)
        {
            int skip = (pageNum - 1) * pageSize;
            int totalBikeCount = db.Bikes.Where(x => x.Sold == getSoldBikes).Count();

            var bikes = db.Bikes
                .OrderByDescending(x => x.Id)
                .Where(x => x.Sold == getSoldBikes)
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Bike>(bikes, pageNum, pageSize, totalBikeCount);
        }

        // GET: api/Bike/5
        [ResponseType(typeof(Bike))]
        public IHttpActionResult GetBike(int id)
        {
            Bike bike = db.Bikes.Find(id);
            if (bike == null)
            {
                return NotFound();
            }

            return Ok(bike);
        }

        // GET: api/Bike/BikeData
        [ResponseType(typeof(Dictionary<string, int[]>))]
        [Route("BikeData")]
        public IHttpActionResult GetBikeData()
        {
            string[] makes = Enum.GetNames(typeof(Make));
            string[] types = Enum.GetNames(typeof(BikeType));
            string[] colors = Enum.GetNames(typeof(Color));
            string[] genders = Enum.GetNames(typeof(Gender));
            
            var bikeDataDict = new Dictionary<string, string[]>();

            bikeDataDict["makes"] = makes;
            bikeDataDict["types"] = types;
            bikeDataDict["colors"] = colors;
            bikeDataDict["genders"] = genders;

            return Ok(bikeDataDict);
        }

        // PUT: api/Bike/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBike(int id, Bike bike)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bike.Id)
            {
                return BadRequest();
            }

            /*Bike currentBike = db.Bikes.Find(id);

            if(!currentBike.Sold && bike.Sold)
            {
                bike.DateSold = DateTime.Now;
            }
            
            if(currentBike.Sold && !bike.Sold)
            {
                bike.DateSold = null;
            }*/

            db.Entry(bike).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Bike
        [ResponseType(typeof(Bike))]
        public IHttpActionResult PostBike(Bike bike)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bikes.Add(bike);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bike.Id }, bike);
        }

        // DELETE: api/Bike/5
        [ResponseType(typeof(Bike))]
        public IHttpActionResult DeleteBike(int id)
        {
            Bike bike = db.Bikes.Find(id);
            if (bike == null)
            {
                return NotFound();
            }

            db.Bikes.Remove(bike);
            db.SaveChanges();

            return Ok(bike);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BikeExists(int id)
        {
            return db.Bikes.Count(e => e.Id == id) > 0;
        }
    }
}