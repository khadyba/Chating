import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  We can now implement our protected route and register our AuthGuard to protect it.
  
  Open the auth.controller.ts file and update it as shown below:
  
  auth.controller.tsJS
  
  import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  We're applying the AuthGuard that we just created to the GET /profile route so that it will be protected.
  
  Ensure the app is running, and test the routes using cURL.
  
  
  $ # GET /profile
  $ curl http://localhost:3000/auth/profile
  {"statusCode":401,"message":"Unauthorized"}
  
  $ # POST /auth/login
  $ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
  {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}
  
  $ # GET /profile using access_token returned from previous step as bearer code
  $ curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
  {"sub":1,"username":"john","iat":...,"exp":...}
  Note that in the AuthModule, we configured the JWT to have an expiration of 60 seconds. This is too short an expiration, and dealing with the details of token expiration and refresh is beyond the scope of this article. However, we chose that to demonstrate an important quality of JWTs. If you wait 60 seconds after authenticating before attempting a GET /auth/profile request, you'll receive a 401 Unauthorized response. This is because @nestjs/jwt automatically checks the JWT for its expiration time, saving you the trouble of doing so in your application.
  
  We've now completed our JWT authentication implementation. JavaScript clients (such as Angular/React/Vue), and other JavaScript apps, can now authenticate and communicate securely with our API Server.
  
  Enable authentication globally#
  If the vast majority of your endpoints should be protected by default, you can register the authentication guard as a global guard and instead of using @UseGuards() decorator on top of each controller, you could simply flag which routes should be public.
  
  First, register the AuthGuard as a global guard using the following construction (in any module, for example, in the AuthModule):
  
  
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  With this in place, Nest will automatically bind AuthGuard to all endpoints.
  
  Now we must provide a mechanism for declaring routes as public. For this, we can create a custom decorator using the SetMetadata decorator factory function.
  
  
  import { SetMetadata } from '@nestjs/common';
  
  export const IS_PUBLIC_KEY = 'isPublic';
  export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
  In the file above, we exported two constants. One being our metadata key named IS_PUBLIC_KEY, and the other being our new decorator itself that we’re going to call Public (you can alternatively name it SkipAuth or AllowAnon, whatever fits your project).
  
  Now that we have a custom @Public() decorator, we can use it to decorate any method, as follows:
  
  
  @Public()
  @Get()
  findAll() {
    return [];
  }
  Lastly, we need the AuthGuard to return true when the "isPublic" metadata is found. For this, we'll use the Reflector class (read more here).
  
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  Passport integration#
  Passport is the most popular node.js authentication library, well-known by the community and successfully used in many production applications. It's straightforward to integrate this library with a Nest application using the @nestjs/passport module.
  
  To learn how you can integrate Passport with NestJS, check out this chapter.
  
  Example#
  You can find a complete version of the code in this chapter here.
  
  Support us
  Nest is an MIT-licensed open source project. It can grow thanks to the support by these awesome people. If you'd like to join them, please read more here.
  
  Principal Sponsors
  Trilon LogoMarblism LogoMojam LogoAmplication Logo
  Sponsors / Partners
  Become a sponsor
  Join our Newsletter
  Subscribe to stay up to date with the latest Nest updates, features, and videos!
  
  Email address..
  
  Copyright © 2017-2024 MIT by Kamil Mysliwiec design by Jakub Staron
  Official NestJS Consulting Trilon.io hosted by Netlify