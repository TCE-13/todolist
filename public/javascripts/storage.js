export class StorageController 
{
    storeTask(task)
    {
        let Tasks;
        if(localStorage.getItem('tasks') === null)
        {
            Tasks = [];
            Tasks.push(task);
        }
        else
        {
            Tasks = JSON.parse(localStorage.getItem('tasks'));
            Tasks.push(task);
        }
        localStorage.setItem('tasks',JSON.stringify(Tasks));
    }

    getTasks()
    {
        let Tasks;
        if(localStorage.getItem('tasks') === null || "")
        {
            Tasks = [];
        }
        else
        {
            Tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return Tasks;
    }
    getTask(id)
    {
        let Tasks = this.getTasks(),
            item;
            
        Tasks.forEach(function(task){
            if(task.id == id)
            {
                item = task;
            }
        });
        return  item;
    }

    deleteTask(id)
    {
        let Tasks = JSON.parse(localStorage.getItem('tasks'));
        Tasks.forEach(function(task,index){
            if(id == task.id)
            {
                Tasks.splice(index,1);
            }
        });
        localStorage.setItem('tasks',JSON.stringify(Tasks));
    }
    updateTask(task)
    {
        let Tasks = this.getTasks();
        Tasks.forEach(function(item,index){
            if(task.id == item.id)
            {
                Tasks.splice(index,1,task);
            }
        });
        localStorage.setItem('tasks',JSON.stringify(Tasks));
    }
    whereUpdate(id,where)
    {
        let Tasks = this.getTasks();
        Tasks.forEach(function(tsk){
            if(id == tsk.id)
            {
                tsk.where = where;
            }
        });
        localStorage.setItem('tasks',JSON.stringify(Tasks));
    }
}