namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedScreenScrapping : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CRMContacts", "ScreenScrappedBio", c => c.String());
            AddColumn("dbo.CRMContacts", "ScreenScrappedImage", c => c.String());
            AddColumn("dbo.CRMFuneralHomes", "BannerImage", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CRMFuneralHomes", "BannerImage");
            DropColumn("dbo.CRMContacts", "ScreenScrappedImage");
            DropColumn("dbo.CRMContacts", "ScreenScrappedBio");
        }
    }
}
