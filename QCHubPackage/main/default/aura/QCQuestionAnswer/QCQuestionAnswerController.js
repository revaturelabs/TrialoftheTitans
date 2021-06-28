({
    OnInit : function(component, event, helper){

        //helper.getData(component, event, helper);
        helper.setQuestionDeck(component, event, helper);

    },
    answerSubmit : function(component, event, helper){
        helper.submitAnswer(component, event, helper);
    }
})