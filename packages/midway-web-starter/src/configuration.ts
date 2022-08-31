import { Configuration, App, Inject } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { NunjucksEnvironment } from '@midwayjs/view-nunjucks';
import * as DefaultConfig from './config/config.default';
import * as PrdConfig from './config/config.prd';


@Configuration({
  namespace: 'web-starter',
  importConfigs: [
    {
      default: DefaultConfig,
      prd: PrdConfig,
    },
  ]
})
export class MWSConfiguration {

  @App()
  app: Application;

  @Inject()
  view: NunjucksEnvironment;

  async onReady() {
    const starter = this.app.getConfig('web-starter');

    this.view.addGlobal('__mode__', starter.mode);
    this.view.addGlobal('__profile__', starter.profile.active);
    const { svc } = starter.profile;
    this.view.addGlobal('__profile_vars__', JSON.stringify({ svc }));
    this.view.addGlobal('__version__', starter.version);
  }
}
