namespace CodeLab.UI.Web.Mvc.Core.Mvc.Action
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using CodeLab.UI.Web.Mvc.Areas.Html5.ViewModels.ServerSentEvent;

    public class UserServerSentStatusResult : ActionResult
    {
        public UserServerSentStatusResult()
        {
        }

        public delegate string UpdateContent();

        public UpdateContent Content { get; set; }

        public List<UserViewModel> ChangeUserStatus { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            if (this.Content != null)
            {
                HttpResponseBase response = context.HttpContext.Response;
                // this is the content type required by chrome 6 for server sent events
                response.ContentType = "text/event-stream";
                response.BufferOutput = false;
                // this is important because chrome fails with a "failed to load resource" error if the server attempts to put the char set after the content type
                response.Charset = null;

                if (ChangeUserStatus == null || ChangeUserStatus.Count == 0)
                {
                    response.Write("");
                    return;
                }

                string[] newStrings = context.HttpContext.Request.Headers.GetValues("Last-Event-ID");
                string value = this.Content();

                response.Write(string.Format("data:{0}\n", value));
            }
        }
    }
}