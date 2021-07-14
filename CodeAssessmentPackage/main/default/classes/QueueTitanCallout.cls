////////////////////////////////////////////////////
//
// Author: Connor Melton
// Created: 07-02-2021
// Description: Makes our callout queueable so that it runs
// after we have run local tests.
//
////////////////////////////////////////////////////

public class QueueTitanCallout implements Queueable {
    
    private ID jobid;
    private String username;
    private String password;
    
    public QueueTitanCallout(ID id, String username){
        jobid = id;
        this.username = username;
        this.password = password;
    }
    
    public void execute(QueueableContext context) {
        TitanCallouts.sendResults(jobid, username);
    }
}