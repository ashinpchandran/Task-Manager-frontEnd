import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists:any;
  tasks:any;
  constructor(private taskService:TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskService.getLists().subscribe((lists:any)=>{
      this.lists = lists;
    })

    this.route.params.subscribe((params:Params)=>{
      console.log(params);
      if(params['listId'] !== undefined){
        this.taskService.getTasks(params['listId']).subscribe((tasks:any)=>{
          this.tasks = tasks;
        })
      }
    })
  }

  onTaskClick(task:Task){
    //we want to set the task to completed
    this.taskService.complete(task).subscribe(()=>{
      console.log("completed successfully!")
      task.completed = !task.completed;
    })
  }
  
}
