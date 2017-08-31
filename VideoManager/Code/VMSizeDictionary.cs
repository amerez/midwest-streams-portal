using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Code
{
    public class VMSizeDictionary
    {
        public static Dictionary<string, string> GetAzureVMSize()
        {
            Dictionary<string, string> vms = new Dictionary<string, string>();

            vms.Add("D4 V2 Standard $.63", "Standard_D4_v2");
            vms.Add("D1", "Standard_D1");
            vms.Add("D1 V2", "Standard_D1_v2");
            vms.Add("D11", "Standard_D11");
            vms.Add("D11 V2", "Standard_D11_v2");
            vms.Add("D12", "Standard_D12");
            vms.Add("D12 V2", "Standard_D12_v2");
            vms.Add("D13", "Standard_D13");
            vms.Add("D13 V2", "Standard_D13_v2");
            vms.Add("D14", "Standard_D14");
            vms.Add("D15", "Standard_D14_v2");
            vms.Add("D15 V2", "Standard_D15_v2");
            vms.Add("D2", "Standard_D2");
            vms.Add("D2 V2", "Standard_D2_v2");
            vms.Add("D3", "Standard_D3");
            vms.Add("D3 V2", "Standard_D3_v2");
            vms.Add("D4", "Standard_D4");
            vms.Add("D5 V2", "Standard_D5_v2");
            vms.Add("DS1", "Standard_DS1");
            vms.Add("DS1 V2", "Standard_DS1_v2");
            vms.Add("DS11", "Standard_DS11");
            vms.Add("DS11 V2", "Standard_DS11_v2");
            vms.Add("DS12", "Standard_DS12");
            vms.Add("DS12 V2", "Standard_DS12_v2");
            vms.Add("DS13", "Standard_DS13");
            vms.Add("DS13 V2", "Standard_DS13_v2");
            vms.Add("DS14", "Standard_DS14");
            vms.Add("DS14 V2", "Standard_DS14_v2");
            vms.Add("DS15 V2", "Standard_DS15_v2");
            vms.Add("DS2", "Standard_DS2");
            vms.Add("DS2 V2", "Standard_DS2_v2");
            vms.Add("DS3", "Standard_DS3");
            vms.Add("DS3 V2", "Standard_DS3_v2");
            vms.Add("DS4", "Standard_DS4");
            vms.Add("DS4 V2", "Standard_DS4_v2");
            vms.Add("DS5 V2", "Standard_DS5_v2");
            vms.Add("F1", "Standard_F1");
            vms.Add("F16", "Standard_F16");
            vms.Add("F16S", "Standard_F16s");
            vms.Add("F1S", "Standard_F1s");
            vms.Add("F2", "Standard_F2");
            vms.Add("F2S", "Standard_F2s");
            vms.Add("F4", "Standard_F4");
            vms.Add("F4S", "Standard_F4s");
            vms.Add("F8", "Standard_F8");
            vms.Add("FS", "Standard_F8s");

            return vms;
        }
    }
}