({
    onInit: function (cmp, event, helper) {
        const getResultList = cmp.get('c.getResultList');
        let result = []
        let titanIdList = [];
        getResultList.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const resultList = response.getReturnValue();
                console.log("getting result list", resultList);
                for (let i in resultList) {
                    result.push(resultList[i])
                    console.log(resultList[i])
                }
                let examListPanel
                result.forEach(singleExam => {
                    const titanId = singleExam.Exam__r.Titan__c
                    if (!titanIdList.includes(titanId)) {
                        titanIdList.push(titanId)
                    }
                    $A.createComponents([
                        ["aura:html", {
                            "tag": 'div',
                            "HTMLAttributes": {
                                "id": singleExam.Id,
                                "onclick": cmp.getReference("c.onExamClick"),
                                "aura:id": "exam-btn",
                                "class": `exam-btn ${(singleExam.Exam__r.Titan__r.Name).replace(" ", "_").toLowerCase()}`
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
                                examListPanel = cmp.get('v.examListPanel')
                                wrapperDiv.set("v.body", innerDiv)
                                examListPanel.push(wrapperDiv)
                                cmp.set("v.examListPanel", examListPanel)
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

                cmp.set("v.resultList", resultList)
                cmp.set("v.titanIdList", titanIdList)

                console.log("resultList is...", cmp.get('v.resultList'));
                //=> {Id: "a075e000000q6WDAAY", Account__c: "0015e00000AeLnyAAF", Score__c: 88.89, Total_Correct__c: 40, Total_Answers__c: 45, …}
            }
        })
        console.log('mylist..' + cmp.get('v.titanIdList'))
        // console.log(result)
        const getTitanList = cmp.get('c.getTitanList');
        getTitanList.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const titanList = response.getReturnValue();
                console.log('myTitans...' + titanList)
                titanList.forEach(titan => {
                    $A.createComponent(
                        "aura:html", {
                        'tag': 'div',
                        'body': `${titan}`,
                        'HTMLAttributes': {
                            'class': 'titan-tab',
                            'onclick': cmp.getReference("c.onTitanClick")
                        }
                    },
                        function (newCmp, status, errMsg) {
                            if (status === 'SUCCESS') {
                                let titanTabPanel = cmp.get('v.titanTabPanel')
                                titanTabPanel.push(newCmp)
                                cmp.set('v.titanTabPanel', titanTabPanel)
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
                    )
                })
            }
        })
        $A.enqueueAction(getResultList)
        $A.enqueueAction(getTitanList)
    },

    onExamClick: function (cmp, event, helper) {
        console.log(event.target.id)
        let action = $A.get('e.c:ExamResultBtnClickedEvent');
        action.setParams({
            'ExamId': event.target.id
        })
        action.fire();
        // Diable `exam-btn` hide for now
        // cmp.set("v.examClicked", true)
        console.log(action);
    },
    onTitanClick: function (cmp, event, helper) {
        // if (cmp.get('v.examClicked')) {
        //     cmp.set('v.examClicked', false)
        // }
        // event.target.className()
        // console.log(event.target.Id)
        // document.getElementById(`${event.target.Id}`).className += ' active'
        // console.log(event.target)
        let titan = event.target.innerHTML.replace(" ", "_").toLowerCase()
        cmp.set('v.currentPage', titan)
        document.querySelectorAll('.titan-tab').forEach(singleTab => {
            console.log(cmp.get('v.currentPage'), ' AND ', singleTab.innerHTML.replace(" ", "_").toLowerCase())
            singleTab.style.borderLeft = cmp.get('v.currentPage') === singleTab.innerHTML.replace(" ", "_").toLowerCase() ? '3px solid red' : '3px solid white'
        }
            // if (cmp.get('v.currentPage') === singleTab.innerHTML.replace(" ", "_").toLowerCase()) {
            //     console.log('im here')
            //     singleTab.style.borderLeft = '3px solid red'
            // } else {
            //     singleTab.style.borderLeft = '3px solid white'
            // }
        })
    if(titan === 'all_titans') {
    document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
        singleBtn.style.display = 'block'
    })
} else {
    document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
        singleBtn.style.display = singleBtn.className.includes(titan) ? 'block' : 'none'
    })
}


    }

})
