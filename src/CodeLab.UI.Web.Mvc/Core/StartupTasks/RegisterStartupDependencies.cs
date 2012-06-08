namespace CodeLab.UI.Web.Mvc.Core.StartupTasks
{
    using Microsoft.Practices.Unity;
    using MvcBase.WebHelper.StartupTasks;
    using CodeLab.UI.Web.Mvc.Core.StartupTasks.Registration;

    public class RegisterStartupDependencies
    {
        /// <summary>
        /// Add IRegisterDependencies to the unity container
        /// </summary>
        /// <returns></returns>
        internal IUnityContainer AddDependencies()
        {
            IUnityContainer unityContainer = new UnityContainer();

            // include components
            unityContainer.RegisterType<IIncludeComponents, RegisterBundlingAndMinificationFiles>(typeof(RegisterBundlingAndMinificationFiles).Name);

            return unityContainer;
        }
    }
}