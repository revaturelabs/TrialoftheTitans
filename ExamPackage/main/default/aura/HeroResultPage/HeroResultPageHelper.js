//////////////////////////////////////////
// Name: HeroResultPageHelper.js
// Author: Wootae Yang
// Description: HeroResultPage Helper
//////////////////////////////////////////

({
    init: function (cmp, event) {
        let titanIdList = [];
        const getResultList = cmp.get('c.getResultList');
        getResultList.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const resultList = response.getReturnValue();
                // console.log("getting result list", resultList);
                resultList.forEach(singleExam => {
                    const titanId = singleExam.Exam__r.Titan__c
                    if (!titanIdList.includes(titanId)) {
                        titanIdList.push(titanId)
                    }
                    $A.createComponents([
                        ["aura:html", {
                            "tag": 'div',
                            "HTMLAttributes": {
                                // "id": singleExam.Id,
                                "onclick": cmp.getReference("c.onExamClick"),
                                "data-result-id": singleExam.Id,
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
                                let examListPanel = cmp.get('v.examListPanel')
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

                // console.log("resultList is...", cmp.get('v.resultList'));
                //=> {Id: "a075e000000q6WDAAY", Account__c: "0015e00000AeLnyAAF", Score__c: 88.89, Total_Correct__c: 40, Total_Answers__c: 45, …}
            }
        })
        // console.log('mylist..' + cmp.get('v.titanIdList'))
        // console.log(result)
        const getTitanList = cmp.get('c.getTitanList');
        getTitanList.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const titanList = response.getReturnValue();
                // console.log('myTitans...' + titanList)
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
                                console.log("Error: " + errMsg);
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
    markActiveTab: function (cmp, event) {
        const titan = event.target.innerHTML.replace(" ", "_").toLowerCase()
        cmp.set('v.currentPage', titan)
        document.querySelectorAll('.titan-tab').forEach(singleTab => {
            const slug = singleTab.innerHTML.replace(" ", "_").toLowerCase()
            // console.log(cmp.get('v.currentPage'), ' AND ', slug)
            singleTab.style.borderLeft = cmp.get('v.currentPage') === slug
                ? '3px solid black'
                : ''
            singleTab.style.boxShadow = cmp.get('v.currentPage') === slug
                ? '3px 3px 2px black'
                : ''
        })
    },
    filterExamList: function (cmp, event) {
        const titan = event.target.innerHTML.replace(" ", "_").toLowerCase()
        if (titan === 'all_titans') {
            document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
                singleBtn.style.display = 'block'
            })
        } else {
            document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
                singleBtn.style.display = singleBtn.className.includes(titan)
                    ? 'block'
                    : 'none'
            })
        }
    },
    navBackToExams: function(cmp, event) {
        cmp.set('v.examClicked', false)
        cmp.set('v.pbpClicked', false)
    },
    navBackToSingleExam: function (cmp, event) {
        cmp.set('v.pbpClicked', false)
    },
    showPbp: function(cmp, event) {
        cmp.set('v.pbpClicked', true)
    },
    
    start : function(component, event, helper) {
        
		let getResults = "c.retrieveResults"
        let action = component.get(getResults)
        action.setCallback(this, function(response){
            
            component.set("v.caClicked", true)
                           if(response.getState()=="SUCCESS"){                              
                            component.set("v.results", response.getReturnValue())
                           }else{
                               component.set("v.results", null)
                           }
        })
    $A.enqueueAction(action)
	}, 
    fireExamIdEvent: function (cmp, event) {
        // Pass list of ExamResult as Array instead.
        cmp.set('v.examResultId', event.target.getAttribute('data-result-id'))
        // console.log(event.target.getAttribute('data-exam-id'))
        // const action = $A.get('e.c:ExamResultBtnClickedEvent');
        // action.setParams({
        //     'ExamId': event.target.getAttribute('data-result-id')
        // })
        // action.fire();
        // Diable `exam-btn` hide for now
        cmp.set("v.examClicked", true)
        // console.log(action);
    }
})