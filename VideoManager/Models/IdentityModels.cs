using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using VideoManager.Models.Data;

namespace VideoManager.Models
{   
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public bool Deleted { get; set; }

        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Display(Name = "Phone"), RegularExpression(@"\b(?:\d{3}[-.]?)?\d{3}[-.]?\d{4}\b", ErrorMessage = "Not a valid phone number."), Phone(ErrorMessage = "Not a valid phone number.")]
        public string PhoneNumber { get; set; }

        public string PictureFileName { get; set; }

        [Display(Name = "Spotify UserId")]
        public string SpotifyUserId { get; set; }
        [Display(Name = "Snapchat UserId ")]
        public string SnapchatUserId { get; set; }
        [Display(Name = "Twitter Handle")]
        public string TwitterHandle { get; set; }
        [Display(Name = "Facebook ID")]
        public string FacebookId { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{

			modelBuilder.Entity<Service>().HasOptional(x => x.Video).WithRequired(x => x.Service).WillCascadeOnDelete(true);
			modelBuilder.Entity<Service>().HasOptional(x => x.PDF).WithRequired(x => x.Service).WillCascadeOnDelete(true);
			modelBuilder.Entity<FuneralHome>().HasOptional(x => x.Setting).WithRequired(x => x.FuneralHome).WillCascadeOnDelete(true);
            //modelBuilder.Entity<CRMOwner>().HasMany(x => x.CRMFuneralHomes).WithOptional(x => x.CRMOwner).WillCascadeOnDelete(true);
			base.OnModelCreating(modelBuilder);
		}
        public ApplicationDbContext()
			: base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public System.Data.Entity.DbSet<VideoManager.Models.Data.Video> Videos { get; set; }

		public System.Data.Entity.DbSet<VideoManager.Models.Data.FuneralHome> FuneralHomes { get; set; }

		public System.Data.Entity.DbSet<VideoManager.Models.Data.Service> Services { get; set; }

		public System.Data.Entity.DbSet<VideoManager.Models.Data.PDF> PDFs { get; set; }

        public System.Data.Entity.DbSet<VideoManager.Models.Data.LiveStream> LiveStreams { get; set; }
		public System.Data.Entity.DbSet<VideoManager.Models.Data.Owner> Owners { get; set; }

		public System.Data.Entity.DbSet<VideoManager.Models.Data.Setting> Settings { get; set; }

        public System.Data.Entity.DbSet<VideoManager.Models.Data.Analytic> Analytics { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMOwner> CRMOwner { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMFuneralHome> CRMFuneralHome { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMContact> CRMContact { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMOwnerContact> CRMOwnerContact { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMSatelliteLocation> CRMSatelliteLocation { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMContactHistory> CRMContactHistory { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMContactHistoryComment> CRMContactHistoryComment { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMFuneralHomeHistory> CRMFuneralHomeHistory { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMFuneralHomeHistoryComment> CRMFuneralHomeHistoryComment { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CWFuneralHome> CWFuneralHomes { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CWObituary> CWObituary { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CWStaff> CWStaff { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CWFacebookSnapshot> CWFacebookSnapshot { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.VideoQueue> VideoQueues { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.DownloadAnalytic> DownloadAnalytics { get; set; }
        public System.Data.Entity.DbSet<VideoManager.Models.Data.CRMNotification> CRMNotifications { get; set; }
    }
}