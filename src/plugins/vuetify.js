import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.yellow.darken4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});
