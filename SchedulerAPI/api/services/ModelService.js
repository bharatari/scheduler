module.exports = {
    PeriodEvent: function(title, startTime, endTime, color, empty) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
        this.empty = empty
    },
    DayDictionary: function() {
        var dictionary = new Array();
        dictionary["sunday"] = 0;
        dictionary["monday"] = 1;
        dictionary["tuesday"] = 2;
        dictionary["wednesday"] = 3;
        dictionary["thursday"] = 4;
        dictionary["friday"] = 5;
        dictionary["saturday"] = 6;
        return dictionary;
    }
}