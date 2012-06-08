namespace MvcBase.WebHelper.MVC.Minifications
{
    using System;
    using Microsoft.Web.Optimization;
    using Yahoo.Yui.Compressor;

    public class YuiJsMinify : IBundleTransform
    {
        public void Process(BundleResponse bundle)
        {
            if (bundle == null)
            {
                throw new ArgumentNullException("bundle");
            }

            bundle.Content = JavaScriptCompressor.Compress(bundle.Content);
            bundle.ContentType = "text/javascript";
        }
    }
}
