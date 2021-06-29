({ 
   //toggles the visibility for the pool percentages
   ToggleExamPoolPercentage : function(component, event, helper) {
        // component.set("v.TogglePoolInfo", component.get("v.TogglePoolInfo"));
    },

    //creates an object for all exam result questions in a pool 
    //and all correct exam result questions in a pool, compares the pool
    CalculatePoolPercentage : function(component, event, correctExamResultPoolQuestions) {
        let correctPoolQuestionsObj = {};
        let allPoolQuestionsObj ={};
        let resultsObject ={};
        let key;
        let initValue;
        let fixedValue;

        //create an object to count correct answer frequency for each pool through key/value pairs
        correctExamResultPoolQuestions.forEach(item => {
            if(correctPoolQuestionsObj[item]){
            correctPoolQuestionsObj[item]++;
            }else{
            correctPoolQuestionsObj[item] = 1;
            }
            });

            //create an object to count answer frequency for each pool through key/value pairs
            let allExamResultPoolQuestions =  JSON.parse(JSON.stringify(component.get("v.ExamResultPoolQuestions")));
            console.log('HERE',allExamResultPoolQuestions);

            allExamResultPoolQuestions.forEach(item => {
                if(allPoolQuestionsObj[item]){
                allPoolQuestionsObj[item]++;
                }else{
                allPoolQuestionsObj[item] = 1;
                }
                });

                //Nested for loop to compare the correctPoolQuestionsObj and allPoolQuestionsObj objects pool name
                //Then divide the correct number of answer with all answer found in the respective pool, 
                //then take that value and fix it. Lastly  
                for (let i = 0; i < Object.keys(correctPoolQuestionsObj).length; i++){

                    for (let j = 0; j < Object.keys(allPoolQuestionsObj).length; j++){

                        if(Object.keys(correctPoolQuestionsObj)[i] == Object.keys(allPoolQuestionsObj)[j]){

                            key = Object.keys(correctPoolQuestionsObj)[i];
                            initValue = (correctPoolQuestionsObj[Object.keys(correctPoolQuestionsObj)[i]] / allPoolQuestionsObj[Object.keys(allPoolQuestionsObj)[j]]) * 100;
                            fixedValue = initValue.toFixed(2); 
                            resultsObject[key] = fixedValue; 
                        }
                    }
                }
                let mapForAttribute = Object.entries(resultsObject).map(([key, value]) => ({key,value}));
                component.set("v.ExamResultPoolQuestions", mapForAttribute);
                this.drawD3(component, event, mapForAttribute)
            // console.log("Attribute Finalized: ");
            // console.log(component.get("v.ExamResultPoolQuestions"));
            // console.log("Correct Answers: ");
            // console.log(correctPoolQuestionsObj);
            // console.log("All Answers: ");
            // console.log(allPoolQuestionsObj);  
        },
        drawD3: function(cmp, event, mapForAttribute) {

            let obj = {};
            mapForAttribute.forEach(pair => {
                obj[pair.key] = pair.value
            })
            let sortable = [];
            for (let key in obj) {
                sortable.push([key, obj[key]])
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            })
            let objSorted = {}
            sortable.forEach(pair => {
                objSorted[pair[0]] = pair[1]
            })
            
            for (let i = 0; i < Object.keys(objSorted).length; i++) {
                // console.log(myJson[Object.keys(myJson)[i]])
                // myHtml += `<div data-score="${myJson[Object.keys(myJson)[i]]}"></div>`
                $A.createComponent(
                    "aura:html", {
                        "tag": 'div',
                        "body": `${Object.keys(objSorted)[i]}...${objSorted[Object.keys(objSorted)[i]]}%`,
                        "HTMLAttributes": {
                            "style": `--i:${objSorted[Object.keys(objSorted)[i]]}%; --y:${objSorted[Object.keys(objSorted)[i]] * 0.9}%`,
                            // "onclick": cmp.getReference("c.onExamClick"),
                            "class": 'bar-chart',
                            // "data-score": `${myJson[Object.keys(myJson)[i]]}%`
                        }
                    },
                    function(newButton, status, errorMessage){
                        //Add the new button to the body array
                        if (status === "SUCCESS") {
                            var body = cmp.get("v.body");
                            body.push(newButton);
                            cmp.set("v.body", body);
                        }
                        else if (status === "INCOMPLETE") {
                            console.log("No response from server or client is offline.")
                            // Show offline error
                        }
                        else if (status === "ERROR") {
                            console.log("Error: " + errorMessage);
                            // Show error message
                        }
                    }
                );

            }
            
            
        }
        
    })
    
    
                // let width = 960;
                // let height = 500;
    
                // let svg = d3.select(".test-div")
                //             .append("svg")
                //             .attr("width", width)
                //             .attr("height", height)
                //             .append('g')
    
                // let scale = d3.scaleLinear()
                // .range([0, 300])
                // .domain([0, 1000])
    
                // const xExtent = d3.extent(barChartData, d )
                // let data = myJson;
    
                // let 
                // console.log('looking here', JSON.stringify(mapForAttribute))
                // console.log('myJson', `${JSON.stringify(myJson)}`)
                // // console.log(myObj, myJson)
    
                // // d3.json(JSON.stringify(myJson), function(error, data) {
                // //     if (error) {
                // //         throw error
                // //     }
                // //     console.log(data)
                // // })
    
                // d3.json(myJson).then(res => {
                //     console.log('d3res', res)
                // })