trigger UserTrigger on User (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
    switch on trigger.operationType {
        when BEFORE_INSERT {
            
        }
        when BEFORE_UPDATE {
            
        }
        when BEFORE_DELETE {
            
        }
        when AFTER_INSERT {
            UserTriggerHandler.AssignExams( trigger.new );
        }
        when AFTER_UPDATE {
            
        }
        when AFTER_DELETE {
            
        }
        when AFTER_UNDELETE {
            
        }
    }
}
