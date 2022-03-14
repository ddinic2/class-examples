class RobotContainer {
    #columns = []

    addColumn = (column) => {
        if (!(column instanceof RobotColumn)) throw new Error('Not valid column.')
        if (this.#columns.length > 3) throw new Error('Maximum number of column is 4.')
        this.#columns.push(column)
    }

    renderHTML = () => {
        let div = document.createElement('div');
        div.classList.add('column-holder');
        this.#columns.forEach((c) => { div.append(c.renderHTML()) });
        return div;
    }

}

class RobotColumn {
    #tasks = [];
    #name = '';
    step = 1;
    constructor(name, step) {
        this.#name = name;
        this.step = step;
    }

    addTask = (task) => {
        if (!(task instanceof RobotTask)) throw new Error('This is not task.');
        this.#tasks.push(task);
    }

    setNotCompleted = (task) => {
        let newTasks = this.#tasks.filter((n => { return n.step !== task.step }))
        this.#tasks = newTasks;
    }

    renderHTML = () => {
        let div = document.createElement('div');
        div.classList.add('column');
        div.innerHTML = this.#name;
        this.#tasks.forEach(t => { div.append(t.renderHTML()) });
        return div;
    }
}

class RobotTask {
    name = '';
    #created = new Date();
    #status = '';
    step = 1;
    #callback = () => { };
    constructor(name, status) {
        this.name = name;
        this.#status = status;
    }
    onClick = (callback) => {
        this.#callback = callback;
    }
    setNextStep = () => {
        if (this.#status === 'Backlog') {
            this.#status = 'ToDo';
            this.step = 2;
            return;
        }
        if (this.#status === 'ToDo') {
            this.#status = 'In Progress';
            this.step = 3;
            return;
        }
        if (this.#status === 'In Progress') {
            this.#status = 'Done';
            this.step = 4;
            return;
        }
    }

    getName = () => { return this.name }

    renderHTML = () => {
        let div = document.createElement('div');
        div.classList.add('task');
        div.addEventListener('click', () => this.#callback())
        div.innerHTML = this.name + " " + this.#created.toLocaleDateString();
        return div;
    }
}

let container = new RobotContainer();
let column1 = new RobotColumn('Backlog', 1);
let column2 = new RobotColumn('ToDo', 2);
let column3 = new RobotColumn('In Progress', 3);
let column4 = new RobotColumn('Done', 4);

let task1 = new RobotTask('Task 1 ', 'Backlog');

column1.addTask(task1);

container.addColumn(column1);
container.addColumn(column2);
container.addColumn(column3);
container.addColumn(column4);

task1.onClick(() => {
    task1.setNextStep();
    column1.setNotCompleted(task1);
    column2.setNotCompleted(task1);
    column3.setNotCompleted(task1);
    column4.setNotCompleted(task1);
    if (task1.step === 1)
        column1.addTask(task1)
    if (task1.step === 2)
        column2.addTask(task1)

    if (task1.step === 3)
        column3.addTask(task1)

    if (task1.step === 4)
        column4.addTask(task1)

    render();
})



function render() {
    let html = document.querySelector('#root');
    html.innerHTML = "";
    html.appendChild(container.renderHTML());
} render();


