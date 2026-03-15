import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-tdapp',
  imports: [FormsModule,CommonModule],
  templateUrl: './tdapp.component.html',
  styleUrl: './tdapp.component.css'
})



export class TDappComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) 
  {}
        
      tasks:{name:string;completed:boolean;priority:string;date?:string}[] = [];
      newTask:string = '';
      editIndex:number|null =null;
      filter: 'All'|'Active'|'Completed' = 'All';
      selectedPriority:string = 'Medium';
      newDate: string='';
      searchText:string='';
      today: string = new Date().toISOString().split('T')[0];

      ngOnInit(){
        if(isPlatformBrowser(this.platformId)){
        const savedTasks =localStorage.getItem('tasks');
        if(savedTasks) {
          this.tasks = JSON.parse(savedTasks);
        }
      }
    }

      addTask(){

        if(this.newTask.trim()===''){
          return;
        }
    const today = new Date().toISOString().split('T')[0];

  if(this.newDate && this.newDate < today){
    alert("Past dates are not allowed!");
    return;
  }
        if(this.editIndex === null){
        this.tasks.push({name:this.newTask, 
                         completed:false, 
                         priority:this.selectedPriority,
                         date:this.newDate});
        this.newTask='';
      }
      else{
        this.tasks[this.editIndex] ={...this.tasks[this.editIndex],
                                     name:this.newTask,
                                     priority:this.selectedPriority,
                                     date:this.newDate};
        this.editIndex = null;
        this.newTask='';

      } 
      this.selectedPriority = 'Medium'; 
      this.saveTasks();
      this.newDate='';
    }
    editTask(index:number){
       this.newTask = this.tasks[index].name;
       this.editIndex = index;
       
  }
    deleteTask(i:number){
       this.tasks.splice (i,1);
       this.newTask='';
       this.saveTasks();
  }
  saveTasks(){
    if(isPlatformBrowser(this.platformId)){
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
   }
  }

  get filteredTasks(){

    let filtered = this.tasks;
    if(this.filter === 'Active'){
      filtered =filtered.filter(task => !task.completed);
    }
    if(this.filter === 'Completed'){
       filtered =filtered.filter(task => task.completed);
    }
    const q =(this.searchText||'').trim().toLowerCase();
    if(q){
      filtered = filtered.filter(task =>  
        (task.name||'').toLowerCase().includes((this.searchText||'').toLowerCase()))
      }
      return filtered;
  }

  get totalTasks(){
    return this.tasks.length;
  }
  get completedTasks(){
    return this.tasks.filter(task => task.completed).length;
  }
  get pendingTasks(){
    return this.tasks.filter(task => !task.completed).length;
  }
  
  saveToLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
  }

  clearCompleted(){
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveToLocalStorage; 
  }

  checkDueDate(task:any){
    if(!task.date){
      alert("no due date set for this task");
      return;
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  const due = new Date(task.date);
  due.setHours(0,0,0,0);

  const diff = Math.round((due.getTime()-today.getTime())/(1000* 60 * 60 * 24));

  if (diff < 0) {
    alert (`Overdue:"${task.name}"`);
  }
  else if (diff === 0){
    alert(`Due today: "${task.name}"`);
  }
  else if (diff === 1){
    alert(`Due tomorrow: "${task.name}"`);
  }
  else {
  alert(`"${task.name}" is due in ${diff} days`);
}
}
  
}

