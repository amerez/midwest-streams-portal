namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedViewingPasswordToService : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "ViewingPassword", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Services", "ViewingPassword");
        }
    }
}
