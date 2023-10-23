using Microsoft.AspNetCore.Mvc;
using sentinel.ai.domain.Dto;
using sentinel.ai.domain.Repositories;
using sentinel.ai.infrastructure.Repositories;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class HistoryController : ControllerBase
{
    private IHistoryRepository _historyRepo;

    public HistoryController()
    {
        _historyRepo = new HistoricalDb();
    }

    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetHistory()
    {
        return Ok(await _historyRepo.GetAll());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Create(Base64Image base64Image)
    {
        try
        {
            BehaviouralAssessment assessment = new()
            {
                Timestamp = DateTime.Now,
                Image = Convert.FromBase64String(base64Image.Image)
            };
            if (_historyRepo.InsertHistory(assessment))
            {
                return Ok("");
            }
            return StatusCode(500);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost("verdict")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateVerdict(VerdictDto verdict)
    {
        try
        {
            if (_historyRepo.UpdateLatestHistory(verdict))
            {
                return Ok("");
            }
            return StatusCode(500);
        }
        catch
        {
            return StatusCode(500);
        }
    }
}