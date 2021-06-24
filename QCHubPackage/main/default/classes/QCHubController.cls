public class QCHubController {
    
    @AuraEnabled
    public static List<QCHubController.PieChart> getData(){
       
        // pull in a list of cohort data for the graph
        // List<Cohort__c> cohortData = [SELECT Id, Name, Curriculum__r.Name FROM Cohort__c];
        // List<QCHubController.PieChart> piechart = new List<QCHubController.PieChart>();  



        // for (Cohort__c c : cohortData) {
        //     piechart.add(new PieChart( c.name, c.Curriculum__r.Name) ); 
        // }


        // return piechart;

        List<QCHubController.PieChart> lstData = new List<QCHubController.PieChart>();
        lstData.add( new PieChart( '=65', 61 ) );
        return lstData;

    }
     
    public class PieChart {
        @AuraEnabled public String name;
        @AuraEnabled public Integer curriculum;
         
        public PieChart( String name, Integer curriculum ) {
            this.name = name;
            this.curriculum = curriculum;
        }
    }
        


}