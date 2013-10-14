using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery.ViewModels
{
    public class ImageRotatorViewModel
    {
        public ImageRotatorViewModel()
        {
        }

        public ImageRotatorViewModel(string source, string description)
        {
            Source = source;
            Description = description;
        }

        public string Source { get; set; }

        public string Description { get; set; }

        public List<ImageRotatorViewModel> GetMalibuImageList()
        {
            var imageList = new List<ImageRotatorViewModel>()
                {
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1111.JPG", "Rocking mountains"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1118.JPG", "Pacific coastal highway"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1119.JPG", "View from the mountains"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1122.JPG", "Green view from the mountains"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1124.JPG", "On the way"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1140.JPG", "Driving in the mountains ..."),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1148.JPG", "Its so dark here in tunnel"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1165.JPG", "Green view to malibu beach"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1180.JPG", "Malibu beach"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/Malibu/DSC_1184.JPG", "First sunset of 2012"),
                };

            return imageList;
        }

        public List<ImageRotatorViewModel> GetLasVegasImageList()
        {
            var imageList = new List<ImageRotatorViewModel>()
                {
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0829.JPG", "On the way to LV ...."),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0830.JPG", "Rocky desert on the way to LV"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0943.JPG", "Going towards Hoover Dam"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0960.JPG", "Lake meads"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0961.JPG", "Driving in desert"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0962.JPG", "Entering Arizona"),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0963.JPG", "Amazing roads ..."),
                    new ImageRotatorViewModel("~/Areas/Jquery/Include/Images/LasVegas/DSC_0998.JPG", "Hoover Dam"),
                };

            return imageList;
        }
    }
}