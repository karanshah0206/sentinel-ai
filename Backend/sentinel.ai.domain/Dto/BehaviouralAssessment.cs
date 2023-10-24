namespace sentinel.ai.domain.Dto
{
    public class BehaviouralAssessment
    {
        public int ID { get; }
        public DateTime Timestamp { get; set; }
        public string? Verdict { get; set; }
        public double? Confidence { get; set; }
        public byte[] Image { get; set; }
    }
}