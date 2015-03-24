module.exports = {
    getPeriods: function(day, cb) {
        Period.find({ dayId: day.id }).exec(function(err, periods) {
            cb(periods);
        });
    },
    getUserPeriods: function(cb) {
        UserPeriod.find().exec(function(err, periods) {
            cb(periods);
        });
    },
    bindPeriods: function(periods, userPeriods, cb) {
        var daySchedule = [];
        for(var i = 0; i < periods.length; i++) {
            for(var e = 0; e < userPeriods.length; e++) {
                if(this.containsUserPeriod(periods[i], userPeriods)) {
                   if(periods[i].name === userPeriods[e].periodName) {
                        daySchedule.push(this.bindPeriod(periods[i], userPeriods[e]));
                    }
                }
                else {
                    if(!this.containsPeriod(daySchedule, periods[i])){
                       daySchedule.push(this.emptyPeriod(periods[i]));
                    }                    
                }
            }
        }
        cb(this.sortDaySchedule(daySchedule));
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