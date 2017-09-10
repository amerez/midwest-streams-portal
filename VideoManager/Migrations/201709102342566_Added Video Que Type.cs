namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedVideoQueType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VideoQueues", "VideoQueType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VideoQueues", "VideoQueType");
        }
    }
}
