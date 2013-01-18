namespace MvcBase.WebHelper.StartupTasks
{
    using System.Web.Mvc;
    using Microsoft.Practices.Unity;
    using MvcBase.WebHelper.StartupTasks.ControllerTasks;

    public class RegisterStartupTasks
    {
        public void Execute(IUnityContainer unityContainer)
        {
            // setup components
            var components = unityContainer.ResolveAll<IIncludeComponents>();

            foreach (var component in components)
                component.Setup();

            // register dependencies
            var dependencies = unityContainer.ResolveAll<IRegisterDependency>();

            foreach (var dependency in dependencies)
                dependency.Inject(unityContainer);

            DependencyResolver.SetResolver(new UnityDependencyResolver(unityContainer));
        }
    }
}