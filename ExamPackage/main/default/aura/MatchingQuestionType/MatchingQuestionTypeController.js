({
    loadOptions : function(component, event, helper) {
        helper.loadHelper(component);

    },
    answer : function(cmp) {
        // retrieves array object of selected values
        var answer = cmp.find('answers');
        var newAnswers = [];
        for(let a of answer){
            newAnswers.push(a.get("v.value"));

        }
        
        //converts all answers from array into a single string
        var answerString = "";
        for(let i = 0; i < newAnswers.length - 1; i++){
            answerString += newAnswers[i] + "||" ;
        }
        answerString += newAnswers[newAnswers.length - 1];
        return answerString;  
    }
})
