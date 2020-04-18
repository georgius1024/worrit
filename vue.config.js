module.exports = {
  publicPath: '/',
  productionSourceMap: false,

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ['/', '/about/', '/core/', '/wait/'],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
