({

    getQuestionDeck: function(cmp, data) {
      
        console.log("ahoy2");

        var action = cmp.get('c.getQuestion');
        action.setParams({ Decks : data});
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            console.log(response.getState());
            if (state === "SUCCESS") {
                
                console.log(response.getReturnValue());

            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        
        $A.enqueueAction(action);


    },










})