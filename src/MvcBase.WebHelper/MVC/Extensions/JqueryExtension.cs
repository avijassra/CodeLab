namespace MvcBase.WebHelper.MVC.Extensions
{
    using System.Web.Mvc.Html;
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System.Web.Routing;
    using MvcBase.WebHelper.Extensions;

    public static class JqueryExtension
    {
        public static MvcForm BeginJqueryForm(this AjaxHelper ajaxHelper, string formId, ActionResult actionResult, string eventName)
        {
            var callInfo = actionResult.AsMVCResult();

            return BeginJqueryForm(ajaxHelper, formId, callInfo.Action, callInfo.Controller, true, eventName, null, callInfo.RouteValueDictionary, "", null /* htmlAttributes */);
        }

        public static MvcForm BeginJqueryForm(this AjaxHelper ajaxHelper, string formId, ActionResult actionResult, string eventName, string updateId)
        {
            var callInfo = actionResult.AsMVCResult();

            return BeginJqueryForm(ajaxHelper, formId, callInfo.Action, callInfo.Controller, true, eventName, updateId, callInfo.RouteValueDictionary, "", null /* htmlAttributes */);
        }

        public static MvcForm BeginJqueryForm(this AjaxHelper ajaxHelper, string formId, ActionResult actionResult, bool isAjax = true, string eventName = null, string updateId = null)
        {
            var callInfo = actionResult.AsMVCResult();

            return BeginJqueryForm(ajaxHelper, formId, callInfo.Action, callInfo.Controller, isAjax, eventName, updateId, callInfo.RouteValueDictionary, "", null /* htmlAttributes */);
        }

        public static MvcForm BeginJqueryForm(this AjaxHelper ajaxHelper, string formId, ActionResult actionResult, bool isAjax, string eventName, string updateId, string cssClassNames)
        {
            var callInfo = actionResult.AsMVCResult();

            return BeginJqueryForm(ajaxHelper, callInfo.Action, callInfo.Controller, formId, isAjax, eventName, updateId, callInfo.RouteValueDictionary, cssClassNames, null /* htmlAttributes */);
        }

        public static MvcForm BeginJqueryForm(this AjaxHelper ajaxHelper, string formId, string actionName, string controllerName, bool isAjax, string eventName, string updateId, RouteValueDictionary routeValues, string cssClassNames, IDictionary<string, object> htmlAttributes)
        {
            // get target URL
            string formAction = UrlHelper.GenerateUrl(null, actionName, controllerName, routeValues ?? new RouteValueDictionary(), ajaxHelper.RouteCollection, ajaxHelper.ViewContext.RequestContext, true /* includeImplicitMvcValues */);
            return FormHelper(ajaxHelper, formId, formAction, isAjax, eventName, updateId, cssClassNames, htmlAttributes);
        }

        private static MvcForm FormHelper(this AjaxHelper ajaxHelper, string formId, string formAction, bool isAjax, string eventName, string updateId, string cssClassNames, 
            IDictionary<string, object> htmlAttributes)
        {
            var tagBuilder = new TagBuilder("form");

            tagBuilder.MergeAttributes(htmlAttributes);
            tagBuilder.MergeAttribute("action", formAction);
            tagBuilder.MergeAttribute("method", @"post");

            var metadataBuilder = new System.Text.StringBuilder();
            metadataBuilder.AppendFormat("IsAjax: {0}", isAjax.ToJavascriptString());
            
            if(!string.IsNullOrEmpty(eventName))
                metadataBuilder.AppendFormat(", EventName: '{0}'", eventName);

            if (!string.IsNullOrEmpty(updateId))
                metadataBuilder.AppendFormat(", UpdateId: '{0}'", updateId);

            var metadata = "{" + metadataBuilder.ToString() + "}";

            tagBuilder.MergeAttribute("autocomplete", @"off");
            tagBuilder.MergeAttribute("class", "jqAjaxForm " + (!string.IsNullOrEmpty(cssClassNames) ? cssClassNames : string.Empty) + @" " + metadata);
            tagBuilder.GenerateId(formId);
            ajaxHelper.ViewContext.Writer.Write(tagBuilder.ToString(TagRenderMode.StartTag));

            var form = new MvcForm(ajaxHelper.ViewContext);
            if (ajaxHelper.ViewContext.ClientValidationEnabled)
                ajaxHelper.ViewContext.FormContext.FormId = tagBuilder.Attributes["id"];

            return form;
        }
    }
}