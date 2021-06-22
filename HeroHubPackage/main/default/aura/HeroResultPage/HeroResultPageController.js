({
    onInit: function(cmp, event, helper) {
        const getResultList = cmp.get('c.getResultList');
        getResultList.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                const resultList = response.getReturnValue();
                console.log("getting result list", resultList);
                cmp.set("v.resultList", resultList);
                console.log("resultList is...", cmp.get('v.resultList'));
                //=> {Id: "a075e000000q6WDAAY", Account__c: "0015e00000AeLnyAAF", Score__c: 88.89, Total_Correct__c: 40, Total_Answers__c: 45, …}
            }
        })
        $A.enqueueAction(getResultList);
    },

    boxClicked: function(cmp, event, helper) {
        const result = cmp.get('v.resultList');
        // console.log("score is...", result[0].Score__c);
        // document.querySelector('.box').innerHTML = `<p class="yo">${result[0].Score__c}</p>`;
        let htmlText = ''
        result.forEach(singleExam => {
            htmlText += `<li>${singleExam.Exam__r.Name} - ${singleExam.Pass__c ? 'Pass': 'Fail'} Score: ${singleExam.Score__c}</li>`
        })
        document.querySelector('.unorderedlist').innerHTML = htmlText;
    }
})