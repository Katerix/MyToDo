
using DataAccess.Models;

namespace DataAccess.Repositories.Contracts
{
    public interface IToDoRepository
    { 
        public Task<List<ToDo>> GetAll();
        public Task<ToDo> Find(int id);
        public bool Exists(int id);
        public Task<ToDo> Create(ToDo model);
        public Task<ToDo> Update(ToDo model);
        public Task<ToDo> Delete(ToDo model);
    }
}
