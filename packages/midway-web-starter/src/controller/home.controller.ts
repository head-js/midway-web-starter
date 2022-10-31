import { App, Provide, Inject, Controller, Get, Param, MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Application, Context } from '@midwayjs/koa';


@Provide()
@Controller('/')
export class MWSViewController {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  async mws() {
    return 'Powered by Midway Web Starter';
  }

  @Get('/:app/liveness')
  async liveness(@Param('app') app: string) {
    const name = this.app.getConfig('web-starter.name');
    if (app !== name) {
      throw new MidwayHttpError('invalid app', HttpStatus.NOT_FOUND);
    }
    return `${app} alive`;
  }

  @Get('/:app/readiness')
  async readiness(@Param('app') app: string) {
    const name = this.app.getConfig('web-starter.name');
    if (app !== name) {
      throw new MidwayHttpError('invalid app', HttpStatus.NOT_FOUND);
    }
    return `${app} ready`;
  }
}
