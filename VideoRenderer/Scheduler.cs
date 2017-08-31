using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Configuration;
using System.IO;
using VideoManager;
using VideoManager.Models.Data;
using System.Xml;
using System.Xml.Linq;
using VideoManager.Models.ViewModels;

namespace VideoRenderer
{
    public partial class Scheduler : ServiceBase
    {
        public Timer timer1 = null;
        public int ticks = 0;
        public int errors = 0;
        private string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
        public bool isRendering = false;
        public Scheduler()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer1 = new Timer();
            //Don't make this much shorter
            this.timer1.Interval = 30000; //Every 30 seconds
            this.timer1.Elapsed += new System.Timers.ElapsedEventHandler(this.timer1_Tick);
            timer1.Enabled = true;
            setVariablesForStart();
             string versionNum = ConfigurationManager.AppSettings["versionNumber"];
            Library.WriteServiceLog("Service has started! Version #"+versionNum);
        }



        protected override void OnStop()
        {
            setVariablesForStart();
            Library.WriteServiceLog("Service has ended");
        }
        private void timer1_Tick(object sender, ElapsedEventArgs e)
        {
            Library.WriteServiceLog("Timer Tick and is rendering == "+GlobalVariables.IsRendering.ToString());
            var isAzureVM = ConfigurationManager.AppSettings["IsAzureVM"];
            if(isAzureVM!="false")
            {
                //Each tick represents 30 seconds
                //Dont keep track of ticks on Machine that is always running
                ticks++;
            }
            string vmMachineName = Environment.MachineName;
            DataAccess da = new DataAccess();


            if(GlobalVariables.IsRendering == false)
            {
                GlobalVariables.IsRendering = true;
                RenderViewModel renderData = da.GetRenderData(vmMachineName);

                //Test Data
                //RenderViewModel renderData = new RenderViewModel()
                //{
                //    RawFileNames = "5543_devHome_uploading_1046_devhome_bigbuck.mp4",
                //    ConvertedFileName = "patton_converted.mp4",
                //    Duration = 1756,
                //    Start = 28,
                //    FirstName = "Auggie",
                //    LastName = "Wolchansky",
                //    FoundVideoToRender = true,
                //    FuneralHomeName = "DevHome",
                //    ServiceId = 5751,
                //    VideoQueId = 4567
                //};
             
                if (renderData!=null && renderData.FoundVideoToRender == true)
                {
                    Library.WriteServiceLog("Succefully got Render data.");
                    RenderVideo render = new RenderVideo(renderData);
                    render.StartRender();
                }
                else
                {
                    GlobalVariables.IsRendering = false;
                }
                
            }


        
            if (GlobalVariables.IsRendering == false && isAzureVM != "false")
            {

                //If the machine has been running for 20 minutes and isn't rendering something probably isn't right
                if (ticks == 40)
                {
                    Library.WriteServiceLog("Machine has been running for 40 ticks. Sending an email to Shane");
                    da.SendErrorEmail("Render Machine: " + vmMachineName + " has been running for 20 minutes and has not begun to process the video. ");
                }
                if (ticks > 65)
                {
                    Library.WriteServiceLog("Machine has been running for " + ticks + " without starting render process");

                    //Only send an email every 13 times so we don't blow through our email alloment if this runs for a while.
                    if (ticks % 13 == 0)
                    {
                        da.SendErrorEmail("Render Machine: " + vmMachineName + " has been running for longer than 30 minutes and has not begun to process the video. Attempting to Shut Down machine");
                    }
                    Library.WriteServiceLog("Attempting to shut down machine");
                    string rg = da.GetResourceGroupName(vmMachineName);
                    ManageResourceGroup.StopVirtualMachine(rg, vmMachineName);


                }
            }

            //The machine should never be alive this long
            if (ticks == 960)
            {
                Library.WriteServiceLog("Machine has been running for 960 ticks. Sending an email to Shane");
                da.SendErrorEmail("Render Machine: " + vmMachineName + " has been running for over 8 hours ");
            }
            if (ticks > 1000)
            {
                Library.WriteServiceLog("Machine has been running for " + ticks);

                //Only send an email every 25 times so we don't blow through our email alloment if this runs for a while.
                if (ticks % 50 == 0)
                {
                    da.SendErrorEmail("Render Machine: " + vmMachineName + " has been running for longer than 8 hours. Attempting to Shut Down machine");
                }
                Library.WriteServiceLog("Attempting to shut down machine");
                string rg = da.GetResourceGroupName(vmMachineName);
                ManageResourceGroup.StopVirtualMachine(rg, vmMachineName);
            }


        }
        private void setVariablesForStart()
        {
            GlobalVariables.ErrorCount = 0;
            GlobalVariables.IsRendering = false;

            ConfigurationManager.RefreshSection("appSettings");

            if (File.Exists(BatchFilePath + "Converting.SEM"))
            {
                File.Delete(BatchFilePath + "Converting.SEM");
            }
        }
    }
    /// <summary>
    /// Contains global variables for project.
    /// </summary>
    public static class GlobalVariables
    {

        /// <summary>
        /// Static value protected by access routine.
        /// </summary>
        static int _ErrorCount;
        static bool _IsRendering;

        /// <summary>
        /// Access routine for global variable.
        /// </summary>
        public static int ErrorCount
        {
            get
            {
                return _ErrorCount;
            }
            set
            {
                _ErrorCount = value;
            }
        }
        public static bool IsRendering
        {
            get
            {
                return _IsRendering;
            }
            set
            {
                _IsRendering = value;
            }
        }
    }
}
