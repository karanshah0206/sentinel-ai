using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using sentinel.ai.domain.Dto;
using sentinel.ai.infrastructure.Hubs;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class KeyActionsController : ControllerBase
{
    private readonly IHubContext<KeyActionHub> _hubContext;

    public KeyActionsController(IHubContext<KeyActionHub> context)
    {
        _hubContext = context;
    }

    //summary
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> KeyActions(KeyAction action)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveKeyAction", action);

        return Ok();
    }
}