using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyRecipe.Models;

namespace MyRecipe.Controllers
{
    public class RatingsController : Controller
    {
        private readonly CustomizeRecipeContext _context;

        public RatingsController(CustomizeRecipeContext context)
        {
            _context = context;
        }

        // GET: Ratings
        public async Task<IActionResult> Index()
        {
            var ratings = _context.Ratings.Include(r => r.Recipe);
            return View(await ratings.ToListAsync());
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var rating = await _context.Ratings
                .Include(r => r.Recipe)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (rating == null)
                return NotFound();

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            ViewData["RecipeId"] = new SelectList(_context.Recipes, "Id", "Title");
            return View();
        }

        // POST: Ratings/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,RecipeId,Score")] Rating rating)
        {
            if (ModelState.IsValid)
            {
                rating.CreatedAt = DateTime.Now;
                _context.Add(rating);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            ViewData["RecipeId"] = new SelectList(_context.Recipes, "Id", "Title", rating.RecipeId);
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
                return NotFound();

            ViewData["RecipeId"] = new SelectList(_context.Recipes, "Id", "Title", rating.RecipeId);
            return View(rating);
        }

        // POST: Ratings/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RecipeId,Score,CreatedAt")] Rating rating)
        {
            if (id != rating.Id)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(rating);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RatingExists(rating.Id))
                        return NotFound();
                    else
                        throw;
                }
                return RedirectToAction(nameof(Index));
            }

            ViewData["RecipeId"] = new SelectList(_context.Recipes, "Id", "Title", rating.RecipeId);
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var rating = await _context.Ratings
                .Include(r => r.Recipe)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (rating == null)
                return NotFound();

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating != null)
                _context.Ratings.Remove(rating);

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RatingExists(int id)
        {
            return _context.Ratings.Any(e => e.Id == id);
        }
    }
}
