////////////////////////////////////////////////////
//
// Name: Exam Question Class
// Author: David J. Sellinger
// Created: 2021-05-26
// Updated: 2021-05-30
// Description: Custom class for receiving data from
//              aura controller (GIFT-formatted
//              questions) for manipulation in Apex.
//
////////////////////////////////////////////////////

public class ExamQuestion {
    @AuraEnabled
    public String qTitle { get; set; }
    @AuraEnabled
    public String qText { get; set; }
    @AuraEnabled
    public String qAnswer { get; set; }
    @AuraEnabled
    public String qId { get; set; }
    

    public ExamQuestion() {
    }

    public ExamQuestion(String qText, String qAnswer) {
        this.qText = qText;
        this.qAnswer = qAnswer;
    }
    
    public ExamQuestion(String qTitle, String qText, String qAnswer) {
        this.qTitle = qTitle;
        this.qText = qText;
        this.qAnswer = qAnswer;
    }
}