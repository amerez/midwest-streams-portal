using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Xero.Api.Core;
using Xero.Api.Example.Applications.Private;
using Xero.Api.Infrastructure.OAuth;
using Xero.Api.Serialization;

namespace VideoManager.Code
{
    public class Accounting
    {
        public static decimal GetDollarsOwed(string EmailAddress)
        {
                PrivateAuthenticator pa = new PrivateAuthenticator(certPath, "go");
                var private_app_api = new XeroCoreApi("https://api.xero.com/api.xro/2.0/", pa,
                    new Consumer("EJDPQ3KHW8O2QKQJM7UYXMACD2POTD", "HHEERGR1927D8LPWCUQJSZFDJMTX1X"), null,
                    new DefaultMapper(), new DefaultMapper());

                var org = private_app_api.Organisation;

                var home = private_app_api.Contacts.Where("EmailAddress = \""+EmailAddress+"\"").Find();
            if(home.Count()==0)
            {
                return -1;
            }
                string funeralHomeName = home.First().Name;
                var invoices = private_app_api.Invoices.Where("Contact.Name == \"" + funeralHomeName + "\"").Find();
               
            decimal dollarsOwed = 0;
            foreach(var invoice in invoices)
                {
                    if (invoice.AmountDue != null)
                    {
                        dollarsOwed = dollarsOwed + (Decimal)invoice.AmountDue;
                    }
                }
                return dollarsOwed;

            }
            catch
            {
                return 0;
            }

        }

    }
}