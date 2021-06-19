module.exports = {
  devServer: {
    proxy: {
      '(^/api)|(^/auth)': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      },
    }
  },
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map';
      config.output.devtoolModuleFilenameTemplate = info => {
        return !info.resourcePath.match(/^\.\//) ||
        (info.resourcePath.match(/\.vue$/) && !info.identifier.match(/type=script/))
            ? `webpack-generated:///${info.resourcePath}?${info.hash}`
            : `webpack-src:///${info.resourcePath}`
      }
      config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';
    }
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
