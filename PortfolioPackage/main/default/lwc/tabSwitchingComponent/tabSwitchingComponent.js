import { LightningElement } from 'lwc';
import mountainStaticImg from '@salesforce/resourceUrl/mountainStaticImg';
export default class TabSwitchingComponent extends LightningElement {

    
    mountainUrl = mountainStaticImg;

    renderedCallback(){
        // const projectComponent = this.template.querySelector(".projectComponent");
        // const projectBody = projectComponent.querySelectorAll(".projectBody");
        

        const projectDisplayComponents = this.template.querySelectorAll('.projectDisplayComponent');
        projectDisplayComponents.forEach(projectDisplayComponent =>{
        projectDisplayComponent.addEventListener('click', event =>{
        projectDisplayComponent.classList.toggle('active');
        const displayContentContainer = projectDisplayComponent.nextElementSibling;
        if(projectDisplayComponent.classList.contains('active')){
          displayContentContainer.style.maxHeight = displayContentContainer.scrollHeight+"px";
        } else {
          displayContentContainer.style.maxHeight = 0;
        }
      });
    });

    }
    

}

