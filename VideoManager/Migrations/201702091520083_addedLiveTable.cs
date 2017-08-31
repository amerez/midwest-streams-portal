namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedLiveTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LiveStreams",
                c => new
                    {
                        ServiceId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false, defaultValue: false),
                        SourceURL = c.String(),
                    })
                .PrimaryKey(t => t.ServiceId)
                .ForeignKey("dbo.Services", t => t.ServiceId)
                .Index(t => t.ServiceId);
            
            AddColumn("dbo.Services", "LiveStreamId", c => c.Int());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.LiveStreams", "ServiceId", "dbo.Services");
            DropIndex("dbo.LiveStreams", new[] { "ServiceId" });
            DropColumn("dbo.Services", "LiveStreamId");
            DropTable("dbo.LiveStreams");
        }
    }
}
