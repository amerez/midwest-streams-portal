using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VideoManager.Startup))]
namespace VideoManager
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
