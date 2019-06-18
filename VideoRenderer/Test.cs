using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.ViewModels;

namespace VideoRenderer
{
    public class  Test
    {
        public static void CompleteTest()
        {
            RenderViewModel renderDataa = new RenderViewModel()
            {
                RawFileNames = "helke1.mp4,helke2.mp4",
                ConvertedFileName = "Helke320TestWithNoSlate.mp4",
                Duration = 0,
                Start = 0,
                FirstName = "Shane",
                LastName = "White",
                FoundVideoToRender = true,
                FuneralHomeName = "DevHome",
                ServiceId = 40,
                VideoQueId = 30,
                VideoQueType = VideoQueType.FullNoSlate,
                ServiceDate = DateTime.Now
            };
            RenderVideo render = new RenderVideo(renderDataa);
            render.StartRender(false);
        }
        public static void ConcatTest()
        {
            //This works. Test for three files with different aspect ratios.
            RenderViewModel renderDataa = new RenderViewModel()
            {
                RawFileNames = "7910_helke_uploading_MVI_0159.MP4,7910_helke_uploading_MVI_0160.MP4",
                ConvertedFileName = "helke_no_slate_long.mp4",
                Duration = 40,
                Start = 4236,
                FirstName = "Auggie",
                LastName = "Wolchansky",
                FoundVideoToRender = true,
                FuneralHomeName = "DevHome",
                ServiceId = 16,
                VideoQueId = 30,
                VideoQueType = VideoQueType.FullWithSlate,
                ServiceDate = DateTime.Now
            };
            RenderVideo render = new RenderVideo(renderDataa);
            List<string> vids = new List<string>();
            vids.Add("helke1.mp4");
            vids.Add("helke2.mp4");
            render.CreateSlideShow("Shane", "White", DateTime.Now, "Your Funeral Home Name", "slate.mp4");
            //render.ConcatenateVideoFiles(vids, true);
            //render.CreateSlideShow("Shane", "White", DateTime.Now, "Mollys Funeral Home", "slideshow.mp4");
            render.MergeSlateToService("slate.mp4", "hi.mp4", "output.mp4");
            // render.StartRender(false);

        }

        public static void Download()
        {
            string videoFiles = "7589_OurSavior_uploading_201809160802_48.mp4,7589_OurSavior_uploading_201809160802_48_1.mp4,7589_OurSavior_uploading_201809160802_48_2.mp4,7589_OurSavior_uploading_201809160802_48_3.mp4";
            RenderViewModel renderDataa = new RenderViewModel()
            {
                RawFileNames = videoFiles,
                ConvertedFileName = "saviortest.mp4",
                Duration = 3768,
                Start = 0,
                FirstName = "Auggie",
                LastName = "Wolchansky",
                FoundVideoToRender = true,
                FuneralHomeName = "DevHome",
                ServiceId = 16,
                VideoQueId = 19,
                VideoQueType = VideoQueType.FullNoSlate
            };
            RenderVideo renderer = new RenderVideo(renderDataa);
            string[] _videoFiles = videoFiles.Split(',');
            renderer.ConcatenateVideoFiles(_videoFiles.ToList(), true);

        }
        public static void TrimTest()
        {
            RenderViewModel renderDataa = new RenderViewModel()
            {
                RawFileNames = "sintel.mp4",
                ConvertedFileName = "jan2nd_full_slate.mp4",
                Duration = 345,
                Start = 20,
                FirstName = "Auggie",
                LastName = "Wolchansky",
                FoundVideoToRender = true,
                FuneralHomeName = "DevHome",
                ServiceId = 16,
                VideoQueId = 30,
                VideoQueType = VideoQueType.FullWithSlate,
                ServiceDate = DateTime.Now
            };
            RenderVideo render = new RenderVideo(renderDataa);
            render.TrimVideo("sintel_concat.mp4");
        }
  
    }
}
