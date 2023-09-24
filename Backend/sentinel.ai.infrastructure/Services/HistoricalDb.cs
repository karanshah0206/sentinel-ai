using sentinel.ai.domain.Dto;
using sentinel.ai.domain.interfaces;

namespace sentinel.ai.infrastructure.services;

public class HistoricalDb : IHistoryRepo
{
    public HistoricalDb()
    {

    }

    public Task GetAll(IEnumerable<BehaviouralAssessment> assessments)
    {
        throw new NotImplementedException();
    }

    public Task Insert(BehaviouralAssessment assessment)
    {
        throw new NotImplementedException();
    }

    public Task UpdateLatest()
    {
        throw new NotImplementedException();
    }
}