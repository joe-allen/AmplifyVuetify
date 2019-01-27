import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// GraphQL endpoint:
// https://ewt6if5v3rgxnabbdiz5cg4cba.appsync-api.us-east-2.amazonaws.com/graphql