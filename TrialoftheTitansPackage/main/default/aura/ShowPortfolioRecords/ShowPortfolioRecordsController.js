({
    onChange : function(cmp, event, helper) {
        cmp.set('v.showData', true);
        let HeroName = cmp.find('HeroSelect').get('v.value');
        console.log(HeroName);
        cmp.set('v.HeroId',HeroName);

        helper.ShowAllEquivRecords(cmp);
        helper.ShowAllProjectRecords(cmp);
        helper.ShowAllEducationRecords(cmp);
        helper.ShowAllCertificationRecords(cmp);
        helper.ShowAllExpRecords(cmp);

    },
    doInit: function(cmp, event,helper){
        helper.helperInit(cmp);
    }
})