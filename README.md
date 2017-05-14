# Hapi hosting Angular 4 QuickStart Source

This repository turns the [angular quickstart](https://github.com/angular/quickstart) into a [Hapi](https://hapijs.com/) plugin.
It is meant to be a stating point for projects to host Angular 4 application from a Hapi server.

## npm scripts

Useful commands to get up and running are included in npm scripts defined in the `package.json`:

* "build": "tsc -p angular-4-quickstart",
* "serve": "nodemon server.js",
* "start": "concurrently \"npm run build:watch\" \"npm run serve\""

>__Changes from Quickstart:__ 
> - This is a Hapi app, so lite-server is not necessary.  
> - nodemon is used to keep the server running until it is canceled from the command line with `ctrl-c`/`cmd-c`.  
> - `tsconfig.json` has been relocated with the app.  This means that `tsc` needs to be giving a `--project` or `-p` argument. See `npm run build`.

--------------

## Hapi Routing

An `index.js` file has been added to the root directory of the Angular app, which allows us to perform the `require()` needed to register the plugin in `server.js`.

```javascript
server.register({
  register: require('./angular-4-quickstart')
})
```

I've provided an example of how to add another plugin, let's say a back end REST API for instance:

```javascript
server.register({
  register: require('./backend'),
  routes: { prefix: 'api' }
})
```

The `angular-4-quickstart` plugin provides routes in four different ways, which permits the client app access to all of the files it needs to run:
- A shortcut to the app specifying '/' - serves `index.html` directly
- Serves `index.html`, `styles.css`, `systemjs.config.js` directly
- Server all public files under in the root Angular directory.
- Serves all necessary files in the `/node_modules` directory

--------------

## Adding more or different angular apps

The `index.js` provided should be sufficient to get any Angular app up and running.  Just drop it in to the root folder of the Angular app, and register it as a plugin.

Use the `routes: { prefix: '<your app url>' }` option to host the app wherever you want.

--------------

## Inspired by

[hapi-angular-quickstart](https://github.com/ptpaterson/hapi-angular-quickstart) (for Angular 2).
