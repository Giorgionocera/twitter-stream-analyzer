import { flatten, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TransactionPagination } from 'src/interfaces';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class BitsongService {
  private maxBlockHeight = parseInt(process.env.BITSONG_MAX_BLOCK_HEIGHT, 10);

  constructor(private httpService: HttpService) {
    httpService.axiosRef.defaults.baseURL = process.env.BITSONG_API_URL;
  }

  getTxs(
    page = 1,
    limit = 100,
    module = 'bank',
  ): Observable<AxiosResponse<TransactionPagination>> {
    return this.httpService.get<TransactionPagination>('txs', {
      params: {
        page,
        limit,
        'message.module': module,
      },
    });
  }

  getAllTxs() {
    return this.getTxs().pipe(
      switchMap((resp) => {
        const firstPages = [...resp.data.txs];
        const totalPages = parseInt(resp.data.page_total, 10);
        let pages = [...Array(totalPages).keys()];
        pages.shift();
        pages = pages.map((el) => el + 1);

        const observables = pages.map((page) =>
          this.getTxs(page).pipe(
            map((pagesResponse) => [...pagesResponse.data.txs]),
          ),
        );

        return combineLatest([...observables])
          .pipe(map((results) => flatten(results)))
          .pipe(map((results) => [...firstPages, ...results]))
          .pipe(
            map((results) =>
              results.filter((result) => {
                const height = parseInt(result.height, 10);

                return height <= this.maxBlockHeight;
              }),
            ),
          );
      }),
    );
  }
}
