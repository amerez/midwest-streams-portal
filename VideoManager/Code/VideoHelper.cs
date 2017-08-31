using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoManager.Controllers;
using VideoManager.Models;

namespace VideoManager.Code
{
    public class VideoHelper
    {

        public void UploadVideo()
        {
            VimeoAPI.Objects.Authentication auth = new VimeoAPI.Objects.Authentication("13e7751f29653709d3db32cb64c3214a21669ebe", "7abeffc1e9fd36473121a9b8212e4a865f5cf92d", "be38b3fc36214bddfd5d54cb7f09297b");
            VimeoAPI.Methods vimeo = new VimeoAPI.Methods(auth);

        }

    }
    //public sealed class AuthorizedSession : ActionFilterAttribute
    //{
    //    public UserTypes _UserTypes { get; set; }
    //    public override void OnActionExecuting(ActionExecutingContext filterContext)
    //    {
    //        var controller = (BaseController)filterContext.Controller;
    //        var session = filterContext.RequestContext.HttpContext.Session;
    //        int userId = -1;
    //        int.TryParse((string)session["UserId"],out userId);
    //        if (session["UserId"] == null || userId < 0)
    //        {
    //            controller.Response.RedirectToRoute(new { controller = "account", action = "login" });
    //            return;
    //        }

    //        return;
    //    }
    //}
}

