import path from  'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Shiki from 'markdown-it-shiki'


// // Elements Plus auto import 사용을 위해 추가
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    }
  },
  /**
   * 빌드 시 해당 내용은 빌드에서 제외 됩니다.
   * 로컬 환경에서 개발 진행 시, 사용하는 접속 정보 입니다.
   */
  server: {
    /* 모바일 화면 확인용 스트립트입니다. */
    host: true, // Host be set to true to use the network form to access project with ip
    port: 3333, // port number
    open: true, // Open browser automatically
    cors: true, // cross-domain setting permission
    strictPort: true, // If the port is occupied, exit directly
    /* 모바일 화면 확인용 스트립트입니다. */
    proxy: {
      '/api': {
        target: 'https://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
      }),
      Pages({
        dirs: [
          {dir: 'src/pages', baseRoute: ''}
        ],
        extensions: ['vue', 'md']
      }),
      Layouts(),

    // https://github.com/antfu/unplugin-auto-import
      AutoImport ({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true,
      // resolvers: [ElementPlusResolver()],
    }),
      Components({
          // allow auto load markdown components under `./src/components/`
          extensions: ['vue', 'md'],
          // allow auto import and register components used in markdown
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: 'src/components.d.ts',
          resolvers: [ElementPlusResolver()],
          directoryAsNamespace: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      Markdown({
          wrapperClasses: 'prose prose-sm m-auto text-left',
          headEnabled: true,
          markdownItOptions: {
              html: true,
              linkify: true,
              typographer: true,
          },
          markdownItSetup(md) {
              // https://prismjs.com/
              md.use(Shiki, {
                  theme: {
                      light: 'vitesse-light',
                      dark: 'vitesse-dark',
                  },
              })
              md.use(LinkAttributes, {
                  matcher: (link: string) => /^https?:\/\//.test(link),
                  attrs: {
                      target: '_blank',
                      rel: 'noopener',
                  },
              })
          },
      }),
  ],
})
