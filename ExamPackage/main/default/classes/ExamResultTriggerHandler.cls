//////////////////////////////////////////
//
//Name: ExamResultTriggerHandler
//Author: Abdul-Shahid Wali
//Date Created: 05/26/21
//Date Updated: 05/28/21
//Description: Handler class for the ExamResultTrigger trigger
//
//////////////////////////////////////////
//
public class ExamResultTriggerHandler {
    
    //Prevents new Exam Result objects from being created if that exam has already been assigned
    //newResults: all exam results that have been newly inserted or updated
    public static void PreventDuplicateExams(List<Exam_Result__c> newResults){
        //Get all Exam Result objects in the database
        List<Exam_Result__c> allResults = [SELECT Account__c, Exam__c, Status__c FROM Exam_Result__c];
        //Compare the newly inserted or update results against each other
        for(Integer i = 0; i < newResults.size(); i++){
            for(Integer k = newResults.size() - 1; k >= 0; k--){
                if((newResults[i].Account__c == newResults[k].Account__c) && (newResults[i].Exam__c == newResults[k].Exam__c) && (newResults[i].Status__c == 'Assigned') && (newResults[k].Status__c == 'Assigned') && (i != k)){
                    //If multiple of the same exam is assgined at once, only assign 1 and unassgined the others
                    newResults[k].Status__c = 'Unassigned';  
                }
            }
        }
        //Compare the newly inserted or updated results against all results
        for(Exam_Result__c nr: newResults){
            for(Exam_Result__c ar: allResults){
                if((nr.Account__c == ar.Account__c) && (nr.Exam__c == ar.Exam__c) && (nr.Status__c == 'Assigned') && (ar.Status__c == 'Assigned') && (ar.Id != nr.Id)){
                    //If a new exam has already been assigned, set its status to unassigned
                    nr.Status__c = 'Unassigned';
                }
            }
        }
        
        
    }
    //Main method to get mapping from exam results to users, exams, and titans then send chatter message
    public static List<ConnectAPI.feedElement> sendChatterMessageForTitanCompletion(List<Exam_Result__c> listOfExamResults){
        
        //get mapping from exam results to users, exams, and titans
        Map<Exam_Result__c, User> mapToHeros = mapResultsToHeros(listOfExamResults);
        Map<Exam_Result__c, Exam__c> mapToExams = mapResultsToExams(listOfExamResults);
        Map<Exam_Result__c, Titan__c> mapToTitans = mapResultsToTitans(listOfExamResults);
        List<ConnectAPI.FeedElement> listFeedElement = new List<ConnectAPI.FeedElement>();
        
        CollaborationGroup chatterGroup = [SELECT ID FROM CollaborationGroup WHERE name = 'Titan Slayers' LIMIT 1];
        String hurrayMessage = '';
        
        for(Exam_Result__c er : listOfExamResults){
            
            //if the exam is not a final exam or the exam wasnt passed, skip this exam result
            if(mapToExams.get(er).Next_Exam__c != null || !(er.Pass__c)){
                continue;
            }
            
            //get corresponding hero and titan
            User examTaker = maptoHeros.get(er);
            Titan__c titanOfExam = mapToTitans.get(er);
            hurrayMessage = examTaker.name + ' just conquered the '+ titanOfExam.name +' Titan!';
            
            
            //build message for chatter message and send message
            ConnectAPI.FeedItemInput feedInput = new ConnectAPI.FeedItemInput();
            ConnectAPI.MentionSegmentInput mentionInput = new ConnectAPI.MentionSegmentInput();
            ConnectAPI.MessageBodyInput bodyInput = new ConnectAPI.MessageBodyInput();
            ConnectAPI.TextSegmentInput textInput = new ConnectAPI.TextSegmentInput();
            
            bodyInput.messageSegments = new List<ConnectAPI.MessageSegmentInput>();
            textInput.text = hurrayMessage;
            bodyInput.messageSegments.add(textInput);
            feedInput.body = bodyInput;
            feedInput.feedElementType = ConnectAPI.FeedElementType.feedItem;
            feedInput.subjectID = chatterGroup.ID;
            
            ConnectAPI.feedElement feedElement;
            if(!Test.IsrunningTest()) {feedElement = ConnectAPI.chatterFeeds.postFeedElement(null, feedInput);}
            else {
                feedElement = new ConnectAPI.FeedItem();
                feedElement.body = new ConnectAPI.FeedBody();
                feedElement.body.text = hurrayMessage;
            }
            listFeedElement.add(feedElement);
            
        }
        return listFeedElement;
    }
    
