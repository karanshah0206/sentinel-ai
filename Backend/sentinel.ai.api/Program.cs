using sentinel.ai.infrastructure.Hubs;

// Setup Environment Variables
foreach (var line in File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), ".env")))
{
    var parts = line.Split("=", StringSplitOptions.RemoveEmptyEntries);
    if (parts.Length == 2) Environment.SetEnvironmentVariable(parts[0], parts[1]);
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddSignalR();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();
app.MapHub<VideoFeedHub>("/videoFeed");

app.Run();
