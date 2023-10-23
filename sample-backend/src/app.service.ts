import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { createUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  creatUser(CreateUserDto: CreateUserDto) {
    console.log({ CreateUserDto });
    this.users.push(CreateUserDto);
    this.communicationClient.emit(
      'user_created',
      new createUserEvent(CreateUserDto.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new createUserEvent(CreateUserDto.email),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
