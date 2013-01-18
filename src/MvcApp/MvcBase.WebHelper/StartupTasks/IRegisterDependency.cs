namespace MvcBase.WebHelper.StartupTasks
{
    using Microsoft.Practices.Unity;

    public interface IRegisterDependency
    {
        void Inject(IUnityContainer unityContainer);
    }
}
