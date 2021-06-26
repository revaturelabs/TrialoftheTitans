//////////////////////////////////////////
// Name: HeroResultPageController.js
// Author: Wootae Yang
// Description: HeroResultPage Controller
//////////////////////////////////////////
({
    onInit: function (cmp, event, helper) {
        helper.init(cmp, event)
    },
    onExamClick: function (cmp, event, helper) {
        helper.fireExamIdEvent(cmp, event)
    },
    onTitanClick: function (cmp, event, helper) {
        helper.markActiveTab(cmp, event)
        helper.filterExamList(cmp, event)
    },
    onBackBtnClick: function (cmp, event, helper) {
        helper.navBackToExams(cmp, event)
    },
    onPbpClick: function (cmp, event, helper) {
        helper.showPbp(cmp, event)
    }
})
