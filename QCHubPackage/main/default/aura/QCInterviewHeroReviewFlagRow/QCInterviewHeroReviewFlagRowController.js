({
    // adds row
    AddRow : function(component, event, helper){
        helper.addRow(component);
             
    },
    
    // delete row and registers the index of deleted row with the event attriute
    DeleteRow : function(component, event, helper){
        helper.deleteRow(component);
       
    }, 
  
})