({
    drawChart : function(component, event) {
        let data = component.get('v.contextInfo');
        console.log("made it to helper ");
        console.log(data);
        const width  = 1100;
        const height = 1400;
        const margin = 100;
        
        let cmp = component.find('mydthree').getElement();
        let titans = {
            "Apex": [
                {
                    "currentResults": [],
                    "highScore": .49,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .89,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Data Modeling": [
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .19,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Process Automation": [
                {
                    "currentResults": [],
                    "highScore": .69,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
                "Security": [
                    {
                        "currentResults": [],
                        "highScore": .19,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    },
                    {
                        "currentResults": [],
                        "highScore": .69,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    }]
        };
        console.log("loaded data " + titans);
        /* ------------------------------ CODE STARTS ------------------------------------------------------------*/
        let currKey = 0;
        let sourceData = {};
        let trackExamAverage = [];
        let trackLabels = [];
        let currHighScores = [];
        let teamColors = new Map();
        teamColors.set('Amplifire', '#C24747');
        teamColors.set('Synergy', '#F4CF38');
        teamColors.set('Alchemy', '#84C247');
        teamColors.set('Vanquish', '#475BC2');
        teamColors.set('Avg', 'black');

    }
})
