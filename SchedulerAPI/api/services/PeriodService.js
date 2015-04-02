module.exports = {
    getPeriods: function(day, cb) {
        Period.find({ dayId: day.id }).exec(function(err, periods) {
            cb(periods);
        });
    },
    getUserPeriods: function(userId, cb) {
        UserPeriod.find({ userId: userId }).exec(function(err, periods) {
            cb(periods);
        });
    },
    bindPeriods: function(periods, userPeriods, dayName, cb) {
        var daySchedule = [];
        for(var i = 0; i < periods.length; i++) {
            for(var e = 0; e < userPeriods.length; e++) {
                if(this.containsUserPeriod(periods[i], userPeriods)) {
                   if(periods[i].name === userPeriods[e].periodName) {
                        if(userPeriods[e].exceptOn) {
                            if(!this.containsException(userPeriods[e].exceptOn, dayName)) {
                                daySchedule.push(this.bindPeriod(periods[i], userPeriods[e]));
                            }
                            else {
                                daySchedule.push(this.emptyPeriod(periods[i]));
                            }
                        }
                        else {
                            daySchedule.push(this.bindPeriod(periods[i], userPeriods[e]));
                        }
                    }
                }
                else {
                    if(!this.containsPeriod(daySchedule, periods[i])) {
                       daySchedule.push(this.emptyPeriod(periods[i]));
                    }                    
                }
            }
        }
        cb(this.sortDaySchedule(daySchedule));
    },
    containsException: function(exceptionArray, dayName) {
        for(var i = 0; i < exceptionArray.length; i++) {
            if(exceptionArray[i] === dayName) {
                return true;
            }
        }   
        return false;
    },
    containsUserPeriod: function(period, userPeriods) {
        for(var i = 0; i < userPeriods.length; i++) {
            if(period.name === userPeriods[i].periodName) {
                return true;
            }
        }
        return false;
    },
    containsPeriod: function(daySchedule, period) {
        for(var i = 0; i < daySchedule.length; i++) {
            if(daySchedule[i].title === period.title) {
                return true;
            }
        }   
        return false;
    },
    bindPeriod: function(period, userPeriod) {
        return new ModelService.PeriodEvent(userPeriod.title, period.startTime, period.endTime, period.color, false);
    },
    emptyPeriod: function(period) {
        return new ModelService.PeriodEvent(period.title, period.startTime, period.endTime, period.color, true);
    },
    sortDaySchedule: function(daySchedule) {
        return UtilityService.SortByDate(daySchedule);
    }
}