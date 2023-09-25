using sentinel.ai.domain.Dto;

namespace sentinel.ai.domain.interfaces
{
    public interface IHistoryRepo
    {
        bool Insert(BehaviouralAssessment assessment);
        Task<IEnumerable<BehaviouralAssessment>> GetAll();
        Task UpdateLatest(string verdict, double confidence);
    }
}