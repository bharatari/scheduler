import Ember from "ember";
import config from 'scheduler-online/config/environment';
import loginUtils from 'scheduler-online/utils/login-utils';

export default Ember.Component.extend(Ember.TargetActionSupport, {
    actions: {
        login: function() {
            this.sendAction('login');
        },
        about: function() {
            this.sendAction('about');
        },
        settings: function() {
            this.sendAction('settings');
        },
        logout: function() {
            this.sendAction('logout');
        },
        toggle: function() {
            $('.nav-menu').offcanvas('toggle');
        }
    }
});
