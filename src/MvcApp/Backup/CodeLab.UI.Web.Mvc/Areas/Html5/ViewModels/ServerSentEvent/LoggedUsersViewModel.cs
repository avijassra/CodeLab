namespace CodeLab.UI.Web.Mvc.Areas.Html5.ViewModels.ServerSentEvent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class LoggedUsersViewModel
    {
        private Object thisLock = new Object();
        private static List<UserViewModel> _users;

        public List<UserViewModel> Users
        {
            get
            {
                lock (thisLock)
                {
                    if (_users != null)
                        return _users;

                    _users = new List<UserViewModel>()
                    {
                        new UserViewModel("Aayan"),
                        new UserViewModel("Ansh"),
                        new UserViewModel("Chandu"),
                        new UserViewModel("Monu", true),
                        new UserViewModel("Avi", true),
                        new UserViewModel("Sonu"),
                        new UserViewModel("RD", true),
                        new UserViewModel("Ash", true),
                        new UserViewModel("Mummy-Papa S"),
                        new UserViewModel("Mummy-Papa J"),
                    };

                    return _users;
                }
            }
        }
    }
}