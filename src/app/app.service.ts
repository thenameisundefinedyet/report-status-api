import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { id: number; name: string } {
    return { id: 0, name: 'The app is running...' };
  }
}
