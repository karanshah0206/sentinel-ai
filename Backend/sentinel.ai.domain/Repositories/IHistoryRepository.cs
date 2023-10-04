using sentinel.ai.domain.Dto;

namespace sentinel.ai.domain.Repositories
{
    public interface IHistoryRepository
    {
        Task<IEnumerable<BehaviouralAssessment>> GetAll();
        bool InsertHistory(BehaviouralAssessment assessment);
        void UpdateLatestHistory(string verdict, double confidence);
    }
}