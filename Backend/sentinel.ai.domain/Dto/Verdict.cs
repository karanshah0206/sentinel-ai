using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sentinel.ai.domain.Dto
{
    internal class Verdict
    {
        private List<KeyAction> _keyActions;
        private Judgement _judgement;
        private float _confidenceLevel;


        public Judgement Judgement { get; set; }
        public float ConfidenceLevel { get; set; }

        public void addKeyAction(KeyAction keyAction)
        {
            _keyActions.Add(keyAction);
        }

        public Verdict()
        {
            _keyActions = new List<KeyAction>();
            _judgement = Judgement.Passive;
            _confidenceLevel = 0;
        }
    }

    enum KeyAction
    {
        //TODO: Create list of key suspicious actions
    }

    enum Judgement
    {
        Passive,
        Hostile
    }
}
