// own-user.guard.ts
import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnUserGuard implements CanActivate {
  private readonly logger = new Logger(OwnUserGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      this.logger.error('Token not present');
      return false; // Token not present, deny access
    }
    
    try {
      const decoded = this.jwtService.verify(token); // Verify and decode the JWT token
      const username = decoded.username; // Extract username from decoded token
      const requestedUsername = context.switchToHttp().getRequest().params.username; // Extract requested username from route params
      this.logger.log(`username: ${username}, requestedUsername: ${requestedUsername}`);
      if (username === requestedUsername) {
        return true; // Return true if the username matches requestedUsername
      } else {
        this.logger.error('Access denied: Username does not match');
        return false; // Access denied if username does not match requestedUsername
      }
    } catch (err) {
      this.logger.error('Token verification failed');
      return false; // Token verification failed, deny access
    }
  }
}
