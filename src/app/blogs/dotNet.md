#dotnet #csharp #web_dev 

#### Basic Command
```cmd
# create new app
dotnet new web -o ProjectName
# start new app with auto-reload
dotnet watch --no-hot-reload

# install packages
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design

# scaffold command
dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook" Microsoft.EntityFrameworkCore.SqlServer

dotnet ef dbcontext scaffold "Server=Marius\SQLEXPRESS;Database=Learn_DB;Trusted_Connection=True" Microsoft.EntityFrameworkCore.SqlServer --output-dir Models


Data Source=Marius\SQLEXPRESS;Database=Learn_DB;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False

```

#### Authentication by AddDataProtection

We can use built-in DataProtection package in ASP.net Core to add encoding for authentication.

```C#
using Microsoft.AspNetCore.DataProtection
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDataProtection();
var app = builder.Build();

app.MapGet("/username", (HttpContext ctx, IDataProtectionProvider idp) =>
{
    var protector = idp.CreateProtector("auth-cookie"); // encoding the cookie
    var authCookie = ctx.Request.Headers.Cookie.FirstOrDefault(x => x.StartsWith("auth="));  // cookie "auth=..." is encoded here, see login cookie format, all cookie starts with "auth="
    var protectedPayload = authCookie.Split("=").Last();  
    var payload = protector.Unprotect(protectedPayload); //decode cookie part
    var parts = payload.Split(":");
    var key = parts[0];
    var value = parts[1];
    return $"{value}:{protectedPayload}";
}
);

app.MapGet("/login", (HttpContext ctx, IDataProtectionProvider idp) =>
{
    var protector = idp.CreateProtector("auth-cookie");
    ctx.Response.Headers.SetCookie = $"auth={protector.Protect("usr:anton")}";
    return "OK";
}
);

app.Run();
```

While using built-in UseAuthentication pkg will wrap up the DataProtection, HttpContextAccessor and creation of a middleware service.

```C#
builder.Services.AddAuthentication("cookie").AddCookie("cookie");

app.UseAuthentication();

app.MapGet("/login", async (HttpContext ctx)=>{
     var claims = new List<Claim>();
     claims.Add(new Claim("usr","anton"));
     var identity = new ClaimsIdentity(claims,"cookie");
     ctx.User = new ClaimsPrincipal(identity);  
     await ctx.SignInAsync("cookie",user);
     return "Sign In OK!";
 });

```

#### DTO

help with data leakage

#### IActionResult

this will give you all functions of res body

#### Controller Based API

Endpoint has the path like "/Product/GetAll" with the code:

```C#
[ApiController]
[Route("[controller]")]
public class ProductController:ControllerBase{
    private readonly LearnDbContext _DBContext;
    public ProductController(LearnDbContext dbContext){
        this._DBContext = dbContext;
    }  

    [HttpGet("GetAll")]
    public IActionResult GetAll(){
        var product = this._DBContext.TblProducts.ToList();
        return Ok(product);
    }
}
```

Here `[Route("[controller]")]` would replace `[controller]` part with `Product` from the controller class name (Auto detect text before "Controller" string).