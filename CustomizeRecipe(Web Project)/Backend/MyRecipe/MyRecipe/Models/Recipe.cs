using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MyRecipe.Models;

[Table("Recipe")]
public partial class Recipe
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; } = null!;

    public string Ingredients { get; set; } = null!;

    public string Instructions { get; set; } = null!;

    [StringLength(255)]
    public string? CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [InverseProperty("Recipe")]
    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    [InverseProperty("Recipe")]
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
