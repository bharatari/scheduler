var moment = require('moment');

module.exports = {
    getDays: function(week, cb) {
        Day.find({ weekId: week.id }).exec(function(err, days) {
            cb(days);
        });
    },
    dayElapsed: function(day) {
        if(this.dayProcess(day.day).isBefore(moment())) {
            day.elapsed = true;
        }
        else {
            day.elapsed = false;
        }
        return day;
    },
    dayProcess: function(dayName) {
        var dictionary = ModelService.DayDictionary();
        if(dayName === "sunday") {
            return moment().add(7, 'days').day(dictionary[dayName]);
        }
        else {
            return moment().day(dictionary[dayName])
        }
    }
}