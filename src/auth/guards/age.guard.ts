import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AgeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userAge = request.user.age; // Assuming user age is stored in the request user object

    // Check if user's age is less than 18
    if (userAge < 18) {
        throw new UnauthorizedException('Access denied: User must be 18 years or older.');
    }
    return true; // Allow access
  }
}
