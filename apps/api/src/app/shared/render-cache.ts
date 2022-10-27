import { Injectable }   from '@nestjs/common';
import { CacheStorage } from '@nxarch/nest-nguniversal';
import { Request }      from 'express';

// don't store in memory in production --> it won't scale if you use load-balancing and multiple app instances

// also not useful for stateful pages (e.g. for individual users)

@Injectable()
export class MemoryCacheStorage implements CacheStorage {
  private cache: Record<string, string> = {};

  // can be async
  get(key: string, request: Request): string {
    const result = this.cache[key];

    return result;
  }

  // can be async
  set(key: string, html: string, request: Request): string {
    this.cache[key] = html;

    return html;
  }
}
