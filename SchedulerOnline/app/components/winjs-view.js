import Ember from "ember";

export default Ember.Component.extend({
    setup: function() {
        WinJS.UI.processAll();
    }.on('didInsertElement')
});