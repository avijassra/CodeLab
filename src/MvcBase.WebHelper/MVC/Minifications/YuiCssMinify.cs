namespace MvcBase.WebHelper.MVC.Minifications
{
    using System;
    using Microsoft.Web.Optimization;
    using Yahoo.Yui.Compressor;

    public class YuiCssMinify : IBundleTransform
    {
        public void Process(BundleResponse bundle)
        {
            if (bundle == null)
            {
                throw new ArgumentNullException("bundle");
            }

            bundle.Content = CssCompressor.Compress(bundle.Content);
            bundle.ContentType = "text/css";
        }
    }
}
