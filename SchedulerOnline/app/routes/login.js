import Ember from "ember";
import config from 'scheduler-online/config/environment';
import UnauthenticatedRouteMixin from 'scheduler-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, { 
    setupController: function(model, controller) {
        controller.set('loading', false);
    }
});