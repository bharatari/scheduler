var moment = require('moment-timezone');

module.exports = {
    convertToEST: function(datetime) {
        return moment.tz(datetime, 'America/New_York').toDate();
    }
}