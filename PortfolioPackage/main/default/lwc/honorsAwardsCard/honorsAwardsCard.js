/*
    Author: Drew Williams
    Description: Card container for Honors & Awards section in Portfolio
    Created Date: 3/17/22
*/

import { LightningElement } from 'lwc';

// Grabs open and close elements
const open = document.getElementById('open');
const model_container = document.getElementById('modal_container');
const close = document.getElementById('close');

// Event listener to open and close modal on click
open.addEventListener('click', ()=> {
  model_container.classList.add('show');
});

close.addEventListener('click', ()=> {
  model_container.classList.remove('show');
});

export default class HonorsAwardsCard extends LightningElement {}