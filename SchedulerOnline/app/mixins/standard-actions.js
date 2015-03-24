import Ember from "ember";
import config from 'scheduler-online/config/environment';
import loginUtils from 'scheduler-online/utils/login-utils';

export default Ember.Mixin.create({
    actions: {
        login: function() {
            this.transitionToRoute("login");
        },
        logout: function() {
            var self = this;
            loginUtils.logout().then(function(response){
                self.transitionToRoute("index");
            }, function(reason){ });
        },
        settings: function() {
            this.transitionToRoute("settings");
        },
        about: function() {
            this.transitionToRoute("about");
        }
    }
});