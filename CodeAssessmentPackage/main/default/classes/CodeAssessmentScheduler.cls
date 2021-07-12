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
    private String password;
    
    public CodeAssessmentScheduler(String username, String password){
        this.username = username;
        this.password = password;  
    }
    
    public void execute(SchedulableContext SC){
        ID id = TestUtil.enqueueTests();
        system.enqueueJob(new QueueTitanCallout(id, username, password));
    }
}