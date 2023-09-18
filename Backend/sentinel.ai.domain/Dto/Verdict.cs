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

        public List<KeyAction> KeyActions { get; }
        public Judgement Judgement { get; set; }
        public float ConfidenceLevel { get; set; }

        public void addToKeyActions(KeyAction keyAction)
        {
            _keyActions.Add(keyAction);
        }

        public Verdict()
        {
            _keyActions = new List<KeyAction>();
            _judgement = Judgement.Passive;
            _confidenceLevel = 0.0f;
        }
    }

    enum KeyAction
    {
        //TODO: Add list of suspicious actions
    }

    enum Judgement
    {
        Passive,
        Hostile
    }
}
