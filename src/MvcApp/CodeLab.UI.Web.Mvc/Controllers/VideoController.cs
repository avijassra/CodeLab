namespace CodeLab.UI.Web.Mvc.Controllers
{
    using System.Web.Mvc;

    public partial class VideoController : Controller
    {
        //
        // GET: /Video/

        public virtual ActionResult Index()
        {
            return View();
        }

    }
}
