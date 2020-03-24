using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

		public string UserId { get; set; }
		public int? FuneralHomeId { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class SignUpViewModel
    {
        [Display(Name = "Funeral Home Name"), Required]
        public string Name { get; set; }

        [UIHint("City"), Required]
        public string City { get; set; }

        [UIHint("State"), Required]
        public string State { get; set; }

        [Display(Name = "Zip Code"), RegularExpression(@"(?:\d{5}-\d{4})|(?:\d{5})", ErrorMessage = "Not a valid zip code"), Required]
        public int ZipCode { get; set; }

        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Login Name"), Required]
        public string UserName { get; set; }

        public int? OwnerId { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        [Display(Name = "Dev Home(Will be ignored from analyitcs)")]
        public bool DevHome { get; set; }

        public bool IsCharged { get; set; }

        public int Price { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
    public class ResetPasswordViewModel
    {
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }
    public class CreateViewModel
    {
        [StringLength(20,MinimumLength=5)]
        [Display(Name="User Name")]
        public string UserName { get; set; }
        [Display(Name = "Full Name")]
        [StringLength(20, MinimumLength = 5)]
        public string Name { get; set; }
        [Display(Name="Role")]
        public string MainRole { get; set; }
        [Display(Name = "Password")]
        [StringLength(20, MinimumLength = 5)]
        public string PlainPassword { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

    }
    public class AdminCreateViewModel
    {
        public int Id { get; set; }
        [StringLength(20, MinimumLength = 5)]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        [Display(Name = "Full Name")]
        [StringLength(20, MinimumLength = 5)]
        public string Name { get; set; }
        [Display(Name = "First Name"), Required]
		public string FirstName { get; set; }
        [Display(Name = "Last Name"), Required]
        public string LastName { get; set; }
        [Display(Name = "Role")]
        public string MainRole { get; set; }
        [Display(Name = "Password")]
        [StringLength(20, MinimumLength = 5)]
        public string PlainPassword { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
       public string PhoneNumber { get; set; }
        
        public string PictureFileName { get; set; }

        [Display (Name="Spotify UserId")]
        public string SpotifyUserId { get; set; }
        [Display(Name="Snapchat UserId ")]
        public string SnapchatUserId { get; set; }
        [Display (Name="Twitter Handle")]
        public string TwitterHandle { get; set; }
        [Display (Name="Facebook ID")]
        public string FacebookId { get; set; }

    }
	public class UserRoleViewModel
	{
		public ApplicationUser User { get; set; }

		public List<IdentityRole> Roles { get; set; }
	}

    public class EditViewModel
    {
        [StringLength(20, MinimumLength = 5)]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        [Display(Name = "Full Name")]
        [StringLength(20, MinimumLength = 5)]
        public string Name { get; set; }
        [Display(Name = "Role")]
        public ICollection<IdentityUserRole> Roles { get; set; }
        [Display(Name = "Password")]
        public string PlainPassword { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

    }
    public class AdminEditViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [StringLength(20, MinimumLength = 5)]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        [Display(Name = "Full Name")]
        [StringLength(20, MinimumLength = 5)]
        public string Name { get; set; }
        [Display(Name = "First Name"), Required]
        public string FirstName { get; set; }
        [Display(Name = "Last Name"), Required]
        public string LastName { get; set; }
        [Display(Name = "Password")]
        public string PlainPassword { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
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
}
