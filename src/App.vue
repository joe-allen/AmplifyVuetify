<template>
  <v-app>
      <!-- main nav -->
      <v-nav app></v-nav>

      <!-- content -->
      <v-content class="v-flex justify-center fill-height">
        <router-view/>
      </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import { components } from 'aws-amplify-vue'
import Nav from '@/components/Nav.vue';
import AmplifyStore from './store'
import { VApp, VNavigationDrawer, VCard, VToolbar, VFadeTransition } from 'vuetify/lib'

Vue.component('v-nav', Nav)

// window.LOG_LEVEL = 'VERBOSE';

export default {
  name: 'App',
  components: {
    VApp,
    VNavigationDrawer,
    VCard,
    VToolbar,
    VFadeTransition,
    ...components
  },
  mounted () {
  },
  data () {
    return {
      dark: false,
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/variables';

/* vuetify overrides */
.v-content > div {
  flex: 0;
}
div[class^="SelectInput__"] > select {
  flex-basis: 28%;
}
[class^="Anchor__"] {
  color: $orange;
}
[class^="Button__"] {
  background-color: transparent;
  min-width: initial;
  display: inline-block;
  margin-bottom: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-align: inherit;
  white-space: inherit;
  vertical-align: inherit;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  color: inherit;
  background-color: inherit;
  border-color: inherit;
  text-transform: inherit;
  padding: inherit;
  letter-spacing: inherit;
  border: none;
}

// aws amplify overrides
.Form__formSection___3tqxz {
  margin: 50px 0 20px;
}
.Form__formSection___3tqxz > .error {
  border: 2px solid $error !important;
  background-color: transparent !important;
  color: $font_color;
  padding: 10px;
  margin: 20px 0 0;
}

</style>