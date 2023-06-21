
using Microsoft.AspNetCore.Authentication.Cookies;

namespace _6_19WebSockets.Web
{
    public class Program
    {
        private static string CookieScheme = "6-19WebSockets";
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(CookieScheme)
          .AddCookie(CookieScheme, options =>
          {
              options.Events = new CookieAuthenticationEvents
              {
                  OnRedirectToLogin = context =>
                  {
                      context.Response.StatusCode = 403;
                      context.Response.ContentType = "application/json";
                      var result = System.Text.Json.JsonSerializer.Serialize(new { error = "You are not authenticated" });
                      return context.Response.WriteAsync(result);
                  }
              };
          });

            builder.Services.AddSession();

            // Add services to the container.

            builder.Services.AddControllersWithViews();
            builder.Services.AddSignalR();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapHub<JobHub>("/api/jobs");

            app.MapControllerRoute(
              name: "default",
              pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}