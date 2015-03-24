import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("login", { path: "/app/login" });
    this.route("sign-up", { path:"/app/sign-up" });
});

export default Router;
