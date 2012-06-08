using CodeLab.UI.Web.Mvc.Core.Common.Enums;

namespace CodeLab.UI.Web.Mvc.Core.Mvc.Extensions
{
    public static class SessionExtension
    {
        public static void SetValue(this System.Web.HttpSessionStateBase sessionState, SessionKey sessionKey, object value)
        {
            sessionState[sessionKey.ToString()] = value;
        }

        public static T GetValue<T>(this System.Web.HttpSessionStateBase sessionState, SessionKey sessionKey)
        {
            return GetValue<T>(sessionState, sessionKey, default(T));
        }

        public static T GetValue<T>(this System.Web.HttpSessionStateBase sessionState, SessionKey sessionKey, T value)
        {
            if (sessionState[sessionKey.ToString()] != null)
                return (T)sessionState[sessionKey.ToString()];
            else
                return value;
        }

        public static void RemoveValue(this System.Web.HttpSessionStateBase sessionState, SessionKey sessionKey)
        {
            sessionState.Remove(sessionKey.ToString());
        }

        public static bool SessionKeyExists(this System.Web.HttpSessionStateBase sessionState, SessionKey sessionKey)
        {
            return (sessionState[sessionKey.ToString()] != null);
        }
    }
}