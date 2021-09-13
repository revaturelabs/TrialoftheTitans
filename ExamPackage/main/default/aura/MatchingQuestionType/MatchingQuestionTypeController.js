({
    loadOptions : function(component, event, helper) {
        helper.loadHelper(component);

    },
    answer : function(cmp) {
        // retrieves array object of selected values
        var answer = cmp.find('test').get("v.value");
        console.log(answer);
        //converts all answers from array into a single string
        var answerString = "";
        for(let i = 0; i < answer.length - 1; i++){
            answerString += answer[i] + "||" ;
        }
        answerString += answer[answer.length - 1];

        console.log(answerString);
        return answerString;
    }
})
