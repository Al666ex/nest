import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private jwtService : JwtService,
              private reflector : Reflector){}

  canActivate(    context: ExecutionContext,  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass()
      ])

      if(!requireRole){return true}
      console.log(requireRole)

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if(bearer !== 'Bearer' || !token){
        throw new UnauthorizedException({message : 'Неавторизированный пользователь'})        
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return user.roles.some(role => requireRole.includes(role.value))
     // return true;

    } catch (error) {
      throw new HttpException('Нет доступа ', HttpStatus.FORBIDDEN)
    }
    
    
    

    return true;
    
  }
}