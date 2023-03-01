
namespace DataAccess.Models;

public class ToDo
{
    public int Id { get; set; }

    public string Content { get; set; }

    public string Status { get; set; }

    public ToDo(int id, string content, string state = "0")
    {
        Id = id;
        Content = content;
        Status = state;
    }
    public ToDo()
    {
        Id = -1;
        Content = string.Empty;
        Status = "0";
    }
}
