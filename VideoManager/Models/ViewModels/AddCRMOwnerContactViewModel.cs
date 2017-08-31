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

	public class AddCRMownerContactViewModel
	{
        public virtual CRMOwner CRMOwner { get; set; }
        [Key]
        public int? CRMOwnerId { get; set; }

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
        [Display(Name = "Orgin Of Contact"), UIHint("Where did you meet them? Trade show, internet, bar?")]
        public string OrginOfContact { get; set; }
        [Display(Name = "First Contacted By")]
        public string FirstContactedByUserName { get; set; }
        [Display(Name = "First Contact Notes")]
        public string FirstContactNotes { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "First Contact Date")]
        public DateTime? FirstContactedDate { get; set; }
        [Display(Name = "Next Contact By")]
        public string NextContactByUserName { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "Next Contact Date")]
        public DateTime NextContactDate { get; set; }
        [Display(Name = "Next Contact Notes")]
        public string NextContactNotes { get; set; }
        [Display(Name = "Number of Contacts")]
        public int NumberOfContacts { get; set; }

        [Display(Name = "How should we contact them next")]
        public string NextContactType { get; set; }
        [Display(Name = "Position")]
        public ContactPosition ContactPosition { get; set; }
        public string PictureFileName { get; set; }

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

	
	}
}