namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedBannerImageToContact : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CRMContacts", "BannerImage", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CRMContacts", "BannerImage");
        }
    }
}
