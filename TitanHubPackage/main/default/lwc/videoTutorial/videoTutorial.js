///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoTutorial
// Author: Christopher Brennan and Deep Patel
// Created: 01/20/2022
// Updated: 01/26/2022
// Description: Access the video objects records and stores the information to be displayed in a custom made carousel and the youtube video,
//                  Child Component of Titan Summary
// 
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement, track, wire } from 'lwc';
import Left_Arrow from '@salesforce/resourceUrl/arrow_left_large';
import Right_Arrow from '@salesforce/resourceUrl/arrow_right_large';
import getVideos from '@salesforce/apex/VideoController.getVideos';

import {getPicklistValues} from 'lightning/uiObjectInfoApi';

import VIDEODIFFICULTY from '@salesforce/schema/Video__c.Difficulty__c';

export default class VideoTutorial extends LightningElement {
    
    picklistValues;

    // record type Id is hardcoded from the org as the org value doesn't change between orgs. Could be made dynamic but works fine as is.
    @wire (getPicklistValues,{
        recordTypeId: '012000000000000AAA',
        fieldApiName:VIDEODIFFICULTY
    })orgDifficultyPicklist({data,error}){
        if(data){
            console.log(data.values);
            // console.log('data part 2: ' + JSON.stringify(data));
            this.picklistValues = data.values;
        }
        else if(error)
        {
            console.log('error present: ' + error);
        }
    };

    // carousel arrows
    right = Right_Arrow;
    left = Left_Arrow;

    // hard coded numbers for carousel
    currentFirstSlotNumber = 0;
    imagesToDisplay = 3;

    // list of videos
    fullList = [];
    @track arrayList = [];

    @track customCarouselImages = [];

    // list for filtering
    categoryValue=[];

    connectedCallback()
    {
        this.init();
    }

    // async to wait so that we can recieve all videos from the org
    async init()
    {
        try{
            this.fullList = await getVideos();
        } 
        catch (error){
            console.log(error);
        }
        finally{
            // loop through and add org elements and add the info to a blank object to get around the read only enforced rule
            this.fullList.forEach(element => {
                let temp = {
                    youtubeURL: element.YoutubeVideoLink__c,
                    bool: false,
                    youtubeThumbnail: element.YoutubeThumbnailLink__c,
                    title: element.Name,
                    difficulty: element.Difficulty__c
                };
                this.arrayList.push(temp);
            });
            // set first video to true so a video can be displayed
            this.arrayList[0].bool = true;
            // add current images to the custom carousel holder
            for(let i = 0; i < this.imagesToDisplay; ++i)
            {
                this.customCarouselImages.push(this.arrayList[i]);
            }
        }
    }

    // filter choices
    checkboxhandler(event)
    {
        const {value} = event.target.dataset;

        if (event.target.checked) {
            this.categoryValue.push(value);
        } else {
            const index = this.categoryValue.indexOf(value);
            if (index > -1) {
                this.categoryValue.splice(index, 1);
                console.log(this.categoryValue);
            }
        }

        // repopulates the video array so that it stores only the newly created values
        this.arrayList = [];
        this.fullList.forEach(element => {
            console.log(this.categoryValue.length)
            // if no filter add everything
            if(this.categoryValue.length == 0)
            {
                let temp = {
                    youtubeURL: element.YoutubeVideoLink__c,
                    bool: false,
                    youtubeThumbnail: element.YoutubeThumbnailLink__c,
                    title: element.Name,
                    difficulty: element.Difficulty__c
                };
                this.arrayList.push(temp);
            }
            // filter through selected checkboxs and compare it to video's difficulty
            else
            {
                for (let i = 0; i < this.categoryValue.length; ++i) {
                    if(this.categoryValue[i] == element.Difficulty__c)
                    {
                        let temp = {
                            youtubeURL: element.YoutubeVideoLink__c,
                            bool: false,
                            youtubeThumbnail: element.YoutubeThumbnailLink__c,
                            title: element.Name,
                            difficulty: element.Difficulty__c
                        };
                        this.arrayList.push(temp);
                    }                
                }
            }
        });
        // reset video displayed to work with new list
        if(this.arrayList.length != 0)
        {
            this.arrayList[0].bool = true;
        }
        // reorganize carousel
        this.moveCarousel();
    }

    // Run when thumbnail is selected
    selectVideo(event)
    {
        // find current video and hide it and set new video to show
        let newElement = this.arrayList.find(ele => ele.youtubeThumbnail == event.target.dataset.thumb);
        let currentElement = this.arrayList.find(ele => ele.bool == true);

        // turn current video shown off and turn on selected video
        currentElement.bool = false;
        newElement.bool = true;
    }

    //These fucntions navigate the slides by using the arrow key images
    plusSlides(event)
    {
        if(this.currentFirstSlotNumber + 1 <= this.arrayList.length)
        {
            this.currentFirstSlotNumber += 1;
        }
        else{
            this.currentFirstSlotNumber = 0;
        }
        this.moveCarousel();
    }

    //These fucntions navigate the slides by using the arrow key images
    minusSlides(event)
    {
        if(this.currentFirstSlotNumber - 1 >= 0)
        {
            this.currentFirstSlotNumber -= 1;
        }
        else{
            this.currentFirstSlotNumber = this.arrayList.length - 1;
        }
        this.moveCarousel();
    }

    // Hotswaps the video thumbnails with new navigation choosen
    moveCarousel()
    {
        // time restraint caused this to be made this way
        // Next iteration please clean this up. It should be more dynamic with images to display being able to have more then 3 images
        // The first if and else if is what needs to be remade to work nicley like the else statement
        if(this.arrayList.length == 1)
        {
            for (let index = 0; index < this.imagesToDisplay; ++index)
            {
                this.customCarouselImages[index] = this.arrayList[0];
            }
        }
        else if (this.arrayList.length == 2)
        {
            this.customCarouselImages[0] = this.arrayList[0];
            this.customCarouselImages[1] = this.arrayList[1];
            this.customCarouselImages[2] = this.arrayList[0];
        }
        else
        {
            // loop through all Displayed images on the carousel
            for (let index = 0; index < this.imagesToDisplay; ++index) 
            {
                // get the location numerically of the current image on the carousel
                let newLocation = this.currentFirstSlotNumber + index;
                // if the numerical location is still within the array then just plug it in
                if(this.currentFirstSlotNumber + index < this.arrayList.length)
                {
                    this.customCarouselImages[index] = this.arrayList[newLocation];
                }
                // if the numerical location has exceeded the total number of videos then loop it 
                else
                {
                    this.customCarouselImages[index] = this.arrayList[newLocation - this.arrayList.length];
                }
            }
        }
    }
}