/////////////////////////////////////////////////////
//
//  Name: QCInterviewScoreCompController
//  Author: syzyzygy
//  Description: this controller initalizes and manipulates the HeroScore Attribute on the QC inteview page
//               it utilizes 2 functions for addition and subtraction to do this
//
///////////////////////////////////////////////////

({
    init : function(cmp, event, helper) {

        // change this for when we are loading a previous interview
        // simply intalizes the variable
        cmp.set('v.HeroScore',0)

    },


    PlusClick: function(cmp){

        let x = cmp.get('v.HeroScore')
        cmp.set('v.HeroScore', ++x)
        
    },

    MinusClick: function(cmp){

        let x = cmp.get('v.HeroScore')
        if(x > 0)
            cmp.set('v.HeroScore', --x)
        
    }

})