({
	handleInit : function( component, event ) {
<<<<<<< HEAD
        let exams = component.get("v.contextInfo.userExams");
        let examMap = new Map();

        // creating mock data
        examMap.set( "Data Model", [ { name: "ERD", isPassed: true, highScore: 88.8 }, 
                                    { name: "Communism", isPassed: true, highScore: 78.8 },
                                    { name: "Shade", isPassed: true, highScore: 99.8 },
                                    { name: "Humble", isPassed: false, highScore: 42.0 },
                                    { name: "Iconique", isPassed: false, highScore: null } 
                                ]);

        examMap.set( "Security", [ { name: "someName", isPassed: true, highScore: 81.5 },
                                    { name: "someName", isPassed: true, highScore: 81.5 } 
                                ]);

        examMap.set( "Triggers" , [ { name: "someName", isPassed: false, highScore: 42.0 },
                                    { name: "someName", isPassed: false, highScore: 42.0 },
                                    { name: "someName", isPassed: false, highScore: 42.0 },
                                    { name: "someName", isPassed: false, highScore: 42.0 },
                                    { name: "someName", isPassed: false, highScore: 42.0 }, 
                                    { name: "someName", isPassed: false, highScore: 42.0 },
                                    ]);
         
        console.log("updated active:" + component.get("v.active"));
        exams = examMap.get(component.get("v.active"));             
        let passedExams = [];
        let failedExams = [];
        
        for(let i in exams){
            if(exams[i].isPassed){
                passedExams.push(exams[i]);
               
            } else {
                failedExams.push(exams[i]);
            }
        }

        let firstExam;
        let finalExam;
        // account for no failed exams (all passed)
        // account for all "failed" exams (none taken yet)
        if( exams != null && passedExams != null && passedExams.length == exams.length ){
            firstExam = passedExams[0];
            finalExam = passedExams[ passedExams.length - 1 ];
            passedExams.pop();
            passedExams.shift();

            component.set("v.firstExam", firstExam);
            component.set("v.finalExam", finalExam);
            component.set("v.passedExams", passedExams);
            component.set("v.exams", exams);
        } else if( exams != null && failedExams != null && failedExams.length == exams.length ){
            firstExam = failedExams[0];
            finalExam = failedExams[ failedExams.length - 1 ];
            failedExams.pop();
            failedExams.shift();

            component.set("v.firstExam", firstExam);
            component.set("v.finalExam", finalExam);
            component.set("v.failedExams", passedExams);
            component.set("v.exams", exams);
        } else {
            firstExam = passedExams[0];
            finalExam = failedExams[failedExams.length-1];
            passedExams.shift();
            failedExams.pop();

            component.set("v.firstExam", firstExam);
            component.set("v.finalExam", finalExam);
            component.set("v.passedExams", passedExams);
            component.set("v.failedExams", passedExams);
            component.set("v.exams", exams);
        }
=======
 
	},

    handleGameChange : function( component, event){
        let examMap = new Map();

        // creating mock data
        examMap.set( "Data Model", [{ name: "Objects", isPassed: true, highScore: 88.8, assigned: true}, 
                                    { name: "ERD", isPassed: true, highScore: 78.8, assigned: true,
                                    currentResults: [{Total_Answers__c: 50, Total_Correct__c: 49},
                                                    {Total_Answers__c: 50, Total_Correct__c: 40}] },
                                    { name: "Security", isPassed: true, highScore: 99.8, assigned: true },
                                    { name: "Yes", isPassed: false, highScore: null, assigned: true },
                                    { name: "Exam", isPassed: false, highScore: null, assigned: false } 
                                ]);

        examMap.set( "Security", [ { name: "someName", isPassed: true, highScore: 81.5, assigned: true },
                                    { name: "someName", isPassed: true, highScore: 81.5, assigned: true } 
                                ]);

        examMap.set( "Triggers" , [ { name: "someName1", isPassed: true, highScore: 99.0, assigned: true },
                                    { name: "someName2", isPassed: true, highScore: 87.0, assigned: true },
                                    { name: "someName3", isPassed: true, highScore: 73.0, assigned: true },
                                    { name: "someName4", isPassed: false, highScore: 39.0, assigned: true },
                                    { name: "someName5", isPassed: false, highScore: 42.0, assigned: true }, 
                                    { name: "someName6", isPassed: false, highScore: 69.9, assigned: true },
                                    { name: "someName7", isPassed: false, highScore: null, assigned: true },
                                    { name: "someName8", isPassed: false, highScore: null, assigned: false },
                                    { name: "someName9", isPassed: false, highScore: null, assigned: false }
                                    ]);
         
        console.log("updated active: " + component.get("v.active"));
        if(component.get("v.active") != "Overview"){
            
        let exams = examMap.get(component.get("v.active"));             
        let iterableExams = [];

        let firstExam = exams[0];
        let finalExam = exams[exams.length - 1];

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
>>>>>>> david

        console.log("exam: " + JSON.stringify(exams));
        console.log("first exam: " + JSON.stringify(firstExam));
        console.log("final exam: " + JSON.stringify(finalExam));
<<<<<<< HEAD
        console.log("passed exams: " + JSON.stringify(passedExams));
        console.log("failed exams: " + JSON.stringify(failedExams));

	},

    handleGameChange : function( component, event){
        let method = component.get("c.GameInit");
        method.setParams({"component" : component, "event" : event});
        $A.enqueueAction(method);
    }
})
=======
        console.log("iterable exam: " + JSON.stringify(iterableExams));

        }
    },
    
    handleExamClick : function( component, event ){
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
>>>>>>> david
