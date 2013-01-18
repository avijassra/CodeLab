namespace MvcBase.WebHelper.MVC.Responses
{
    public class RefreshOptions
    {
        public string DataCaptureViewName { get; set; }

        public object DataCaptureViewModel { get; set; }

        public string ContentViewName { get; set; }

        public object ContentViewModel { get; set; }

        public string ResultViewName { get; set; }

        public object ResultViewModel { get; set; }

        public string RedirectUrl { get; set; }
    }
}