using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace VideoManager.ARMTemplates
{
    public class AzureVMParameters
    {
        public static string GetAzureVMTemplateParameters(string vmName, string resourceGroupName, string tempStorageLocation, string vmSize)
        {
            
                            string template = "{" +
                    "\"$schema\": \"http://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\"," +
                    "\"contentVersion\": \"1.0.0.0\"," +
                    "\"parameters\": {" +
                        "\"customVmName\": {" +
                            "\"value\": \"" + vmName + "\"" +
                        "}," +
                        "\"userImageStorageAccountName\": {" +
                            "\"value\": \"armrenderdisks312\"" +
                        "}," +
                        "\"userImageStorageAccountResourceGroupName\": {" +
                        "    \"value\": \"ARMRender\"" +
                        "}," +
                        "\"adminUsername\": {" +
                        "    \"value\": \"MWS\"" +
                        "}," +
                        "\"adminPassword\": {" +
                        "    \"value\": \"Models4Wive$\"" +
                        "}," +
                        "\"dnsLabelPrefix\": {" +
                        "    \"value\": \"dnslabelprefixvalue\"" +
                        "}," +
                        "\"osType\": {" +
                        "    \"value\": \"Windows\"" +
                        "}," +
                        "\"vmSize\": {" +
                        "    \"value\": \""+vmSize+"\"" +
                        "}," +
                        "\"newOrExistingVnet\": {" +
                        "    \"value\": \"new\"" +
                        "}," +
                        "\"newOrExistingVnetName\": {" +
                        "    \"value\": \"cloneVM2vnet\"" +
                        "}," +
                        "\"newOrExistingSubnetName\": {" +
                        "    \"value\": \"cloneVM2subnet\"" +
                        "}," +
                        "\"existingVnetResourceGroupName\": {" +
                        "    \"value\": \""+resourceGroupName+"\"" +
                        "}," +
                        " \"tempVHDDiskLocation\": {" +
                        "    \"value\": \""+tempStorageLocation+"\"" +
                        "}" +
                    "}" +
                "}";

                            return template;
        }

        public static string GetAzureVirtualMachineTemplate()
        {
            string imageId = ConfigurationManager.AppSettings["RenderImageResourceId"];
            string imageName = ConfigurationManager.AppSettings["RenderImageName"];
            string template = "{"+
    "\"$schema\": \"https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#\","+
    "\"contentVersion\": \"1.0.0.0\","+
    "\"parameters\": {"+
       "\"customVmName\": {"+
            "\"type\": \"string\","+
            "\"metadata\": {"+
                "\"description\": \"This is the name of the your VM\""+
            "}"+
        "},"+
        "\"userImageStorageAccountName\": {"+
            "\"type\": \"string\","+
            "\"metadata\": {"+
                "\"description\": \"This is the name of the your storage account\""+
            "}"+
     "   },"+
     "   \"userImageStorageAccountResourceGroupName\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"Resource group of the existing storage account\""+
     "       }"+
     "   },"+
     ""+
     "   \"dnsLabelPrefix\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"DNS Label for the Public IP. Must be lowercase. It should match with the following regular expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$ or it will raise an error.\""+
     "       }"+
     "   },"+
     "   \"adminUserName\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"User Name for the Virtual Machine\""+
     "       }"+
     "   },"+
     "   \"adminPassword\": {"+
     "       \"type\": \"securestring\","+
     "       \"metadata\": {"+
     "           \"description\": \"Password for the Virtual Machine\""+
     "       }"+
     "   },"+
     "   \"osType\": {"+
     "       \"type\": \"string\","+
     "       \"allowedValues\": ["+
     "           \"Windows\","+
     "           \"Linux\""+
     "       ],"+
     "       \"metadata\": {"+
     "           \"description\": \"This is the OS that your VM will be running\""+
     "       }"+
     "   },"+
     "   \"vmSize\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"This is the size of your VM\""+
     "       }"+
     "   },"+
     "   \"newOrExistingVnet\": {"+
     "       \"allowedValues\": [ \"new\", \"existing\" ],"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"Select if this template needs a new VNet or will reference an existing VNet\""+
     "       }"+
     "   },"+
     "   \"newOrExistingVnetName\": {"+
     "       \"type\": \"string\","+
     "       \"defaultValue\": \"\","+
     "       \"metadata\": {"+
     "           \"description\": \"New or Existing VNet Name\""+
     "       }"+
     "   },"+
     "   \"newOrExistingSubnetName\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"New or Existing subnet Name\""+
     "       }"+
     "   },"+
     "   \"existingVnetResourceGroupName\": {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"Resource group of the existing VNET\""+
     "       }"+
     "   },"+
     "   tempVHDDiskLocation: {"+
     "       \"type\": \"string\","+
     "       \"metadata\": {"+
     "           \"description\": \"Unique name of temp VHD\""+
     "       }"+
     "   }"+
    "},"+
  "\"variables\": {"+
    "\"publicIPAddressName\": \"[concat(parameters('customVmName'),'IP')]\","+
    "\"vmName\": \"[parameters('customVmName')]\","+
    "\"nicName\": \"[concat(parameters('customVmName'),'Nic')]\","+
    "\"publicIPAddressType\": \"Dynamic\","+
    "\"apiVersion\": \"2018-06-01\","+
    "\"templatelink\": \"[concat('https://raw.githubusercontent.com/singhkay/azure-quickstart-templates/master/101-vm-from-user-image/',parameters('newOrExistingVnet'),'vnet.json')]\""+
  "},"+
  "\"resources\": ["+
    "{"+
            "\"apiVersion\": \"2015-01-01\","+
            "\"name\": \"vnet-template\","+
            "\"type\": \"Microsoft.Resources/deployments\","+
            "\"properties\": {"+
             "   \"mode\": \"incremental\","+
             "   \"templateLink\": {"+
             "       \"uri\": \"[variables('templatelink')]\","+
             "       \"contentVersion\": \"1.0.0.0\""+
             "   },"+
             "   \"parameters\": {"+
             "       \"virtualNetworkName\": {"+
             "           \"value\": \"[parameters('newOrExistingVnetName')]\""+
             "       },"+
             "       \"subnetName\": {"+
             "           \"value\": \"[parameters('newOrExistingSubnetName')]\""+
             "       },"+
             "       \"existingVnetResourceGroupName\": {"+
             "           \"value\": \"[parameters('existingVnetResourceGroupName')]\""+
             "       }"+
             "   }"+
            "}"+
        "},"+
    "{"+
      "\"apiVersion\": \"[variables('apiVersion')]\","+
      "\"type\": \"Microsoft.Network/publicIPAddresses\","+
      "\"name\": \"[variables('publicIPAddressName')]\","+
      "\"location\": \"[resourceGroup().location]\","+
      "\"properties\": {"+
      "  \"publicIPAllocationMethod\": \"[variables('publicIPAddressType')]\""+
      "}"+
    "},"+
    "{"+
    "  \"apiVersion\": \"2016-03-30\","+
    "  \"type\": \"Microsoft.Network/networkInterfaces\","+
    "  \"name\": \"[variables('nicName')]\","+
    "  \"location\": \"[resourceGroup().location]\","+
    "  \"dependsOn\": ["+
    "    \"[concat('Microsoft.Network/publicIPAddresses/', variables('publicIPAddressName'))]\","+
    "    \"Microsoft.Resources/deployments/vnet-template\""+
    "  ],"+
    "  \"properties\": {"+
    "    \"ipConfigurations\": ["+
    "      {"+
    "        \"name\": \"ipconfig1\","+
    "        \"properties\": {"+
    "          \"privateIPAllocationMethod\": \"Dynamic\","+
    "          \"publicIPAddress\": {"+
    "            \"id\": \"[resourceId('Microsoft.Network/publicIPAddresses',variables('publicIPAddressName'))]\""+
    "          },"+
    "          \"subnet\": {"+
    "            \"id\": \"[reference('vnet-template').outputs.subnet1Ref.value]\""+
    "          }"+
    "        }"+
    "      }"+
    "    ]"+
    "  }"+
    "},"+
    "{"+
    "  \"apiVersion\": \"[variables('apiVersion')]\","+
    "  \"type\": \"Microsoft.Compute/virtualMachines\","+
    "  \"name\": \"[variables('vmName')]\","+
    "  \"location\": \"[resourceGroup().location]\","+
    "  \"dependsOn\": ["+
    "    \"[concat('Microsoft.Network/networkInterfaces/', variables('nicName'))]\""+
    "  ],"+
    "  \"properties\": {"+
    "    \"hardwareProfile\": {"+
    "      \"vmSize\": \"[parameters('vmSize')]\""+
    "    },"+
    "    \"osProfile\": {"+
    "      \"computerName\": \"[variables('vmName')]\","+
    "      \"adminUsername\": \"[parameters('adminUsername')]\","+
    "      \"adminPassword\": \"[parameters('adminPassword')]\""+
    "    },"+
    " \"storageProfile\": {"+
    "     \"imageReference\":{"+
    "      \"id\":\""+imageId+"\"" +
    "        },"+
    "      \"osDisk\": {"+
    "        \"osType\": \"Windows\","+
    "        \"name\": \""+imageName+"\"," +
    "        \"createOption\": \"FromImage\""+

    "      }"+
    "    },"+
    "    \"networkProfile\": {"+
    "      \"networkInterfaces\": ["+
    "        {"+
    "          \"id\": \"[resourceId('Microsoft.Network/networkInterfaces',variables('nicName'))]\""+
    "        }"+
    "      ]"+
    "    },"+
    "    \"diagnosticsProfile\": {"+
    "      \"bootDiagnostics\": {"+
    "        \"enabled\": \"false\""+
   // "        \"storageUri\": \"[concat(reference(resourceId(parameters('userImageStorageAccountResourceGroupName'), 'Microsoft.Storage/storageAccounts/', parameters('userImageStorageAccountName')), variables('apiVersion')).primaryEndpoints.blob)]\""+
    "      }"+
    "    }"+
    "  }"+
    "}"+
  "]" +
"}";

            return template;
        }
    }
}