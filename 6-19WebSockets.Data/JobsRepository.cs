using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _6_19WebSockets.Data
{
    public class JobsRepository
    {
        private readonly string _connectionString;

        public JobsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddJob(Job job)
        {
            using var context = new JobsDbContext(_connectionString);
            context.Jobs.Add(job);
            context.SaveChanges();
        }

        public List<Job> GetAllJobs()
        {
            using var context = new JobsDbContext(_connectionString);
            return context.Jobs.Include(j => j.User).ToList();
        }

        public void SetBeingDone(Job job)
        {
            using var context = new JobsDbContext(_connectionString);
            context.Jobs.Update(job);
            context.SaveChanges();
        }

        public void SetDone(Job job)
        {
            using var context = new JobsDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Jobs WHERE id = {job.Id}");
            context.SaveChanges();
        }
    }
}
