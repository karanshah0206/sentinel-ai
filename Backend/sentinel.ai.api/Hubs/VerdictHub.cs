using Microsoft.AspNetCore.SignalR;
using sentinel.ai.domain.Dto;

namespace sentinel.ai.infrastructure.Hubs
{
    public class VerdictHub : Hub
    {        
        public async Task SendVerdict(VerdictDto verdict)
        {
            await Clients.All.SendAsync("ReceiveVerdict", verdict);
        }
    }
}