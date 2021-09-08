({
    // adds row
    AddRow : function(component, event, helper){
        helper.addRow(component);
             
    },
    
    // delete row and registers the index of deleted row with the event attriute
    DeleteRow : function(component, event, helper){
        helper.deleteRow(component);
       
    }, 
    //Pass the info of the newly created Flag to the handler to be incorporated
    submit : function(component, event, helper) {
        helper.submit(component);
        
    }
  
})