namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class conflictIssues : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LiveStreams", "ConnectionCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.LiveStreams", "ConnectionCode");
        }
    }
}
