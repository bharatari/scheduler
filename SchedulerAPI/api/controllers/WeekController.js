module.exports = {
    getWeek: function(req, res) {
        WeekService.getWeek(req.user.id, function(days) {
            res.json(days);
        });
    },
    getNextWeek: function(req, res) {
        WeekService.getNextWeek(req.user.id, function(days) {
            res.json(days);
        });
    }
}