using HtmlAgilityPack;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Code
{
    public class CompetitorWatchHelper
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public static void GenerateCompetiveLineChart(CWFuneralHome ourHome, CWFuneralHome TheirHome, ref CompareViewModel cvm)
        {
            DateTime? SmallestMonth = ourHome.CWObituary.Min(o => o.DeathDate);
            DateTime? competetiorSmallestMonth = TheirHome.CWObituary.Min(o => o.DeathDate);

            if (SmallestMonth != null && competetiorSmallestMonth != null)
            {
                DateTime earliestMonth = new DateTime();
                if (SmallestMonth < competetiorSmallestMonth)
                {
                    earliestMonth = (DateTime)SmallestMonth;
                }
                else
                {
                    earliestMonth = (DateTime)competetiorSmallestMonth;
                }
                int monthsAgo = ((DateTime.Now.Year - earliestMonth.Year) * 12) + DateTime.Now.Month - earliestMonth.Month;
                List<DateTime> monthTimeRange = new List<DateTime>();
                List<int> montServices = new List<int>();
                StringBuilder monthTimeRangeString = new StringBuilder();
                monthTimeRangeString.Append("[");
                DateTime workingMonth = earliestMonth;
                List<int> OurServicesPerMonth = new List<int>();
                List<int> TheirServicesPerMonth = new List<int>();
                for (int i = 0; i < monthsAgo; i++)
                {
                    int ourServiceCount = ourHome.CWObituary.Where(o => o.DeathDate != null && o.DeathDate.Value.Month == workingMonth.Month && o.DeathDate.Value.Year == workingMonth.Year).Count();
                    int theirServiceCount = TheirHome.CWObituary.Where(o => o.DeathDate != null && o.DeathDate.Value.Month == workingMonth.Month && o.DeathDate.Value.Year == workingMonth.Year).Count();
                    monthTimeRange.Add(workingMonth);
                    workingMonth = workingMonth.AddMonths(1);
                    OurServicesPerMonth.Add(ourServiceCount);
                    TheirServicesPerMonth.Add(theirServiceCount);
                }
                string seriesData = "[";
                seriesData = seriesData + WijmoSeriesBuilder.StringfyDateTimeLineChartSeries(ourHome.Name, true, monthTimeRange, OurServicesPerMonth, true, "circle");
                seriesData = seriesData + ", " + WijmoSeriesBuilder.StringfyDateTimeLineChartSeries(TheirHome.Name, true, monthTimeRange, TheirServicesPerMonth, true, "circle");
                seriesData = seriesData + "]";
                //Calculate averages for our Home
                int sum = OurServicesPerMonth.Sum();
                decimal result = (decimal)sum / OurServicesPerMonth.Count();
                cvm.AvgMonthlyCalls = result;
                //Calculate averages for their home
                int sum1 = TheirServicesPerMonth.Sum();
                decimal result1 = (decimal)sum1 / TheirServicesPerMonth.Count();
                cvm.CompetitorMonthlyCalls = result1;
                cvm.CompetiveLineChartMonthly = seriesData;

            }
        }

        public int ScrapeObituaries(CWFuneralHome funeralHome)
        {
            int recordCounter = 0;
            //Funeral Home API, However I found that it only returns 
            var client = new RestClient(funeralHome.Website + "/dynamic/tributes-getcurrent.json");
            // client.Authenticator = new HttpBasicAuthenticator(username, password);

            var request = new RestRequest("resource/{id}", Method.GET);
            request.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };
            // execute the request
            //IRestResponse response = client.Execute(request);
            //var content = response.Content; // raw content as string

            // or automatically deserialize result
            // return content type is sniffed but can be explicitly set via RestClient.AddHandler();
            IRestResponse<FuneralOneResponse> response = client.Execute<FuneralOneResponse>(request);
            if (response.Data != null)
            {
                foreach (var obit in response.Data.tributes)
                {
                    CWObituary obituary = new CWObituary
                    {
                        FirstName = obit.fn,
                        LastName = obit.ln,
                        MiddleName = obit.mn,
                        FullName = obit.dn,
                        CWFuneralHomeId = funeralHome.Id,
                        ObituaryText = obit.obit,
                        ObitURL = funeralHome.Website + "/" + obit.u,
                        PictureURL = obit.tu,
                        Age = 0
                    };

                    DateTime birthday = new DateTime();
                    DateTime Deathday = new DateTime();
                    bool BdayG = false;
                    if (DateTime.TryParse(obit.bd, out birthday))
                    {
                        obituary.BirthDate = birthday;
                        BdayG = true;
                    }
                    else
                    {
                        obituary.BirthDate = null;
                    }
                    if (DateTime.TryParse(obit.dd, out Deathday))
                    {
                        obituary.DeathDate = Deathday;
                        if (BdayG == true)
                        {
                            DateTime zeroTime = new DateTime(1, 1, 1);
                            TimeSpan span = Deathday - birthday;
                            // because we start at year 1 for the Gregorian 
                            // calendar, we must subtract a year here.
                            int yearsOld = (zeroTime + span).Year - 1;
                            obituary.Age = yearsOld;
                        }
                    }
                    else
                    {
                        obituary.DeathDate = null;
                    }
                   bool insertSuccess = insertObitIntoDatabase(obituary);
                    if(insertSuccess)
                    {
                        recordCounter++;
                    }
                }
           
            }
            for (int i = 1; i < 6000; i++)
            {
                CWObituary cwObit = new CWObituary();
                string obitPage = funeralHome.Website + "/obituaries/ObitSearchList/"+i.ToString();
                var aboutWebPage = new HtmlWeb();
                var document = aboutWebPage.Load(obitPage);
                var outOfObits = document.DocumentNode.SelectNodes("//*[contains(@class,'no-matches')]");
                if(outOfObits!=null)
                {
                    if (outOfObits.Count > 0)
                    {
                        break;
                    }
                }
              
                foreach (HtmlNode li in document.DocumentNode.SelectNodes("//li"))
                {
                    if(li.Attributes["class"]!=null)
                    {
                        if(li.Attributes["class"].Value=="pager")
                        {
                            break;
                        }
                    }
                    var h3 = li.Descendants("h3");
                    var imageNode = li.Descendants("img").FirstOrDefault();
                    var aNode = li.Descendants("a").FirstOrDefault();
                    string href ="";
                    string imageSrc = "";
                    if(aNode!=null)
                    {
                        if(aNode.Attributes["href"]!=null)
                        {
                          href  = aNode.Attributes["href"].Value;
                          href = funeralHome.Website + href;
                        }
                    }
                    if(imageNode!=null)
                    {
                        if(imageNode.Attributes["src"]!=null)
                        {
                             imageSrc = imageNode.Attributes["src"].Value;
                        }
                    }
                    
                   
                    
                    string h3Html = h3.FirstOrDefault().InnerHtml;
                    if (h3Html.Contains("<"))
                    {
                        string fullName = h3Html.Substring(0, h3Html.IndexOf("<"));
                        string firstName = "";
                        string middleName = "";
                        string lastName = "";
                        //Whatever should split the string...
                        var words = fullName.Split(' ');

                        //Mind that the indexes are zero-based
                        List<string> names = new List<string>();

                        for (var index = 0; index < words.Length; index++)
                        {
                            var word = (String)words.GetValue(index);
                            if (!names.Contains(word))
                            {
                                names.Add(word);
                            }
                        }
                        firstName = names[0];
                        //If string contains a quote it usually means they inserted a nick name
                        if (names[1].Contains("&quot"))
                        {
                            middleName = names[2];
                        }
                        else
                        {
                            middleName = names[1];
                        }
                        lastName = names[names.Count() - 1];
                        if (lastName == "")
                        {
                            lastName = names[names.Count() - 2];
                        }
                        if (lastName.Contains(','))
                        {
                            lastName = lastName.Replace(",", "");
                        }
                        string deatDate = h3.FirstOrDefault().Descendants("span").FirstOrDefault().InnerText;
                        DateTime dateTimeDeath = DateTime.Parse(deatDate);
                        cwObit.FirstName = firstName;
                        cwObit.MiddleName = middleName;
                        cwObit.LastName = lastName;
                        cwObit.ObitURL = href;
                        cwObit.PictureURL = "http:" + imageSrc;
                        cwObit.DeathDate = dateTimeDeath;
                        cwObit.CWFuneralHomeId = funeralHome.Id;
                        bool succuess = insertObitIntoDatabase(cwObit);
                        if (succuess)
                        {
                            recordCounter++;
                        }
                    }
                }
            }
            
            return recordCounter;
        }
        public bool insertObitIntoDatabase(CWObituary scrappedObit)
        {
           CWObituary previousObit = db.CWObituary.Where(f => scrappedObit.CWFuneralHomeId == scrappedObit.CWFuneralHomeId && f.FirstName == scrappedObit.FirstName && f.LastName == scrappedObit.LastName && f.DeathDate == scrappedObit.DeathDate).FirstOrDefault();
           if(previousObit==null)
           {
               db.CWObituary.Add(scrappedObit);
               db.SaveChanges();
               return true;
           }
           else
           {
               bool newInfoAvailable = false;
               if(scrappedObit.MiddleName != previousObit.MiddleName)
               {
                   newInfoAvailable = true;
                   previousObit.MiddleName = scrappedObit.MiddleName;
               }
               if (scrappedObit.Age != previousObit.Age)
               {
                   newInfoAvailable = true;
                   previousObit.Age = scrappedObit.Age;
               }
               if (scrappedObit.BirthDate != previousObit.BirthDate)
               {
                   newInfoAvailable = true;
                   previousObit.BirthDate = scrappedObit.BirthDate;
               }
               if (scrappedObit.FullName != previousObit.FullName)
               {
                   newInfoAvailable = true;
                   previousObit.FullName = scrappedObit.FullName;
               }
               if (scrappedObit.ObituaryText != previousObit.ObituaryText)
               {
                   newInfoAvailable = true;
                   previousObit.ObituaryText = scrappedObit.ObituaryText;
               }
               if (scrappedObit.ObitURL != previousObit.ObitURL)
               {
                   newInfoAvailable = true;
                   previousObit.ObitURL = scrappedObit.ObitURL;
               }
               if (scrappedObit.PictureURL != previousObit.PictureURL)
               {
                   newInfoAvailable = true;
                   previousObit.PictureURL = scrappedObit.PictureURL;
               }
               if (scrappedObit.ServiceDate != previousObit.ServiceDate)
               {
                   newInfoAvailable = true;
                   previousObit.ServiceDate = scrappedObit.ServiceDate;
               }
               if (scrappedObit.ServiceDay != previousObit.ServiceDay)
               {
                   newInfoAvailable = true;
                   previousObit.ServiceDay = scrappedObit.ServiceDay;
               }
               if(newInfoAvailable)
               {
                   db.Entry(previousObit).State = System.Data.Entity.EntityState.Modified;
                   db.SaveChanges();
                   return true;
               }
               
           }
           return false;
        }
    }
    public class Tribute
    {
        public string ljb { get; set; }
        public string dn { get; set; }
        public string p { get; set; }
        public string fn { get; set; }
        public string mn { get; set; }
        public string ln { get; set; }
        public string sf { get; set; }
        public string u { get; set; }
        public string tu { get; set; }
        public string bd { get; set; }
        public string dd { get; set; }
        public bool sdd { get; set; }
        public string obit { get; set; }
    }

    public class FuneralOneResponse
    {
        public bool l { get; set; }
        public List<Tribute> tributes { get; set; }
    }
}