({
	fetchMultiChoices : function(component, event, helper) {
		helper.fetchMultiChoices(component, event, helper);
	},
    // returns answer to the examinterview component
    answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        var answerString = "";
        for(let i = 0; i < answer.length - 1; i++){
            answerString += answer[i] + "||" ;
        }
        answerString += answer[answer.length - 1];
        
        return answerString;
    }
})