namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MadeChangesToLiveStream : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LiveStreams", "StreamId", c => c.String());
            AddColumn("dbo.LiveStreams", "StartStreamAccessToken", c => c.Guid(nullable: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.LiveStreams", "StartStreamAccessToken");
            DropColumn("dbo.LiveStreams", "StreamId");
        }
    }
}
