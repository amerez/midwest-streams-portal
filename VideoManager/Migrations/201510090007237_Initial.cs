namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            //Initial Code to create all tables, Leave commented out for running migrations on a current data server. 
            //If Spinning up a new database uncomment this code and the tables will be created
            //I know this is a pain in the ass, but I really screwed something up in the migrations folder. So I wiped all the migrations and started new.
            //-Sorry about that - Shane
            CreateTable(
                "dbo.Analytics",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        IPAddress = c.String(),
                        Start = c.Int(nullable: false),
                        Stop = c.Int(nullable: false),
                        VideoId = c.Int(nullable: false),
                        Duration = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        City = c.String(),
                        CountryCode = c.String(),
                        MetroCode = c.String(),
                        RegionCode = c.String(),
                        RegionName = c.String(),
                        TimeZone = c.String(),
                        ZipCode = c.Int(),
                        PlayCount = c.Int(nullable: false),
                        Completed = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        Video_ServiceId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Videos", t => t.Video_ServiceId)
                .Index(t => t.Video_ServiceId);

            CreateTable(
                "dbo.Videos",
                c => new
                    {
                        ServiceId = c.Int(nullable: false),
                        CreateDate = c.DateTime(),
                        Duration = c.Time(precision: 7),
                        Start = c.Time(precision: 7),
                        Stop = c.Time(precision: 7),
                        FilePath = c.String(),
                        ImagePath = c.String(),
                        ConvertedFilePath = c.String(),
                        Status = c.Int(),
                        Deleted = c.Boolean(nullable: false),
                        PageHits = c.Int(nullable: false),
                        ClosedCaptioning = c.String(),
                        SlatePath = c.String(),
                        DisplayFileName = c.String(),
                        OldVideoId = c.Int(),
                    })
                .PrimaryKey(t => t.ServiceId)
                .ForeignKey("dbo.Services", t => t.ServiceId, cascadeDelete: true)
                .Index(t => t.ServiceId);

            CreateTable(
                "dbo.Services",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        FuneralHomeId = c.Int(nullable: false),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Birthday = c.DateTime(nullable: false),
                        DeathDay = c.DateTime(nullable: false),
                        ServiceDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        IsSecured = c.Boolean(nullable: false),
                        VideoTitle = c.String(maxLength: 50),
                        ContactEmail = c.String(),
                        ViewingUserId = c.String(maxLength: 128),
                        Obituary = c.String(),
                        PhotoPath = c.String(),
                        PageHits = c.Int(nullable: false),
                        PDFId = c.Int(),
                        VideoId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FuneralHomes", t => t.FuneralHomeId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ViewingUserId)
                .Index(t => t.FuneralHomeId)
                .Index(t => t.ViewingUserId);

            CreateTable(
                "dbo.FuneralHomes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        Name = c.String(nullable: false),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.Int(nullable: false),
                        Email = c.String(),
                        UserName = c.String(nullable: false),
                        UserId = c.String(),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        OwnerId = c.Int(),
                        PaymentStatus = c.Int(nullable: false),
                        SettingId = c.Int(),
                        TempAccessToken = c.String(),
                        LastLogin = c.DateTime(),
                        PrimaryContact = c.String(),
                        PrimaryContactPhoneNumber = c.String(),
                        PrimaryContactEmail = c.String(),
                        FuneralHomeNumber = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Owners", t => t.OwnerId)
                .Index(t => t.OwnerId);

            CreateTable(
                "dbo.Owners",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        Name = c.String(nullable: false),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.Int(nullable: false),
                        Email = c.String(),
                        PhoneNumber = c.String(),
                        UserName = c.String(nullable: false),
                        UserId = c.String(),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    })
                .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.Settings",
                c => new
                    {
                        FuneralHomeId = c.Int(nullable: false),
                        LogoPath = c.String(),
                        WebsiteProvider = c.Int(nullable: false),
                        SlatePath = c.String(),
                        DisplayTutorial = c.Boolean(nullable: false),
                        NewTabPdf = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.FuneralHomeId)
                .ForeignKey("dbo.FuneralHomes", t => t.FuneralHomeId, cascadeDelete: true)
                .Index(t => t.FuneralHomeId);

            CreateTable(
                "dbo.PDFs",
                c => new
                    {
                        ServiceId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        PDFPath = c.String(),
                        ThumbnailPath = c.String(),
                        TitleText = c.String(),
                        Style = c.String(),
                        GoogleAnalytics = c.String(),
                        PageHits = c.Int(nullable: false),
                        FacebookTitle = c.String(),
                        FacebookDescription = c.String(),
                    })
                .PrimaryKey(t => t.ServiceId)
                .ForeignKey("dbo.Services", t => t.ServiceId, cascadeDelete: true)
                .Index(t => t.ServiceId);

            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        Description = c.String(),
                        Email = c.String(maxLength: 256),
                        Deleted = c.Boolean(nullable: false),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");

            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);

            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Services", "ViewingUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Videos", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.PDFs", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.Settings", "FuneralHomeId", "dbo.FuneralHomes");
            DropForeignKey("dbo.Services", "FuneralHomeId", "dbo.FuneralHomes");
            DropForeignKey("dbo.FuneralHomes", "OwnerId", "dbo.Owners");
            DropForeignKey("dbo.Analytics", "Video_ServiceId", "dbo.Videos");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.PDFs", new[] { "ServiceId" });
            DropIndex("dbo.Settings", new[] { "FuneralHomeId" });
            DropIndex("dbo.FuneralHomes", new[] { "OwnerId" });
            DropIndex("dbo.Services", new[] { "ViewingUserId" });
            DropIndex("dbo.Services", new[] { "FuneralHomeId" });
            DropIndex("dbo.Videos", new[] { "ServiceId" });
            DropIndex("dbo.Analytics", new[] { "Video_ServiceId" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.PDFs");
            DropTable("dbo.Settings");
            DropTable("dbo.Owners");
            DropTable("dbo.FuneralHomes");
            DropTable("dbo.Services");
            DropTable("dbo.Videos");
            DropTable("dbo.Analytics");
        }
    }
}
