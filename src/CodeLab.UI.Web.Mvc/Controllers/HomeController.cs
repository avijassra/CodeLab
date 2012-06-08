namespace CodeLab.UI.Web.Mvc.Controllers
{
    using System.Web.Mvc;

    public partial class HomeController : Controller
    {
        //
        // GET: /Home/

        public virtual ActionResult Index()
        {
            return View();
        }
    }
}
