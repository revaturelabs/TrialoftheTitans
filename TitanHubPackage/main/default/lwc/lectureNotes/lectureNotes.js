///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoTutorial
// Author: Christopher Brennan and Deep Patel
// Created: 01/20/2022
// Updated: 01/26/2022
// Description: Child compoenent of titanSummary 
// 
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement } from 'lwc';

export default class LectureNotes extends LightningElement {
    
    img = 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/data_security/data_security_records/images/cac30d566a68bfc4a34f3b9607be2a66_record-access-triangle.png';
    isModalOpen = false;

    showModal(){
        this.isModalOpen = !this.isModalOpen;
    }
}