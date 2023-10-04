using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using sentinel.ai.domain.Dto;
using sentinel.ai.infrastructure.Hubs;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class VerdictController : ControllerBase
{
    private readonly IHubContext<VerdictHub> _hubContext;

    public VerdictController(IHubContext<VerdictHub> context)
    {
        _hubContext = context;
    }

    //summary
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> KeyActions(VerdictDto verdict)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveVerdict", verdict);

        return Ok();
    }
    
}