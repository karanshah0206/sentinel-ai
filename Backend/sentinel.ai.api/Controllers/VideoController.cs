using Microsoft.AspNetCore.Mvc;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("video")]
public class VideoController : ControllerBase
{
    [HttpPost("raw")]
    public async Task<IActionResult> SendRawVideo([FromBody] byte[] stream)
    {
        using (var StreamReader = new StreamReader(Request.Body))
        {
            Console.WriteLine(StreamReader);
        }

        return Ok();
    }
}