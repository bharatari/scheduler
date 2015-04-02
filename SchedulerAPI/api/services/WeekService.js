var moment = require('moment-range');

module.exports = {
    getSchedule: function(cb) {
        Schedule.find().exec(function(err, schedules) {
            var currentDate = moment();
            for(var i = 0; i < schedules.length; i++) {
                var range = moment().range(schedules[i].startDate, schedules[i].endDate);
                if(currentDate.within(range)) {
                    cb(schedules[i]);
                }
            }
        });
    },
    getNextSchedule: function(cb) {
        Schedule.find().exec(function(err, schedules) {
            var currentDate = moment().add(7, 'days');
            for(var i = 0; i < schedules.length; i++) {
                var range = moment().range(schedules[i].startDate, schedules[i].endDate);
                if(currentDate.within(range)) {
                    cb(schedules[i]);
                }
            }
        });
    },
    getCurrentWeek: function(schedule, cb) {
        Week.findOne({ id: schedule.weekId }).exec(function(err, week) {
            cb(week);
        });
    },
    getWeek: function(userId, cb) {
        var self = this;
        this.getSchedule(function(schedule) {
            self.getCurrentWeek(schedule, function(week) {
                DayService.getDays(week, function(days) {
                    PeriodService.getUserPeriods(userId, function(userPeriods) {
                        self.loop(0, days, userPeriods, true, function(processedDays) {
                            cb(processedDays);
                        });
                    });
                }); 
            });
        });
    },
    getNextWeek: function(userId, cb) {
        var self = this;
        this.getNextSchedule(function(schedule) {
            self.getCurrentWeek(schedule, function(week) {
                DayService.getDays(week, function(days) {
                    PeriodService.getUserPeriods(userId, function(userPeriods) {
                        self.loop(0, days, userPeriods, false, function(processedDays) {
                            cb(processedDays);
                        });
                    });
                }); 
            });
        });
    },
    loop: function(i, days, userPeriods, currentWeek, callback) {
        var self = this;
        if(i < days.length) {
            function query(cb){
                PeriodService.getPeriods(days[i], function(periods) {
                    PeriodService.bindPeriods(periods, userPeriods, days[i].day, function(daySchedule) {
                        days[i].periods = daySchedule;
                        if(currentWeek) {
                            days[i] = DayService.dayElapsed(days[i]);
                        }
                        cb();
                    });
                });
            }
            query(function(){
                self.loop(i+1, days, userPeriods, currentWeek, callback);
            });
        }
        else {
            callback(days);
        }
    }
}