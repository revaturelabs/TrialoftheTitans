/* Name: QCQuestionsImportController
 * Author: Brian McKay
 * Description: The CreateRecord function reads an input CSV file, then calls the
 *              CSV2JSON which parses the file contents into a string and calls the CreateQuestion function
 *              which calls the apex controller to insert questions.
 * Last Updated: 9-13-21 (Brian McKay)
 * 
 * NOTE: Column header names must be the same as the wrapper variable names in the Apex controller!
 * 		For example: (in CSV) 
 * 			Name	questionBody	ExpectedValue
 * 			Value1	Value2			Value3
 * 
 * 					(in Apex controller)
 * 			public class wrapperClass {
 				public String Name;
                public String questionBody;
            	public String ExpectedValue;
 			}
 *              
*/ 
({
    //function for reading an imported CSV file
CreateRecord: function (component, event, helper) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        
        if (file){
            
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                
                
                var csv = evt.target.result;
                
                //calls a function to parse the CSV contents
                var result = helper.CSV2JSON(component,csv);
                
                helper.CreateQuestion(component,result);
                
            }
            reader.onerror = function (evt) {
                //console.log("error reading file");
            }
        }
        
    },
    
    //function that parses and displays imported CSV contents
    showfiledata :  function (component, event, helper){        
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if (file) {
            component.set("v.showcard", true);
            
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                var csv = evt.target.result;
                var table = document.createElement("table");
                var rows = csv.split("\n");
                
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }
                }
                var divCSV = document.getElementById("divCSV");
                divCSV.innerHTML = "";
                divCSV.appendChild(table);
            }
            reader.onerror = function (evt) {
                //console.log("error reading file");
            }
        }
    }                  
})