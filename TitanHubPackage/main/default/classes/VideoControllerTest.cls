///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoControllerTest
// Author: Christopher Brennan
// Created: 01/26/2022
// Updated: 01/26/2022
// Description: Testing VideoController
// 
/////////////////////////////////////////////////////////////////////////////////

@isTest
public class VideoControllerTest {
    @isTest private static void testGetVideos()
    {
        // create the test video
        Video__c vid = new Video__c(Name = 'test1', YoutubeThumbnailLink__c = 'linkTest', YoutubeVideoLink__c = 'vidTest', Difficulty__c = 'Beginner');

        insert vid;
        
        List<Video__c> vidList = new List<Video__c>();
        // call to test the videoController function
        vidList = VideoController.getVideos();
        
        // test for pass
        System.assertEquals(vid.Name, vidList[0].Name);
        // test for failure
        System.assertNotEquals('failure', vidList[0].Name);
    }
}