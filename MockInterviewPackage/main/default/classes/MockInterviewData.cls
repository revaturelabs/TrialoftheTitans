/////////////////////////////////////////////////////
//
//  Name: MockInterviewData
//  Author: Kenny Gonzalez
//  Description: This classs gets the record Id in the form of a string
//               and returns it to the js controller to assign it to the 
//               recordId aura:attribute in the videoUploader.cmp.
//               It also returns the a string that is the fileURL
//               which is assigned to the aura:attribute fileUrl="". The
//               last method returns a ContentDocumentId, which is assigned
//               to to the aura:attribute contentFile="" to be able to
//               display the lightning:fileCard, which takes in the 
//               contentFile as an attribute in its definition.
//
//               !!!NOTE: When testing in a scratch org there is a bug
//                        where sometimes the video does not play and 
//                        sometimes it does, which is currently 
//                        working for flexipages. The most consistent way of 
//                        getting the video to play in a scratch org is to
//                        make sure to upload a video that is less than 1000kb
//                        and play it after uploading it. Video replay at the 
//                        moment is not playable in communities. The src on
//                        the video file has to be added to the communities
//                        setting CSP tursted sites with a wildcard. However,
//                        currently when we tried applying the site with the
//                        wildcard it failed.
//                     
//                 
//
///////////////////////////////////////////////////

public with sharing class MockInterviewData {


    @AuraEnabled
    public static String getContentId(String recordId) {

         Id recordId2 = Id.valueOf(recordId);
       
         List<ContentDocumentLink> contentDocId = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: recordId2];
         List<String> contentId = new List<String>();

         for(ContentDocumentLink cd: contentDocId){
              System.debug(cd.Id);
              contentId.add(cd.ContentDocumentId);
         }
         
         
        ContentDocument cid = [SELECT Id FROM ContentDocument WHERE Id =: contentId[0] LIMIT 1];
        System.debug(contentId[0]);
        System.debug(cid.Id);
        String fileURL = '/sfc/servlet.shepherd/document/download/'+cid.Id+'';

        return fileURL;
    }

    @AuraEnabled
    public static String getFileId(String recordId) {

         Id recordId2 = Id.valueOf(recordId);
       
         List<ContentDocumentLink> contentDocId = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: recordId2];
         List<String> contentId = new List<String>();

         for(ContentDocumentLink cd: contentDocId){
              System.debug(cd.Id);
              contentId.add(cd.ContentDocumentId);
         }
         
         
        //since there is only one video per Mock Interview we are only returning the first item in the array
        return contentId[0];
    }

}