using BusinessLogic.Services.Contracts;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace Presentations.Controllers
{
    [EnableCors("_MyAllowSubdomainPolicy")]
    public class ToDoController : Controller
    {
        private readonly IToDoService _service;
        public ToDoController(IToDoService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("~/Create/{content}")]
        public Task<ToDo> Create(string content)
        {
            return _service.Create(content);
        }

        [HttpGet]
        [Route("~/GetAll")]
        public Task<List<ToDo>> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet]
        [Route("~/Find/{id}")]
        public Task<ToDo> Find(int id)
        {
            return _service.Find(id);
        }

        [HttpDelete]
        [Route("~/Delete/{id}")]
        public Task<ToDo> Delete(int id)
        {
            return _service.Delete(id);
        }

        [HttpPut]
        [Route("~/UpdateContent/{id}&{content}")]
        public Task<ToDo> Update(int id, string content)
        {
            return _service.UpdateContent(id, content);        
        }

        
        [HttpPut]
        [Route("~/UpdateStatus/{id}&{status}")]
        public Task<ToDo> UpdateStatus(int id, string status)
        {
            return _service.UpdateStatus(id, status);
        }

    }
}
