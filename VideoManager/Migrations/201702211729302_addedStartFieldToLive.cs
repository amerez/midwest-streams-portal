namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedStartFieldToLive : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LiveStreams", "Started", c => c.Boolean(nullable: false, defaultValue: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.LiveStreams", "Started");
        }
    }
}
