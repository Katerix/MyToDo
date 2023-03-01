
using DataAccess.Models;

namespace BusinessLogic.Services.Contracts
{
    public interface IToDoService
    {
        Task<List<ToDo>> GetAll();
        Task<ToDo> Create(string todo);
        Task<ToDo> UpdateContent(int id, string content);
        Task<ToDo> UpdateStatus(int id, string status);
        Task<ToDo> Delete(int id);
        Task<ToDo> Find(int id);
    }
}
