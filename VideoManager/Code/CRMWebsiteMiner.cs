using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Code
{
    public class CRMWebsiteMiner
    {
        public static string GetDescription(CRMContact crmContact)
        {
            if(crmContact.CRMFuneralHome.WebsiteProvider== Models.Data.Enums.WebsiteProvider.FuneralNet)
            {
                string aboutPage = crmContact.CRMFuneralHome.Website + "/_mgxroot/page_10721.php";
                var pedersenPage = new HtmlWeb();
                var document = pedersenPage.Load(aboutPage);
                string searchText = "//h3[contains(text(), '"+crmContact.FirstName+" "+crmContact.LastName+"')]";
                var funeralHomeNode = document.DocumentNode.SelectNodes(searchText);
                if(funeralHomeNode!=null)
                {
                    string descrip = "";
                    foreach (var node in funeralHomeNode)
                    {
                        try
                        {
                            descrip = node.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                            if (node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.Name == "p")
                            {
                                if (node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText.Length > 10)
                                {
                                    descrip = descrip + "<br/>" + node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                                }
                                if (node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.Name == "p")
                                {
                                    if (node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText.Length > 10)
                                    {
                                        descrip = descrip + "<br/>" + node.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                                    }
                                }
                            }

                        }
                        catch
                        {

                        }

                    }
                    if (descrip.Length > 10 && descrip.Length < 2000)
                    {
                        if (descrip.Contains("&nbsp;"))
                        {
                            int nbspLoc = descrip.IndexOf("&nbsp;");
                            descrip = descrip.Remove(nbspLoc, 6);
                        }
                        return descrip;
                    }

                }
             
            }
            if (crmContact.CRMFuneralHome.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralOne)
            {
                string aboutPage = crmContact.CRMFuneralHome.Website + "/who-we-are/our-valued-staff";
                var aboutWebPage = new HtmlWeb();
                var document = aboutWebPage.Load(aboutPage); ;
                var h4Nodes = document.DocumentNode.Descendants("h4").ToList();
                if (h4Nodes != null)
                {
                    string descrip = "";
                    foreach (var node in h4Nodes)
                    {
                        if(node.InnerText.Contains(crmContact.FirstName) && node.InnerText.Contains(crmContact.LastName))
                        {
                            descrip = node.NextSibling.NextSibling.InnerText;
                            if (descrip.Length > 10 && descrip.Length < 1800)
                            {
                                return descrip;
                            }
                        }
                    }
                    return "";
                }
            }
            if(crmContact.CRMFuneralHome.WebsiteProvider== Models.Data.Enums.WebsiteProvider.Batesville)
            {
                string homePage = crmContact.CRMFuneralHome.Website;
                var homeWeb = new HtmlWeb();
                var document = homeWeb.Load(homePage);

                var h4Nodes = document.DocumentNode.Descendants("h4").ToList();
            }
            return "";
        }
        public static string GetProfileImage(CRMContact crmContact)
        {
            if (crmContact.CRMFuneralHome.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralNet)
            {
                string aboutPage = crmContact.CRMFuneralHome.Website + "/_mgxroot/page_10721.php";
                var pedersenPage = new HtmlWeb();
                var document = pedersenPage.Load(aboutPage);
                string searchText = "//h3[contains(text(), '" + crmContact.FirstName + " " + crmContact.LastName + "')]";
                var funeralHomeNode = document.DocumentNode.SelectNodes(searchText);
                if (funeralHomeNode != null)
                {
                    string imagePath = "";
                    foreach (var node in funeralHomeNode)
                    {
                        if(node.NextSibling.NextSibling.Name=="h4")
                        {
                            try
                            {
                                imagePath = node.NextSibling.NextSibling.ChildNodes.Where(n => n.Name == "img").FirstOrDefault().Attributes.Where(a => a.Name == "src").FirstOrDefault().Value;
                                imagePath = crmContact.CRMFuneralHome.Website + "/_mgxroot/" + imagePath;
                                return imagePath;
                            }
                            catch
                            {

                            }
                         
                        }
                        else
                        {
                            if(node.NextSibling.NextSibling.Name=="p")
                            {
                                try
                                {
                                    if (node.NextSibling.NextSibling.ChildNodes.Where(n => n.Name == "font").FirstOrDefault() != null)
                                    {
                                        var shouldBeFontNode = node.NextSibling.NextSibling.ChildNodes.Where(n => n.Name == "font").FirstOrDefault();
                                        if (shouldBeFontNode != null)
                                        {
                                            var shouldBeStrongNode = shouldBeFontNode.ChildNodes.Where(n => n.Name == "strong").FirstOrDefault();
                                            if (shouldBeStrongNode != null)
                                            {
                                                imagePath = shouldBeStrongNode.ChildNodes.Where(c => c.Name == "img").FirstOrDefault().Attributes.Where(a => a.Name == "src").FirstOrDefault().Value;
                                                if (imagePath.Length > 10 && imagePath.Length < 2000)
                                                {
                                                    imagePath = crmContact.CRMFuneralHome.Website + "/_mgxroot/" + imagePath;
                                                    return imagePath;
                                                }
                                            }
                                        }
                                    }
                                }
                                catch
                                {

                                }
                                try
                                {
                                    if (node.NextSibling.NextSibling.ChildNodes.Where(n => n.Name == "img").FirstOrDefault() != null)
                                    {
                                        imagePath = node.NextSibling.NextSibling.ChildNodes.Where(n => n.Name == "img").FirstOrDefault().Attributes.Where(a => a.Name == "src").FirstOrDefault().Value;
                                        if (imagePath.Length > 10 && imagePath.Length < 2000)
                                        {
                                            imagePath = crmContact.CRMFuneralHome.Website + "/_mgxroot/" + imagePath;
                                            return imagePath;
                                        }
                                    }
                                }
                                catch
                                {

                                }

                            }
                        }
                    }
                  

                }

            }
            if (crmContact.CRMFuneralHome.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralOne)
            {
                string aboutPage = crmContact.CRMFuneralHome.Website + "/who-we-are/our-valued-staff";
                var aboutWebPage = new HtmlWeb();
                var document = aboutWebPage.Load(aboutPage);
                var images = document.DocumentNode.Descendants("img").Where(s => s.Attributes.Where(a=>a.Name=="src").FirstOrDefault()!=null);

                if (images != null)
                {
                    foreach(var image in images)
                    {
                        try
                        {
                            var altTextAttribute = image.Attributes.Where(n => n.Name == "alt").FirstOrDefault();
                            if (altTextAttribute != null)
                            {
                                string altText = altTextAttribute.Value;
                                if (altText.Contains(crmContact.FirstName) && altText.Contains(crmContact.LastName))
                                {
                                    var imagePath = image.Attributes.Where(s => s.Name == "src").FirstOrDefault().Value;
                                    return "http://" + imagePath;
                                }
                            }
                        }
                        catch
                        {

                        }
                    
                    }                 
                }
            }
            return "";

        }

        public static List<CRMContact>GetFuneralHomeContacts(CRMFuneralHome crmFuneralHome)
        {
            if (crmFuneralHome.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralNet)
            {
                List<CRMContact> contacts = new List<CRMContact>();
                string aboutPage = crmFuneralHome.Website + "/_mgxroot/page_10721.php";
                var pedersenPage = new HtmlWeb();
                var document = pedersenPage.Load(aboutPage);
                var funeralHomeNodes = document.DocumentNode.Descendants("h3");
                if(funeralHomeNodes!=null)
                {
                  
                    foreach (var node in funeralHomeNodes)
                    {
                        try
                        {
                            CRMContact contact = new CRMContact();
                            contact.CRMFuneralHomeId = crmFuneralHome.Id;
                            contact.CRMFuneralHome = crmFuneralHome;
                            string fullName = node.InnerText;
                            fullName = fullName.Replace("&nbsp;", "");
                            string firstName = fullName.Substring(0, fullName.IndexOf(' '));
                            string lastName = fullName.Substring(fullName.IndexOf(' '));
                            firstName = firstName.Trim();
                            lastName = lastName.Trim();
                            contact.FirstName = firstName;
                            contact.LastName = lastName;

                            if (node.NextSibling.NextSibling.Name == "p" || node.NextSibling.NextSibling.Name == "h4")
                            {
                                string websitePosition = node.NextSibling.NextSibling.InnerText;
                                contact.ContactPosition = Models.Data.Enums.ContactPosition.FuneralAttendant;
                                if (websitePosition.Contains("Director") || websitePosition.Contains("Directors"))
                                {
                                    contact.ContactPosition = Models.Data.Enums.ContactPosition.FuneralDirector;
                                }
                                if (websitePosition.Contains("Office"))
                                {
                                    contact.ContactPosition = Models.Data.Enums.ContactPosition.Admin;
                                }
                                if (websitePosition.Contains("Intern"))
                                {
                                    contact.ContactPosition = Models.Data.Enums.ContactPosition.Intern;
                                }
                            }
                            contact.ScreenScrappedImage = GetProfileImage(contact);
                            contact.ScreenScrappedBio = GetDescription(contact);
                            contacts.Add(contact);
                        }
                        catch
                        {

                        }
                        
                    
                    }

                    return contacts;
                }
             
            }

            return null;
        }
    }
}