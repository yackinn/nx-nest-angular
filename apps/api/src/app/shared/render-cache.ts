import { Injectable }   from '@nestjs/common';
import { CacheStorage } from '@nxarch/nest-nguniversal';
import { Request }      from 'express';

@Injectable()
export class MemoryCacheStorage implements CacheStorage {
  private cache: Record<string, string> = {};

  get(key: string, request: Request): string {
    const result = this.cache[key];
    console.log('Cache hit', result);

    return result;
  }

  set(key: string, html: string, request: Request): string {
    this.cache[key] = html;

    return html;
  }
}
