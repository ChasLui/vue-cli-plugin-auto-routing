module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'vue-router-layout': '^0.2.0',
    },
    devDependencies: {
      'vue-auto-routing': '^1.0.0',
    },
    vue: {
      pluginOptions: {
        autoRouting: {
          chunkNamePrefix: 'page-',
        },
      },
    },
  })

  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles((files) => {
      Object.keys(files).forEach((name) => {
        if (/^src\/views[/$]/.test(name)) {
          delete files[name]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles((files) => {
        delete files['src/router.ts']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
