using Microsoft.AspNetCore.Mvc;
using sentinel.ai.domain.Dto;
using sentinel.ai.domain.interfaces;
using sentinel.ai.infrastructure.services;

namespace sentinel.ai.api.Controllers;

[ApiController]
[Route("[controller]")]
public class HistoryController : ControllerBase
{
    private IHistoryRepo _historyRepo;

    public HistoryController()
    {
        _historyRepo = new HistoricalDb();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetHistory()
    {
        return Ok(await _historyRepo.GetAll());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult SetHistory(Base64Image base64Image)
    {
        try
        {
            BehaviouralAssessment assessment = new()
            {
                Timestamp = DateTime.Now,
                Image = Convert.FromBase64String(base64Image.Image)
            };
            if (_historyRepo.Insert(assessment))
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