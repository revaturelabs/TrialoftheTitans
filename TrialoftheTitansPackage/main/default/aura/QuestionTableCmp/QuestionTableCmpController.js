({
    init: function(component, event, helper) {
        
        helper.getData(null,component);
    },
    updateSelectedRows: function (component, event) {
        var selectedRows = event.getParam('selectedRows');
        component.set('v.selectedRows', selectedRows);
        
        var test=component.get("v.selectedRows");
    },
    searchQues: function (component,event,helper){
        let searchKeyword = component.get("v.searchKeyword");
        helper.getData(searchKeyword,component);
    },
    
    onMultiSelectChange:function(component,event,helper){
        var selectedPools = component.find("InputSelectMultiple").get("v.value");
        component.set('v.selectedPools',selectedPools);
    },
    handleNext : function(component, event, helper) { 
        var searchVal = component.find("searchField").get("v.value"); 
        var pageNumber = component.get("v.pageNumber");
        let searchKeyword = component.get("v.searchKeyword");
        component.set("v.pageNumber", pageNumber+1);
        helper.getData(searchKeyword,component);
        
    },
    
    handlePrev : function(component, event, helper) {   
        var searchVal = component.find("searchField").get("v.value"); 
        var pageNumber = component.get("v.pageNumber");
        let searchKeyword = component.get("v.searchKeyword");
        component.set("v.pageNumber", pageNumber-1);
        helper.getData(searchKeyword,component);
    },
    
    onSingleSelectChange : function(component, event, helper) {   
        var singleResult = component.find("InputSelectSingle").get("v.value"); 
        singleResult =Number(singleResult)
        component.set("v.pageSize", singleResult);
        let searchKeyword = component.get("v.searchKeyword");
        helper.getData(searchKeyword,component);
    },
    
    addQuestion2Pool : function (component,event, helper) {
        helper.addQues2Pool(component);
    },
    
})