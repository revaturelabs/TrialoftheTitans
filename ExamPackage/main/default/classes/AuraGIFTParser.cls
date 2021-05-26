public class AuraGIFTParser {
    // *** VARIABLES *** //
    // public Map<String,List<ExamQuestion>> sortedExamList { get; set; }
    
    // Aura
    @AuraEnabled
    public static List<ExamQuestion> ImportFile(List<ExamQuestion> questionList) {
        List<ExamQuestion> allQuestions = questionList;
        System.debug(questionList);
        System.debug(allQuestions);
        // AuraGIFTParser.sortQuestions
        // AuraGIFTParser.createRecords
        
        return questionList;      
    }
    
    
    
    @AuraEnabled
    public static String GIFTInit() {
        String initMessage = 'Ready to import questions.';
        return initMessage;
    }
}