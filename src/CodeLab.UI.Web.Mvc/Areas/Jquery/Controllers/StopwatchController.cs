﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodeLab.UI.Web.Mvc.Areas.Jquery.Controllers
{
    public partial class StopwatchController : Controller
    {
        //
        // GET: /Jquery/Stopwatch/

        public virtual ActionResult Index()
        {
            return View();
        }

    }
}
