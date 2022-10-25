import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { VIEWS_PATH }                      from './constants';

@Controller()
export class RenderController {

  @Get('*')
  render(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    res.render(VIEWS_PATH + '/index.html', { req, res });
  }
}
