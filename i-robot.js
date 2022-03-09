class RobotContainer {
    #columns = []

    addColumn = (column) => {
        if(!(column instanceof RobotColumn)) throw new Error('Not valid column.')
        if(this.#columns.length > 3)  throw new Error('Maximum number of column is 4.')
        this.#columns.push(column)
    }

    renderHTML = () =>{
        let div = document.createElement('div');
        div.classList.add('column-holder');
        this.#columns.forEach((c)=>{div.append(c.renderHTML())});
        return div;
    }

}

class RobotColumn{
    #tasks = [];
    #name = '';
    constructor(name){
        this.#name = name;
    }

    addTask = (task) => {
        if(!(task instanceof RobotTask)) throw new Error('This is not task.');
        this.#tasks.push(task);
    }

    renderHTML = () => {
        let div = document.createElement('div');
        div.classList.add('column');
        div.innerHTML = this.#name;
        this.#tasks.forEach(t => {div.append(t.renderHTML())});
        return div;
    }
}

class RobotTask{
    #name = '';
    #created = new Date();
    constructor(name){
        this.#name = name;
    }
    renderHTML = () => {
        let div = document.createElement('div');
        div.classList.add('task');
        div.innerHTML = this.#name + this.#created.toLocaleDateString();
        return div;
    }
}

let container = new RobotContainer();
let column1 = new RobotColumn('Backlog');
let column2 = new RobotColumn('ToDo');
let column3 = new RobotColumn('In Progress');
let column4 = new RobotColumn('Done');

let task1 = new RobotTask('1 Task');
let task2 = new RobotTask('2 Task');
let task3 = new RobotTask('2 Task');

// class iRobot{
//     #
//     constructor(){}
    

// }


column1.addTask(task1);
column1.addTask(task2);
column1.addTask(task3);

container.addColumn(column1);
container.addColumn(column2);
container.addColumn(column3);
container.addColumn(column4);
console.log('cont', container)

let html = document.querySelector('#root');
html.appendChild(container.renderHTML());