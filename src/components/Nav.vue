<template>
  <div>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.name"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.name }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(item)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.name" @click="goTo(item)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile v-if="user" @click="signOut">
          <v-list-tile-action>
            <v-icon>power</v-icon>
          </v-list-tile-action>
          <!-- amplify overrides -->
          <amplify-sign-out class="sign_out_btn"></amplify-sign-out>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="yellow darken-1"
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-toolbar-side-icon class="ml-0" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Amplify Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import { Auth, Hub } from 'aws-amplify';
  import AmplifyStore from '../store';
  import AmplifyEventBus from "aws-amplify-vue";

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: []
    }),
    props: {
      source: String
    },
    computed: {
      user() {
        return AmplifyStore.state.user
      }
    },
    mounted () {
      setTimeout(() => {
        if(AmplifyStore.state.user) {
          let filterRoutes = this.$router.options.routes;
          this.items = filterRoutes.filter((filterRoutes) => {
              return filterRoutes.meta.requiresAuth;
          });
        } else {

          let filterRoutes = this.$router.options.routes;
          this.items = filterRoutes.filter((filterRoutes) => {
              return !filterRoutes.meta.requiresAuth;
          });
        }
      }, 500);
    },
    methods: {
      goTo (item) {
        this.$router.push({path: item.path})
      },
      signOut () {
        // emit signed out event
        AmplifyEventBus.$emit('authState', 'signedOut');
        // ^ this will occasionally throw an error because
        // the component provided is not as wide/high
        // as the container, but the container
        // registers the users click event
      }
    }
  }
</script>

<style scoped>
/* amplify overrides */
.sign_out_btn {
  height: 24px;
  line-height: 10px;
  position: relative;
  text-align: left;
  width: 100%;
}
</style>