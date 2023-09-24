using sentinel.ai.domain.Dto;

namespace sentinel.ai.domain.interfaces
{
    public interface IHistoryRepo
    {
        Task Insert(BehaviouralAssessment assessment);
        Task GetAll(IEnumerable<BehaviouralAssessment> assessments);
        Task UpdateLatest();
    }
}