/* Name: QCQuestionsHelper
 * Author: Brian McKay
 * Description: CSV2JSON parses the input CSV contents into a string which the Create Question function
 *              passes to the Apex controller to insert the questions
 * Last Updated: 9-13-21 (Brian McKay) 
 * 
*/

({
    //Parses CSV contents into a string that will be deserialized by the Apex controller
    CSV2JSON: function (component,csv) {
        
        
        
        var arr = []; 
        
        arr =  csv.split('\n');
        
        arr.pop();
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
                
            }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        
        
        
        return json;
        
        
    },
    
    //Apex controller deserializes CSV string into their respective QC Question field values that are then inserted
    //to the org
    CreateQuestion : function (component,jsonstr){
        
        var action = component.get('c.insertData');
           
        action.setParams({
            "strfromle" : jsonstr
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {  
                var result=response.getReturnValue();
                alert("Questions Inserted Succesfully");
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    alert('Questions were not inserted');
            }
            }
        }); 
        
        $A.enqueueAction(action);    
        
    }
})