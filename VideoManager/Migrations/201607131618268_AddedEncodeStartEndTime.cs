namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedEncodeStartEndTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Videos", "EncodeStartTime", c => c.DateTime());
            AddColumn("dbo.Videos", "EncodeEndTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Videos", "EncodeEndTime");
            DropColumn("dbo.Videos", "EncodeStartTime");
        }
    }
}
