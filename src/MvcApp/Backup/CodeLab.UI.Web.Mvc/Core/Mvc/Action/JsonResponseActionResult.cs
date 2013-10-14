namespace CodeLab.UI.Web.Mvc.Core.Mvc.Action
{
    using System.Web.Mvc;
    using CodeLab.UI.Web.Mvc.Core.Mvc.Extensions;
    using MvcBase.WebHelper.MVC.Extensions;

    public class JsonResponseActionResult : ActionResult
    {
        private RefreshOptions _refreshOptions;

        internal JsonResponseActionResult(RefreshOptions refreshOptions)
        {
            _refreshOptions = refreshOptions;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            // [Avi] TODO: rearrange according to new model
            //if (_refreshOptions.DataCaptureViewModel != null && string.IsNullOrEmpty(_refreshOptions.DataCaptureViewName))
            //    _refreshOptions.DataCaptureViewName = MVC.Shared.Views.DataCaptureCommon;

            var ajaxResponse = GetAjaxResponse(context, _refreshOptions.DataCaptureViewName, _refreshOptions.DataCaptureViewModel,
                _refreshOptions.ContentViewName, _refreshOptions.ContentViewModel, _refreshOptions.ResultViewName, _refreshOptions.ResultViewModel, 
                _refreshOptions.RedirectUrl);

            new JsonResult{ Data = ajaxResponse, JsonRequestBehavior = JsonRequestBehavior.AllowGet}.ExecuteResult(context);
        }

        private static AjaxResponse GetAjaxResponse(ControllerContext context, string dataCaptureViewName, object dataCaptureViewModel,
            string contentViewName, object contentViewModel, string viewName, object viewModel, string redirectUrl)
        {
            var response = new AjaxResponse();

            if (!string.IsNullOrEmpty(dataCaptureViewName))
                response.DataCaptureView =  context.RenderPartialViewToString(dataCaptureViewName, dataCaptureViewModel);

            if (!string.IsNullOrEmpty(contentViewName))
                response.ContentView = context.RenderPartialViewToString(contentViewName, contentViewModel);

            if (!string.IsNullOrEmpty(viewName))
                response.Result = context.RenderPartialViewToString(viewName, viewModel);

            if (!string.IsNullOrEmpty(redirectUrl))
                response.RedirectUrl = redirectUrl;
            
            return response;
        }
    }
}