namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCRMNotifications : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CRMNotifications",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        UserId = c.String(),
                        Text = c.String(),
                        Link = c.String(),
                        IconClass = c.String(),
                        SpanClass = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CRMNotifications");
        }
    }
}
