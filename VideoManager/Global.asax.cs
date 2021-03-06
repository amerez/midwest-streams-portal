﻿using System.Configuration;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Stripe;

namespace VideoManager
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            string dev = ConfigurationManager.AppSettings["dev"];
            if(dev!= "true")
            {
                GlobalFilters.Filters.Add(new RequireHttpsAttribute());
            }

            StripeConfiguration.SetApiKey(ConfigurationManager.AppSettings["StripeApiKey"]);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AntiForgeryConfig.SuppressXFrameOptionsHeader = true;

        }
    }
}
