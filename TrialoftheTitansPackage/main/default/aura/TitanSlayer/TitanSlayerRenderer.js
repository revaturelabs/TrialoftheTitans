/////////////////////
//
//  Name:TitanSlayerRenderer
//  Author: Josh Miccolo
//  Description: Renderer to clear Intervals
//  and Timeouts
//
/////////////////////
({
    unrender: function(component, event, helper){

        this.superUnrender();
        console.log('from unrenderer')
        window.clearInterval(component.get("v.setIntervalId"));
        component.set("v.setIntervalId", null);
        window.clearTimeout(component.get("v.setTimeoutId"));
        component.set("v.setTimeoutId", null);
    }
})