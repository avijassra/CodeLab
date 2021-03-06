// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591
#region T4MVC

using System;
using System.Diagnostics;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Mvc.Html;
using System.Web.Routing;
using T4MVC;
namespace CodeLab.UI.Web.Mvc.Areas.Html5.Controllers.ServerSentEvents {
    public partial class AdminController {
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public AdminController() { }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected AdminController(Dummy d) { }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected RedirectToRouteResult RedirectToAction(ActionResult result) {
            var callInfo = result.GetT4MVCResult();
            return RedirectToRoute(callInfo.RouteValueDictionary);
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected RedirectToRouteResult RedirectToActionPermanent(ActionResult result) {
            var callInfo = result.GetT4MVCResult();
            return RedirectToRoutePermanent(callInfo.RouteValueDictionary);
        }

        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.JsonResult UserStatusChange() {
            return new T4MVC_JsonResult(Area, Name, ActionNames.UserStatusChange);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.JsonResult ActionOnAll() {
            return new T4MVC_JsonResult(Area, Name, ActionNames.ActionOnAll);
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public AdminController Actions { get { return MVC.Html5.Admin; } }
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Area = "Html5";
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Name = "Admin";
        [GeneratedCode("T4MVC", "2.0")]
        public const string NameConst = "Admin";

        static readonly ActionNamesClass s_actions = new ActionNamesClass();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionNamesClass ActionNames { get { return s_actions; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNamesClass {
            public readonly string Index = "Index";
            public readonly string UserStatusChange = "UserStatusChange";
            public readonly string ActionOnAll = "ActionOnAll";
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNameConstants {
            public const string Index = "Index";
            public const string UserStatusChange = "UserStatusChange";
            public const string ActionOnAll = "ActionOnAll";
        }


        static readonly ActionParamsClass_UserStatusChange s_params_UserStatusChange = new ActionParamsClass_UserStatusChange();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_UserStatusChange UserStatusChangeParams { get { return s_params_UserStatusChange; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_UserStatusChange {
            public readonly string id = "id";
            public readonly string isOnline = "isOnline";
        }
        static readonly ActionParamsClass_ActionOnAll s_params_ActionOnAll = new ActionParamsClass_ActionOnAll();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_ActionOnAll ActionOnAllParams { get { return s_params_ActionOnAll; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_ActionOnAll {
            public readonly string everyOneOnline = "everyOneOnline";
        }
        static readonly ViewNames s_views = new ViewNames();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ViewNames Views { get { return s_views; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ViewNames {
            public readonly string Index = "~/Areas/Html5/Views/Admin/Index.cshtml";
        }
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public class T4MVC_AdminController: CodeLab.UI.Web.Mvc.Areas.Html5.Controllers.ServerSentEvents.AdminController {
        public T4MVC_AdminController() : base(Dummy.Instance) { }

        public override System.Web.Mvc.ActionResult Index() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.Index);
            return callInfo;
        }

        public override System.Web.Mvc.JsonResult UserStatusChange(System.Guid id, bool isOnline) {
            var callInfo = new T4MVC_JsonResult(Area, Name, ActionNames.UserStatusChange);
            callInfo.RouteValueDictionary.Add("id", id);
            callInfo.RouteValueDictionary.Add("isOnline", isOnline);
            return callInfo;
        }

        public override System.Web.Mvc.JsonResult ActionOnAll(bool everyOneOnline) {
            var callInfo = new T4MVC_JsonResult(Area, Name, ActionNames.ActionOnAll);
            callInfo.RouteValueDictionary.Add("everyOneOnline", everyOneOnline);
            return callInfo;
        }

    }
}

#endregion T4MVC
#pragma warning restore 1591
