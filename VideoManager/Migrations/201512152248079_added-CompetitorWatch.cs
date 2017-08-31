namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedCompetitorWatch : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CWFacebookSnapshots",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        CWFuneralHomeId = c.Int(nullable: false),
                        NumberOfUSLikes = c.Int(nullable: false),
                        NumberOfOtherLikes = c.Int(nullable: false),
                        PageEngagmentScore = c.Int(nullable: false),
                        MostPopularFacebookPostID = c.String(),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CWFuneralHomes", t => t.CWFuneralHomeId, cascadeDelete: true)
                .Index(t => t.CWFuneralHomeId);
            
            CreateTable(
                "dbo.CWFuneralHomes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        Name = c.String(nullable: false),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.String(nullable: false),
                        Email = c.String(),
                        FuneralHomeNumber = c.String(),
                        Website = c.String(nullable: false),
                        WebsiteProvider = c.Int(nullable: false),
                        EstimatedCallsPerYear = c.Int(nullable: false),
                        FacebookPage = c.String(),
                        StaffPageURL = c.String(),
                        CityPopulation = c.Double(nullable: false),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        FuneralHomeId = c.Int(),
                        BannerImage = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FuneralHomes", t => t.FuneralHomeId)
                .Index(t => t.FuneralHomeId);
            
            CreateTable(
                "dbo.CWObituaries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        CWFuneralHomeId = c.Int(nullable: false),
                        FirstName = c.String(nullable: false),
                        MiddleName = c.String(),
                        LastName = c.String(nullable: false),
                        FullName = c.String(),
                        ObitURL = c.String(),
                        Age = c.Int(nullable: false),
                        ServiceDay = c.String(),
                        BirthDate = c.DateTime(),
                        DeathDate = c.DateTime(),
                        ServiceDate = c.DateTime(),
                        ObituaryText = c.String(),
                        PictureURL = c.String(),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CWFuneralHomes", t => t.CWFuneralHomeId, cascadeDelete: true)
                .Index(t => t.CWFuneralHomeId);
            
            CreateTable(
                "dbo.CWStaffs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        CWFuneralHomeId = c.Int(nullable: false),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Email = c.String(),
                        PictureURL = c.String(),
                        TwitterHandle = c.String(),
                        FacebookId = c.String(),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        Bio = c.String(),
                        ContactPosition = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CWFuneralHomes", t => t.CWFuneralHomeId, cascadeDelete: true)
                .Index(t => t.CWFuneralHomeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CWFacebookSnapshots", "CWFuneralHomeId", "dbo.CWFuneralHomes");
            DropForeignKey("dbo.CWFuneralHomes", "FuneralHomeId", "dbo.FuneralHomes");
            DropForeignKey("dbo.CWStaffs", "CWFuneralHomeId", "dbo.CWFuneralHomes");
            DropForeignKey("dbo.CWObituaries", "CWFuneralHomeId", "dbo.CWFuneralHomes");
            DropIndex("dbo.CWStaffs", new[] { "CWFuneralHomeId" });
            DropIndex("dbo.CWObituaries", new[] { "CWFuneralHomeId" });
            DropIndex("dbo.CWFuneralHomes", new[] { "FuneralHomeId" });
            DropIndex("dbo.CWFacebookSnapshots", new[] { "CWFuneralHomeId" });
            DropTable("dbo.CWStaffs");
            DropTable("dbo.CWObituaries");
            DropTable("dbo.CWFuneralHomes");
            DropTable("dbo.CWFacebookSnapshots");
        }
    }
}
