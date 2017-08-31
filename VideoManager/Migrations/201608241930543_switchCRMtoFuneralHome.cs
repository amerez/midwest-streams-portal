namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class switchCRMtoFuneralHome : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CRMFuneralHomeHistories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        CRMFuneralHomeId = c.Int(),
                        CRMOwnerContactId = c.Int(),
                        LastContactNotes = c.String(),
                        LastContactedDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                        LastContactedByUserName = c.String(),
                        ContactType = c.Int(nullable: false),
                        PostRating = c.Int(nullable: false),
                        IsNote = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMFuneralHomes", t => t.CRMFuneralHomeId)
                .ForeignKey("dbo.CRMOwnerContacts", t => t.CRMOwnerContactId)
                .Index(t => t.CRMFuneralHomeId)
                .Index(t => t.CRMOwnerContactId);
            
            CreateTable(
                "dbo.CRMFuneralHomeHistoryComments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        CRMFuneralHomeHistoryId = c.Int(),
                        Comment = c.String(),
                        CommentDate = c.DateTime(nullable: false),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMFuneralHomeHistories", t => t.CRMFuneralHomeHistoryId)
                .Index(t => t.CRMFuneralHomeHistoryId);
            
            AddColumn("dbo.CRMContactHistoryComments", "CRMFuneralHomeHistory_Id", c => c.Int());
            AddColumn("dbo.CRMFuneralHomes", "NextContactByUserName", c => c.String());
            AddColumn("dbo.CRMFuneralHomes", "NextContactDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AddColumn("dbo.CRMFuneralHomes", "NextContactNotes", c => c.String());
            AddColumn("dbo.CRMFuneralHomes", "NumberOfContacts", c => c.Int(nullable: false, defaultValueSql: "0"));
            AddColumn("dbo.CRMFuneralHomes", "NextContactType", c => c.String());
            CreateIndex("dbo.CRMContactHistoryComments", "CRMFuneralHomeHistory_Id");
            AddForeignKey("dbo.CRMContactHistoryComments", "CRMFuneralHomeHistory_Id", "dbo.CRMFuneralHomeHistories", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CRMFuneralHomeHistoryComments", "CRMFuneralHomeHistoryId", "dbo.CRMFuneralHomeHistories");
            DropForeignKey("dbo.CRMFuneralHomeHistories", "CRMOwnerContactId", "dbo.CRMOwnerContacts");
            DropForeignKey("dbo.CRMFuneralHomeHistories", "CRMFuneralHomeId", "dbo.CRMFuneralHomes");
            DropForeignKey("dbo.CRMContactHistoryComments", "CRMFuneralHomeHistory_Id", "dbo.CRMFuneralHomeHistories");
            DropIndex("dbo.CRMFuneralHomeHistoryComments", new[] { "CRMFuneralHomeHistoryId" });
            DropIndex("dbo.CRMFuneralHomeHistories", new[] { "CRMOwnerContactId" });
            DropIndex("dbo.CRMFuneralHomeHistories", new[] { "CRMFuneralHomeId" });
            DropIndex("dbo.CRMContactHistoryComments", new[] { "CRMFuneralHomeHistory_Id" });
            DropColumn("dbo.CRMFuneralHomes", "NextContactType");
            DropColumn("dbo.CRMFuneralHomes", "NumberOfContacts");
            DropColumn("dbo.CRMFuneralHomes", "NextContactNotes");
            DropColumn("dbo.CRMFuneralHomes", "NextContactDate");
            DropColumn("dbo.CRMFuneralHomes", "NextContactByUserName");
            DropColumn("dbo.CRMContactHistoryComments", "CRMFuneralHomeHistory_Id");
            DropTable("dbo.CRMFuneralHomeHistoryComments");
            DropTable("dbo.CRMFuneralHomeHistories");
        }
    }
}
