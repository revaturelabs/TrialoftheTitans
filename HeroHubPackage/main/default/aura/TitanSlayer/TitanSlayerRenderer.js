({
    unrender: function(component, event, helper){

        this.superUnrender();
        window.clearInterval(component.get("v.setIntervalId"));
        window.clearTimeout(component.get("v.setTimeoutId"));

    }
})