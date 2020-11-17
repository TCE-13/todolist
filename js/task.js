import { StorageController } from './storage.js';
import { UI } from './ui.js';

export class Task
{
    constructor(id,color,title,text,where)
    {
        this.id = id;
        this.color = color;
        this.title = title;
        this.text = text;
        this.where = where;
    }
}

export class TaskController
{
    constructor()
    {
        this.storage = new StorageController();
        this.ui = new UI();
    }
    

    Add(color,title,text,where)
    {
        
        let _id = this.storage.getTasks(),
            id;
        if(_id.length > 0)
        {
            id = _id[_id.length - 1].id + 1; 
        }
        else
        {
            id = 0;
        }
        const task = new Task(id,color,title,text,where);
        this.ui.Add(task);
        this.storage.storeTask(task);
    }
    Delete(task,id)
    {
        this.storage.deleteTask(id);
        this.ui.Delete(task);
    }
    whereUpdate(id)
    {
        this.storage.whereUpdate(id);
    }
    
}