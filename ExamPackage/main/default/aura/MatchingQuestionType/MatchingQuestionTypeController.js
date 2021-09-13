({
    loadOptions : function(component, event, helper) {
        helper.loadHelper(component);

    },
    // returns answer to the examinterview component
    answer : function(cmp) {
        
        var answer = cmp.get("v.answers");
        return answer;
    }
})
