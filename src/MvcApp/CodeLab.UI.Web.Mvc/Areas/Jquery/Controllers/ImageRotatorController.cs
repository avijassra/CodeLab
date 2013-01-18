using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CodeLab.UI.Web.Mvc.Areas.Jquery.ViewModels;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery.Controllers
{
    public partial class ImageRotatorController : Controller
    {
        public virtual ActionResult Index()
        {
            return View();
        }

        public virtual ActionResult TryIt()
        {
            return View();
        }

        [HttpGet]
        public virtual ActionResult GetImagesAndDesc()
        {
            var viewModel = new ImageRotatorViewModel();
            var malibuImgs = from img in viewModel.GetMalibuImageList()
                       select new 
                       {
                            src = this.Url.Content(img.Source),
                            desc = img.Description,
                       };

            var lasVegasImgs = from img in viewModel.GetLasVegasImageList()
                             select new
                             {
                                 src = this.Url.Content(img.Source),
                                 desc = img.Description,
                             };

            return Json(new { malibu = malibuImgs, lasVegas = lasVegasImgs }, JsonRequestBehavior.AllowGet);
        }
    }
}
