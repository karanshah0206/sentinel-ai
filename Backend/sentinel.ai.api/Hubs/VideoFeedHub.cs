using Microsoft.AspNetCore.SignalR;

namespace sentinel.ai.infrastructure.Hubs
{
    public class VideoFeedHub : Hub
    {
        public async Task SendVideoFeed(byte[] videoData)
        {
            await Clients.All.SendAsync("ReceiveVideoFeed", videoData);
        }
    }
}