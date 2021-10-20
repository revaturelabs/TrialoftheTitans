/* 
    Author: Julia Weakley
    Date Last Modified: 10/18/2021
    Description:  
        Tests for lwcEditCert component. 100% code coverage
*/ 

import { createElement } from "lwc";
import LwcDisplayCert from 'c/lwcDisplayCert';

describe('c-lwc-Display-Cert', ()=> 
{
    afterEach(()=> 
    {
        while(document.body.firstChild)
        {
            document.body.removeChild(document.body.firstChild);
        }
    });

   

    
    // test checks that form appears 
    it("display", ()=>{
        const wrapper = shallow(<lwcDisplayCert />); 
        expect(wrapper.find(lwcEditCert).length).toEqual(1);
    });

    
   
});