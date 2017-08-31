namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedDownloadAnalytics : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DownloadAnalytics",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        ServiceId = c.Int(nullable: false),
                        IPAddress = c.String(),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        City = c.String(),
                        CountryCode = c.String(),
                        MetroCode = c.String(),
                        RegionCode = c.String(),
                        RegionName = c.String(),
                        TimeZone = c.String(),
                        ZipCode = c.Int(),
                        AnalyticTracking = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Services", t => t.ServiceId, cascadeDelete: true)
                .Index(t => t.ServiceId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DownloadAnalytics", "ServiceId", "dbo.Services");
            DropIndex("dbo.DownloadAnalytics", new[] { "ServiceId" });
            DropTable("dbo.DownloadAnalytics");
        }
    }
}
