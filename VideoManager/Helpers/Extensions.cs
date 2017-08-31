using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace VideoManager
{
	public static class Extensions
	{
		public static TModel Automap<TModel>(this TModel sinc, TModel source, params Expression<Func<TModel, object>>[] propertyLambda)
		{
			Type type = typeof(TModel);
			if (source != null)
			{
				foreach (var prop in propertyLambda)
				{
					MemberExpression member = prop.Body as MemberExpression;
					if (member == null)
					{
						var temp = prop.Body as UnaryExpression;
						if (temp != null)
							member = temp.Operand as MemberExpression;
					}
					if (member != null)
					{
						PropertyInfo propInfo = member.Member as PropertyInfo;
						if (propInfo != null && type == propInfo.ReflectedType)
						{
							propInfo.SetValue(sinc, prop.Compile()(source));
						}
					}
				}
			}
			return sinc;
		}

			public static string RenderView(this Controller controller, string viewName, object model)
			{
				return RenderView(controller, viewName, new ViewDataDictionary(model));
			}

			public static string RenderView(this Controller controller, string viewName, ViewDataDictionary viewData)
			{
				var controllerContext = controller.ControllerContext;

				var viewResult = ViewEngines.Engines.FindView(controllerContext, viewName, null);

				StringWriter stringWriter;

				using (stringWriter = new StringWriter())
				{
					var viewContext = new ViewContext(
						controllerContext,
						viewResult.View,
						viewData,
						controllerContext.Controller.TempData,
						stringWriter);

					viewResult.View.Render(viewContext, stringWriter);
					viewResult.ViewEngine.ReleaseView(controllerContext, viewResult.View);
				}
				return stringWriter.ToString();
			}

		
	}

}