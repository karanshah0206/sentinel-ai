using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sentinel.ai.domain.Dto
{
    internal record BehaviouralAssessment
    {
        private Guid _id;
        private Subject _subject;
        private Verdict _verdict;
        private DateTime _createdAt;

        public BehaviouralAssessment(Subject subject, Verdict verdict)
        {
            _id = Guid.NewGuid();
            _subject = subject;
            _verdict = verdict;
            _createdAt = DateTime.Now;
        }
    }
}
