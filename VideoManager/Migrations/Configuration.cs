namespace VideoManager.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Model;
    using System.Data.Entity.SqlServer;
    using System.Linq;
    using System.Web.Providers.Entities;
    using System.Web.Security;
    using VideoManager.Models;
    using VideoManager.Models.Data;


    internal sealed class Configuration : DbMigrationsConfiguration<VideoManager.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(VideoManager.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Users.AddOrUpdate(
                u => u.UserName,
                new ApplicationUser { UserName = "jeffS", Name = "Jeff Schmidt", Email = "jeffreyschmidt@outlook.com" },
                new ApplicationUser { UserName = "Shane.P.White", Name = "Shane White", Email = "Shane.P.White@gmail.com", FirstName = "Shane", LastName = "White", FacebookId = "818265286" },
                new ApplicationUser { UserName = "devHome", Name = "Dev Home", Email = "shane.p.white+dev@gmail.com" },
                new ApplicationUser { UserName = "devOwner", Name = "Dev Owner", Email = "shane.p.white+devowner@gmail.com" },
                 new ApplicationUser { UserName = "owner", Name = "Shane Owner", Email = "shane.p.white+owner@gmail.com" }
                );

            context.SaveChanges();

            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            UserManager.AddPassword(context.Users.Where(u => u.UserName == "jeffS").FirstOrDefault().Id.ToString(), "R!ckBerg");
            UserManager.AddPassword(context.Users.Where(u => u.UserName == "Shane.P.White").FirstOrDefault().Id.ToString(), "Models4Wive$");
            UserManager.AddPassword(context.Users.Where(u => u.UserName == "devHome").FirstOrDefault().Id.ToString(), "GoBison1");
            UserManager.AddPassword(context.Users.Where(u => u.UserName == "devOwner").FirstOrDefault().Id.ToString(), "GoBison1");
            UserManager.AddPassword(context.Users.Where(u => u.UserName == "owner").FirstOrDefault().Id.ToString(), "GoBison1");

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            if (!context.Roles.Any(r => r.Name == "Admin"))
                roleManager.Create(new IdentityRole { Name = "Admin" });
            if (!context.Roles.Any(r => r.Name == "FuneralHome"))
                roleManager.Create(new IdentityRole { Name = "FuneralHome" });
            if (!context.Roles.Any(r => r.Name == "Viewing"))
                roleManager.Create(new IdentityRole { Name = "Viewing" });
            if (!context.Roles.Any(r => r.Name == "FuneralHomeOwner"))
                roleManager.Create(new IdentityRole { Name = "FuneralHomeOwner" });

            var suser = UserManager.FindByEmail("Shane.P.White@gmail.com");
            if (!UserManager.IsInRole(suser.Id, "Admin"))
                UserManager.AddToRole(suser.Id, "Admin");

            var devUser = UserManager.FindByEmail("shane.p.white+dev@gmail.com");
            if (!UserManager.IsInRole(devUser.Id, "FuneralHome"))
                UserManager.AddToRole(devUser.Id, "FuneralHome");

            var ownerUser = UserManager.FindByEmail("shane.p.white+owner@gmail.com");
            if (!UserManager.IsInRole(ownerUser.Id, "FuneralHomeOwner"))
                UserManager.AddToRole(ownerUser.Id, "FuneralHomeOwner");

            var devownerUser = UserManager.FindByEmail("shane.p.white+devowner@gmail.com");
            if (!UserManager.IsInRole(devownerUser.Id, "FuneralHomeOwner"))
                UserManager.AddToRole(devownerUser.Id, "FuneralHomeOwner");

            var juser = UserManager.FindByEmail("jeffreyschmidt@outlook.com");
            if (!UserManager.IsInRole(juser.Id, "Admin"))
                UserManager.AddToRole(juser.Id, "Admin");

            //This code is only meant to launch on new Databases
            //Check if Dev Owner has been created. If not create one
            int CurrentOwner = context.Owners.Where(n => n.Name == "Dev Owner").Count();
            if (CurrentOwner < 1)
            {
                Owner owner = new Owner
                {
                    Name = "Dev Owner",
                    Address1 = "374 5th St. N",
                    Address2 = "103",
                    City = "Fargo",
                    Email = "shane.p.white+dev@gmail.com",
                    CreateDate = DateTime.Now,
                    State = "ND",
                    ZipCode = 58102,
                    PhoneNumber = "701-308-1284",
                    UserName = devownerUser.UserName,
                    UserId = devownerUser.Id
                };
                context.Owners.AddOrUpdate(owner);

                //Check if devHome Exists if not create one
                int currentHome = context.FuneralHomes.Where(n => n.Name == "devHome").Count();
                if (currentHome < 1)
                {
                    FuneralHome devHome = new FuneralHome
                    {
                        Name = "devHome",
                        Address1 = "374 5th St. N",
                        Address2 = "103",
                        City = "Fargo",
                        Email = "shane.p.white+dev@gmail.com",
                        CreateDate = DateTime.Now,
                        PaymentStatus = Models.Data.Enums.PaymentStatus.HasPaid,
                        FuneralHomeNumber = "701-308-1284",
                        PrimaryContact = "Shane White",
                        PrimaryContactEmail = "shane.p.white@gmail.com",
                        PrimaryContactPhoneNumber = "701-308-1284",
                        State = "ND",
                        ZipCode = 58102,
                        UserId = devUser.Id,
                        UserName = devUser.UserName,
                        Owner = owner,
                        DevHome = true,
                        LastLogin = DateTime.Now
                    };
                    context.FuneralHomes.AddOrUpdate(devHome);
                    Setting setting = new Setting
                    {
                        WebsiteProvider = Models.Data.Enums.WebsiteProvider.FuneralNet,
                        FuneralHomeId = devHome.Id,
                        DisplayTutorial = true,
                        AzureVMSize = "Basic_A2",
                        NewTabPdf = true,
                        WhiteLabel = false
                    };
                    devHome.Setting = setting;
                    context.Settings.AddOrUpdate(setting);
                    context.FuneralHomes.AddOrUpdate(devHome);
                    Service service = new Service
                    {
                        ServiceDate = DateTime.Now,
                        FuneralHome = devHome,
                        IsSecured = false,
                        Birthday = DateTime.Now,
                        DeathDay = DateTime.Now,
                        FirstName = "Thomas",
                        LastName = "Jefferson"
                    };
                    context.Services.AddOrUpdate(service);
                }
            }
            if (context.CRMOwner.Where(n => n.Name == "Not Entered Yet").Count() < 1)
            {
                CRMOwner crmOwner = new CRMOwner()
                {
                    Name = "Not Entered Yet",
                    Address1 = "374 5th St. N",
                    City = "Fargo",
                    State = "ND",
                    ZipCode = "58102",
                    CreateDate = DateTime.Now,
                    EstimatedNumberOfHomes = 1,
                    PhoneNumber = "7013081284"
                };
                context.CRMOwner.AddOrUpdate(crmOwner);
            }
            if (context.CRMFuneralHome.Where(n => n.Name == "Do Not Delete").Count() < 1)
            {
                CRMFuneralHome crmFuneralHome = new CRMFuneralHome()
                {
                    Name = "Do Not Delete",
                    Address1 = "374 5th St. N",
                    City = "Fargo",
                    State = "ND",
                    ZipCode = "58102",
                    CreateDate = DateTime.Now,
                    FuneralHomeNumber = "70130081284",
                    Email = "business@business.com",
                    HasAUserLogin = false,
                    HasCamera = false,
                    HasMemorialFolders = false,
                    IsRecording = false,
                    LeadWarmth = Models.Data.Enums.LeadWarmth.FargoInJanuary,
                    OwnershipType = Models.Data.Enums.OwnershipType.Unknown,
                    PDFPublishingSoftware = Models.Data.Enums.PDFPublishingSoftware.Dobmeier,
                    WebsiteProvider = Models.Data.Enums.WebsiteProvider.FuneralNet,
                    Website = "www.midweststreams.com",
                    NextContactDate = DateTime.Now
                };
                context.CRMFuneralHome.AddOrUpdate(crmFuneralHome);
            }






        }
        internal class CreateDateSqlServerMigrationSqlGenerator : SqlServerMigrationSqlGenerator
        {
            protected override void Generate(AddColumnOperation addColumnOperation)
            {
                SetCreatedDateColumn(addColumnOperation.Column);

                base.Generate(addColumnOperation);
            }

            protected override void Generate(CreateTableOperation createTableOperation)
            {
                SetCreatedDateColumn(createTableOperation.Columns);

                base.Generate(createTableOperation);
            }

            private static void SetCreatedDateColumn(IEnumerable<ColumnModel> columns)
            {
                foreach (var columnModel in columns)
                {
                    SetCreatedDateColumn(columnModel);
                }
            }

            private static void SetCreatedDateColumn(PropertyModel column)
            {
                if (column.Name == "CreateDate")
                {
                    column.DefaultValueSql = "GETDATE()";
                }
            }
        }
    }
}

