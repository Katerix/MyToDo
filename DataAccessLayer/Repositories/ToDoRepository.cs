using DataAccess.DataContext;
using DataAccess.Models;
using DataAccess.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class ToDoRepository : IToDoRepository
    {
        private readonly ToDoListContext _context;
        public ToDoRepository(ToDoListContext context) => _context = context;

        public async Task<List<ToDo>> GetAll()
        {
            return await _context.Set<ToDo>().ToListAsync();
        }

        public async Task<ToDo> Find(int id)
        {
            return await _context.ToDos.Where(entity => entity.Id == id).FirstOrDefaultAsync();
        }

        public bool Exists(int id)
        {
            return _context.ToDos.Any(entity => entity.Id == id);
        }

        public async Task<ToDo> Create(ToDo model)
        {
            _context.Add(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<ToDo> Update(ToDo model)
        {
            _context.Update(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<ToDo> Delete(ToDo todo)
        {
            _context.Remove(todo);
            await _context.SaveChangesAsync();
            return todo;
        }
    }
}
