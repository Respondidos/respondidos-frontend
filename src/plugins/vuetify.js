import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
// import colors from 'vuetify/lib/util/colors'

// Use full installation to handle external components
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#03a9f4',
        accent: '#00bcd4',
        error: '#ff5722',
        warning: '#FF9800', // '#ffc107',
        info: '#607d8b',
        success: '#00bcd4'
      },
      dark: {
        primary: '#2196f3',
        secondary: '#03a9f4',
        accent: '#00bcd4',
        error: '#ff5722',
        warning: '#FF9800', // '#ffc107',
        info: '#607d8b',
        success: '#00bcd4'
      }
    }
  }
})