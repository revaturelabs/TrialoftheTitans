/* 
    Author: Julia Weakley
    Date Last Modified: 10/18/2021
    Description:  
        Tests for lwcEditCert component. 100% code coverage
*/
import LwcDisplayCert from "c/lwcDisplayCert";
import { createElement } from "lwc";
import { registerApexTestWireAdapter } from "@salesforce/wire-service-jest-util";
import { getCRecord } from "@salesforce/apex/getCertifications.Certifications";

const getList = require("./data/getRecord.json");
//const getCertsAdapter = registerApexTestWireAdapter(getCRecord);
describe("c-lwc-Display-Cert", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("shows records", () => {
    const element = createElement("c-lwcDisplayCert", {
      is: LwcDisplayCert
    });
    element.certs = getList;
    document.body.appendChild(element);
  });
});
/*
const mockRecord = require('./data/getRecord.json');
const mockNoRecords = require('./data/getNoRecords.json');
const getRecordAdapter = registerApexTestWireAdapter(getCRecord);
describe('c-lwc-Display-Cert', ()=> 
{
    afterEach(()=> 
    {
        while(document.body.firstChild)
        {
            document.body.removeChild(document.body.firstChild);
        }
    });
  
    describe('getCertifications @wire data', ()=>{ 
        const element = createElement('c-lwc-Display-Cert',{
                is:LwcDisplayCert
            });
        it('renders records', ()=>{
           
            document.body.appendChild(element);

            getRecordAdapter.emit(mockRecord);

            return Promise.resolve().then(()=>{
                const nameElement = element.shadowRoot.querySelectorAll('lightning-layout-item'); 
                expect(certificationElements.length).toBe(mockRecord.length); 

            });

        });

    });
 
   
});
*/
