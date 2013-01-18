using System;
using System.Web.SessionState;
using CodeLab.UI.Web.Mvc.Core.Common.Enums;

namespace CodeLab.UI.Web.Mvc.Core.Extensions
{
    public static class SessionExtension
    {
        public static void SetValue(this HttpSessionState sessionState, SessionKey sessionKey, object val)
        {
            sessionState.Add(sessionKey.ToString(), val);
        }

        public static T GetValue<T>(this HttpSessionState sessionState, SessionKey sessionKey)
        {
            if (sessionState[sessionKey.ToString()] == null)
                return default(T);

            return (T)sessionState[sessionKey.ToString()];
        }

        public static void SetValue(this HttpSessionState sessionState, string name, object val)
        {
            sessionState.Add(name, val);
        }
    }
}