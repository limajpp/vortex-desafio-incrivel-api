import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        `User has no permission to perform that action. In order to do that, you must be logged in.`,
      );
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    const payload = await this.jwtService.verifyAsync(token, {
      secret,
    });
    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(request: {
    headers: { authorization: { split: (arg0: string) => never[] } };
  }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
