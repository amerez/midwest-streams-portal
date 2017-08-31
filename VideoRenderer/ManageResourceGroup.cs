using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Azure;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Azure.Management.Compute;
using Microsoft.Azure.Management.Compute.Models;
using Microsoft.Rest;
using System.Threading.Tasks;
using Microsoft.Azure.Management.ResourceManager.Models;
using System.IO;
using Microsoft.Azure.Management.ResourceManager;
using System.Configuration;
using Microsoft.Azure.Management.Storage;
using Microsoft.Azure.Management.Storage.Models;
using VideoManager.Models;
using VideoManager.Models.Data;
using System.Text.RegularExpressions;
using VideoManager;



namespace VideoRenderer
{
    class ManageResourceGroup
    {

        public static void DeleteResourceGroupAsync(string groupName)
        {
            Library.WriteServiceLog("Begining to delete Resource Group.");
            var isAzureVM = ConfigurationManager.AppSettings["IsAzureVM"];
            if (isAzureVM != "false")
            {
                int retries = 0;
                while (true)
                {
                    try
                    {
                        string subscriptionId = "b77561f7-eb44-46d0-af75-fa61114f3255";
                        Library.WriteServiceLog("Getting Token for azure API");
                        var token = GetAccessTokenAsync();
                        if (token != null)
                        {
                            Library.WriteServiceLog("Got token;");
                        }
                        else
                        {
                            Library.WriteServiceLog("Error getting token;");
                        }

                        TokenCredentials credential = new TokenCredentials(token.Result.AccessToken);
                        Library.WriteServiceLog("Succesfully got credential");
                        var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };
                        Library.WriteServiceLog("Succesfully got resource management client");
                        Library.WriteServiceLog("Deleting resource group!");
                        resourceManagementClient.ResourceGroups.Delete(groupName);
                        Library.WriteServiceLog("Successfully deleted resource group! This file shouldn't exist. And you shouldn't be reading this");
                        break;
                    }
                    catch (Exception e)
                    {
                        retries++;
                        Library.WriteServiceLog("Error Deleting Resource Group! Resource Group Name: " + groupName);
                        Library.WriteServiceLog("Error: " + e.Message);
                        Library.WriteServiceLog("Inner Exception: " + e.InnerException);
                        Library.WriteServiceLog("Retry Count: " + retries.ToString());
                        if (retries > 5)
                        {
                            string vmMachineName = System.Environment.MachineName;
                            RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Severe, e, "Error deleting resource group", "ManageResourceGroup", "DeleteResourceGroup", 0, groupName);
                            
                            break;
                        }
                    }

                }
            }
           

            
        }
        //public void AttemptToStopVirtualMachine()
        //{
        //     var isAzureVM = ConfigurationManager.AppSettings["IsAzureVM"];
        //    //If the machine isn't an Azure machine, don't run the code to shut it off
        //     if (isAzureVM != "false")
        //     {
        //         string vmMachineName = System.Environment.MachineName;

        //         Library.WriteErrorLog("Querying VideoQ Table to get resource name, to send to shut down api");
        //         VideoQueue q = db.VideoQueues.Where(x => x.VMName == vmMachineName).FirstOrDefault();
        //         if (q != null)
        //         {
        //             Library.WriteErrorLog("Found a record. Calling shut down method");
        //             Library.WriteErrorLog("VM Name: " + vmMachineName + " Resource Group: " + q.ResourceGroupName);
        //             StopVirtualMachine(q.ResourceGroupName, vmMachineName);
        //         }
        //         else
        //         {
        //             Library.WriteErrorLog("Found no records in VideoQ table. Attempting to autogenerate resource group name");
        //         }

        //         string serviceId = vmMachineName.Replace("vm", "");
        //         serviceId = serviceId.Replace("VM", "");
        //         int servIdInt = 0;
        //         int.TryParse(serviceId, out servIdInt);
        //         Library.WriteErrorLog("Querying Service Table. Predicted Service Id: " + servIdInt);
        //         Service service = db.Services.Where(i => i.Id == servIdInt).FirstOrDefault();
        //         if (service != null)
        //         {
        //             Library.WriteErrorLog("Found a service!");
        //             string userName = service.FuneralHome.UserName;
        //             string resourceGroupName = serviceId + "-" + userName + "-RenderGroup";
        //             resourceGroupName = Regex.Replace(resourceGroupName, "[^A-Za-z0-9-_]", "");
        //             Library.WriteErrorLog("Predicted Resource Group Name: " + resourceGroupName);
        //             StopVirtualMachine(resourceGroupName, vmMachineName);
        //         }
        //         else
        //         {
        //             Library.WriteErrorLog("Found no service with ID: " + serviceId);
        //         }
        //     }
        //}
        public static void StopVirtualMachine(string groupName, string vmName)
        {
            Library.WriteErrorLog("Getting Credentials to shutdown virtual machine");
            string subscriptionId = "b77561f7-eb44-46d0-af75-fa61114f3255";
            var token = GetAccessTokenAsync();
            TokenCredentials credential = new TokenCredentials(token.Result.AccessToken);
            var computeManagementClient = new ComputeManagementClient(credential) { SubscriptionId = subscriptionId };
            Library.WriteErrorLog("Shutting down VM");
            computeManagementClient.VirtualMachines.Deallocate(groupName, vmName);
        }
        private static async Task<AuthenticationResult> GetAccessTokenAsync()
        {

            var cc = new ClientCredential("eeb1eb9c-8416-445b-832c-feec564c9da1", "0bU+o1n3ETH8mlGfAZ7KwpDrKTb2FYIbaUJAwplV0bs=");
            var context = new AuthenticationContext("https://login.windows.net/1f30f5d8-d3b7-4d2c-bcc5-b642e19893e0");
            var token = context.AcquireTokenAsync("https://management.azure.com/", cc).Result;

            if (token == null)
            {
                throw new InvalidOperationException("Could not get the token");
            }
            return token;
        }
    }


}
