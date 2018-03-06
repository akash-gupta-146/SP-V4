export class Filters {
  selectedGoal: any;
  selectedInitiative: any;
  selectedActivity: any;
  selectedKpi: any;
  public goalsCopy: any[] = [];
  public goalsCopy1: any[] = [];
  public filteredGoals: any[];
  public filteredInitiatives: any[];
  public filteredActivities: any[];
  public filteredOpis: any[];
  public goals: any[] = [];

  constructor() {

  }

  public initFilters(goalsCopy: any[]) {
    this.filteredGoals = this.filteredActivities = this.filteredInitiatives = this.filteredOpis = goalsCopy;
  }

  public searchGoal(key: any) {
    this.goals = this.goalsCopy;
    let val = key.target.value;
    if (val && val.trim() != '') {
      this.goals = this.goalsCopy.filter((item: any) => {
        return (item.goal.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.filteredGoals = this.goals;
    }
  }
  public searchInitiative(key: any) {
    this.goals = JSON.parse(JSON.stringify(this.filteredGoals));
    let val = key.target.value;
    if (val && val.trim() != '') {
      this.goals = this.goals.filter((outerItem: any) => {
        outerItem.initiatives = outerItem.initiatives.filter((item: any) => {
          return (item.initiative.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        this.filteredInitiatives = this.goals;
        return outerItem.initiatives.length;
      });
    }
  }
  public searchActivity(key: any) {
    this.goals = JSON.parse(JSON.stringify(this.filteredInitiatives));
    let val = key.target.value;
    if (val && val.trim() != '') {
      this.goals = this.goals.filter((outerItem: any) => {
        outerItem.initiatives = outerItem.initiatives.filter((innerItem: any) => {
          innerItem.activities = innerItem.activities.filter((item: any) => {
            return (item.activity.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
          return innerItem.activities.length;
        });
        this.filteredActivities = this.goals;
        return outerItem.initiatives.length;
      });
    }
  }
  public searchOpi(key: any) {
    this.goals = JSON.parse(JSON.stringify(this.filteredActivities));
    let val = key.target.value;
    if (val && val.trim() != '') {
      this.goals = this.goals.filter((outerItem: any) => {
        outerItem.initiatives = outerItem.initiatives.filter((innerItem: any) => {
          innerItem.activities = innerItem.activities.filter((item: any) => {
            item.opis = item.opis.filter((inItem: any) => {
              return (inItem.opi.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
            return item.opis.length;
          });
          return innerItem.activities.length;
        });
        return outerItem.initiatives.length;
      });
    }
  }

  public selectGoal(selectedGoal){
    this.goalsCopy1 = JSON.parse(JSON.stringify(this.goals));
    this.selectedGoal = selectedGoal;
    this.goals = this.goalsCopy.filter((element:any,index:number)=>{
      return (element.goalId === this.selectedGoal.goalId);
    });
    console.log(this.goalsCopy1);
  }
  public selectInitiative(selectedInitiative){
    this.selectedInitiative = selectedInitiative;
    this.goals = JSON.parse(JSON.stringify(this.goalsCopy1));
    this.goals = this.goals.filter((element:any)=>{
      element.initiatives = element.initiatives.filter((initiative:any)=>{
        return (initiative.initiativeId === this.selectedInitiative.initiativeId);
      });
      return (element.goalId === this.selectedGoal.goalId);
    });
    
  }
  public selectActivity(selectedActivity){
    this.selectedActivity = selectedActivity;
    this.goals = JSON.parse(JSON.stringify(this.goalsCopy1));
    this.goals = this.goals.filter((element:any)=>{
      element.initiatives = element.initiatives.filter((initiative:any)=>{
        initiative.activities =  initiative.activities.filter((activity:any)=>{
          return (activity.activityId == this.selectedActivity.activityId);
        })
        return (initiative.initiativeId == this.selectedInitiative.initiativeId);
      })
      return (element.goalId == this.selectedGoal.goalId);
    });
  }
  public selectKpi(selectedKpi){
    this.selectedKpi = selectedKpi;
    this.goals = JSON.parse(JSON.stringify(this.goalsCopy1));
    this.goals = this.goals.filter((element:any)=>{
      element.initiatives = element.initiatives.filter((initiative:any)=>{
        initiative.activities =  initiative.activities.filter((activity:any)=>{
          activity.opis = activity.opis.filter((opi:any)=>{
            return (opi.opiId == this.selectedKpi.opiId)
          })
          return (activity.activityId == this.selectedActivity.activityId);
        })
        return (initiative.initiativeId == this.selectedInitiative.initiativeId);
      })
      return (element.goalId == this.selectedGoal.goalId);
    });
  }
  
}