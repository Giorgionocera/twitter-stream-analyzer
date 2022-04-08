import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { TwitterResponse } from 'src/interfaces';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class TwitterService {
  constructor(private httpService: HttpService, private config: ConfigService) {
    this.httpService.axiosRef.defaults.baseURL =
      this.config.get('TWITTER_API_URL');
  }

  getSearchStream(): Observable<AxiosResponse<TwitterResponse>> {
    return this.httpService.get<TwitterResponse>('search/stream');
  }
}
