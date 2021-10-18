import { createElement } from "lwc";
import LwcPoolTableCmp from "c/lwcPoolTableCmp";

describe("c-lwc-pool-table-cmp", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcPoolTableCmp component
  beforeEach(() => {
    element = createElement("c-lwc-pool-table-cmp", {
      is: LwcPoolTableCmp
    });
  });

  it("Test ", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    const header = element.shadowRoot.querySelector("h2");
    expect(header.textContent).toBe("Pool Table");

    const paragraphs = Array.from(element.shadowRoot.querySelectorAll("p"));
    expect(paragraphs[0].textContent).toBe("Page Size");
    expect(paragraphs[1].textContent).toBe("");
    expect(paragraphs[2].textContent).toBe(
      "Page 1 | Showing records from 0 to 0"
    );

    expect(element.pageNumber).toBe(1);
  });

  it("Test ", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    const select = element.shadowRoot.querySelector("select");

    select.value = "50";
    select.dispatchEvent(new CustomEvent("change"));

    Promise.resolve().then(() => {
      expect(element.pageSize).toBe("50");
    });
  });

  it("Test ", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    const input = element.shadowRoot.querySelector("lightning-input");

    input.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: "Hello World"
        }
      })
    );

    Promise.resolve().then(() => {
      expect(element.searchKeyword).toBe("Hello World");
    });
  });

  it("Test ", () => {
    // append the element to the DOM
    document.body.appendChild(element);
  });
});
