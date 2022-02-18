/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * Description: Updated by Alan Huang for use in Hero Hub
 */

import { api, track, LightningElement } from 'lwc';
import { guid } from 'c/utilsPrivate';

export default class CarouselCard extends LightningElement {
    @api header;

    @api description;

    get fields() {
        return (this.header || this.description)
    }

    @api href;

    @track ariaHidden = 'true';

    @track ariaLabelledby;

    @track computedId;

    @track tabIndex = '-1';

    _selected = false;

    initialRender = true;

    constructor() {
        super();
        this.selected = false;
    }

    connectedCallback() {
        this.setAttribute('data-handles-touch', true);
    }

    set selected(value) {
        this._selected = value;

        if (value === true) {
            this.ariaHidden = 'false';
            this.setTabIndex('0');
        } else {
            this.ariaHidden = 'true';
            this.setTabIndex('-1');
        }
    }

    get selected() {
        return this._selected;
    }

    setLabelledBy(value) {
        this.panelElement.setAttribute('aria-labelledby', value);
    }

    setTabIndex(value) {
        this.tabIndex = value;
    }

    select() {
        const privateimageselect = new CustomEvent('privateimageselect', {
            bubbles: true,
            composed: true
        });

        this.selected = true;
        this.dispatchEvent(privateimageselect);
    }

    unselect() {
        this.selected = false;
    }

    isSelected() {
        return this.selected;
    }

    renderedCallback() {
        if (this.initialRender) {
            this.panelElement = this.template.querySelector('div');
            const anchor = this.panelElement.querySelector('a');
            if (this.href) {
                anchor.setAttribute('href', this.href); 
            }

            const privateimageregister = new CustomEvent(
                'privateimageregister',
                {
                    bubbles: true,
                    detail: {
                        callbacks: {
                            select: this.select.bind(this),
                            unselect: this.unselect.bind(this),
                            isSelected: this.isSelected.bind(this),
                            setTabIndex: this.setTabIndex.bind(this),
                            setLabelledBy: this.setLabelledBy.bind(this)
                        },

                        contentId: this.panelElement.getAttribute('id'),
                        guid: guid()
                    }
                }
            );

            this.classList.add('slds-carousel__panel');
            this.dispatchEvent(privateimageregister);
            this.initialRender = false;
        }
    }
}
