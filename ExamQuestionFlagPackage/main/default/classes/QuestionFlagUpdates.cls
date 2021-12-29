public with sharing class QuestionFlagUpdates {
    
    /* Retrieves an Exam_Question by looking up its Id.
     * If the question is found, it checks to see if it is already flagged.
     * 
     * If the question is flagged, this method returns the following:
     * 0 - The flag category
     * 1 - The flag subcategory
     * 2 - The flag notes, if any
     * 
     * If the question is not flagged, this method returns an empty List.
     * 
     * If the question cannot be found, this method returns null.
     */
    @AuraEnabled
    public static List<String> lookupQuestion(Id questionId){
        
    }

    /* Marks an Exam_Question as flagged by looking up its Id.
     * Also sets the category, subcategory, and notes.
     * 
     * If the question is successfully flagged, returns true.
     * Otherwise, returns false.
     */
    @AuraEnabled
    public static Boolean flagQuestion(Id questionId, String category, String subcategory, String notes){
        
    }
}
