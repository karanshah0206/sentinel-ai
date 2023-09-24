namespace sentinel.ai.domain.Dto
{
    public class BehaviouralAssessment
    {
        public Guid Identifer { get; set; }
        public Verdict? Verdict { get; set; }
        public double? Confidence { get; set; }
        public byte[] Image { get; set; }
    }
}
