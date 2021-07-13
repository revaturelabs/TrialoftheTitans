//////////////////////////////////////////
//
//Name: ShipmentTrigger
//Author: Abdul-Shahid Wali
//Date Created: 05/26/21
//Date Updated: 05/27/21
//Description: Trigger for the Exam Result custom object
//
//////////////////////////////////////////
trigger ExamResultTrigger on Exam_Result__c (before insert, before update, after insert, after update) {
    switch on trigger.operationType {
        when BEFORE_INSERT{
            //ExamResultTriggerHandler.PreventDuplicateExams(trigger.new);
        }
        when BEFORE_UPDATE{
            //ExamResultTriggerHandler.PreventDuplicateExams(trigger.new);
        }
        when AFTER_INSERT{
            ExamResultTriggerHandler.sendChatterMessageForTitanCompletion(trigger.new);     
        }
        when AFTER_UPDATE{
            ExamResultTriggerHandler.sendChatterMessageForTitanCompletion(trigger.new);  
        }
    }

}