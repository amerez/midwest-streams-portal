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
using Microsoft.Azure.Management.Network;
using Microsoft.Azure.Management.Network.Models;
using VideoManager.Models.Data;
using VideoManager.ARMTemplates;
using System.Net;
using System.Text.RegularExpressions;


namespace VideoManager.Code
{
    public class VMmanager
    {



        public async Task<bool>CreateAndDeployRenderVM(Service service, string resourceGroupName, string VMName)
        {
            string PrefixName = service.Id + "-" + service.FuneralHome.Name;

            PrefixName = Regex.Replace(PrefixName, "[^A-Za-z0-9_]", "");
            resourceGroupName = Regex.Replace(resourceGroupName, "[^A-Za-z0-9-_]", "");

            var groupName = resourceGroupName;
            var subscriptionId = "b77561f7-eb44-46d0-af75-fa61114f3255";
            var location = "centralus";
            var storageName = PrefixName+"-vhd-storage";
            var ipName = PrefixName+"-Ip";
            var subnetName = PrefixName + "-Subnet";
            var vnetName = PrefixName + "-VirtualNetwork";
            var nicName = PrefixName + "-NIC";
            var avSetName = PrefixName + "-AvailibilitySet";
            var vmName = VMName;
            var adminName = "MWS";
            var adminPassword = "Models4Wive$";
            var vmSize = service.FuneralHome.Setting.AzureVMSize;


            var token = GetAccessTokenAsync();
            var credential = new TokenCredentials(token.Result.AccessToken);
            //Resource Group
            //var rgResult = CreateResourceGroupAsync(credential, groupName, subscriptionId, location);
            string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
            var sr = new StreamWriter(BatchFilePath + "azureDeploy.txt");
            sr.WriteLine("Azure Template Debug Log. Service: " + service.Id);
            sr.WriteLine("Creating Resource Group.");
            sr.WriteLine("Resource Group Name: "+groupName);
            var rgResult = CreateResourceGroup(credential, groupName, subscriptionId, location);
         
            sr.WriteLine("Deployed Resource Group");
            sr.Close();
            CreateTemplateDeployment(credential, groupName, vmName, subscriptionId,storageName, vmSize);
            
            return false;
            
        }

        public bool CreateRenderVMTemplate(string vmName, string resourceGroupName)
        {


            var groupName = resourceGroupName;
            var subscriptionId = "b77561f7-eb44-46d0-af75-fa61114f3255";
            var location = "centralus";
            var storageName = vmName + "-vhd-storage";
            var adminName = "MWS";
            var adminPassword = "Models4Wive$";
            var vmSize = "Standard_D2";


            var token = GetAccessTokenAsync();

            //Start Shane Debug
            var myResult = token.Result;
            var myToke = token.Result.AccessToken;


            //End shane debug  
            var credential = new TokenCredentials(token.Result.AccessToken);

            var myg = CreateResourceGroupDebug(credential, groupName, subscriptionId, location);

            var rgResult = CreateResourceGroup(credential, groupName, subscriptionId, location);

            CreateTemplateDeployment(credential, groupName, vmName, subscriptionId, storageName, vmSize);
           
            return false;
        }

