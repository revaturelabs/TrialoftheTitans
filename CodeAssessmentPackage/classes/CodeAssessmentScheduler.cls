////////////////////////////////////////////////////
//
// Author: Connor Melton
// Created: 07-02-2021
// Description: Runs local tests and sends results to
// Trial of the Titans.
//
////////////////////////////////////////////////////
public class CodeAssessmentScheduler implements Schedulable{
    
    private String username;
<<<<<<< HEAD:CodeAssessmentPackage/classes/CodeAssessmentScheduler.cls
=======
    //private String password;
>>>>>>> 59718f85d6da74d24e2a9c18f352686717968bc4:CodeAssessmentPackage/main/default/classes/CodeAssessmentScheduler.cls
    
    public CodeAssessmentScheduler(String username){
        this.username = username;  
    }
    
    public void execute(SchedulableContext SC){
        ID id = TestUtil.enqueueTests();
        system.enqueueJob(new QueueTitanCallout(id, username));
    }
}