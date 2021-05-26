public class GIFTParser {
    // *** VARIABLES *** //
    public Blob giftFileBody { get; set; }
    public String filename { get; set; }
    public String fileAsString { get; set; }
    public List<String> allQuestions  { get; set; }
    public List<String> questionsToSplit { get; set; }
    public List<ExamQuestion> examQuestionList { get; set; }
    public Map<String,List<ExamQuestion>> sortedExamList { get; set; }
    
    /*public GIFTParser() {
        allQuestions = new List<String>();
    }*/
    
    public void importGIFTFile() {
        try {
            fileAsString = giftFileBody.toString();
            allQuestions = fileAsString.split('\r\n\r\n');
            allQuestions = GIFTParser.removeComments(allQuestions);
            questionsToSplit = GIFTParser.handleMissingWord(allQuestions);
            examQuestionList = GIFTParser.splitParts(questionsToSplit);
            sortedExamList = GIFTParser.sortQuestions(examQuestionList);
            system.debug(sortedExamList);
            
            
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
                    tempLineList[c] = tempLineList[c].substringBefore('//').trim();
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
                    tempQuestion = tempQuestion + tempLineList[z];
                }
            }
            
            // Overwrite question with new format
            allQuestions[i] = tempQuestion;
        }
        return allQuestions;
    }

    public static List<String> handleMissingWord(List<String> allQuestions) {
        List<String> processedQuestionList = new List<String>();

        // Iterate over questions
        for ( Integer i = 0; i < allQuestions.size(); i++ ) {
            // Check if missing word
            if ( allQuestions[i].substring(allQuestions[i].length() - 1).contains('}') ) {
                processedQuestionList.add(allQuestions[i]);
            } else {
                // Extracting answer from text.
                String beforeAnswer = allQuestions[i].substringBefore('{');
                String afterAnswer = allQuestions[i].substringAfter('}');
                String answer = allQuestions[i].substringBetween('{','}');
                processedQuestionList.add(beforeAnswer + '_____' + afterAnswer + '{' + answer + '}');
            }
        }
        return processedQuestionList;
        
    }

    public static List<ExamQuestion> splitParts(List<String> questionsToSplit) {
        List<ExamQuestion> examQuestionList = new List<ExamQuestion>();

        for ( Integer i = 0; i < questionsToSplit.size(); i ++ ) {
            ExamQuestion tempQuestion = new ExamQuestion();
            Integer titleEnd = 0;
            String withoutTitle = '';
            String tempAnswer = '';

            // Check if question contains title
            if ( questionsToSplit[i].substring(0,2).contains('::') ) {
                titleEnd = questionsToSplit[i].indexOf('::', 2);
                tempQuestion.qTitle = questionsToSplit[i].substring(2,titleEnd);
                withoutTitle = questionsToSplit[i].substring(titleEnd + 2);
            } else {
                tempQuestion.qTitle = '';
                withoutTitle = questionsToSplit[i];
            }

            // Now split text and answer
            tempQuestion.qText = withoutTitle.substringBefore('{');
            tempAnswer = withoutTitle.substringAfter(tempQuestion.qText);
            tempAnswer = tempAnswer.substring(1,tempAnswer.length() - 1);
            tempQuestion.qAnswer = tempAnswer;
            System.debug(tempQuestion);
            examQuestionList.add(tempQuestion);
        }
        return examQuestionList;
    }

    public static Map<String,List<ExamQuestion>> sortQuestions(List<ExamQuestion> examQuestionList) {
        Map<String,List<ExamQuestion>> sortedQuestions = new Map<String,List<ExamQuestion>>();
        List<ExamQuestion> essayQuestions = new List<ExamQuestion>();
        List<ExamQuestion> numericalQuestions = new List<ExamQuestion>();
        List<ExamQuestion> matchingQuestions = new List<ExamQuestion>();
        List<ExamQuestion> multChoiceMAQuestions = new List<ExamQuestion>();
        List<ExamQuestion> multChoiceQuestions = new List<ExamQuestion>();
        List<ExamQuestion> shortAnswerQuestions = new List<ExamQuestion>();
        List<ExamQuestion> trueFalseQuestions = new List<ExamQuestion>();

        // Check for question characteristics and sort into lists
        for ( Integer i = 0; i < examQuestionList.size(); i++ ) {
            if ( examQuestionList[i].qAnswer.containsOnly('{}') ) {
                essayQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.substring(0,1).contains('#') ) {
                numericalQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('->') ) {
                matchingQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('~') && examQuestionList[i].qAnswer.countMatches('=') > 1) {
                multChoiceMAQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('~') && examQuestionList[i].qAnswer.countMatches('=') == 1) {
                multChoiceQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('=') && !examQuestionList[i].qAnswer.contains('~') ) {
                shortAnswerQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.toUpperCase().contains('T') || examQuestionList[i].qAnswer.toUpperCase().contains('F') || examQuestionList[i].qAnswer.toUpperCase().contains('TRUE') || examQuestionList[i].qAnswer.toUpperCase().contains('FALSE') ) {
                trueFalseQuestions.add(examQuestionList[i]);
            } else {
                shortAnswerQuestions.add(examQuestionList[i]);
            }
            
        }

        // Put lists into map
        sortedQuestions.put('Essay', essayQuestions);
        sortedQuestions.put('Numerical', numericalQuestions);
        sortedQuestions.put('Matching', matchingQuestions);
        sortedQuestions.put('MCMA', multChoiceMAQuestions);
        sortedQuestions.put('Multiple Choice', multchoiceQuestions);
        sortedQuestions.put('Short Answer', shortAnswerQuestions);
        sortedQuestions.put('True-False', trueFalseQuestions);
        return sortedQuestions;
    }

}