        public bool DeployVM()
        {
            var groupName = "Testb";
            var subscriptionId = "b77561f7-eb44-46d0-af75-fa61114f3255";
            var location = "centralus";
            var storageName = "teststorageaaaaaaaaaaa";
            var ipName = "TestIpName";
            var subnetName = "testSubnetname";
            var vnetName = "testVirtualNetworkName";
            var nicName = "NetworkInterfaceName";
            var avSetName = "TestAvailabilitySetNamme";
            var vmName = "cSharpVMb";
            var adminName = "MWS";
            var adminPassword = "Models4Wive$";

            var token = GetAccessTokenAsync();
            var credential = new TokenCredentials(token.Result.AccessToken);
            //StreamWriter sConsole = new StreamWriter(ConfigurationManager.AppSettings["logFilePath"] + "vmDeploy.log");
            //// sConsole.WriteLine("start");

            ////Resource Group
            ////var rgResult = CreateResourceGroupAsync(credential, groupName, subscriptionId, location);
            //var rgResult = CreateResourceGroup(credential, groupName, subscriptionId, location);
            //// sConsole.WriteLine(rgResult.Result.Properties.ProvisioningState);
            //// sConsole.Close();

            ////sConsole.WriteLine(rgResult.Result.Properties.ProvisioningState);

            //////Storage Account
            //var stResult = CreateStorageAccount(credential, groupName, subscriptionId, location, storageName);
            ////sConsole.WriteLine(stResult.Result.ProvisioningState);

            //////Ip Address
            ////var ipResult = CreatePublicIPAddressAsync(credential, groupName, subscriptionId, location, ipName);
            //var ipResult = CreatePublicIPAddress(credential, groupName, subscriptionId, location, ipName);
            ////sConsole.WriteLine(ipResult.Result.ProvisioningState);

            //////Virtual Network
            ////var vnResult = CreateVirtualNetworkAsync(credential, groupName, subscriptionId, location, vnetName, subnetName);
            //var vnResult = CreateVirtualNetwork(credential, groupName, subscriptionId, location, vnetName, subnetName);
            ////sConsole.WriteLine(vnResult.Result.ProvisioningState);

            ////Network Interface
            //var ncResult = CreateNetworkInterface(credential, groupName, subscriptionId, location, subnetName, vnetName, ipName, nicName);
            //////Availability Set
            ////var avResult = CreateAvailabilitySetAsync(credential, groupName, subscriptionId, location, avSetName);
            //var avResult = CreateAvailabilitySet(credential, groupName, subscriptionId, location, avSetName);

            //////Deploy VM
            //var vmResult = CreateVirtualMachine(credential, groupName, subscriptionId, location, nicName, avSetName, storageName, adminName, adminPassword, vmName);
            ////sConsole.WriteLine(vmResult.Result.ProvisioningState);

            var computeClient = new Microsoft.Azure.Management.Compute.ComputeManagementClient(credential) { SubscriptionId = subscriptionId };
            var ObjVirtualMachines = computeClient.VirtualMachines.Get(groupName, vmName);


            ObjVirtualMachines.StorageProfile.DataDisks.Add(new DataDisk()
            {
                Name = "mytestod1.vhd",
                Vhd = new VirtualHardDisk("http://teststoragestrongpw.blob.core.windows.net/vhds/mytestod1.vhd"),
                DiskSizeGB = 1023,
                Lun = 1,
                CreateOption = DiskCreateOptionTypes.Empty
            });

            var newUpdatesVM = computeClient.VirtualMachines.CreateOrUpdate(groupName, vmName, ObjVirtualMachines);


            return true;
        }

        public async Task<ResourceGroup> CreateResourceGroupAsync(TokenCredentials credential, string groupName, string subscriptionId, string location)
        {
            var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };
            var rpResult = resourceManagementClient.Providers.Register("Microsoft.Storage");
            rpResult = resourceManagementClient.Providers.Register("Microsoft.Network");
            rpResult = resourceManagementClient.Providers.Register("Microsoft.Compute");

            var resourceGroup = new ResourceGroup { Location = location };
            return await resourceManagementClient.ResourceGroups.CreateOrUpdateAsync(groupName, resourceGroup);
        }

        public ResourceGroup CreateResourceGroupDebug(TokenCredentials credential, string groupName, string subscriptionId, string location)
        {
            var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };


            //var rpResult = resourceManagementClient.Providers.Register("Microsoft.Storage");

            //rpResult = resourceManagementClient.Providers.Register("Microsoft.Network");

            //rpResult = resourceManagementClient.Providers.Register("Microsoft.Compute");

