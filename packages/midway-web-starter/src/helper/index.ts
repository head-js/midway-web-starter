declare interface IHelpersConfig {
  staticFilePrefix: string,
  profile: string,
};


export default function({ staticFilePrefix, profile}: IHelpersConfig) {
  return {
    rsrc(action, filename, devHost = '0.0.0.0', devPort = '3001') {
      const prefix = `${staticFilePrefix}rsrc`;
      const ext = filename.split('.').slice(-1).pop();

      if (action === 'dist') {
        if (profile === 'local') {
          if (ext === 'css') {
            return `<!-- 开发环境的 css 都是通过 webpack-dev-server 热加载的 -->`;
          } else if (ext === 'js') {
            return `<script src="http://${devHost}:${devPort}/static/js/${filename}"></script>`;
          } else {
            throw new TypeError(`INVALID RSRC EXT: ${ext}`);
          }
        } else {
          if (ext === 'css') {
            return `<link rel="stylesheet" href="${prefix}/dist/${filename}">`;
          } else if (ext === 'js') {
            return `<script src="${prefix}/dist/${filename}"></script>`;
          } else {
            throw new TypeError(`INVALID RSRC EXT: ${ext}`);
          }
        }
      } else if (action === 'css') {
        return `<link rel="stylesheet" href="${prefix}/css/${filename}">`;
      } else if (action === 'js') {
        return `<script src="${prefix}/js/${filename}"></script>`;
      } else {
        throw new TypeError(`INVALID RSRC ACTION: ${action}`);
      }
    },
  };
}
