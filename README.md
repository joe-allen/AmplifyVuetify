# Amplify Vuetify
A merger of two cool tools / libraries:
- AWS AMPLIFY (An opinionated, category-based client framework for building scalable mobile and web apps)
- VUETIFY (Built with Material Design, Vuetify aims to provide all the tools necessary to create beautiful content rich applications)



## Project setup
- Clone repo
- `CD` into folder and run `npm install`
- Do you have AWS' Amplify command line tool, if not install it w/ this command `npm install -g aws-amplify/cli` [https://aws-amplify.github.io/docs/](See docs)
- Initiate the Amplify by running this command `amplify init` and going through the set up process [https://github.com/aws-samples/aws-amplify-vue](Follow the answers during setup provided here in Step 2)
- You should be good to go [See Amplify Vue Docs for more info](https://aws-amplify.github.io/docs/js/vue)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

#### ToDo
- [ ] Update `signOut ()` method

#### Errors?
Error: No ESLint configuration found.
Problem: You need to configure your eslint rules
Try: `./node_modules/.bin/eslint --init`