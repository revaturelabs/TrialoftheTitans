///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoController
// Author: Christopher Brennan
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Used to pull video records from the org to be used in the videoTutorial LWC
// 
/////////////////////////////////////////////////////////////////////////////////

public class VideoController {

	@AuraEnabled(cacheable=true)
    public static list<Video__c> getVideos()
    {
        List<Video__c> vids = new List<Video__c>();
        // collect all records from the video object
        vids = [SELECT Name, YoutubeVideoLink__c, YoutubeThumbnailLink__c, IsCurrentVideo__c, Difficulty__c FROM Video__c];
    
	    return vids;
    }
}