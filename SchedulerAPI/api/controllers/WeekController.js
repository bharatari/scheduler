module.exports = {
    getWeek: function(req, res) {
        WeekService.getWeek(function(days) {
            res.json(days);
        });
    },
    getNextWeek: function(req, res) {
        WeekService.getNextWeek(function(days) {
            res.json(days);
        });
    }
}