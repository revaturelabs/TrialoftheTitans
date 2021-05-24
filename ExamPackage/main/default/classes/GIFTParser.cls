public with sharing class GIFTParser {
    // *** VARIABLES *** //
    public Blob giftFileBody { get; set; }
    public String filename { get; set; }
    public String fileAsString { get; set; }
    public List<String> allQuestions  { get; set; }
    // public List<String> missingWordQuestions  { get; set; }
    // public List<String> essayQuestions  { get; set; }
    // public List<String> numericalQuestions  { get; set; }
    // public List<String> matchingQuestions  { get; set; }
    // public List<String> multChoiceQuestions  { get; set; }
    // public List<String> multChoiceMQuestions  { get; set; }
    // public List<String> trueFalseQuestions  { get; set; }
    // public List<String> shortAnswerQuestions  { get; set; }
    
    /*public GIFTParser() {

    }*/

    public void importGIFTFile() {
        try {
            fileAsString = giftFileBody.toString();
            allQuestions = fileAsString.split('\n\n');
            
        } catch (Exception e) {
            ApexPages.Message errorMessage = new ApexPages.Message(ApexPages.severity.ERROR,'An error has occured while importing questions from file "' + filename + '". Please make sure input file is correct.');
            ApexPages.addMessage(errorMessage);
        }
    }
}
