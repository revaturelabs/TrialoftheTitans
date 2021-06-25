({
    /*allExamPoolQuestionsMapped : function(component, finalflash) {
    const cap = {};
    finalflash.forEach(item => {
        if(cap[item]){
        cap[item]++;
        }else{
        cap[item] = 1;
        }
        });
        component.set("v.questionPool", cap);
        console.log("All Pool Answers Below:");
        console.log(component.get("v.questionPool"));
    },
    */
    ExamPoolFormToggle : function(component, event, helper) {
        component.set("v.revealPoolInfo", !component.get("v.revealPoolInfo"));
    },

    correctExamPoolQuestionsMapped : function(component, CorrectAnswerPool) {
        const cap = {};
        const cap2 ={};
        const finmap ={};
        const obj ={};
        const finalflash =  JSON.parse(JSON.stringify(component.get("v.questionPool")));
        CorrectAnswerPool.forEach(item => {
            if(cap[item]){
            cap[item]++;
            }else{
            cap[item] = 1;
            }
            });

            finalflash.forEach(item => {
                if(cap2[item]){
                cap2[item]++;
                }else{
                cap2[item] = 1;
                }
                });

                

                
                
                let key;
                let initValue;
                let fixedValue;
                for (let i = 0; i < Object.keys(cap).length; i++){ 
                    for (let j = 0; j < Object.keys(cap2).length; j++){
                        console.log(Object.keys(cap)[i] + " " + Object.keys(cap2)[j])
                        if(Object.keys(cap)[i] == Object.keys(cap2)[j]){
                            console.log("Delivery");
                            key = Object.keys(cap)[i];
                            initValue = (cap[Object.keys(cap)[i]] / cap2[Object.keys(cap2)[j]]) * 100;
                            fixedValue = initValue.toFixed(2); 
                            finmap[key] = fixedValue; 
                        }
                    }
                }
                var output = Object.entries(finmap).map(([key, value]) => ({key,value}));

            component.set("v.questionPool", output);
            console.log("Attribute Done?");
            console.log(component.get("v.questionPool"));
            console.log("Correct Answers: ");
            console.log(cap);
            console.log("All Answers: ");
            console.log(cap2);  
        },

        
})
