using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sentinel.ai.domain.Dto
{
    internal class Subject
    {
        private String _firstName;
        private String _lastName;

        public String FirstName { get; set; }
        public String LastName { get; set; }

        public Subject()
        {
            _firstName = "unknown";
            _lastName = "unknown";
        }
    }
}
