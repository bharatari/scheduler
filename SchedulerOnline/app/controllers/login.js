import Ember from "ember";
import loginUtils from 'scheduler-online/utils/login-utils';
import config from 'scheduler-online/config/environment';

export default Ember.Controller.extend({
    loginError: false,
    actions: {
        login: function() {
            var self = this;
            this.set('loading', true);
            if(!loginUtils.checkLocalStorage()) {
                alert(loginUtils.localStorageAlert);
                return;
            }
            var data = {username: this.get("username"), password: this.get("password")};
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/login", headers: { 
                Accept : "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(data), success: function(data, textStatus, jqXHR){
                if(data.token) {
                    localStorage.setItem(loginUtils.localStorageKey, JSON.stringify(data));
                    self.transitionToRoute('index');
                }
                else {
                    self.set('loginError', true);
                    self.set('loading', false);
                }
            }, error: function(jqXHR){
                self.set('loginError', true);
                self.set('loading', false);
            }});
        },
        close: function() {
            this.set('loginError', false);
        },
        signUp: function() {
            this.transitionToRoute('sign-up');
        },
        forgotPassword: function() {
            this.transitionToRoute('forgot-password');
        },
        resend: function () {
            this.transitionToRoute('resend-verification');
        }
    }
});