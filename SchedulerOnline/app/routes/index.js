import Ember from "ember";
import config from 'scheduler-online/config/environment';
import loginUtils from 'scheduler-online/utils/login-utils';
import AuthenticatedRouteMixin from 'scheduler-online/mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            week: Ember.$.getJSON(config.routeLocation + '/api/week', {token: loginUtils.getToken(), tokenId: loginUtils.getTokenId()}),
            nextWeek: Ember.$.getJSON(config.routeLocation + "/api/nextWeek", {token: loginUtils.getToken(), tokenId: loginUtils.getTokenId()})
        })
    },
    setupController: function(controller, model) {
        controller.set('nextWeek', model.nextWeek);
        controller.set('week', model.week);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});