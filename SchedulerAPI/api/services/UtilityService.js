var moment = require('moment');

module.exports = {
    SortByDate: function(array) {
        array.sort(function(a, b) {
            var duration = moment.duration(a.startTime);
            var duration2 = moment.duration(b.startTime);
            a = moment().add(duration).toDate();
            b = moment().add(duration2).toDate();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        return array;
    }
}