using System.Configuration;
using System.Data;
using System.Data.Common;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using sentinel.ai.domain.Dto;
using sentinel.ai.domain.interfaces;

namespace sentinel.ai.infrastructure.services;

public class HistoricalDb : IHistoryRepo
{
    private class DBConfig
    {
        public string? Host { get; set; }
        public int Port { get; set; }
        public string? Database { get; set; }
        public string? User { get; set; }
        public string? HistoryTable { get; set; }
    }

    private readonly MySqlConnection _dbConnection;
    private readonly DBConfig _dbConfig;

    public HistoricalDb()
    {
        _dbConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build()
            .GetRequiredSection("DatabaseConnection").Get<DBConfig>()
            ?? throw new InvalidOperationException("Invalid database connection configuration.");

        string password = Environment.GetEnvironmentVariable("DATABASE__PASSWORD")
            ?? throw new ConfigurationErrorsException("Database password not set in environment.");

        _dbConnection = new MySqlConnection(
            $"Server={_dbConfig.Host};" +
            $"Port={_dbConfig.Port};" +
            $"Database={_dbConfig.Database};" +
            $"Uid={_dbConfig.User};" +
            $"Pwd={password};"
        );
    }

    public Task<IEnumerable<BehaviouralAssessment>> GetAll()
    {
        return _dbConnection.QueryAsync<BehaviouralAssessment>($"SELECT * FROM {_dbConfig.HistoryTable};");
    }

    public bool Insert(BehaviouralAssessment assessment)
    {
        var command = new MySqlCommand($"INSERT INTO {_dbConfig.HistoryTable} (Timestamp, Image) VALUES (@timestamp, @imageBlob);", _dbConnection);
        command.Parameters.Add("@timestamp", MySqlDbType.DateTime).Value = assessment.Timestamp;
        command.Parameters.Add("@imageBlob", MySqlDbType.LongBlob).Value = assessment.Image;
        _dbConnection.Open();
        var result = command.ExecuteNonQuery();
        _dbConnection.Close();
        return result == 1;
    }

    public Task UpdateLatest(string verdict, double confidence)
    {
        throw new NotImplementedException();
    }
}