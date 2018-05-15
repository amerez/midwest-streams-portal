namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedSlateToService : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "HasSlate", c => c.Boolean(nullable: false, defaultValue: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Services", "HasSlate");
        }
    }
}
