var Browser = require('zombie');
var async = require('async');

module.exports = {
    retrieveSchedule: function(email, password, cb) {
        var browser = new Browser();
        browser.visit('HTTPS://lionlinks.exeter.edu:443/WebAdvisor/WebAdvisor', function() {
            setTimeout(function() {
                browser.clickLink('a[href$=UT-LGRQ]', function() {
                    browser.fill('#USER_NAME', email).
                    fill('#CURR_PWD', password).
                    pressButton('input[name=SUBMIT2]', function() {
                        if(browser.text('.errorText').indexOf('You entered an invalid') !== -1) {
                            return cb(false);
                        }
                        else {
                            browser.clickLink('Click here for Student information', function() {
                                browser.clickLink("My Class Schedule", function() {
                                    try {
                                        cb(browser.document.querySelector('form font font').innerHTML);
                                    }
                                    catch(err) {
                                        cb(false);
                                    } 
                                });
                            });
                        }
                    });
                });
            }, 5000); 
        });
    },
    processHTML: function(html, cb) {
        var trimAt = html.indexOf('<hr>');
        var content = html.substring(0, trimAt);
        var array = content.split('<br> ');
        array[0] = array[0].substring(array[0].indexOf('>') + 1, array[0].length);     
        for(var i = 0; i < array.length; i++) {
            if(array[i] === '\n') {
                delete array[i];
            }
            else {
                array[i] = this.processRow(array[i]);
            }
        }
        for(var i = 0; i < array.length; i++) {
            if(array[i] == null) {
                array.splice(i, 1);    
            }
        }
        cb(array);
    },
    processRow: function(row) {
        var array = row.split(" ");
        var periods = array[2].replace(/&nbsp;/gi,'');
        periods = periods.split('');
        for(var i = 0; i < periods.length; i++) {
            periods[i] = periods[i].toLowerCase();
            periods[i] += "_format";
        }
        var result = {
            name: array[0] + " " + array[1],
            periods: periods
        }    
        return result;
    },
    processUserPeriods: function(data, userId, cb) {
        UserPeriod.destroy({ userId: userId }).exec(function(err) {
            async.each(data, function(item, callback) {
                async.each(item.periods, function(period, callback2) {
                    UserPeriod.create({ title: item.name, periodName: period, userId: userId }).exec(function(err) {
                        callback2();
                    });
                }, function(err) {
                    callback();
                });
            }, function(err) {
                cb();
            });
        });
    }
}
