import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env.config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<EnvConfig>
  ) {}
  getHello(): string {
    return `Hello from nest-service! ${this.configService.get('port')}`;
  }
}
