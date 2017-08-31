namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedWhiteLabelToSettings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Settings", "WhiteLabel", c => c.Boolean(nullable: false, defaultValue: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Settings", "WhiteLabel");
        }
    }
}
