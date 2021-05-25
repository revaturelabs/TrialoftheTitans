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
    
    public GIFTParser() {
        allQuestions = new List<String>();
    }
    
    public void importGIFTFile() {
        try {
            fileAsString = giftFileBody.toString();
            allQuestions = fileAsString.split('\r\n\r\n');
            allQuestions = GIFTParser.removeComments(allQuestions);
            System.debug(allQuestions);
            
        } catch (Exception e) {
            System.debug(e);
            ApexPages.Message errorMessage = new ApexPages.Message(ApexPages.severity.ERROR,'An error has occured while importing questions from file "' + filename + '". Please make sure input file is correct.');
            ApexPages.addMessage(errorMessage);
        }
    }
    
    public static List<String> removeComments(List<String> allQuestions) {
        // Iterate over questions
        for ( Integer i = 0; i < allQuestions.size(); i++ ) {
            // Split allQuestion[i] lines
            String tempQuestion = '';
            List<String> tempLineList = allQuestions[i].split('\r\n');
            
            // Turn any lines beginning with // into blank strings, then remove any substrings beginning with //
            Integer c = 0;
            while ( c < tempLineList.size() ) {
                if ( tempLineList[c].substring(0, 2).equals('//') ) {
                    tempLineList.remove(c);
                } else if ( tempLineList[c].contains('//') ) {
                    tempLineList[c] = tempLineList[c].substringBefore('//');
                    c++;
                } else {
                    c++;
                }
            }
            
            // Put question back together
            if ( tempLineList.size() == 1 ) {
                tempQuestion = tempLineList[0];
            } else { 
                for ( Integer z = 0; z < tempLineList.size(); z++ ) {
                    if ( z == tempLineList.size() - 1 ) {
                        tempQuestion = tempQuestion + tempLineList[z];
                    } else {
                        tempQuestion = tempQuestion + tempLineList[z] + '\n';
                    }
                }
            }
            
            // Overwrite question with new format
            allQuestions[i] = tempQuestion;
        }
        return allQuestions;
    }
}
