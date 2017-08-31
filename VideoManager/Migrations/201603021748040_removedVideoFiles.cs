namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedVideoFiles : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VideoFiles", "Video_ServiceId", "dbo.Videos");
            DropIndex("dbo.VideoFiles", new[] { "Video_ServiceId" });
            AddColumn("dbo.Videos", "ConvertedFileSize", c => c.Double(nullable: false, defaultValueSql: "0"));
            DropTable("dbo.VideoFiles");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.VideoFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FileName = c.String(),
                        Duration = c.Time(precision: 7),
                        UploadDuration = c.Time(precision: 7),
                        UploadStartTime = c.DateTime(),
                        UploadEndTime = c.DateTime(),
                        UploadComplete = c.Boolean(nullable: false),
                        FileSize = c.Double(nullable: false),
                        LastByteRecieved = c.Double(nullable: false),
                        LastByteRecievedTime = c.DateTime(),
                        VideoId = c.Int(nullable: false),
                        Video_ServiceId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropColumn("dbo.Videos", "ConvertedFileSize");
            CreateIndex("dbo.VideoFiles", "Video_ServiceId");
            AddForeignKey("dbo.VideoFiles", "Video_ServiceId", "dbo.Videos", "ServiceId");
        }
    }
}
