({

    getQuestionDeck: function(cmp, data, helper) {
      

        var action = cmp.get('c.getQuestion');
        action.setParams({ Decks : data});
        action.setCallback(this, function (response) {
            
            var state = response.getState();

            if (state === "SUCCESS") {
                
                //console.log(response.getReturnValue());
                //cmp.set('v.HeroAnswer.Question__c', response.getReturnValue()[0].Question_Body__c);
                helper.scrambleList(response.getReturnValue());
                return response.getReturnValue();

            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        
        $A.enqueueAction(action);


    },

    scrambleList : function(InputList){
        
        let OutputList = [];
        let values = Object.values(InputList);
        console.log(InputList);
            //*
            for(let x in InputList){


                OutputList.push(values.splice(Math.floor(Math.random() * values.length), 1));
                 
            }
            //*/
            console.log(OutputList);

    },










})