({
	handleInit : function( component, event ) {
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

        console.log("exam: " + JSON.stringify(exams));
        console.log("first exam: " + JSON.stringify(firstExam));
        console.log("final exam: " + JSON.stringify(finalExam));
        console.log("passed exams: " + JSON.stringify(passedExams));
        console.log("failed exams: " + JSON.stringify(failedExams));

	},

    handleGameChange : function( component, event){
        let method = component.get("c.GameInit");
        method.setParams({"component" : component, "event" : event});
        $A.enqueueAction(method);
    }
})