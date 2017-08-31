namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SEOFriendlyPDFtoSettings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Settings", "SEOFriendlyPDF", c => c.Boolean(nullable: false, defaultValue: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Settings", "SEOFriendlyPDF");
        }
    }
}
