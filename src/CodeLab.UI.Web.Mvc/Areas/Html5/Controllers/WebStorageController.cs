﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodeLab.UI.Web.Mvc.Areas.Html5.Controllers
{
    public partial class WebStorageController : Controller
    {
        //
        // GET: /Samples/LocalStorage/

        public virtual ActionResult Index()
        {
            return View();
        }

    }
}
