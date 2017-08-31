using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.Data;

namespace VideoManager.Models.ViewModels
{
	//List of relevant info pulled from funeralhome
	public class EditContactViewModel
	{
        public int Id { get; set; }
        public virtual CRMFuneralHome CRMFuneralHome { get; set; }

        public int CRMFuneralHomeId { get; set; }

        [Display(Name = "First Name"), Required]
        public string FirstName { get; set; }
        [Display(Name = "Last Name"), Required]
        public string LastName { get; set; }
        [Display(Name = "City")]
        public string City { get; set; }

        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string Email { get; set; }
        [Display(Name = "Phone"), RegularExpression(@"\b(?:\d{3}[-.]?)?\d{3}[-.]?\d{4}\b", ErrorMessage = "Not a valid phone number."), Phone(ErrorMessage = "Not a valid phone number.")]
        public string PhoneNumber { get; set; }
        [Display(Name = "General Notes")]
        public string GeneralNotes { get; set; }
      
        [Display(Name = "Position")]
        public ContactPosition ContactPosition { get; set; }
        [Display(Name = "Lead Warmth")]
        public LeadWarmth LeadWarmth { get; set; }
        public string PictureFileName { get; set; }
        public string BannerPictureFileName { get; set; }

        [Display(Name = "Interests")]
        public string Interests { get; set; }
        [Display(Name = "Family Information")]
        public string FamilyInfo { get; set; }
        [Display(Name = "Spotify UserId")]
        public string SpotifyUserId { get; set; }
        [Display(Name = "Snapchat UserId ")]
        public string SnapchatUserId { get; set; }
        [Display(Name = "Twitter Handle")]
        public string TwitterHandle { get; set; }
        [Display(Name = "Facebook ID")]
        public string FacebookId { get; set; }
        public int? oldFuneralHomeId { get; set; }
	
	}
}