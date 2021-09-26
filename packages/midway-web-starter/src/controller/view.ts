import { App, Provide, Inject, Controller, Get, Param } from '@midwayjs/decorator';
import { Application, Context } from 'egg';


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

  @Get('/:app/healthy')
  async healthy(@Param() app: string) {
    return `${app} healthy`;
  }

  @Get('/:app/alive')
  async alive(@Param() app: string) {
    return `${app} alive`;
  }
}
