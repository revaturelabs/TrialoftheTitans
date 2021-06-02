/////////////////////////////////////////////////////
//
//  Name: GamePathHelper.cmp
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/28/2021
//  Description: Javascript helper that handles the logic for onclick events
//
///////////////////////////////////////////////////

({
	handleInit : function( component, event ) {
 
	},


    // HandleGamechange(): sets the appropriate exams to be displayed based on the titan being displayed

    HandleGameChange : function( component, event){
        
        if(component.get("v.active") != "Overview"){
            
        //let exams = examMap.get(component.get("v.active"));     
        
        let exams = component.get("v.currentExams");   
        let iterableExams = [];

        let firstExam = exams[0];
        let finalExam = exams[exams.length - 1];

        // go through list of exams and push all exams except for the first and last into iterableExams
        for(let exam in exams){
            if(exam == 0 || exam == (exams.length - 1)){

            }else{

                iterableExams.push(exams[exam]);
            }
        }

        
        component.set("v.exams", exams);
        component.set("v.firstExam", firstExam);
        component.set("v.finalExam", finalExam);
        component.set("v.iterableExams", iterableExams);

        console.log("exam: " + JSON.stringify(exams));
        console.log("first exam: " + JSON.stringify(firstExam));
        console.log("final exam: " + JSON.stringify(finalExam));
        console.log("iterable exam: " + JSON.stringify(iterableExams));

        }
    },
    
    // HandgleExamClick(): gets the necessary event, and passes in the exam information as a parameter
    // data-values are set in the markup to help distinguish which exam to pass in

    HandleExamClick : function( component, event ){
		console.log("handling click");
        let clickEvent =  $A.get("e.c:ExamClickedEvent");
        let exams =  component.get("v.exams");
        let exam;

        console.log("data-value: " + event.currentTarget.dataset.value)
        if(event.currentTarget.dataset.value == "first"){
            exam = exams[0];
        }else if(event.currentTarget.dataset.value == "final"){
            exam = exams[exams.length - 1];
        }else{
            exams =  component.get("v.iterableExams");
            exam = exams[event.currentTarget.dataset.value];
        }

        console.log(exam);
        clickEvent.setParams({"exam" : exam });
        clickEvent.fire();

    }



})
