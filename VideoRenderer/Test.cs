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
        public static void ConcatTest()
        {
            //This works. Test for three files with different aspect ratios.
            RenderViewModel renderDataa = new RenderViewModel()
            {
                RawFileNames = "sintel.mp4",
                ConvertedFileName = "resize_sintel_opener.mp4",
                Duration = 0,
                Start = 0,
                FirstName = "Auggie",
                LastName = "Wolchansky",
                FoundVideoToRender = true,
                FuneralHomeName = "DevHome",
                ServiceId = 16,
                VideoQueId = 19,
                VideoQueType = VideoQueType.FullWithSlate
            };
            RenderVideo render = new RenderVideo(renderDataa);
            List<string> vids = new List<string>();
            vids.Add("sintel.mp4");
            vids.Add("fish.mp4");
            render.ConcatenateVideoFiles(vids, true);
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
  
    }
}
