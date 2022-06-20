import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService : JwtService){}

  canActivate(    context: ExecutionContext,  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if(bearer !== 'Bearer' || !token){
        throw new UnauthorizedException({message : 'Неавторизированный пользователь'})        
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return true;

    } catch (error) {
      throw new UnauthorizedException({message : 'Неавторизированный пользователь'})      
    }
    
    
    

    return true;
    
  }
}