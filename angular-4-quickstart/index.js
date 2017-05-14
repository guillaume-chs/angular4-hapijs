// Require Hapi.js plugins
const Path = require('path');
const Joi = require('joi');


/***************************
 ******* APPLICATION *******
 ***************************/
const app_directory = 'app';
const app_files = [
  'index.html',
  'styles.css',
  'systemjs.config.js'
];
const app_routes = app_files.map(file => ({
  method: 'GET',
  path: `/${file}`,
  config: {
    description: `Mapping: ${file}`,
    handler: {
      file: Path.join(__dirname, file)
    }
  }
}));


/***************************
 ******** ANGULAR 4 ********
 ***************************/
const dependencies_files = [
  'core-js/client/shim.min.js',
  'zone.js/dist/zone.js',
  'systemjs/dist/system.src.js',

  '@angular/core/bundles/core.umd.js',
  '@angular/common/bundles/common.umd.js',
  '@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http/bundles/http.umd.js',
  '@angular/router/bundles/router.umd.js',
  '@angular/forms/bundles/forms.umd.js',

  'rxjs/symbol/observable.js',
  'rxjs/symbol/iterator.js',
  'rxjs/Subject.js',
  'rxjs/Observable.js',
  'rxjs/Subscription.js',
  'rxjs/Subscriber.js',
  'rxjs/InnerSubscriber.js',
  'rxjs/OuterSubscriber.js',
  'rxjs/util/root.js',
  'rxjs/util/ObjectUnsubscribedError.js',
  'rxjs/SubjectSubscription.js',
  'rxjs/symbol/rxSubscriber.js',
  'rxjs/Observer.js',
  'rxjs/observable/merge.js',
  'rxjs/observable/ArrayObservable.js',
  'rxjs/observable/ConnectableObservable.js',
  'rxjs/observable/ScalarObservable.js',
  'rxjs/observable/EmptyObservable.js',
  'rxjs/operator/share.js',
  'rxjs/operator/merge.js',
  'rxjs/operator/multicast.js',
  'rxjs/operator/mergeAll.js',
  'rxjs/util/toSubscriber.js',
  'rxjs/util/isFunction.js',
  'rxjs/util/isArray.js',
  'rxjs/util/isObject.js',
  'rxjs/util/isScheduler.js',
  'rxjs/util/isPromise.js',
  'rxjs/util/tryCatch.js',
  'rxjs/util/errorObject.js',
  'rxjs/util/UnsubscriptionError.js',
  'rxjs/util/subscribeToResult.js'
];
const dependencies_routes = dependencies_files.map(file => ({
  method: 'GET',
  path: `/node_modules/${file}`,
  config: {
    description: `Mapping: ${Path.basename(file)}`,
    handler: {
      file: require.resolve(file)
    }
  }
}));


/***************************
 ********* EXPORT  *********
 ***************************/
exports.register = (server, options, next) => {

  server.register(require('inert'), (err) => {
    if (err) throw err;
  });

  // Default route
  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'Angular 4 application index',
      handler: {
        file: Path.join(__dirname, 'index.html')
      }
    }
  });

  // Application & Dependencies
  server.route(app_routes);
  server.route({
      method: 'GET',
      path: `/${app_directory}/{param*}`,
      config: {
        description: `Mapping directory: ${app_directory}`,
        validate: {
          params: {
            param: Joi.string().required().regex(/(.js|.jpg|.jpeg|.png|.html|.css)$/, "public file")
          }
        },
        handler: {
            directory: {
                path: Path.join(__dirname, app_directory),
                redirectToSlash: true,
                index: false
            }
        }
      }
  });

  server.route(dependencies_routes);
  next();
};

exports.register.attributes = {
  name: 'angular-4-quickstart',
  once: true
};
