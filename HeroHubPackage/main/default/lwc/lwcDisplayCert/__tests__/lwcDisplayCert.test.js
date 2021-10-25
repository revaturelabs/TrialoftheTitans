/* 
    Author: Julia Weakley
    Date Last Modified: 10/25/2021
    Description:  
        Tests for lwcDisplayCert component.  100% code coverage
*/

import { createElement } from "lwc";
import LwcDisplayCert from "c/lwcDisplayCert";
import { registerApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import Certifications from "@salesforce/apex/getCertifications.Certifications";

// empty list of data
const mockGetCerts = require("./data/certsList.json");

// list of certification records
const mockGetAllCerts = require("./data/certsWithDataList.json");

// adapter
const getCertsListAdapter = registerApexTestWireAdapter(Certifications);

describe("c-lwc-display-cert", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  // tests that when there are not certs no data should appear
  describe("Certifications @wire data", () => {
    it("renders no records", () => {
      const element = createElement("c-lwc-display-cert", {
        is: LwcDisplayCert
      });

      document.body.appendChild(element);
      getCertsListAdapter.emit(mockGetCerts);

      return Promise.resolve().then(() => {
        const certElements = element.shadowRoot.querySelectorAll(
          "lightning-layout-item"
        );
        expect(certElements.length).toBe(mockGetCerts.length);
      });
    });

    // test that will have data when there are multple records
    it("renders all existing records", () => {
      const element = createElement("c-lwc-display-cert", {
        is: LwcDisplayCert
      });

      document.body.appendChild(element);
      getCertsListAdapter.emit(mockGetAllCerts);

      return Promise.resolve().then(() => {
        const certElements = element.shadowRoot.querySelectorAll(
          "lightning-layout-item"
        );
        expect(certElements.length).toBe(mockGetAllCerts.length);
      });
    });
  });

  /*it('display', () => {
        let element = createElement('c-lwc-display-cert', {
            is: LwcDisplayCert
        });
        document.body.appendChild(element);
       
        return Promise.resolve().then(() => {
            expect(1).toBe(2);
          });
      
    });
    */
});
