public class ExamResultTriggerHandler {

public static void sendChatterMessageForTitanCompletion(List<Exam_Result__c> listOfExamResults){
    
    Map<Exam_Result__c, user> mapToHeros = mapResultsToHeros(listOfExamResults);
    Map<Exam_Result__c, exam__c> mapToExams = mapResultsToExams(listOfExamResults);
    Map<Exam_Result__c, Titan__c> mapToTitans = mapResultsToTitans(listOfExamResults);

    CollaborationGroup chatterGroup = [SELECT ID FROM CollaborationGroup WHERE name = 'Titan Slayers' LIMIT 1];
    String hurrayMessage = '';


    for(Exam_Result__c er : listOfExamResults){
      
    if(mapToExams.get(er).Next_Exam__c != null || !(er.Pass__c)){
        continue;
    }

    User examTaker = maptoHeros.get(er);
    Titan__c titanOfExam = maptoTitans.get(er);

    hurrayMessage = examTaker.name + ' just conquered the '+ titanOfExam.name +' Titan!';

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

    ConnectAPI.chatterFeeds.postFeedElement(null, feedInput);




        //get the exam the exam result is coming from
        // Exam__c exam = [SELECT Prerequisite_For__c FROM Exam__c WHERE ID = er.exam__c.ID].exam__c;
        
        //Titan__c titan = er.exam__c.titan__c;
        //get the user who the exam result belongs to 
        
        //get the squad and team of the user from the exam result
        
        //get the cohort of the user from the exam result
        
        //get the titan that the exam comes from looks up to

        //if exam result is for final exam in titan
        


            //Send chatter message to appropriate team 
            //(user.name + " has just conquered the "+titan.name" Titan!")
            
            //send chatter message to appropriate cohort
            //(user.name + " has just conquered the "+titan.name" Titan!") 
            
        
    }
}

private static Map<Exam_Result__c, User> mapResultstoHeros (List<Exam_Result__c> listOfExamResults){
    Map<Exam_Result__c, account> mapResultsToAccount = mapResultsToAccount(listOfExamResults);

    Set<String> accountNames = new Set<String>();

        for(Exam_Result__c er: listOfExamResults){
        accountNames.add(mapResultsToAccount.get(er).name);
        }
        List<User> nameOfPossibleUsers = [SELECT name FROM User Where name IN :accountNames];
        
        Map<Exam_Result__c, User> resultMap = new Map<Exam_Result__c, User>();

        for(Exam_Result__c er: listOfExamResults){
            for(User u: nameOfPossibleUsers){
                if(mapResultsToAccount.get(er).name==u.Name){
                resultMap.put(er, u);
                break;
                }
            }
        }
        return resultMap;
}

private static Map<Exam_Result__c, Titan__c> mapResultstoTitans (List<Exam_Result__c> listOfExamResults){
    Map<Exam_Result__c, Exam__c> mapResultsToExams = mapResultsToExams(listOfExamResults);

    Set<ID> titanIDs = new Set<ID>();

        for(Exam_Result__c er: listOfExamResults){
        titanIDs.add(mapResultsToExams.get(er).Titan__c);
        }
        List<Titan__c> nameOfPossibleTitans = [SELECT name FROM titan__c Where ID IN :titanIDs];
        
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

private static Map<Exam_Result__c, Exam__c> mapResultstoExams (List<Exam_Result__c> listOfExamResults){
    set<ID> ExamIDs = new Set<ID>();

    for(Exam_Result__c er: listOfExamResults){
        examIDs.add(er.Exam__c);
    }

    List<Exam__c> listOfPossibleExams = [SELECT ID FROM Exam__c WHERE ID in :examIDs];

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

private static Map<Exam_Result__c, Account> mapResultsToAccount (List<Exam_Result__c> listOfExamResults){
    set<ID> accountIDs = new Set<ID>();

    for(Exam_Result__c er: listOfExamResults){
        accountIDs.add(er.Account__c);
    }

    List<Account> listOfPossibleAccounts = [SELECT ID FROM Account WHERE ID in :accountIDs];

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