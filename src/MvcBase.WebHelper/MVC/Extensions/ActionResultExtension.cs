namespace MvcBase.WebHelper.MVC.Extensions
{
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;

    internal static class ActionResultExtension
    {
        public static IMVCResult AsMVCResult(this ActionResult actionResult)
        {
            var mvcResult = new MVCResult();
            var properties = actionResult.GetType().GetProperties();

            if (properties != null)
            {
                mvcResult.Controller = (string)properties.Where(p => p.Name == "Controller").First().GetValue(actionResult, null);
                mvcResult.Action = (string)properties.Where(p => p.Name == "Action").First().GetValue(actionResult, null);
                mvcResult.RouteValueDictionary = (RouteValueDictionary)properties.Where(p => p.Name == "RouteValueDictionary").First().GetValue(actionResult, null);
            }

            return mvcResult;
        }
    } 
}
