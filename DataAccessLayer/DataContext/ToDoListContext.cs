using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DataContext;

public partial class ToDoListContext : DbContext
{
    public ToDoListContext() { }

    public ToDoListContext(DbContextOptions<ToDoListContext> options)
        : base(options) { }

    public virtual DbSet<ToDo> ToDos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TASKLIST__3214EC079E8ED672");

            entity.ToTable("ToDo's");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.Status).HasColumnType("text");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
