import { TaskController,Task } from "./task.js";
import { UI } from './ui.js';
import { StorageController } from './storage.js';

export class App
{   
    constructor()
    {
        this.ui = new UI();
        this.storage = new StorageController();
        this.taskController = new TaskController();
    }
    
    init()
    {   
        
        const ui =  this.ui;
        let Tasks = this.storage.getTasks();
        Tasks.forEach(function(item){
            ui.Add(item);
        });
        this.Events();
    }

    Add(color,title,text)
    {
        this.taskController.Add(color,title,text,'todo');
        this.Events();
        
    }
    Events()
    {
        $('#newTaskBtn').on( "click", function() {
    
            let color = document.querySelector('#inputGroupSelect01'),
                title = document.querySelector('#title'),
                text  = document.querySelector('#text');
                
            if(title.value != '' && text.value != '')
            {
                app.Add(color.value,title.value,text.value);
            }
            
            
            $('#exampleModalCenter').modal('toggle');
            color.value = "primary"
            title.value = "";
            text.value = "";
        
            
        });

        function Del()
        {
            const delBtn = document.querySelectorAll('#delete');

            delBtn.forEach(item =>{
                item.addEventListener('click',function(){
                    const taskCtrl = new TaskController();
                    let item =  this.parentElement.parentElement.parentElement.parentElement;
                    let id = item.getAttribute('data-id');
                    
                    taskCtrl.Delete(item,id);
                });
            });
        }

        
        $('#update').on("click", function() {
            
            const storage =  new StorageController();

            let color = document.querySelector('#inputGroupSelect01'),
                title = document.querySelector('#title'),
                text  = document.querySelector('#text');

            let item =  this.parentElement.parentElement.parentElement.parentElement,
                id = item.getAttribute('data-id'),
                task = storage.getTask(id);

            color.value = task.color;
            title.value = task.title;
            text.value = task.text;
            
            $('#UpdateModal').modal('toggle');
        });
        Del();
        this.ui.Move();
    }
}


const app = new App();
app.init();



