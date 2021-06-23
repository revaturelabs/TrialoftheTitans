({
    onInit: function (cmp, event, helper) {
        const getResultList = cmp.get('c.getResultList');
        let result = []
        getResultList.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const resultList = response.getReturnValue();
                console.log("getting result list", resultList);
                for (let i in resultList) {
                    result.push(resultList[i])
                    console.log(resultList[i])
                }
                let body
                result.forEach(singleExam => {
                    $A.createComponents([
                        ["aura:html", {
                            "tag": 'div',
                            "HTMLAttributes": {
                                "id": singleExam.Id,
                                "onclick": cmp.getReference("c.onExamClick"),
                                "aura:id": "exam-btn",
                                "class": "exam-btn"
                            }
                        }], [
                            "aura:html", {
                                "tag": 'div',
                                'body': `${singleExam.Exam__r.Name}`,
                                "HTMLAttributes": {
                                    'class': `${singleExam.Pass__c ? `pass` : `fail`}`
                                }
                            }
                        ]],
                        function (cmps, status, errorMessage) {
                            if (status === "SUCCESS") {
                                let wrapperDiv = cmps[0]
                                let innerDiv = cmps[1]
                                body = cmp.get('v.body')
                                wrapperDiv.set("v.body", innerDiv)
                                body.push(wrapperDiv)
                                cmp.set("v.body", body)
                                // body = cmp.get("v.body");
                                // body.push(newCmp);
                                // cmp.set("v.body", body);
                                // console.log(body)
                            } else if (status === "INCOMPLETE") {
                                console.log("No response from server or client is offline.")
                                // Show offline error
                            } else if (status === "ERROR") {
                                console.log("Error: " + errorMessage);
                                // Show error message
                            }
                        }
                    )
                })
                // console.log('RESULT VARIABLE: ' + JSON.parse(result[0]).Pass__c)
                cmp.set("v.resultList", resultList);

                // for (let i of resultList) {
                //     result.push(resultList[i]);
                // }

                // console.log('MY RESULT HERE:.......' + resultList)
                // result.push(resultList)
                // console.log('MY RESULT HERE:.......' + JSON.parse(result))
                console.log("resultList is...", cmp.get('v.resultList'));
                //=> {Id: "a075e000000q6WDAAY", Account__c: "0015e00000AeLnyAAF", Score__c: 88.89, Total_Correct__c: 40, Total_Answers__c: 45, …}
            }
        })
        $A.enqueueAction(getResultList);
        console.log(result)

    },

    boxClicked: function (cmp, event, helper) {
        // const result = cmp.get('v.resultList');
        // console.log("score is...", result[0].Score__c);
    },
    onExamClick: function (cmp, event, helper) {
        console.log(event.target.id)
    }

})
    // let htmlText = ''
    //                 htmlText += `
    // <div class="exam-btn" data-id="${singleExam.Id}" onclick="${cmp.getReference("c.onExamClick")}">
    //     ${singleExam.Exam__r.Name} <br/> ${singleExam.Pass__c ? `<div class="pass">Pass</div>`: `<div class="fail">Fail</div>`} Score: ${singleExam.Score__c}
    // </div>
    // `
    // document.querySelector('.exam-btn').addEventListener("click", onExamClick);


    // $A.createComponent(
    //         "div", {
    //             "aura:id": "exam-btn",
    //             "class": "exam-btn",
    //             "data-id": singleExam.Id,
    //             "onclick": cmp.getReference("c.onExamClick")
    //         },
    //         function(component, status, errMessage) {
    //             if (status === "SUCCESS") {
    //                 var body = cmp.get("v.body");
    //                 console.log(body)
    //                 body.push(component);
    //                 cmp.set("v.body", body);
    //             } else if (status === "INCOMPLETE") {
    //                 console.log("No response from server or client is offline.")
    //                     // Show offline error
    //             } else if (status === "ERROR") {
    //                 console.log("Error: " + errorMessage);
    //                 // Show error message
    //             }
    //         }
    //     )
    // document.querySelector('.exam-btn-group').innerHTML = htmlText;