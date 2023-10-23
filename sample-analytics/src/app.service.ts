import { Injectable } from '@nestjs/common';
import { createUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleCreateUserEvent(data: createUserEvent) {
    console.log('handle create user event - analytics', data);
    this.analytics.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }
}
