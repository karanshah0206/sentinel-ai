using Microsoft.AspNetCore.Mvc;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class HistoryController : ControllerBase
{
    public HistoryController() { }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetHistory()
    {
        return Ok("GetHistory controller");
    }

}