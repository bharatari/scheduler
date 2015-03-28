import Ember from "ember";
import config from 'scheduler-online/config/environment';
import loginUtils from 'scheduler-online/utils/login-utils';

export default Ember.Mixin.create({
    actions: {
        logout: function() {
            var self = this;
            loginUtils.logout().then(function(response){
                self.transitionToRoute("login");
            }, function(reason){ });
        },
        about: function() {
            this.transitionToRoute("about");
        }
    }
});