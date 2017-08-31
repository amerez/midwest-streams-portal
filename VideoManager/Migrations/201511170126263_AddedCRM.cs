namespace VideoManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCRM : DbMigration
    {
        public override void Up()
        {
            CreateTable(
               "dbo.CRMContacts",
               c => new
               {
                   Id = c.Int(nullable: false, identity: true),
                   IsDeleted = c.Boolean(nullable: false),
                   CRMFuneralHomeId = c.Int(nullable: false),
                   FirstName = c.String(nullable: false),
                   LastName = c.String(nullable: false),
                   City = c.String(),
                   Email = c.String(),
                   PhoneNumber = c.String(),
                   GeneralNotes = c.String(),
                   OrginOfContact = c.String(),
                   FirstContactedByUserName = c.String(),
                   FirstContactNotes = c.String(),
                   FirstContactedDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                   NextContactByUserName = c.String(),
                   NextContactDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                   NextContactNotes = c.String(),
                   NumberOfContacts = c.Int(nullable: false),
                   NextContactType = c.String(),
                   ContactPosition = c.Int(nullable: false),
                   LeadWarmth = c.Int(nullable: false),
                   PictureFileName = c.String(),
                   Interests = c.String(),
                   FamilyInfo = c.String(),
                   SpotifyUserId = c.String(),
                   SnapchatUserId = c.String(),
                   TwitterHandle = c.String(),
                   FacebookId = c.String(),
                   CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                   BusinessName = c.String(),
                   ContactCategory = c.Int(nullable: false),
                   CRMFuneralHome_Id = c.Int(),
               })
               .PrimaryKey(t => t.Id)
               .ForeignKey("dbo.CRMFuneralHomes", t => t.CRMFuneralHome_Id)
               .ForeignKey("dbo.CRMFuneralHomes", t => t.CRMFuneralHomeId, cascadeDelete: true)
               .Index(t => t.CRMFuneralHomeId)
               .Index(t => t.CRMFuneralHome_Id);

            CreateTable(
                "dbo.CRMContactHistories",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    CRMContactId = c.Int(),
                    CRMOwnerContactId = c.Int(),
                    LastContactNotes = c.String(),
                    LastContactedDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    LastContactedByUserName = c.String(),
                    ContactType = c.Int(nullable: false),
                    PostRating = c.Int(nullable: false),
                    IsNote = c.Boolean(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMContacts", t => t.CRMContactId, cascadeDelete: true)
                .ForeignKey("dbo.CRMOwnerContacts", t => t.CRMOwnerContactId, cascadeDelete: true)
                .Index(t => t.CRMContactId)
                .Index(t => t.CRMOwnerContactId);

            CreateTable(
                "dbo.CRMOwnerContacts",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    CRMOwnerId = c.Int(nullable: false),
                    FirstName = c.String(nullable: false),
                    LastName = c.String(nullable: false),
                    City = c.String(),
                    Email = c.String(),
                    PhoneNumber = c.String(),
                    OrginOfContact = c.String(),
                    FirstContactedByUserName = c.String(),
                    FirstContactNotes = c.String(),
                    GeneralNotes = c.String(),
                    FirstContactedDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    NextContactByUserName = c.String(),
                    NextContactDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    NextContactNotes = c.String(),
                    NumberOfContacts = c.Int(nullable: false),
                    NextContactType = c.String(),
                    ContactPosition = c.Int(nullable: false),
                    PictureFileName = c.String(),
                    Interests = c.String(),
                    FamilyInfo = c.String(),
                    SpotifyUserId = c.String(),
                    SnapchatUserId = c.String(),
                    TwitterHandle = c.String(),
                    FacebookId = c.String(),
                    CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    CRMOwner_Id = c.Int(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMOwners", t => t.CRMOwner_Id)
                .ForeignKey("dbo.CRMOwners", t => t.CRMOwnerId, cascadeDelete: true)
                .Index(t => t.CRMOwnerId)
                .Index(t => t.CRMOwner_Id);

            CreateTable(
                "dbo.CRMOwners",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    Name = c.String(nullable: false),
                    Address1 = c.String(),
                    Address2 = c.String(),
                    City = c.String(nullable: false),
                    State = c.String(nullable: false),
                    ZipCode = c.String(nullable: false),
                    PhoneNumber = c.String(),
                    PrimaryCRMOwnerContactId = c.Int(),
                    CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    EstimatedNumberOfHomes = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMOwnerContacts", t => t.PrimaryCRMOwnerContactId)
                .Index(t => t.PrimaryCRMOwnerContactId);

            CreateTable(
                "dbo.CRMFuneralHomes",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    Name = c.String(nullable: false),
                    Address1 = c.String(),
                    Address2 = c.String(),
                    City = c.String(nullable: false),
                    State = c.String(nullable: false),
                    ZipCode = c.String(nullable: false),
                    AddressConfirmed = c.Boolean(nullable: false),
                    Email = c.String(),
                    FuneralHomeNumber = c.String(),
                    Website = c.String(nullable: false),
                    HasCamera = c.Boolean(nullable: false),
                    IsRecording = c.Boolean(nullable: false),
                    WebcastingHistoryNotes = c.String(),
                    WebsiteProvider = c.Int(nullable: false),
                    HasMemorialFolders = c.Boolean(nullable: false),
                    PDFPublishingSoftware = c.Int(nullable: false),
                    PDFNotes = c.String(),
                    LeadWarmth = c.Int(nullable: false),
                    OwnershipType = c.Int(nullable: false),
                    OwnerFirstName = c.String(),
                    OwnerLastName = c.String(),
                    CRMOwnerId = c.Int(),
                    EstimatedCallsPerYear = c.Int(nullable: false),
                    HasAUserLogin = c.Boolean(nullable: false),
                    CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    PrimaryCRMContactId = c.Int(),
                    DevHome = c.Boolean(nullable: false),
                    FuneralHomeId = c.Int(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMOwners", t => t.CRMOwnerId)
                .ForeignKey("dbo.FuneralHomes", t => t.FuneralHomeId)
                .ForeignKey("dbo.CRMContacts", t => t.PrimaryCRMContactId)
                .Index(t => t.CRMOwnerId)
                .Index(t => t.PrimaryCRMContactId)
                .Index(t => t.FuneralHomeId);

            CreateTable(
                "dbo.CRMSatelliteLocations",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    CRMFuneralHomeId = c.Int(nullable: false),
                    Name = c.String(),
                    Address1 = c.String(),
                    Address2 = c.String(),
                    City = c.String(nullable: false),
                    State = c.String(nullable: false),
                    ZipCode = c.String(nullable: false),
                    AddressConfirmed = c.Boolean(nullable: false),
                    FuneralHomeNumber = c.String(),
                    CreateDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    DevHome = c.Boolean(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMFuneralHomes", t => t.CRMFuneralHomeId, cascadeDelete: true)
                .Index(t => t.CRMFuneralHomeId);

            CreateTable(
                "dbo.CRMContactHistoryComments",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    IsDeleted = c.Boolean(nullable: false),
                    CRMContactHistoryId = c.Int(),
                    Comment = c.String(),
                    CommentDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
                    UserName = c.String(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CRMContactHistories", t => t.CRMContactHistoryId, cascadeDelete: true)
                .Index(t => t.CRMContactHistoryId);

            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "PictureFileName", c => c.String());
            AddColumn("dbo.AspNetUsers", "SpotifyUserId", c => c.String());
            AddColumn("dbo.AspNetUsers", "SnapchatUserId", c => c.String());
            AddColumn("dbo.AspNetUsers", "TwitterHandle", c => c.String());
            AddColumn("dbo.AspNetUsers", "FacebookId", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CRMContactHistoryComments", "CRMContactHistoryId", "dbo.CRMContactHistories");
            DropForeignKey("dbo.CRMContacts", "CRMFuneralHomeId", "dbo.CRMFuneralHomes");
            DropForeignKey("dbo.CRMOwnerContacts", "CRMOwnerId", "dbo.CRMOwners");
            DropForeignKey("dbo.CRMOwners", "PrimaryCRMOwnerContactId", "dbo.CRMOwnerContacts");
            DropForeignKey("dbo.CRMOwnerContacts", "CRMOwner_Id", "dbo.CRMOwners");
            DropForeignKey("dbo.CRMSatelliteLocations", "CRMFuneralHomeId", "dbo.CRMFuneralHomes");
            DropForeignKey("dbo.CRMFuneralHomes", "PrimaryCRMContactId", "dbo.CRMContacts");
            DropForeignKey("dbo.CRMFuneralHomes", "FuneralHomeId", "dbo.FuneralHomes");
            DropForeignKey("dbo.CRMFuneralHomes", "CRMOwnerId", "dbo.CRMOwners");
            DropForeignKey("dbo.CRMContacts", "CRMFuneralHome_Id", "dbo.CRMFuneralHomes");
            DropForeignKey("dbo.CRMContactHistories", "CRMOwnerContactId", "dbo.CRMOwnerContacts");
            DropForeignKey("dbo.CRMContactHistories", "CRMContactId", "dbo.CRMContacts");
            DropIndex("dbo.CRMContactHistoryComments", new[] { "CRMContactHistoryId" });
            DropIndex("dbo.CRMSatelliteLocations", new[] { "CRMFuneralHomeId" });
            DropIndex("dbo.CRMFuneralHomes", new[] { "FuneralHomeId" });
            DropIndex("dbo.CRMFuneralHomes", new[] { "PrimaryCRMContactId" });
            DropIndex("dbo.CRMFuneralHomes", new[] { "CRMOwnerId" });
            DropIndex("dbo.CRMOwners", new[] { "PrimaryCRMOwnerContactId" });
            DropIndex("dbo.CRMOwnerContacts", new[] { "CRMOwner_Id" });
            DropIndex("dbo.CRMOwnerContacts", new[] { "CRMOwnerId" });
            DropIndex("dbo.CRMContactHistories", new[] { "CRMOwnerContactId" });
            DropIndex("dbo.CRMContactHistories", new[] { "CRMContactId" });
            DropIndex("dbo.CRMContacts", new[] { "CRMFuneralHome_Id" });
            DropIndex("dbo.CRMContacts", new[] { "CRMFuneralHomeId" });
            DropColumn("dbo.AspNetUsers", "FacebookId");
            DropColumn("dbo.AspNetUsers", "TwitterHandle");
            DropColumn("dbo.AspNetUsers", "SnapchatUserId");
            DropColumn("dbo.AspNetUsers", "SpotifyUserId");
            DropColumn("dbo.AspNetUsers", "PictureFileName");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropTable("dbo.CRMContactHistoryComments");
            DropTable("dbo.CRMSatelliteLocations");
            DropTable("dbo.CRMFuneralHomes");
            DropTable("dbo.CRMOwners");
            DropTable("dbo.CRMOwnerContacts");
            DropTable("dbo.CRMContactHistories");
            DropTable("dbo.CRMContacts");
        }
    }
}
