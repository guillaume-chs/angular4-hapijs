# Hapi hosting Angular QuickStart Source

This repository turns the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html) into a [Hapi](https://hapijs.com/) plugin.  It is meant to be a stating point for projects to host Angular application from a Hapi server.

## npm scripts

Useful commands to get up and running are included in npm scripts defined in the `package.json`:

* "start": "npm run tsc:projects && npm-run-all --parallel tsc:projectsw start:server "
* "start:server": "nodemon server.js"
* "tsc:projects": "tsc -p angular-quickstart"
* "tsc:projectsw": "tsc -w -p angular-quickstart"

>__Changes from Quickstart:__ 
> - This is a Hapi app, so lite-server is not necessary.  
> - nodemon is used to keep the server running until it is canceled from the command line with `ctrl-c`/`cmd-c`.  
> - `tsconfig.json` and `tslint.json` have been relocated with the app.  This means that `tsc` needs to be giving a `--project` or `-p` argument.  For adding/moving/renaming apps, make sure that the `tsc:projects` and `tsc:projectsw` scripts are updated.

--------------

## Hapi Routing

An `index.js` file has been added to the root directory of the Angular app, which allows us to perform the `require()` needed to register the plugin in `server.js`.

```javascript
server.register({
  register: require('./angular-quickstart'),
  routes: { prefix: '/quickstart' }
})
```

The `angular-quickstart` plugin provides routes in three different ways, which permits the client app access to all of the files it needs to run:
- A shortcut to the app specifying '/' - serves `index.html` directly
- Serves all necessary files under in the root Angular directory
- Serves all necessary files in the `/node_modules` directory

`index.js` creates a simple route from the url `'/'` right to `index.html`.  Then it builds routing configurations based on an array of all the necessary files it needs from the main app directory.  THEN it builds routing configurations from each file needed from inside of the node_modules directory.  Each file is called out separately so that a user has access to exactly these files and nothing else.  

>Note that the urls that the client app uses to `GET` files are defined by the `systemjs.config.js` and `index.html`files.  The routes set up in `index.js` were done so that no changes needed to be made to those files.

>In a production setup, you would likely have a script to copy all of the static to a directory where it is okay for the user to have access to the whole thing, but to keep things simple (and demonstrate way s to do routing), each file is listed and pointed to manually. 

`server.js` then registers the angular-quickstart plugin, which automatically adds the routes provided, and away you go!

--------------

## Adding more or different angular apps

The `index.js` provided should be sufficient to get any Angular app up and running.  Just drop it in to the root folder of the Angular app, and register it as a plugin.

Use the `routes: { prefix: '<your app url>' }` option to host the app wherever you want.

