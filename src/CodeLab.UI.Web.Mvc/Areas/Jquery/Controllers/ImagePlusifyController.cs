using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CodeLab.UI.Web.Mvc.Areas.Jquery.ViewModels;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery.Controllers
{
    public partial class ImagePlusifyController : Controller
    {
        //
        // GET: /Jquery/ImageArt/

        public virtual ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public virtual ActionResult GetImagesAndDesc()
        {
            return Json(new ImagePlusifyViewModel().GetAlbums(), JsonRequestBehavior.AllowGet);
        }
    }
}
