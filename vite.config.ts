// vite.config.ts
import {
  createStyleImportPlugin,
  VantResolve
} from 'vite-plugin-style-import'
 
export default {
  plugins: [
    createStyleImportPlugin({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name: string) => {
            if (name == 'show-toast') {
              return `../es/toast/style/index`; //修改vant引入路径
            } else {
              return `../es/${name}/style/index`; //修改vant引入路径
            }
          }
        }
      ]
    })
  ]
};