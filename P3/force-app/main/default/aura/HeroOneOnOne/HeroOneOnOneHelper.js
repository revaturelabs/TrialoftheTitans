({
  getRecords: function (component) {
    let heroId = $A.get("$SObjectType.CurrentUser.Id");
    let getMethod = component.get("c.getOneOnOneId");
    let week = component.get("v.week");
    getMethod.setParams({ heroId: heroId, week: week });
    getMethod.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.showData", true);
        component.set("v.OneOnOneId", response.getReturnValue().Id);
      }
    });
    $A.enqueueAction(getMethod);
  },

  onChange: function (component) {
    let week = component.find("week").get("v.value");
    component.set("v.week", week);
    this.getRecords(component);
  }
});
