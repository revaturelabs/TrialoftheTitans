import { api, LightningElement } from 'lwc';

export default class QCinterviewEnd extends LightningElement {
@api heroName;
@api heroId;
@api cohortId;
@api answers;
@api week;
}