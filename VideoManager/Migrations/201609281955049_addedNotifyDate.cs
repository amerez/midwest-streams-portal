namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedNotifyDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CRMNotifications", "NotifyDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CRMNotifications", "NotifyDate");
        }
    }
}
