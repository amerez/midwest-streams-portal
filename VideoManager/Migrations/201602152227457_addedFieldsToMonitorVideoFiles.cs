namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedFieldsToMonitorVideoFiles : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Videos", t => t.Video_ServiceId)
                .Index(t => t.Video_ServiceId);
            
            AddColumn("dbo.Videos", "TotalRawFileSize", c => c.Double(nullable: false));
            AddColumn("dbo.Videos", "UploadStartTime", c => c.DateTime());
            AddColumn("dbo.Videos", "UploadEndTime", c => c.DateTime());
            AddColumn("dbo.Videos", "TimeInQue", c => c.Time(precision: 7));
            AddColumn("dbo.Videos", "TimeUploading", c => c.Time(precision: 7));
            AddColumn("dbo.Videos", "TimeEncoding", c => c.Time(precision: 7));
            AddColumn("dbo.Videos", "TotalProcessTime", c => c.Time(precision: 7));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VideoFiles", "Video_ServiceId", "dbo.Videos");
            DropIndex("dbo.VideoFiles", new[] { "Video_ServiceId" });
            DropColumn("dbo.Videos", "TotalProcessTime");
            DropColumn("dbo.Videos", "TimeEncoding");
            DropColumn("dbo.Videos", "TimeUploading");
            DropColumn("dbo.Videos", "TimeInQue");
            DropColumn("dbo.Videos", "UploadEndTime");
            DropColumn("dbo.Videos", "UploadStartTime");
            DropColumn("dbo.Videos", "TotalRawFileSize");
            DropTable("dbo.VideoFiles");
        }
    }
}
