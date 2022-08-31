import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';


export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const { pkg: { application }, env: profile } = appInfo;
  const mode = process.env.NODE_ENV || 'development';

  return {
    koa: {
      port: application.port || 8080,
    },

    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },

    staticFile: {
      dirs: {
        default: {
          prefix: `/${application.name}/`,
          buffer: true,
          // gzip: true,
        },
      },
    },

    'web-starter': {
      name: application.name,
      mode: mode,
      profile: {
        active: profile,
        svc: {},
      },
      version: '',
    },
  };
}
