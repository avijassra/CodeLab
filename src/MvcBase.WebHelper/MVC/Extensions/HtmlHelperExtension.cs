namespace MvcBase.WebHelper.MVC.Extensions
{
    using System;
    using System.Web.Mvc;
    using System.Text;
    using System.Web.Routing;

    public static class HtmlHelperExtension
    {
        public static MvcHtmlString ActionLinkWithFragment(this HtmlHelper htmlHelper, string text, ActionResult fragmentAction, string title = null, string cssClass = null)
        {
            var mvcActionResult = fragmentAction as IMVCResult;

            if (mvcActionResult == null)
                return null;

            var linkCssClass = new StringBuilder();
            var actionLink = string.Format("{0}#{1}",
                        RouteTable.Routes.GetVirtualPathForArea(htmlHelper.ViewContext.RequestContext,
                                                        new RouteValueDictionary(new
                                                        {
                                                            area = string.Empty,
                                                            controller = mvcActionResult.Controller,
                                                            action = string.Empty,
                                                        })).VirtualPath,
                         mvcActionResult.Action);

            if (!string.IsNullOrEmpty(cssClass))
                linkCssClass.Append(cssClass.Trim());
            
            if (title != null)
            {
                linkCssClass.Append(" {title: '");
                linkCssClass.Append(title);
                linkCssClass.Append("' } ");
            }

            return new MvcHtmlString(string.Format("<a id=\"{0}\" href=\"{1}\" class=\"jqAddress {2}\">{3}</a>", Guid.NewGuid(), actionLink, linkCssClass.ToString(), text));
        }
    }
}