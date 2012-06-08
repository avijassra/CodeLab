namespace MvcBase.WebHelper.MVC.Extensions
{
    using System.Web.Routing;

    internal class MVCResult : IMVCResult
    {
        public string Action { get; set; }
        public string Controller { get; set; }
        public RouteValueDictionary RouteValueDictionary { get; set; }
    } 
}
