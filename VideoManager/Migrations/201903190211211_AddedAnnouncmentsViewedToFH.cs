namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAnnouncmentsViewedToFH : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Announcments", "FuneralHome_Id", c => c.Int());
            CreateIndex("dbo.Announcments", "FuneralHome_Id");
            AddForeignKey("dbo.Announcments", "FuneralHome_Id", "dbo.FuneralHomes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Announcments", "FuneralHome_Id", "dbo.FuneralHomes");
            DropIndex("dbo.Announcments", new[] { "FuneralHome_Id" });
            DropColumn("dbo.Announcments", "FuneralHome_Id");
        }
    }
}
