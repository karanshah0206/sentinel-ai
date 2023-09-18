using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sentinel.ai.domain.Dto
{
    // Root table
    internal class BehaviouralAssessment
    {
        private Guid _id;
        private Subject _subject; //May not be required
        private Verdict _verdict;
        private DateTime _createdDate;

        public BehaviouralAssessment()
        {
            _id = Guid.NewGuid();
            _subject = new Subject();
            _verdict = new Verdict();
            _createdDate = DateTime.Now;
        }
    }
}
