import { StorageController } from './storage.js';

export class UI
{   
    constructor()
    {
        this.todo = $('#todo');
        this.working = $('#working');
        this.completed = $('#completed');
        this.storage = new StorageController();
    }

    Move()
    {
        const todo = $('#todo'),
            working = $('#working'),
            completed = $('#completed'),
            task = $('.task');
        
        task.draggable({revert: true, cursor: 'move', cursorAt: { top: 50, left: 191 }});

        todo.droppable({
            accept: ".task",
            classes: {
                "ui-droppable-active": "ui-state-highlight"
            },
            drop:function(event,ui)
            {
                const storage = new StorageController();
                drop( ui.draggable, todo);
                let item = ui.helper[0].getAttribute('data-id');
                storage.whereUpdate(item,'todo');
            }
        });

        working.droppable({
            accept: ".task",
            classes: {
                "ui-droppable-active": "ui-state-highlight"
            },
            drop:function(event,ui)
            {
                const storage = new StorageController();
                drop( ui.draggable, working);
                let item = ui.helper[0].getAttribute('data-id');
                storage.whereUpdate(item,'working');
            }
        });

        completed.droppable({
            accept: ".task",
            classes: {
                "ui-droppable-active": "ui-state-highlight"
            },
            drop:function(event,ui)
            {   
                const storage = new StorageController();
                drop( ui.draggable, completed);
                let item = ui.helper[0].getAttribute('data-id');
                storage.whereUpdate(item,'completed');
            }
        });

        function drop($item,list)
        {
            $item.appendTo(list)
        }
    }

    Add(newtask)
    {
        let task = document.createElement('div');
        let taskHeader = document.createElement('div');
        let taskColor = document.createElement('div');
        let taskBody = document.createElement('div');

        task.setAttribute('data-id',newtask.id);
        task.classList.add('task');
        taskHeader.classList.add('task-header');
        taskColor.classList.add(`task-header-color`);
        taskColor.classList.add('bg-'+newtask.color);
        taskBody.classList.add('task-body');

        taskHeader.append(taskColor);
        taskHeader.append(newtask.title),

        taskBody.append(newtask.text);

        task.append(taskHeader);
        task.append(taskBody);
        task.innerHTML += `
            <div class="task-footer p-0 m-0 ">
                <ul class="nav text-center">
                    <li class="nav-item  w-100">
                        <a class="nav-link" id="delete"><i class="fas fa-times"></i></a>
                    </li>
                </ul>
            </div>`
        
        ;

        if(newtask.where == "todo")
        {
            this.todo.append(task);
        }
        else if(newtask.where == 'working')
        {
            this.working.append(task);
        }
        else if(newtask.where == 'completed')
        {
            this.completed.append(task);
        }
        
    }

    Delete(task)
    {
        task.remove();
    }
}

