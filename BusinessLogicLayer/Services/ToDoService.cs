
using DataAccess.Models;
using DataAccess.Repositories.Contracts;
using BusinessLogic.Services.Contracts;

namespace BusinessLogic.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _repository;

        public ToDoService(IToDoRepository repository) => _repository = repository;

        public Task<ToDo> Create(string todo)
        {
            try
            {
                return _repository.Create(new ToDo((int)DateTime.Now.Ticks, todo));
            }
            catch
            {
                throw;
            }
        }

        public Task<ToDo> Delete(int id)
        {
            if (_repository.Exists(id))
                try
                {
                    return _repository.Delete(_repository.Find(id).Result);
                }
                catch
                {
                    throw;
                }
            else
                return Task.Run(() => new ToDo());
        }
        public Task<ToDo> Find(int id)
        {
            try
            {
                return _repository.Find(id);
            }
            catch (Exception) 
            {
                return Task.Run(() => new ToDo());
            }
        }           
        public Task<List<ToDo>> GetAll()
        {
            try
            {
                return _repository.GetAll();
            }
            catch
            {
                throw;
            }
        }

        public Task<ToDo> UpdateContent(int id, string content)
        {
            var entity = Find(id).Result;

            if (entity.Id != -1)
                try
                {
                    entity.Content = content;
                    return _repository.Update(entity);
                }
                catch
                {
                    throw;
                }
            else
                return Task.Run(() => new ToDo());
        }

        public Task<ToDo> UpdateStatus(int id, string status)
        {
            var entity = Find(id).Result;

            if (entity.Id != -1)
                try
                {
                    entity.Status = status;
                    return _repository.Update(entity);
                }
                catch
                {
                    throw;
                }
            else
                return Task.Run(() => new ToDo());
        }
    }
}
