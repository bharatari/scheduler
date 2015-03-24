import Ember from "ember";

export default Ember.Component.extend({
    classNameBindings: ['isElapsed:day-container-disabled'],
    display: function() {
        if(this.get('day').periods.length < 1) {
            return false;
        }
        else {
            return true;
        }
    }.property('day'),
    isElapsed: function() {
        return this.get('day').elapsed;
    }.property('day')
});