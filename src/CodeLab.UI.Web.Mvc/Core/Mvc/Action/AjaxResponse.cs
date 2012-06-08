namespace CodeLab.UI.Web.Mvc.Core.Mvc.Action
{
    public class AjaxResponse
    {
        public AjaxResponse()
        {
            Message = null;
            DataCaptureView = null;
            ContentView = null;
            RedirectUrl = null;
            Result = null;
        }

        public bool HasError { get; set; }

        public string Message { get; set; }

        public string DataCaptureView { get; set; }

        public string ContentView { get; set; }

        public string Result { get; set; }

        public string RedirectUrl { get; set; }
    }
}