    //method to create map from exam results to users
    private static Map<Exam_Result__c, User> mapResultstoHeros (List<Exam_Result__c> listOfExamResults){
        Map<Exam_Result__c, Account> mapResultsToAccount = mapResultsToAccount(listOfExamResults);
        
        Set<String> accountNames = new Set<String>();
        
        for(Exam_Result__c er: listOfExamResults){
            accountNames.add(mapResultsToAccount.get(er).name);
        }
        List<User> nameOfPossibleUsers = [SELECT name FROM User WHERE name IN :accountNames];
        
        Map<Exam_Result__c, User> resultMap = new Map<Exam_Result__c, User>();
        
        for(Exam_Result__c er: listOfExamResults){
            for(User u: nameOfPossibleUsers){
                if(mapResultsToAccount.get(er).name==u.name){
                    resultMap.put(er, u);
                    break;
                }
            }
        }
        return resultMap;
    }
    
    //method to create map from exam results to Titans
    private static Map<Exam_Result__c, Titan__c> mapResultstoTitans (List<Exam_Result__c> listOfExamResults){
        Map<Exam_Result__c, Exam__c> mapResultsToExams = mapResultsToExams(listOfExamResults);
        
        Set<ID> titanIDs = new Set<ID>();
        
        for(Exam_Result__c er: listOfExamResults){
            titanIDs.add(mapResultsToExams.get(er).Titan__c);
        }
        List<Titan__c> nameOfPossibleTitans = [SELECT name FROM Titan__c Where ID IN :titanIDs];
        
        Map<Exam_Result__c, Titan__c> resultMap = new Map<Exam_Result__c, Titan__c>();
        
        for(Exam_Result__c er: listOfExamResults){
            for(Titan__C titan: nameOfPossibleTitans){
                if(mapResultsToExams.get(er).Titan__c==titan.ID){
                    resultMap.put(er, titan);
                    break;
                }
            }
        }
        return resultMap;
    }
    
    //method to create map from exam results to exams
    private static Map<Exam_Result__c, Exam__c> mapResultstoExams (List<Exam_Result__c> listOfExamResults){
        Set<ID> ExamIDs = new Set<ID>();
        
        for(Exam_Result__c er: listOfExamResults){
            examIDs.add(er.Exam__c);
        }
        
        List<Exam__c> listOfPossibleExams = [SELECT ID, Next_Exam__c, Titan__C FROM Exam__c WHERE ID in :examIDs];
        
        Map<Exam_Result__c, Exam__c> resultMap = new Map<Exam_Result__c, Exam__c>();
        for(Exam_Result__c er: listOfExamResults){
            for(Exam__c exam: listOfPossibleExams){
                if(er.Exam__c == exam.ID){
                    resultMap.put(er, exam);
                    break;
                }
            }
        }
        return resultMap;
    }
    
    //method to create map from exam results to Accounts
    private static Map<Exam_Result__c, Account> mapResultsToAccount (List<Exam_Result__c> listOfExamResults){
        Set<ID> accountIDs = new Set<ID>();
        
        for(Exam_Result__c er: listOfExamResults){
            accountIDs.add(er.Account__c);
        }
        
        List<Account> listOfPossibleAccounts = [SELECT ID, name FROM Account WHERE ID in :accountIDs];
        
        Map<Exam_Result__c, Account> resultMap = new Map<Exam_Result__c, Account>();
        for(Exam_Result__c er: listOfExamResults){
            for(Account account: listOfPossibleAccounts){
                if(er.Account__c == account.ID){
                    resultMap.put(er, account);
                    break;
                }
            }
        }
        return resultMap;
    }
    
}