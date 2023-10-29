using sentinel.ai.domain.Dto;

namespace sentinel.ai.domain.Services
{
    public interface IHistoryService
    {
        Task<IEnumerable<BehaviouralAssessment>> GetAll();
    }
}