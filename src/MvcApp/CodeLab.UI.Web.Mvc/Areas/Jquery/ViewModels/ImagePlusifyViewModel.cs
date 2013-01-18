using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery.ViewModels
{
    public class ImagePlusifyViewModel
    {
        public ImagePlusifyViewModel()
        {
        }

        public ImagePlusifyViewModel(string id, string name, string[] images)
        {
            Id = id;
            Name = name;
            Images = images;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string[] Images { get; set; }

        public ImagePlusifyViewModel[] GetAlbums()
        {
            return new ImagePlusifyViewModel[4] 
                {
                    new ImagePlusifyViewModel(Guid.NewGuid().ToString(), "Scotland", new string[8]
                        {
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0337.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0381.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0432.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0461.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0473.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0480.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSC_0488.JPG",
                            "/Areas/Jquery/Include/Images/Scotland/DSCF1533.JPG"
                        }),
                    new ImagePlusifyViewModel(Guid.NewGuid().ToString(), "High Wycombe", new string[5]
                        {
                            "/Areas/Jquery/Include/Images/HighWycombe/DSC_0250.JPG",
                            "/Areas/Jquery/Include/Images/HighWycombe/DSC_0251.JPG",
                            "/Areas/Jquery/Include/Images/HighWycombe/DSC_0255.JPG",
                            "/Areas/Jquery/Include/Images/HighWycombe/DSC_0261.JPG",
                            "/Areas/Jquery/Include/Images/HighWycombe/DSC_0262.JPG"
                        }),
                    new ImagePlusifyViewModel(Guid.NewGuid().ToString(), "Malibu", new string[2]
                        {
                            "/Areas/Jquery/Include/Images/Malibu/DSC_1111.JPG",
                            "/Areas/Jquery/Include/Images/Malibu/DSC_1118.JPG"
                        }),
                    new ImagePlusifyViewModel(Guid.NewGuid().ToString(), "LasVegas", new string[1]
                        {
                            "/Areas/Jquery/Include/Images/LasVegas/DSC_0829.JPG"
                        })
                };
        }
    }
}