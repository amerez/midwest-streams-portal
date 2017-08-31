namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDevHomeFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FuneralHomes", "DevHome", c => c.Boolean(nullable: false, defaultValue: false));
        
          
        }
        
        public override void Down()
        {
            DropColumn("dbo.FuneralHomes", "DevHome");
        }
    }
}
