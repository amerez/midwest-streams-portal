namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedVideoQueTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VideoQueues",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VideoId = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        BlobPath = c.String(),
                        AssignedVM = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.VideoQueues");
        }
    }
}
