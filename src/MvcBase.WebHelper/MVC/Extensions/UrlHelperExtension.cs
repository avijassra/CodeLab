namespace MvcBase.WebHelper.MVC.Extensions
{
    using System;
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class UrlHelperExtension
    {
        public static string UrlWithAction(this UrlHelper urlHelper, ActionResult controllerAction)
        {
            var callInfo = controllerAction.AsMVCResult();

            return urlHelper.Action(callInfo.Action, callInfo.Controller, callInfo.RouteValueDictionary);
        }

        public static string UrlWithActionFragment(this UrlHelper urlHelper, ActionResult fragmentAction)
        {
            return String.Format("{0}#{1}",
                        RouteTable.Routes.GetVirtualPathForArea(urlHelper.RequestContext,
                                                        new RouteValueDictionary(new
                                                        {
                                                            area = string.Empty,
                                                            controller = fragmentAction.AsMVCResult().Controller,
                                                            action = string.Empty,
                                                        })).VirtualPath,
                         fragmentAction.AsMVCResult().Action);
        }
    }
}