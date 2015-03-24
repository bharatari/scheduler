import Ember from "ember";
import config from 'scheduler-online/config/environment';
import loginUtils from 'scheduler-online/utils/login-utils';

export default Ember.Mixin.create({
    beforeModel: function() {
        var self = this;
        loginUtils.checkLogin().then(function(value){
            self.transitionTo('index');
        }, function(reason){
            self.set('isAuthenticated', false);
        });
    }
});