trigger UserTrigger on User (after insert) {
    switch on trigger.operationType {
        when AFTER_INSERT {
            UserTriggerHandler.AssignExams( trigger.new );
        }
    }
}