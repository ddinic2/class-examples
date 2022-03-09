
// let allHtml = "";

// class Column {
//     column = 1;
//     row;
//     constructor(column, row) {
//         this.column = column;
//         this.row = row;
//     }

//     render = () => {
//         return (
//             `<div class="col" id=${'row_' + this.row + 'col_' + this.column} style="border:1px solid;flex:1;padding:20px;">row&coll ${this.row + ' - ' + this.column}</div>`
//         )
//     }
//     showAlert = () => {
//         alert('Row ' + this.row + ', column ' + this.column);
//     }
//     addEventL = () => {
//         document.querySelector('#row_' + this.row + 'col_' + this.column).addEventListener('click', this.showAlert);
//     }
// }

// class Row {
//     number = 0;
//     columns = 12;
//     constructor(number, columns) {
//         this.number = number;
//         this.columns = columns;
//     }
//     render = () => {
//         let rowHtml = `<div style="display:flex;">`;
//         for (let i = 0; i < this.columns; i++) {
//             let newCol = new Column(i + 1, this.number);
//             rowHtml += newCol.render();
//             setTimeout(function(){
//                 newCol.addEventL();
//             }, 1)
           
//         }
//         return rowHtml + `</div>`
//     }
// }

// class ContainerCollection {
//     rows = 0;
//     constructor(rows) {
//         this.rows = rows
//     }

//     setRows = (numberOfRows) => {
//         this.rows = numberOfRows;
//     }
//     render = () => {
//         for (let i = 0; i < this.rows; i++) {
//             allHtml += new Row(i + 1, 12).render();
//         }
//         return allHtml;
//     }
// }

// let container = new ContainerCollection();
// container.setRows(3);
// container.render();

// document.querySelector('#root').innerHTML = allHtml;


// bora
// Klasa column ne treba da vodi racuna o tome u kom se redu nalazi to nju ne interesuje, ona u sustini ni nema pojma da redovi postoje. Jedino sto mozda interesuje klasu Column je koliko mesta zauzima (kolika je, posto implementiramo 12 gridni sistem ona maksimalno moze da bude 12) i sta se u njoj nalazi.
// Za klasu Column ja bih stavio promenljive content (sadrzaj) i size (velicina). Od metoda bih dodao render metoda jer nam ona sluzi za crtanje mozda bi bio i direktiniji sa imanovanjem pa bih je nazvao renderHTML
class Column{
    #content = '';
    #size = 1; // Najmanja moguca velicina
    #callback = ()=>{}; // Ovo je funckija koju zovemo na click event
    constructor(size){
          // Ovde proveravamo da li je velicina u dozvoljenim granicama
          if(size < 1 || size > 12) throw new Error("velicina nije u opsegu od 1-12!");
          this.#size = size;
    }
    setContent(content){ this.#content = content;}
    size() { return this.#size; }
    onClick(callback) {
        this.#callback = callback;
    }
    renderHTML() {
         let div = document.createElement('div');
         div.addEventListener('click', () => { this.#callback(); });
         div.classList.add('col', `s${this.#size}`);
         div.innerHTML =  this.#content;
         return div;
    }
}

// Klasa red u sebi ima kolone. To je sve. Ona u sebi nema nista drugo niti je bilo sta drugo interesuje. Jedno od ogranicenja je koliko kolona ona moze da ima. Posto mi kao implementiramo 12 gridni sistem ona moze maksimalno da ima 12 colona.
class Row {
    #columns = []; // Ovo je niz kolona koje se nalaze u jednom redu
   // Konstruktor u sustini ne radi nista 
   constructor(){}
    addColumn(column){
         // Ovde treba da pitamo da li je colona tip Colona klase ako nije bacimo gresku
         if(!(column instanceof Column))  throw new Error("Samo instanca Column moze da se doda u Row");
         // Sad prodjemo kroz sve kolone koje imamo i proverimo da li je suma velicina svih kolona dovoljno velika da moze da stane u red
         let sumOfAllColumns = this.#columns.reduce( (sumOfColumns, currentColumn) => { return sumOfColumns + currentColumn.size() }, 0);
         if(sumOfAllColumns+column.size() > 12) throw new Error('Zbir velicina kolona u redu mora biti maksimalno 12!');
         this.#columns.push(column);
    }
    renderHTML() {
         let div = document.createElement('div');
         div.classList.add('row');
          this.#columns.forEach(c => { div.append(c.renderHTML()) })
         return div;
    }
}

// Kad imamo red i kolone potrebno je da napravimo na kraju nesto sto ce da drzi redove.
// Ti si krenuo ok ali ovo sto si ti napravio je klasa koja se bavim izgradnjom a ne klasa koja opisuje kontejner. Napravicemo i jednu koja gradi da ti bude jasna razlika.
class Container {
    #rows = [];
   // Konstruktor u sustini ne radi nista 
   constructor(){}
    addRow(row){
         // Ovde treba da pitamo da li je red tipa Row klase ako nije bacimo gresku
         if(!(row instanceof Row))  throw new Error("Samo instanca Row moze da se doda kao red u kontejner");
         this.#rows.push(row);
    }
    renderHTML() {
         // Ovde prolazimo kroz svaki red i zovemo render
         let div = document.createElement('div');
         div.classList.add('container');
          this.#rows.forEach(c => { div.append(c.renderHTML()) })
         return div;
    } 
}

// E posto sad imamo sve sto nam je potrebno da napravimo jedan grid ajde da ga napravimo (varticemo se na klasu koja se bavi izgradnjom odma posle ovoga)

let container = new Container();

let row1 = new Row();
let column1 = new Column(6);
column1.setContent(' Red 1, colona 1');
column1.onClick(() => { alert('red 1 i kolona 1') });
let column2 = new Column(6);
column2.setContent(' Red 1, colona 2');
column2.onClick(()=>{alert('red 1, colona 2')})


row1.addColumn(column1);
row1.addColumn(column2);

container.addRow(row1);

document.querySelector('body').innerHTML = ``;
document.querySelector('body').append(container.renderHTML());

// To je u sustini to e sad ovu klasu koji si pravio gde prosledis recimo broj redova i onda ona napravi sve to mozes recimo danapravis klasu koja se zove twoColumnLayout ili tako nesto. Znaci da znas namenski st aona gradi.

// class twoColumnLayout {
//     #container
//     #row;
//     #leftColumn;
//     #rightColumn;
    
//      constructor() {

//         this.#row = new Row();
//         this.#leftColumn = new Column(6);
//         this.#rightColumn = new Column(6);
//         this.#container = new Container();

//         this.#row.addColumn(this.#leftColumn);
//         this.#row.addColumn(this.#rightColumn);
//         this.#container.addRow(this.#row);
//     }

//      setLeftContent(content) { this.#leftColumn.setContent(content) }
//      setRightContent(content) { this.#rightColumn.setContent(content) }

//     build() {
//           return this.#container.renderHTML();
//     }
// }
// let layout = new twoColumnLayout();
// layout.setLeftContent('left Bar');
// layout.setRightContent('right Bar');
// document.querySelector('body').innerHTML = ``;
// document.querySelector('body').append(layout.build());