    import { LightningElement, api } from 'lwc';

export default class QuestionTrackerTestTwo extends LightningElement {

    @api questionstates = [];

    list = [
        {
            questionNumber: " 1",
            flagged: true,
            markedForReview: false,
            answered: false,
            status: 'flagged',
        },
        {
            questionNumber: "2 ",
            flagged: true,
            markedForReview: false,
            answered: true,
            status: 'flagged',
        },
        {
            questionNumber: "3 ",
            flagged: false,
            markedForReview: true,
            answered: false,
            status: 'marked',
        },
        {
            questionNumber: "4 ",
            flagged: false,
            markedForReview: true,
            answered: true,
            status: 'marked',
        },
        {
            questionNumber: "5 ",
            flagged: false,
            markedForReview: false,
            answered: true,
            status: 'answered',
        },
        {
            questionNumber: "6 ",
            flagged: false,
            markedForReview: false,
            answered: true,
            status: 'answered',
        },
        {
            questionNumber: "7 ",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "8 ",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "9 ",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "10",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "11",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "12",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "13",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "14",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "15",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "16",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "17",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "18",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "19",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "20",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "21",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "22",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "23",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "24",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "25",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "26",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },
        {
            questionNumber: "27",
            flagged: false,
            markedForReview: false,
            answered: false,
            status: 'unanswered',
        },

    ]

    jumpToQuestion(event) {
        this.dispatchEvent(new CustomEvent('questionchange', {detail: event.target.label}));
        console.log(event.target.label);
    }

}