({
	handleInit : function( component, event ) {
 
	},

    handleGameChange : function( component, event){
        let examMap = new Map();

        // creating mock data
        examMap.set( "Data Model", [{ name: "ERD", isPassed: true, highScore: 88.8 }, 
                                    { name: "Communism", isPassed: true, highScore: 78.8 },
                                    { name: "Shade", isPassed: true, highScore: 99.8 },
                                    { name: "Humble", isPassed: false, highScore: 42.0 },
                                    { name: "Iconique", isPassed: false, highScore: null } 
                                ]);

        examMap.set( "Security", [ { name: "someName", isPassed: true, highScore: 81.5 },
                                    { name: "someName", isPassed: true, highScore: 81.5 } 
                                ]);

        examMap.set( "Triggers" , [ { name: "someName1", isPassed: true, highScore: 99.0 },
                                    { name: "someName2", isPassed: true, highScore: 87.0 },
                                    { name: "someName3", isPassed: true, highScore: 73.0 },
                                    { name: "someName4", isPassed: false, highScore: 42.0 },
                                    { name: "someName5", isPassed: false, highScore: 42.0 }, 
                                    { name: "someName6", isPassed: false, highScore: 42.0 },
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

        console.log("exam: " + JSON.stringify(exams));
        console.log("first exam: " + JSON.stringify(firstExam));
        console.log("final exam: " + JSON.stringify(finalExam));
        console.log("iterable exam: " + JSON.stringify(iterableExams));

        }
    }
})