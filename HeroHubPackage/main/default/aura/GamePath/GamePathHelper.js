({
	handleInit : function( component, event ) {
        console.log("game initialization");
        let exams = component.get("v.contextInfo.userExams");
        let examMap = new Map();
        examMap.set( "Data Model", [ { name: "ERD", isPassed: true, highScore: 88.8 }, 
                                    { name: "Communism", isPassed: true, highScore: 88.8 } 
                                ]);
        examMap.set( "Security", [ { name: "someName", isPassed: true, highScore: 81.5 } ] );
        examMap.set( "Triggers" , [ { name: "someName", isPassed: false, highScore: 42.0 } ] );
         
        
        exams = examMap.get("Data Model");
        console.log("exams: " + exams);                 
        let passedExams = [];
        
        for(let i in exams){
            console.log("exam: " + exams[i]);
            if(exams[i].isPassed){
                passedExams.push(exams[i]);
                console.log(exams[i].name)
            }
        }
        
        component.set("v.exams", exams);
        component.set("v.passedExams", passedExams);
        
        
	}
})