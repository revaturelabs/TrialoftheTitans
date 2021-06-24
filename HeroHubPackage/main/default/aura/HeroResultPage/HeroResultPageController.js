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
        helper.filterAndMarkTab(cmp, event)
    }
})
