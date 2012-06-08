namespace CodeLab.UI.Web.Mvc.Core.StartupTasks.Registration
{
    using Microsoft.Web.Optimization;
    using MvcBase.WebHelper.MVC.Minifications;
    using MvcBase.WebHelper.StartupTasks;

    public class RegisterBundlingAndMinificationFiles: IIncludeComponents
    {
        public void Setup()
        {
            /*************************************************************
            * Main home page CSS and JS files
            ** ***********************************************************/
            var mainWebStyle = new Bundle("~/Include/Cache/MainApp.Style", typeof(YuiCssMinify));
            mainWebStyle.AddFile("~/Include/Styles/mysite.base.style.css");
            BundleTable.Bundles.Add(mainWebStyle);

            var mainWebScript = new Bundle("~/Include/Cache/MainApp.Common.Scripts", typeof(YuiJsMinify));
            mainWebScript.AddFile("~/Include/Scripts/Jquery/jquery-1.7.1.min.js");
            //mainWebScript.AddFile("~/Include/Scripts/Jquery/jquery.blockUI.js");
            //mainWebScript.AddFile("~/Include/Scripts/Jquery/jquery.ba-bbq.min.js");
            //mainWebScript.AddFile("~/Include/Scripts/Jquery/jquery.metadata.js");
            mainWebScript.AddFile("~/Include/Scripts/Html/modernizr-2.0.6-development-only.js");
            mainWebScript.AddFile("~/Include/Scripts/AppCore/mysite.shared.js");
            mainWebScript.AddFile("~/Include/Scripts/AppCore/mysite.ajax.js");
            mainWebScript.AddFile("~/Include/Scripts/AppCore/mysite.forms.js");
            mainWebScript.AddFile("~/Include/Scripts/AppCore/mysite.address.js");
            BundleTable.Bundles.Add(mainWebScript);

            /*************************************************************
            * Html5 area page CSS and JS files
            ** ***********************************************************/
            var html5Style = new Bundle("~/Include/Cache/Html5.Common.Style", typeof(YuiCssMinify));
            html5Style.AddFile("~/Include/Styles/mysite.base.style.css");
            html5Style.AddFile("~/Include/Styles/mysite.base.area.style.css");
            html5Style.AddFile("~/Areas/Html5/Include/Styles/mysite.html5.css");
            BundleTable.Bundles.Add(html5Style);

            var geolocationScript = new Bundle("~/Include/Cache/Geolocation.Scripts", typeof(YuiJsMinify));
            geolocationScript.AddFile("~/Areas/Html5/Include/Scripts/geolocation.js");
            BundleTable.Bundles.Add(geolocationScript);

            var webstorageScript = new Bundle("~/Include/Cache/WebStorage.Scripts", typeof(YuiJsMinify));
            webstorageScript.AddFile("~/Areas/Html5/Include/Scripts/webstorage.js");
            BundleTable.Bundles.Add(webstorageScript);

            var serverSentAdminScript = new Bundle("~/Include/Cache/ServerSentAdmin.Scripts", typeof(YuiJsMinify));
            serverSentAdminScript.AddFile("~/Areas/Html5/Include/Scripts/serversentevents.admin.js");
            BundleTable.Bundles.Add(serverSentAdminScript);

            var serverSentUserScript = new Bundle("~/Include/Cache/ServerSentUser.Scripts", typeof(YuiJsMinify));
            serverSentUserScript.AddFile("~/Areas/Html5/Include/Scripts/serversentevents.user.js");
            BundleTable.Bundles.Add(serverSentUserScript);

            var cssAnimationStyle = new Bundle("~/Include/Cache/CssAnimation.Style", typeof(YuiCssMinify));
            cssAnimationStyle.AddFile("~/Areas/Html5/Include/Styles/mysite.html5.cssanimation.css");
            BundleTable.Bundles.Add(cssAnimationStyle);

            var cssAnimationScript = new Bundle("~/Include/Cache/CssAnimation.Scripts", typeof(YuiJsMinify));
            cssAnimationScript.AddFile("~/Areas/Html5/Include/Scripts/cssanimation.js");
            BundleTable.Bundles.Add(cssAnimationScript);

            /*************************************************************
            * Jquery area page CSS and JS files
            ** ***********************************************************/
            var jqueryStyle = new Bundle("~/Include/Cache/Jquery.Common.Style", typeof(YuiCssMinify));
            jqueryStyle.AddFile("~/Include/Styles/mysite.base.style.css");
            jqueryStyle.AddFile("~/Include/Styles/mysite.base.style.color.css");
            jqueryStyle.AddFile("~/Include/Styles/mysite.input.css");
            jqueryStyle.AddFile("~/Include/Styles/mysite.base.area.style.css");
            jqueryStyle.AddFile("~/Areas/Jquery/Include/Styles/mysite.jquery.css");
            BundleTable.Bundles.Add(jqueryStyle);

            var effectMultiDimensionScripts = new Bundle("~/Include/Cache/Effects.MultiDimensions.Scripts", typeof(YuiJsMinify));
            effectMultiDimensionScripts.AddFile("~/Areas/Jquery/Include/Scripts/effects.multiDimensions.js");
            BundleTable.Bundles.Add(effectMultiDimensionScripts);

            var imageBgMoverScripts = new Bundle("~/Include/Cache/Image.BgMover.Scripts", typeof(YuiJsMinify));
            imageBgMoverScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.imageBackgroundMover-1.0.js");
            imageBgMoverScripts.AddFile("~/Areas/Jquery/Include/Scripts/imageMover.js");
            BundleTable.Bundles.Add(imageBgMoverScripts);

            var imagePlusifyScripts = new Bundle("~/Include/Cache/Image.Plusify.Scripts", typeof(YuiJsMinify));
            imagePlusifyScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.imagePlusify-2.1.js");
            imagePlusifyScripts.AddFile("~/Areas/Jquery/Include/Scripts/imagePlusify.js");
            BundleTable.Bundles.Add(imagePlusifyScripts);

            var imageRandomizerScripts = new Bundle("~/Include/Cache/Image.Randomizer.Scripts", typeof(YuiJsMinify));
            imageRandomizerScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.imageRandomizer-1.0.js");
            imageRandomizerScripts.AddFile("~/Areas/Jquery/Include/Scripts/imageRandomizer.js");
            BundleTable.Bundles.Add(imageRandomizerScripts);

            var imageRotatorScripts = new Bundle("~/Include/Cache/Image.Rotator.Scripts", typeof(YuiJsMinify));
            imageRotatorScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.imageRotator-1.5.js");
            imageRotatorScripts.AddFile("~/Areas/Jquery/Include/Scripts/imageRotator.js");
            BundleTable.Bundles.Add(imageRotatorScripts);

            var imageRotatorTryItScripts = new Bundle("~/Include/Cache/Image.Rotator.Try.It.Scripts", typeof(YuiJsMinify));
            imageRotatorTryItScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.imageRotator-1.5.js");
            imageRotatorTryItScripts.AddFile("~/Areas/Jquery/Include/Scripts/imageRotator.tryit.js");
            BundleTable.Bundles.Add(imageRotatorTryItScripts);

            var jquerySampleStyle = new Bundle("~/Include/Cache/Jquery.Sample.Style", typeof(YuiCssMinify));
            jquerySampleStyle.AddFile("~/Include/Styles/mysite.base.style.css");
            jquerySampleStyle.AddFile("~/Include/Styles/mysite.base.style.color.css");
            jquerySampleStyle.AddFile("~/Include/Styles/mysite.input.css");
            jquerySampleStyle.AddFile("~/Areas/Jquery/Include/Styles/mysite.jquery.sample.css");
            BundleTable.Bundles.Add(jquerySampleStyle);

            var stopwatchScripts = new Bundle("~/Include/Cache/Clock.Scripts", typeof(YuiJsMinify));
            stopwatchScripts.AddFile("~/Areas/Jquery/Include/Scripts/Plugins/jquery.clock-0.1.js");
            stopwatchScripts.AddFile("~/Areas/Jquery/Include/Scripts/clock.js");
            BundleTable.Bundles.Add(stopwatchScripts);
        }
    }
}