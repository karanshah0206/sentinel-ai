using sentinel.ai.infrastructure.Hubs;

foreach (var line in File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), ".env")))
{
    var parts = line.Split("=", StringSplitOptions.RemoveEmptyEntries);
    if (parts.Length == 2) Environment.SetEnvironmentVariable(parts[0], parts[1]);
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
builder =>
{
    builder.AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed((host) => true)
            .AllowCredentials();
}));

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

app.UseWebSockets();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<KeyActionHub>("/keyActionsHub");
    endpoints.MapHub<VerdictHub>("/verdictHub");
});

app.Run();