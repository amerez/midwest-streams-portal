namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedHasSlateTOVideo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Videos", "HasSlate", c => c.Boolean(nullable: false, defaultValue: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Videos", "HasSlate");
        }
    }
}
