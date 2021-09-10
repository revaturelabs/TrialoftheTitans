({
    //Used for testing of the compoent before being added to the code. 
    //The commented out button on the component is what calls this function
    //Not needed entirely but can be useful if you need to test the component
    //ButtonClick: function(component, event, helper){
    //    console.log(component.get("v.ShortAnswer"));
    //},

    answer : function(cmp) {
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
    
})
