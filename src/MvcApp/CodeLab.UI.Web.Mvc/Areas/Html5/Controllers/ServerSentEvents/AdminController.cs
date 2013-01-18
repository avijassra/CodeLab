namespace CodeLab.UI.Web.Mvc.Areas.Html5.Controllers.ServerSentEvents
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using CodeLab.UI.Web.Mvc.Areas.Html5.ViewModels.ServerSentEvent;

    public partial class AdminController : Controller
    {
        public virtual ActionResult Index()
        {
            return View(new LoggedUsersViewModel().Users);
        }

        [HttpPost]
        public virtual JsonResult UserStatusChange(Guid id, bool isOnline)
        {
            var viewModel = new LoggedUsersViewModel().Users.Where(x => x.Id == id).Single();
            viewModel.Id = id;
            viewModel.IsOnline = isOnline;
            viewModel.Time = DateTime.Now.ToShortTimeString();
            viewModel.HasChanged = true;

            return Json(viewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public virtual JsonResult ActionOnAll(bool everyOneOnline)
        {
            new LoggedUsersViewModel()
                .Users.ForEach(x =>
                {
                    x.IsOnline = everyOneOnline;
                    x.Time = DateTime.Now.ToShortTimeString();
                    x.HasChanged = true;
                });

            return Json(new { HasError = false}, JsonRequestBehavior.AllowGet);
        }
    }
}
