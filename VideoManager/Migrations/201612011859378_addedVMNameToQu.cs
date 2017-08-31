namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedVMNameToQu : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VideoQueues", "VMName", c => c.String());
            AddColumn("dbo.VideoQueues", "ResourceGroupName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.VideoQueues", "ResourceGroupName");
            DropColumn("dbo.VideoQueues", "VMName");
        }
    }
}
