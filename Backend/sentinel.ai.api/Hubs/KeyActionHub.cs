using Microsoft.AspNetCore.SignalR;
using sentinel.ai.domain.Dto;

namespace sentinel.ai.infrastructure.Hubs
{
    public class KeyActionHub : Hub
    {
        public async Task SendKeyAction(KeyAction action)
        {
            await Clients.All.SendAsync("ReceiveKeyActions", action);
        }
    }
}