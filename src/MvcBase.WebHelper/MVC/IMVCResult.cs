namespace MvcBase.WebHelper.MVC.Extensions
{
    using System.Web.Routing;

    internal interface IMVCResult
    {
        string Action { get; set; }
        string Controller { get; set; }
        RouteValueDictionary RouteValueDictionary { get; set; }
    } 
}
