({
	handleInit : function( component, event ) {
        let exams = component.get("v.contextInfo.userExams");
        exams = {"titan1": [{ name: "someName", isPassed: true, highScore: 88.8 }],
                 "titan2" : [{ name: "someName", isPassed: true, highScore: 81.5 }],
                 "titan3" : [{ name: "someName", isPassed: false, highScore: 42.0 }],
                 "titan4" : [{ name: "someName", isPassed: false, highScore: 0 }],
                 "titan5" : [{ name: "someName", isPassed: false, highScore: 0 }]
                 };
                
        
        let passedExams = [];
        
        for(let exam in exams){
            if(exam.isPassed){
                passedExams.push(exam);
            }
        }
        
        component.set("v.exams", exams);
        component.set("v.passedExams", passedExams);
        
        
	}
})