

let allHtml;

class Column {
    column = 1;
    row;
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }

    render = () => {
        return (
            `<div class="col" id=${'row_' + this.row + 'col_' + this.column} style="border:1px solid;flex:1;padding:20px;">row&coll ${this.row + ' - ' + this.column}</div>`
        )
    }
    showAlert = () => {
        alert('Row ' + this.row + ', column ' + this.column);
    }
    addEventL = () => {
        document.querySelector('#row_' + this.row + 'col_' + this.column).addEventListener('click', this.showAlert);
    }
}

class Row {
    number = 0;
    columns = 12;
    constructor(number, columns) {
        this.number = number;
        this.columns = columns;
    }

    render = () => {
        let rowHtml = `<div style="display:flex;">`;
        for (let i = 0; i < this.columns; i++) {
            let newCol = new Column(i + 1, this.number);
            rowHtml += newCol.render();
            setTimeout(function(){
                newCol.addEventL();
            }, 1)
           
        }
        return rowHtml + `</div>`
    }
}

class ContainerCollection {
    rows = 0;
    constructor(rows) {
        this.rows = rows
    }

    setRows = (numberOfRows) => {
        this.rows = numberOfRows;
    }
    render = () => {
        for (let i = 0; i < this.rows; i++) {
            allHtml += new Row(i + 1, 12).render();
        }
        return allHtml;
    }
}

let container = new ContainerCollection();
container.setRows(10);
container.render();

document.querySelector('#root').innerHTML = allHtml;