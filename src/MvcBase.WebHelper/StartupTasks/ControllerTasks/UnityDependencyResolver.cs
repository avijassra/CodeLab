namespace MvcBase.WebHelper.StartupTasks.ControllerTasks
{
    using System;
    using System.Web;
    using System.Collections.Generic;
    using Microsoft.Practices.Unity;
    using System.Web.Mvc;

    public class UnityDependencyResolver : IDependencyResolver
    {
        private IUnityContainer _container;

        public UnityDependencyResolver(IUnityContainer container)
        {
            _container = container;
        }

        public object GetService(Type serviceType)
        {
            if ((serviceType.IsClass && !serviceType.IsAbstract) || _container.IsRegistered(serviceType))
                return _container.Resolve(serviceType);
            return null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            if ((serviceType.IsClass && !serviceType.IsAbstract) || _container.IsRegistered(serviceType))
                return _container.ResolveAll(serviceType);

            return new object[] { };
        }
    }
}
