﻿namespace CodeLab.UI.Web.Mvc
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using MvcBase.WebHelper.StartupTasks;
    using CodeLab.UI.Web.Mvc.Core.StartupTasks;

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            // Registering dependency
            new RegisterStartupTasks().Execute(new RegisterStartupDependencies().AddDependencies());
        }
    }
}