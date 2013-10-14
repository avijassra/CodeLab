namespace CodeLab.UI.Web.Mvc.Controllers
{
    using System.Web.Mvc;

    public partial class DemoStartPageController : Controller
    {
        //
        // GET: /Samples/Home/

        public virtual ActionResult Index()
        {
            return View();
        }

    }
}
