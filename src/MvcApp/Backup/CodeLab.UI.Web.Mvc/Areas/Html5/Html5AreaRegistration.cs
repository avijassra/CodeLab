using System.Web.Mvc;

namespace CodeLab.UI.Web.Mvc.Areas.Html5
{
    public class Html5AreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Html5";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
           context.MapRoute(
                "ServerSentEvent_StatusChangeServerUpdate",
                "StatusChangeServerUpdate",
                new { controller = "User", action = "StatusChangeEvent", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "ServerSent_AdminUserStatusChange",
                "UserStatusChange",
                new { controller = "Admin", action = "UserStatusChange", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "ServerSent_AdminActionOnAll",
                "ActionOnAll",
                new { controller = "Admin", action = "ActionOnAll", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Html5_default",
                "Html5/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
