using System.Web;
using System.Web.Optimization;

namespace VideoManager
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js",
                        "~/Scripts/Site.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap335.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/upload").Include(
                        "~/Scripts/jquery.fileupload.js",
                        "~/Scripts/jquery.fileupload-image.js",
                        "~/Scripts/jquery.fileupload-audio.js",
                        "~/Scripts/jquery.fileupload-video.js",
                        "~/Scripts/jquery.fileupload-validate.js",
                        "~/Scripts/jquery.fileupload-process.js",
                        "~/Scripts/jquery.fileupload-ui.js",
                        "~/Scripts/jquery.iframe-transport.js",
                        "~/Scripts/main.js"
                        ));
			bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
					  "~/Scripts/jquery.dataTables.js",
					  "~/Scripts/backstretch.js",
                      "~/Scripts/jquery.tooltipster.js"
					  ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/jQueryUI/theme/jquery-ui.css",
                      "~/Content/site.css",
					  "~/Content/jquery.fileupload.css"));
        }
    }
}
