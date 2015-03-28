import config from 'scheduler-online/config/environment';

export default {
    localStorageKey: "currentSession-IKF93N572H312YE43A3",
    checkLogin: function() {
        var key = this.localStorageKey;
        return new Ember.RSVP.Promise(function(resolve, reject){
            if(JSON.parse(localStorage.getItem(key))){
                var url = config.routeLocation + "/api/isAuthenticated";
                var data = {tokenId: JSON.parse(localStorage.getItem(key)).token.id};
                Ember.$.ajax({
                    url:         url,
                    data:        data,
                    success: function(response) {
                        resolve(true);
                    },
                    error: function(xhr, textStatus, error) {
                        //There's an irrelevant syntax error jQuery throws that has no effect on our request. We need to handle this.
                        if(xhr.responseText === "OK") {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                });
            }   
            else {
                reject(false);
            }
        });
    },
    logout: function() {
        var key = this.localStorageKey;
        return new Ember.RSVP.Promise(function(resolve, reject){
            if(JSON.parse(localStorage.getItem(key))) {
                var url = config.routeLocation + "/api/logout";
                var data = {userId: JSON.parse(localStorage.getItem(key)).user.id};
                Ember.$.ajax({
                    url:         url,
                    type:        'POST',
                    data:        JSON.stringify(data),
                    headers: { 
                        Accept : "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    success: function(response) {
                        localStorage.removeItem(key);
                        resolve(true);
                    },
                    error: function(xhr, textStatus, error) {
                        //There's an irrelevant syntax error jQuery throws that has no effect on our request. We need to handle this.
                        if(xhr.responseText === "OK") {
                            localStorage.removeItem(key);
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                });
            }
            else {
                resolve(true);
            }
        });
    },
    checkLocalStorage: function() {
        try {
            localStorage.setItem('localStorageTest-E9FJSNWN209DS0AM2', 'E9FJSNWN209DS0AM2');
            localStorage.removeItem('localStorageTest-E9FJSNWN209DS0AM2');
            return true;
        } catch(e) {
            return false;
        }
    },
    getToken: function() {
        return JSON.parse(localStorage.getItem(this.localStorageKey)).token.token;
    },
    getTokenId: function() {
        return JSON.parse(localStorage.getItem(this.localStorageKey)).token.id;
    },
    getTokenObject: function() {
        return JSON.parse(localStorage.getItem(this.localStorageKey)).token;
    },
    localStorageAlert: "We're having trouble processing your request. You're either using Safari in Private Mode or an older, unsupported browser. Please disable Private Mode on Safari or use another compatible browser, in order to continue."
}