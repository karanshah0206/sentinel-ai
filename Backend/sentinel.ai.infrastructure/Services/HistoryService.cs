using sentinel.ai.domain.Dto;
using sentinel.ai.domain.Services;

namespace sentinel.ai.infrastructure.Services
{
    public class HistoryService : IHistoryService
    {
        public HistoryService()
        {
        }

        public Task<IEnumerable<BehaviouralAssessment>> GetAll()
        {
            throw new NotImplementedException();
        }
    }

    internal interface ILogger
    {
    }
}