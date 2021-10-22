import { LightningElement, track, wire } from 'lwc';
import getResultList from '@salesforce/apex/HeroResultPageController.getResultList';
import getTitanList from '@salesforce/apex/HeroResultPageController.getTitanList';

export default class LwcHeroResultPage extends LightningElement {

    //Variable declarations

    titanTabPanel;
    examListPanel;
    resultList;
    examResultId;
    currentPage;
    examClicked = false;
    pbpClicked = false;
    titanIdList;
    caClicked = false;
    @track
    results;

    //Gets all titans associated with the hard-coded value in apex

    @wire(getTitanList)
    titanList({ error, data }) {

        if (error) {

            console.log(error);

        } else if (data) {

            const titanList = data;
            this.titanTabPanel = titanList;
            console.log(data);

        }
    }


    //Gets exam results for the specified exam
    @wire(getResultList)
    resultListfunc({ error, data }) {

        if (error) {
            console.log(error);
        } else if (data) {
            const resultList = data;
            this.examListPanel = resultList;
            console.log(resultList);
        }
    }

    onCAClick() {

        //Gets results from Apex controller
        getResultList()
            .then((result) => {
                this.caClicked = true;
                this.results = result;
            })
            .catch((error) => {
                console.log('There was an error in the onCAClick function with retrieveResults');
                this.results = null;
            })
    }

    onExamClick(event) {
        this.examResultId = event.target.getAttribute('data-result-id');
        this.examClicked = true;
    }

    onTitanClick(event) {

        //Marks the current tab as active
        const titan = event.target.innerHTML.replace(" ", "_").toLowerCase();
        this.currentPage = titan;
        document.querySelectorAll('.titan-tab').forEach(singleTab => {
            const slug = singleTab.innerHTML.replace(" ", "_").toLowerCase();
            // console.log(cmp.get('v.currentPage'), ' AND ', slug)
            if (this.currentPage === slug) {
                singleTab.style.borderLeft = '3px solid black';
                singleTab.style.boxShadow = '3px 3px 2px black';
            } else {
                singleTab.style.borderLeft = '';
                singleTab.style.boxShadow = '';
            }
        })

        //Filters exam list
        if (titan === 'all_titans') {
            document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
                singleBtn.style.display = 'block'
            })
        } else {
            document.querySelectorAll(`.exam-btn`).forEach(singleBtn => {
                singleBtn.style.display = singleBtn.className.includes(titan)
                    ? 'block'
                    : 'none'
            })
        }
    }

    onBackBtnClick() {
        this.examClicked = false;
        this.pbpClicked = false;
        this.caClicked = false;
    }

    onBackDetailBtnClick() {
        this.pbpClicked = false;
        this.caClicked = false;
    }

    onPbpClick() {
        this.pbpClicked = true;
    }
}