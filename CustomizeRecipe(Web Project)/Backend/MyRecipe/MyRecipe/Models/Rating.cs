using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MyRecipe.Models;

[Table("Rating")]
public partial class Rating
{
    [Key]
    public int Id { get; set; }

    public int RecipeId { get; set; }

    public int Score { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [ForeignKey("RecipeId")]
    [InverseProperty("Ratings")]
    public virtual Recipe? Recipe { get; set; }
}
