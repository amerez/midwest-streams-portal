namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedAzureVMSizeToSettings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Settings", "AzureVMSize", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Settings", "AzureVMSize");
        }
    }
}
