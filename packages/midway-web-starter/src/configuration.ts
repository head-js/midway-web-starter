import { join } from 'path';
import { Configuration, App } from '@midwayjs/decorator';
import { Application } from 'egg';


@Configuration({
  importConfigs: [
    join(__dirname, 'config')
  ]
})
export class MWSConfiguration {

  @App()
  app: Application;

  async onReady() {
    const { props = {} } = this.app.config;

    const mode = process.env.NODE_ENV || 'development';
    this.app.locals.__mode__ = mode;

    const profile = this.app.config.env || 'local';
    this.app.locals.__profile__ = profile;

    const version = props['web.starter.version'] || '1.0.';
    this.app.locals.__version__ = version;

    const api = props['web.starter.api'] || '/api';
    this.app.locals.__api__ = api;
  }
}
