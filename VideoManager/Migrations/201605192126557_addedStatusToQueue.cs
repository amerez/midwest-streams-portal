namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedStatusToQueue : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VideoQueues", "VideoStatus", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.VideoQueues", "VideoStatus");
        }
    }
}
