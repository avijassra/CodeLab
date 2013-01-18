namespace CodeLab.UI.Web.Mvc.Areas.Html5.Controllers.ServerSentEvents
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using CodeLab.UI.Web.Mvc.Areas.Html5.ViewModels.ServerSentEvent;
    using System.Web.Script.Serialization;
    using CodeLab.UI.Web.Mvc.Core.Mvc.Action;

    public partial class UserController : Controller
    {
        public virtual ActionResult Index()
        {
            return View(new LoggedUsersViewModel().Users);
        }

        public virtual ActionResult StatusChangeEvent()
        {
            var userStream = new UserServerSentStatusResult();
            userStream.ChangeUserStatus = new LoggedUsersViewModel().Users.Where(x => x.HasChanged).ToList();

            userStream.Content = () =>
            {
                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(userStream.ChangeUserStatus);
            };

            userStream.ChangeUserStatus.ForEach(x =>
            {
                x.HasChanged = false;
                x.Time = DateTime.Now.ToShortTimeString();
            });
            return userStream;
        }

    }
}
