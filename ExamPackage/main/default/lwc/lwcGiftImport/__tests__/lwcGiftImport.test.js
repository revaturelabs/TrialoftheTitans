import { createElement } from 'lwc';
import LwcGiftImport from '../lwcGiftImport';

describe('c-lwc-gift-import', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // before each test, create component element and append to the DOM
    beforeEach(() => {
        const element = createElement('c-lwc-gift-import', {
            is: LwcGiftImport
        });
        document.body.appendChild(element);
    });

    it('displays header', () => {
        const headerTag = element.shadowRoot.querySelector('h1');
        expect(headerTag.textContent).toBe('Import GIFT-Formatted Questions');
    });

    it('renders count of imported and updated questions', () => {
        element.imported = 10;
        element.updated = 5;

        return Promise.resolve().then(() => {
            const iTag = element.shadowRoot.querySelector('i');
            expect(iTag.textContent).toEqual('Imported 10 questions - Updated 5 questions');
        });
    });
})