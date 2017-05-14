/**
 * Hapi Plugin Index
 */
const Path = require('path');

// Shortcut to app main page
const index_config = {
  description: 'Angular 4 Quickstart App Index',
  notes: 'The main page for the Angular quickstart app',
  handler: {
    file: `${__dirname}/index.html`
  }
};

// Build the routes for the local app files
const app_files = [
  'index.html',
  'styles.css',
  'systemjs.config.js',
  'app/main.js',
  'app/app.module.js',
  'app/app.component.js'
]

const app_routes = app_files.map((full_file_name) => {
  return {
    method: 'GET',
    path: `/${full_file_name}`,
    config: {
      description: `Map to file:  ${full_file_name}`,
      handler: {
        file: `${__dirname}/${full_file_name}`
      }
    }
  }
});

// Build the routes for the node module files
const node_module_files = [
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
]

const node_module_routes = node_module_files.map((full_file_name) => {
  const filename = Path.basename(full_file_name);
  const source = require.resolve(full_file_name);

  return {
    method: 'GET',
    path: `/node_modules/${full_file_name}`,
    config: {
      description: `Mapping ${filename}`,
      handler: {
        file: source
      }
    }
  }
});

// join the route lists
const static_routes = app_routes.concat(node_module_routes);



/***************************
 ********* EXPORT  *********
 ***************************/
exports.register = (server, options, next) => {

  server.register(require('inert'), (err) => {
    if (err) { throw err; }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: index_config
  });
  server.route(static_routes);
  next();
};

exports.register.attributes = {
  name: 'angular-4-quickstart',
  once: true
};
