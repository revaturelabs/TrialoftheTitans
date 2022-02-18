trigger SetTFOptions on Exam_Question__c (before insert, before update) {
    Switch on Trigger.OperationType {
        when BEFORE_INSERT {
            setTFOptions_Helper.SetOptions(Trigger.new);
        } 
        when BEFORE_UPDATE {
			setTFOptions_Helper.SetOptions(Trigger.new);
        }
    }
}