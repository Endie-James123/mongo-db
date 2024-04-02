import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AgeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userAge = request.user.age; // Assuming user age is stored in the request user object

    // Check if user's age is less than 18
    if (userAge < 18) {
      return false; // Block access
    }

    return true; // Allow access
  }
}
