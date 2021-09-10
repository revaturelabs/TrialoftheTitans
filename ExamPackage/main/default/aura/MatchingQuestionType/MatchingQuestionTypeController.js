({
    loadOptions : function(component, event, helper) {
        helper.loadHelper(component);

    },
    answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})
