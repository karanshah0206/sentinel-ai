using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sentinel.ai.domain.Dto
{
    internal record Subject
    {
        private string _firstName;
        private string _secondName;

        public Subject(string firstName, string secondName)
        {
            _firstName = firstName;
            _secondName = secondName;
        }
    }
}
