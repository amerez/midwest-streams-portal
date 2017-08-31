namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedNoFutureContactToCRMContact : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CRMContacts", "NoFutureContact", c => c.Boolean(nullable: false, defaultValueSql: "0"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CRMContacts", "NoFutureContact");
        }
    }
}
