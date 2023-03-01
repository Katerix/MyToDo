using DataAccess.DataContext;
using DataAccess.Repositories;
using DataAccess.Repositories.Contracts;
using BusinessLogic.Services;
using BusinessLogic.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Web.Http;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Sql")));

builder.Services.AddScoped<IToDoRepository, ToDoRepository>();
builder.Services.AddScoped<IToDoService, ToDoService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("_MyAllowSubdomainPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.MapControllers();

app.UseCors();

app.Run();
