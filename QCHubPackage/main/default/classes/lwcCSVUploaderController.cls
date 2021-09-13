/* Name: lwcCSVUploaderController
 * Author: Brian McKay
 * Description: This class takes an input string that represents the parsed contents of an imported
 * 				CSV file. Then the insertData method deserializes the input string and associates 
 * 				the input with the QC field values 'Question Name, Question Body, and Expected Answer'
 * LastUpdated: 9-13-21 (Brian McKay)
*/ 
public class lwcCSVUploaderController {
    
    
    @AuraEnabled
    public static string insertData(String strfromle){
        String returnresponse ='';
        List<QC_Question__c> qcq = new List<QC_Question__c>();
        system.debug('strfromle = ' + strfromle);
        
        List<fieldWrapper> datalist = (List<fieldWrapper>)JSON.deserialize(strfromle, List<fieldWrapper>.class);
        system.debug('datalist = ' + datalist);
        system.debug('datalistSize = ' + datalist.size());
        for(fieldWrapper wrapper: datalist){
            QC_Question__c q = new QC_Question__c();
            q.Name = wrapper.Name;
            q.Question_Body__c = wrapper.questionBody;
            q.Expected_Answer__c = wrapper.ExpectedAnswer;
            
            qcq.add(q);            
        }
        
        if(qcq.size() > 0){
            try {
                insert qcq;
                returnresponse = 'SUCCESS';
            }
            catch(Exception ex){
                returnresponse = 'ERROR';
            }
        }
        return returnresponse;
    }
    
    //class used to associate field values with deserialized values from the input string
    public class fieldWrapper{        
        public String Name;       
        public String questionBody;
        public String ExpectedAnswer;
        
    }

}