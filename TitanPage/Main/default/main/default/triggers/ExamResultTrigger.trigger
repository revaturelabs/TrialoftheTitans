trigger ExamResultTrigger on Exam_Result__c (after update) {
switch on trigger.operationType{
	   when BEFORE_INSERT{
            
        }
       when BEFORE_UPDATE{
            
        }
       When BEFORE_DELETE{
            
        }
       when AFTER_INSERT{
            
        }
       when AFTER_UPDATE{
       ExamResultTriggerHandler.sendChatterMessageForTitanCompletion(trigger.new);  
        }
       when AFTER_DELETE{
            
        }
       when AFTER_UNDELETE{
            
       }
 }
}