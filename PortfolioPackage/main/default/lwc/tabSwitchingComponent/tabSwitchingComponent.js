import { LightningElement } from 'lwc';
//import mountainStaticImg from '@salesforce/resourceUrl/mountainStaticImg';
export default class TabSwitchingComponent extends LightningElement {

    //allows for use of mountain static image
    //mountainUrl = mountainStaticImg;

    mountainUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1920px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg";
    renderedCallback(){

        // selects all projectdisplaycomponents in the template
        const projectDisplayComponents = this.template.querySelectorAll('.projectDisplayComponent');

        // selects each individual the projectdisplaycomponents and adds a clickable event listener to each one
        projectDisplayComponents.forEach(projectDisplayComponent =>{
        projectDisplayComponent.addEventListener('click', event =>{

        // whenever clicked, add a classList of active to it
        projectDisplayComponent.classList.toggle('active');

        // create variable to check for parent
        const displayContentContainer = projectDisplayComponent.nextElementSibling;

        // if parent contains active in class list, change its height to show content
        if(projectDisplayComponent.classList.contains('active')){
          displayContentContainer.style.maxHeight = displayContentContainer.scrollHeight+"px";
        } else {
          // otherwise, remove content from view
          displayContentContainer.style.maxHeight = 0;
        }
      });
    });

    }
    

}

