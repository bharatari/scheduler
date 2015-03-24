import Ember from "ember";
import config from 'scheduler-online/config/environment';
import SessionRouteMixin from 'scheduler-online/mixins/session-route';

export default Ember.Route.extend(SessionRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            week: Ember.$.getJSON(config.routeLocation + '/api/week'),
            nextWeek: Ember.$.getJSON(config.routeLocation + "/api/nextWeek")
        })
    },
    setupController: function(controller, model) {
        controller.set('nextWeek', model.nextWeek);
        controller.set('week', model.week);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});