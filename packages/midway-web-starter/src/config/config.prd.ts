import { MidwayConfig } from '@midwayjs/core';


export default {
  koa: {
    proxy: true,
  },

  midwayLogger: {
    default: {
      enableConsole: true,
      enableFile: false,
      level: 'info',
      consoleLevel: 'info',
    },
  },
} as MidwayConfig;
