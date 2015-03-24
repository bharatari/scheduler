import Ember from "ember";

export default Ember.Component.extend({
    classNameBindings: ['isEmpty:empty-event'],
    isEmpty: function() {
        return this.get('period').empty;
    }.property('period'),
    height: function() {
        var difference = moment.duration(this.get('period').endTime).subtract(moment.duration(this.get('period').startTime)).as('minutes') * 2.2;
        return "height: " + difference.toString() + "px";
    }.property('period')
});