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
        if(newtask.where == "todo")
        {
            this.todo.append(`

                <div class="task"  data-id="${newtask.id}">
                    <div class="task-header">
                        <div class="task-header-color bg-${newtask.color}"></div>
                        ${newtask.title}
                    </div>
                    <div class="task-body">
                        ${newtask.text}
                    </div>
                    <div class="task-footer p-0 m-0 ">
                        <ul class="nav text-center">
                            <li class="nav-item  w-100">
                                <a class="nav-link" id="delete"><i class="fas fa-times"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                            `);
        }
        else if(newtask.where == 'working')
        {
            this.working.append(`

                <div class="task"  data-id="${newtask.id}">
                    <div class="task-header">
                        <div class="task-header-color bg-${newtask.color}"></div>
                        ${newtask.title}
                    </div>
                    <div class="task-body">
                        ${newtask.text}
                    </div>
                    <div class="task-footer p-0 m-0 text-primary">
                        <ul class="nav text-center">
                            <li class="nav-item  w-100">
                                <a class="nav-link" id="delete"><i class="fas fa-times"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                            `);
        }
        else if(newtask.where == 'completed')
        {
            this.completed.append(`

                <div class="task"  data-id="${newtask.id}">
                    <div class="task-header">
                        <div class="task-header-color bg-${newtask.color}"></div>
                        ${newtask.title}
                    </div>
                    <div class="task-body">
                        ${newtask.text}
                    </div>
                    <div class="task-footer p-0 m-0 text-primary">
                        <ul class="nav text-center">
                            <li class="nav-item  w-100">
                                <a class="nav-link" id="delete"><i class="fas fa-times"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                            `);
        }
        
    }

    Delete(task)
    {
        task.remove();
    }
}

