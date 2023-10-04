using Microsoft.AspNetCore.Mvc;
using sentinel.ai.domain.Dto;
using sentinel.ai.infrastructure.Hubs;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class KeyActionsController : ControllerBase
{
    private readonly KeyActionHub _keyActionHub;
    public KeyActionsController()
    {
    }

    //summary
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> KeyActions(KeyAction request)
    {
        // await _keyActionHub.SendKeyAction(request);

        return Ok();
    }
}