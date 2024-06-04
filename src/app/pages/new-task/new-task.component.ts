import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId:string = "";

  constructor( private taskService:TaskService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params);
      this.listId=params['listId'];
    })
  }
  createTask(title:string){
    this.taskService.createTask(title,this.listId).subscribe((response:any)=>{
      //now we navigate to /lists/response._id
      this.router.navigate(['../'],{relativeTo:this.route});
    })
  }
}
