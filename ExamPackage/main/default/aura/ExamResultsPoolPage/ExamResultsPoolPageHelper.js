({ 
   //toggles the visibility for the pool percentages
   ToggleExamPoolPercentage : function(component, event, helper) {
        component.set("v.TogglePoolInfo", !component.get("v.TogglePoolInfo"));
    },

    //creates an object for all exam result questions in a pool 
    //and all correct exam result questions in a pool, compares the pool
    CalculatePoolPercentage : function(component, correctExamResultPoolQuestions) {
        var correctPoolQuestionsObj = {};
        var allPoolQuestionsObj ={};
        var resultsObject ={};
        let key;
        let initValue;
        let fixedValue;

        //create an object to count correct answer frequency for each pool through key/value pairs
        correctExamResultPoolQuestions.forEach(item => {
            if(correctPoolQuestionsObj[item]){
            correctPoolQuestionsObj[item]++;
            }else{
            correctPoolQuestionsObj[item] = 1;
            }
            });

            //create an object to count answer frequency for each pool through key/value pairs
            var allExamResultPoolQuestions =  JSON.parse(JSON.stringify(component.get("v.ExamResultPoolQuestions")));
            allExamResultPoolQuestions.forEach(item => {
                if(allPoolQuestionsObj[item]){
                allPoolQuestionsObj[item]++;
                }else{
                allPoolQuestionsObj[item] = 1;
                }
                });

                //Nested for loop to compare the correctPoolQuestionsObj and allPoolQuestionsObj objects pool name
                //Then divide the correct number of answer with all answer found in the respective pool, 
                //then take that value and fix it. Lastly  
                for (let i = 0; i < Object.keys(correctPoolQuestionsObj).length; i++){

                    for (let j = 0; j < Object.keys(allPoolQuestionsObj).length; j++){

                        if(Object.keys(correctPoolQuestionsObj)[i] == Object.keys(allPoolQuestionsObj)[j]){

                            key = Object.keys(correctPoolQuestionsObj)[i];
                            initValue = (correctPoolQuestionsObj[Object.keys(correctPoolQuestionsObj)[i]] / allPoolQuestionsObj[Object.keys(allPoolQuestionsObj)[j]]) * 100;
                            fixedValue = initValue.toFixed(2); 
                            resultsObject[key] = fixedValue; 
                        }
                    }
                }
                var mapForAttribute = Object.entries(resultsObject).map(([key, value]) => ({key,value}));

            component.set("v.ExamResultPoolQuestions", mapForAttribute);
            console.log("Attribute Finalized: ");
            console.log(component.get("v.ExamResultPoolQuestions"));
            console.log("Correct Answers: ");
            console.log(correctPoolQuestionsObj);
            console.log("All Answers: ");
            console.log(allPoolQuestionsObj);  
        },
   
})
