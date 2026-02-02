using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MyRecipe.Models;

[Table("Review")]
public partial class Review
{
    [Key]
    public int Id { get; set; }

    public int RecipeId { get; set; }

    public string Comment { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [ForeignKey("RecipeId")]
    [InverseProperty("Reviews")]
    public virtual Recipe? Recipe { get; set; }
}