            var resourceGroup = new ResourceGroup { Location = location };
            return resourceGroup;
            //resourceManagementClient.ResourceGroups.CreateOrUpdate(groupName, resourceGroup);
            //return resourceManagementClient.ResourceGroups.CreateOrUpdate(groupName, resourceGroup);
        }

        public ResourceGroup CreateResourceGroup(TokenCredentials credential, string groupName, string subscriptionId, string location)
        {
            var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };


            var rpResult = resourceManagementClient.Providers.Register("Microsoft.Storage");

            rpResult = resourceManagementClient.Providers.Register("Microsoft.Network");

            rpResult = resourceManagementClient.Providers.Register("Microsoft.Compute");

            var resourceGroup = new ResourceGroup { Location = location };
            resourceManagementClient.ResourceGroups.CreateOrUpdate(groupName, resourceGroup);
            return resourceManagementClient.ResourceGroups.CreateOrUpdate(groupName, resourceGroup);
        }

        public async Task<StorageAccount> CreateStorageAccountAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string storageName)
        {
            Console.WriteLine("Creating the storage account...");
            var storageManagementClient = new StorageManagementClient(credential) { SubscriptionId = subscriptionId };
            return await storageManagementClient.StorageAccounts.CreateAsync(
              groupName,
              storageName,
              new StorageAccountCreateParameters()
              {
                  Sku = new Microsoft.Azure.Management.Storage.Models.Sku() { Name = SkuName.StandardLRS },
                  Kind = Kind.Storage,
                  Location = location
              }
            );
        }

        public StorageAccount CreateStorageAccount(TokenCredentials credential, string groupName, string subscriptionId, string location, string storageName)
        {
            Console.WriteLine("Creating the storage account...");
            var storageManagementClient = new StorageManagementClient(credential) { SubscriptionId = subscriptionId };
            return storageManagementClient.StorageAccounts.Create(
              groupName,
              storageName,
              new StorageAccountCreateParameters()
              {
                  Sku = new Microsoft.Azure.Management.Storage.Models.Sku() { Name = SkuName.StandardLRS },
                  Kind = Kind.Storage,
                  Location = location
              }
            );
        }

        public async Task<PublicIPAddress> CreatePublicIPAddressAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string ipName)
        {
            Console.WriteLine("Creating the public ip...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            return await networkManagementClient.PublicIPAddresses.CreateOrUpdateAsync(
              groupName,
              ipName,
              new PublicIPAddress
              {
                  Location = location,
                  PublicIPAllocationMethod = "Dynamic"
              }
            );
        }

        public PublicIPAddress CreatePublicIPAddress(TokenCredentials credential, string groupName, string subscriptionId, string location, string ipName)
        {
            Console.WriteLine("Creating the public ip...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            return networkManagementClient.PublicIPAddresses.CreateOrUpdate(
              groupName,
              ipName,
              new PublicIPAddress
              {
                  Location = location,
                  PublicIPAllocationMethod = "Dynamic"
              }
            );
        }

        public static async Task<NetworkInterface> CreateNetworkInterfaceAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string subnetName, string vnetName, string ipName, string nicName)
        {
            Console.WriteLine("Creating the network interface...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            var subnetResponse = await networkManagementClient.Subnets.GetAsync(
              groupName,
              vnetName,
              subnetName
            );
            var pubipResponse = await networkManagementClient.PublicIPAddresses.GetAsync(groupName, ipName);

            return await networkManagementClient.NetworkInterfaces.CreateOrUpdateAsync(
              groupName,
              nicName,
              new NetworkInterface
              {
                  Location = location,
                  IpConfigurations = new List<NetworkInterfaceIPConfiguration>
       {
         new NetworkInterfaceIPConfiguration
         {
           Name = nicName,
           PublicIPAddress = pubipResponse,
           Subnet = subnetResponse
         }
       }
              }
            );
        }

        public static NetworkInterface CreateNetworkInterface(TokenCredentials credential, string groupName, string subscriptionId, string location, string subnetName, string vnetName, string ipName, string nicName)
        {
            Console.WriteLine("Creating the network interface...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            var subnetResponse = networkManagementClient.Subnets.Get(
              groupName,
              vnetName,
              subnetName
            );
            var pubipResponse = networkManagementClient.PublicIPAddresses.Get(groupName, ipName);

            return networkManagementClient.NetworkInterfaces.CreateOrUpdate(
              groupName,
              nicName,
              new NetworkInterface
              {
                  Location = location,
                  IpConfigurations = new List<NetworkInterfaceIPConfiguration>
       {
         new NetworkInterfaceIPConfiguration
         {
           Name = nicName,
           PublicIPAddress = pubipResponse,
           Subnet = subnetResponse
         }
       }
              }
            );
        }

        public async Task<VirtualNetwork> CreateVirtualNetworkAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string vnetName, string subnetName)
        {
            Console.WriteLine("Creating the virtual network...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };

            var subnet = new Subnet
            {
                Name = subnetName,
                AddressPrefix = "10.0.0.0/24"
            };

            var address = new AddressSpace
            {
                AddressPrefixes = new List<string> { "10.0.0.0/16" }
            };

            return await networkManagementClient.VirtualNetworks.CreateOrUpdateAsync(
              groupName,
              vnetName,
              new VirtualNetwork
              {
                  Location = location,
                  AddressSpace = address,
                  Subnets = new List<Subnet> { subnet }
              }
            );
        }

        public VirtualNetwork CreateVirtualNetwork(TokenCredentials credential, string groupName, string subscriptionId, string location, string vnetName, string subnetName)
        {
            Console.WriteLine("Creating the virtual network...");
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };

            var subnet = new Subnet
            {
                Name = subnetName,
                AddressPrefix = "10.0.0.0/24"
            };

            var address = new AddressSpace
            {
                AddressPrefixes = new List<string> { "10.0.0.0/16" }
            };

            return networkManagementClient.VirtualNetworks.CreateOrUpdate(
              groupName,
              vnetName,
              new VirtualNetwork
              {
                  Location = location,
                  AddressSpace = address,
                  Subnets = new List<Subnet> { subnet }
              }
            );
        }


        public async Task<AvailabilitySet> CreateAvailabilitySetAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string avsetName)
        {
            Console.WriteLine("Creating the availability set...");
            var computeManagementClient = new ComputeManagementClient(credential) { SubscriptionId = subscriptionId };
            return await computeManagementClient.AvailabilitySets.CreateOrUpdateAsync(
              groupName,
              avsetName,
              new AvailabilitySet()
              {
                  Location = location
              }
            );
        }

        public AvailabilitySet CreateAvailabilitySet(TokenCredentials credential, string groupName, string subscriptionId, string location, string avsetName)
        {
            Console.WriteLine("Creating the availability set...");
            var computeManagementClient = new ComputeManagementClient(credential) { SubscriptionId = subscriptionId };
            return computeManagementClient.AvailabilitySets.CreateOrUpdate(
              groupName,
              avsetName,
              new AvailabilitySet()
              {
                  Location = location
              }
            );
        }

        public async Task<VirtualMachine> CreateVirtualMachineAsync(TokenCredentials credential, string groupName, string subscriptionId, string location, string nicName, string avsetName, string storageName, string adminName, string adminPassword, string vmName)
        {
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            var nic = networkManagementClient.NetworkInterfaces.Get(groupName, nicName);

            var computeManagementClient = new ComputeManagementClient(credential);
            computeManagementClient.SubscriptionId = subscriptionId;
            var avSet = computeManagementClient.AvailabilitySets.Get(groupName, avsetName);

            Console.WriteLine("Creating the virtual machine...");
            return await computeManagementClient.VirtualMachines.CreateOrUpdateAsync(
              groupName,
              vmName,
              new VirtualMachine
              {
                  Location = location,
                  AvailabilitySet = new Microsoft.Azure.Management.Compute.Models.SubResource
                  {
                      Id = avSet.Id
                  },
                  HardwareProfile = new HardwareProfile
                  {
                      VmSize = "Standard_A0"
                  },
                  OsProfile = new OSProfile
                  {
                      AdminUsername = adminName,
                      AdminPassword = adminPassword,
                      ComputerName = vmName,
                      WindowsConfiguration = new WindowsConfiguration
                      {
                          ProvisionVMAgent = true
                      }
                  },
                  NetworkProfile = new NetworkProfile
                  {
                      NetworkInterfaces = new List<NetworkInterfaceReference>
         {
           new NetworkInterfaceReference { Id = nic.Id }
         }
                  },
                  StorageProfile = new StorageProfile
                  {
                      ImageReference = new ImageReference
                      {
                          Publisher = "MicrosoftWindowsServer",
                          Offer = "WindowsServer",
                          Sku = "2012-R2-Datacenter",
                          Version = "latest"
                      },

                      OsDisk = new OSDisk
                      {
                          Name = "mytestod1",
                          CreateOption = DiskCreateOptionTypes.FromImage,
                          Vhd = new VirtualHardDisk
                          {
                              Uri = "http://" + storageName + ".blob.core.windows.net/vhds/mytestod1.vhd"
                          }
                      }
                  }
              }
            );
        }

        public VirtualMachine CreateVirtualMachine(TokenCredentials credential, string groupName, string subscriptionId, string location, string nicName, string avsetName, string storageName, string adminName, string adminPassword, string vmName)
        {
            var networkManagementClient = new NetworkManagementClient(credential) { SubscriptionId = subscriptionId };
            var nic = networkManagementClient.NetworkInterfaces.Get(groupName, nicName);

            var computeManagementClient = new ComputeManagementClient(credential);
            computeManagementClient.SubscriptionId = subscriptionId;
            var avSet = computeManagementClient.AvailabilitySets.Get(groupName, avsetName);

            Console.WriteLine("Creating the virtual machine...");
            return computeManagementClient.VirtualMachines.CreateOrUpdate(
              groupName,
     vmName,
     new VirtualMachine
     {
         Location = location,
         AvailabilitySet = new Microsoft.Azure.Management.Compute.Models.SubResource
         {
             Id = avSet.Id
         },
         HardwareProfile = new HardwareProfile
         {
             VmSize = "Standard_A0"
         },
         OsProfile = new OSProfile
         {
             AdminUsername = adminName,
             AdminPassword = adminPassword,
             ComputerName = vmName,
             WindowsConfiguration = new WindowsConfiguration
             {
                 ProvisionVMAgent = true
             }
         },
         NetworkProfile = new NetworkProfile
         {
             NetworkInterfaces = new List<NetworkInterfaceReference>
         {
           new NetworkInterfaceReference { Id = nic.Id }
         }
         },
         StorageProfile = new StorageProfile
         {
             ImageReference = new ImageReference
             {
                 Publisher = "MicrosoftWindowsServer",
                 Offer = "WindowsServer",
                 Sku = "2012-R2-Datacenter",
                 Version = "latest"
             },
             OsDisk = new OSDisk
             {
                 Name = "mytestod1",
                 CreateOption = DiskCreateOptionTypes.FromImage,
                 Vhd = new VirtualHardDisk
                 {
                     Uri = "http://" + storageName + ".blob.core.windows.net/vhds/mytestod1.vhd"
                 }
             }
         }
     }
            );
        }

        private static async Task<AuthenticationResult> GetAccessTokenAsync()
        {

            var cc = new ClientCredential("eeb1eb9c-8416-445b-832c-feec564c9da1", "8cncsqqu4jvijmCCHScdOwFe+mYkhl6omEt9RWUMCS8=");
            var context = new AuthenticationContext("https://login.windows.net/1f30f5d8-d3b7-4d2c-bcc5-b642e19893e0");
            var token = context.AcquireTokenAsync("https://management.azure.com/", cc).Result;
       
            if (token == null)
            {
                throw new InvalidOperationException("Could not get the token");
            }
            return token;
        }
        public static void StartVirtualMachineAsync(TokenCredentials credential, string groupName, string vmName, string subscriptionId)
        {
            Console.WriteLine("Starting the virtual machine...");
            var computeManagementClient = new ComputeManagementClient(credential) { SubscriptionId = subscriptionId };
            computeManagementClient.VirtualMachines.Start(groupName, vmName);

        }
        public static async Task<DeploymentExtended> CreateTemplateDeploymentAsync(TokenCredentials credential, string groupName, string vmName, string subscriptionId, string storageName, string VMSize, StreamWriter sr)
        {
            sr.WriteLine("Creating the template deployment...");
            var deployment = new Deployment();


            string tempVhdLocation = "https://armrenderdisks312.blob.core.windows.net/vhds/" + storageName + ".vhd";
            string azureParams = AzureVMParameters.GetAzureVMTemplateParameters(vmName, groupName, tempVhdLocation, VMSize);
            string azureTemplate = AzureVMParameters.GetAzureVirtualMachineTemplate();
            //string paramatersVM = "{ \"$schema\": \"http://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\", \"contentVersion\": \"1.0.0.0\", \"parameters\": { \"customVmName\": { \"value\": \"cloneVM2\" }, \"userImageStorageAccountName\": { \"value\": \"armrenderdisks312\" }, \"userImageStorageAccountResourceGroupName\": { \"value\": \"ARMRender\" }, \"adminUsername\": { \"value\": \"MWS\" }, \"adminPassword\": { \"value\": \"Models4Wive$\" }, \"dnsLabelPrefix\": { \"value\": \"idontthinkthismattersvm\" }, \"osType\": { \"value\": \"Windows\" }, \"vmSize\": { \"value\": \"Standard_A2\" }, \"newOrExistingVnet\": { \"value\": \"new\" }, \"newOrExistingVnetName\": { \"value\": \"cloneVM2vnet\" }, \"newOrExistingSubnetName\": { \"value\": \"cloneVM2subnet\" }, \"existingVnetResourceGroupName\": { \"value\": \"TestStrongPW\" } \"tempVHDDiskLocation\": { \"value\": \"TestStrongPW\" } } }";

            deployment.Properties = new DeploymentProperties
            {
                Mode = DeploymentMode.Incremental,
                Template = azureTemplate,
                Parameters = azureParams
            };
            var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };
            return await resourceManagementClient.Deployments.CreateOrUpdateAsync(groupName, vmName, deployment);
        }

        public static async Task<DeploymentExtended> CreateTemplateDeployment(TokenCredentials credential, string groupName, string vmName, string subscriptionId, string storageName, string VMSize)
        {

         
            var deployment = new Deployment();

            //string tempVhdLocation = "https://midweststreamsdevdisks.blob.core.windows.net/vhds/" + storageName + ".vhd";
            string tempVhdLocation =  "https://armrenderdisks312.blob.core.windows.net/vhds/"+storageName+".vhd";
            string azureParams = AzureVMParameters.GetAzureVMTemplateParameters(vmName, groupName, tempVhdLocation, VMSize);
            string azureTemplate = AzureVMParameters.GetAzureVirtualMachineTemplate();
            //string paramatersVM = "{ \"$schema\": \"http://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\", \"contentVersion\": \"1.0.0.0\", \"parameters\": { \"customVmName\": { \"value\": \"cloneVM2\" }, \"userImageStorageAccountName\": { \"value\": \"armrenderdisks312\" }, \"userImageStorageAccountResourceGroupName\": { \"value\": \"ARMRender\" }, \"adminUsername\": { \"value\": \"MWS\" }, \"adminPassword\": { \"value\": \"Models4Wive$\" }, \"dnsLabelPrefix\": { \"value\": \"idontthinkthismattersvm\" }, \"osType\": { \"value\": \"Windows\" }, \"vmSize\": { \"value\": \"Standard_A2\" }, \"newOrExistingVnet\": { \"value\": \"new\" }, \"newOrExistingVnetName\": { \"value\": \"cloneVM2vnet\" }, \"newOrExistingSubnetName\": { \"value\": \"cloneVM2subnet\" }, \"existingVnetResourceGroupName\": { \"value\": \"TestStrongPW\" } \"tempVHDDiskLocation\": { \"value\": \"TestStrongPW\" } } }";

            deployment.Properties = new DeploymentProperties
            {
                Mode = DeploymentMode.Incremental,
                Template = azureTemplate,
                Parameters = azureParams
            };
            var resourceManagementClient = new ResourceManagementClient(credential) { SubscriptionId = subscriptionId };
             var result =  await resourceManagementClient.Deployments.CreateOrUpdateAsync(groupName, vmName, deployment);
            string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
            var sr = new StreamWriter(BatchFilePath + "templateDeployLog.txt");
            sr.WriteLine("Deployed Azure VM");
            sr.WriteLine("Template");
            if(result!=null)
            {
                if(result.Properties!=null)
                {
                    if (result.Properties.Template != null)
                    {
                        sr.WriteLine(result.Properties.Template.ToString());
                    }
                    else
                    {
                         sr.WriteLine("deploy result properties template is null");
                         sr.WriteLine("Properties:");
                        sr.WriteLine(result.Properties.ToString());
                       
                    }

                }
                else
                {
                    sr.WriteLine("Deploy Result Properties is null");
                }
               
            }
            else
            {
                sr.WriteLine("Deploy Result is null");
            }
            sr.Close();
            return result;
        }

    }
}