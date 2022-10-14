const path = require('path');
const webpack = require('webpack');

module.exports = {
  corejs: false,
  locale: {
    enable: true
  },
  // https://www.shangmayuan.com/a/530a6a73a248495780c17fba.html
  // chainClientConfig: config => {
  //   config.optimization.get('splitChunks').chunks = 'initial';
  //   const cacheGroups = config.optimization.get('splitChunks').cacheGroups;
  //   cacheGroups._vant_ = {
  //     name: 'vant',
  //     test: /[\\/]node_modules[\\/](vant)[\\/]/,
  //     chunks: 'all'
  //   };
  //   cacheGroups._antdesignvue_ = {
  //     name: 'antdesignvue',
  //     test: /[\\/]node_modules[\\/](ant-design-vue|moment)[\\/]/,
  //     chunks: 'all'
  //   };
  // },
  chainBaseConfig: config => {
    config.resolve.alias
      .set('~', path.resolve(process.cwd(), 'src'))
      .end();

    config.module
      .rule('less')
      .oneOf('vue')
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .after('less-loader')
      .options({
        patterns: [path.resolve(process.cwd(), 'web/common.less')],
        injector: 'append'
      })
      .end();

    config.plugin('IgnorePlugin').use(webpack.IgnorePlugin, [{
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }]);
  },
  proxy: {
    '/api': {
      target: 'http://backend-api-01.newbee.ltd',
      pathRewrite: { '^/api': '/api' },
      changeOrigin: true,
      secure: false
    }
  }
};
