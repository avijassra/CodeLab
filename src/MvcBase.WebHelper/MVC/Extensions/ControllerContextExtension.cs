namespace MvcBase.WebHelper.MVC.Extensions
{
    using System.IO;
    using System.Web.Mvc;

    /// <summary>
    /// jQuerForm Extension
    /// </summary>
    public static class ControllerContextExtension
    {
        public static string RenderPartialViewToString(this ControllerContext context, string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = context.RouteData.GetRequiredString("action");

            context.Controller.ViewData.Model = model;

            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(context, viewName);
                ViewContext viewContext = new ViewContext(context, viewResult.View, context.Controller.ViewData, context.Controller.TempData, sw);
                viewResult.View.Render(viewContext, sw);

                return MvcHtmlString.Create(sw.GetStringBuilder().ToString()).ToHtmlString();
            }
        }
    }
}