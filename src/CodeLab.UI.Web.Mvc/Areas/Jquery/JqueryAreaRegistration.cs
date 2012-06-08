using System.Web.Mvc;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery
{
    public class JqueryAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Jquery";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Jquery_default",
                "Jquery/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
