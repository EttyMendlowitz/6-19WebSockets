using _6_19WebSockets.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Query;
using System.Runtime.InteropServices;

namespace _6_19WebSockets.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class JobsController : ControllerBase
    {

        private readonly string _connectionString;

        private IHubContext<JobHub> _hub;

        public JobsController(IConfiguration configuration, IHubContext<JobHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
        }

        [Route("addjob")]
        [HttpPost]
        public void AddJob(Job job)
        {
            var repo = new JobsRepository(_connectionString);
            repo.AddJob(job);
            _hub.Clients.All.SendAsync("newJobRecieved", job);
        }

        [Route("getall")]
        [HttpGet]
        public List<Job> GetAllJobs()
        {
            var repo = new JobsRepository(_connectionString);
            return repo.GetAllJobs();
        }

        [Route("setbeingdone")]
        [HttpPost]
        public void SetBeingDone(Job job)
        {
            var userRepo = new UserRepository(_connectionString);
            User user = null;
            if (User.Identity.IsAuthenticated)
            {
                user = userRepo.GetByEmail(User.Identity.Name);
            }
            job.UserId = user.Id;
            var repo = new JobsRepository(_connectionString);
            repo.SetBeingDone(job);
            _hub.Clients.All.SendAsync("jobUpdate", repo.GetAllJobs());
        }

        [Route("setdone")]
        [HttpPost]
        public void setDone(Job job)
        {
            var repo = new JobsRepository(_connectionString);
            repo.SetDone(job);
            _hub.Clients.All.SendAsync("jobUpdate", repo.GetAllJobs());
        }

    }
}
