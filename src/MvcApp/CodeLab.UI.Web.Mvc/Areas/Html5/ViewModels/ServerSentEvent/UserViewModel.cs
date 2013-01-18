namespace CodeLab.UI.Web.Mvc.Areas.Html5.ViewModels.ServerSentEvent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    [Serializable]
    public class UserViewModel
    {
        public UserViewModel()
        {
        }

        public UserViewModel(string name)
            : this(name, false)
        {
        }

        public UserViewModel(string name, bool isOnline)
        {
            Id = Guid.NewGuid();
            Name = name;
            IsOnline = isOnline;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsOnline { get; set; }

        public bool HasChanged { get; set; }

        public string Time { get; set; }
    }
}