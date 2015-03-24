import Ember from "ember";

export default Ember.View.extend({
    templateName: 'navbar-toggle',
    click: function(evt) {
        $('.nav-menu').offcanvas('toggle');
    }
});