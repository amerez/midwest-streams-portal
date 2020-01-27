namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dvdForSaleSetting : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Settings", "DVDForSale", c => c.Boolean(nullable: false, defaultValue:false));
            DropColumn("dbo.LiveStreams", "ConnectionCode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.LiveStreams", "ConnectionCode", c => c.String());
            DropColumn("dbo.Settings", "DVDForSale");
        }
    }
}
