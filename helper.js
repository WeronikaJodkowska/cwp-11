const helper = {};

Object.prototype.sortByField = function(value, order){
    this.sort((a, b)=>{return order*(a[value] - b[value]);});
    return this;
};

Object.prototype.rewritePosition =function(position, numChange){
    let index = this.findIndex(film => film.position === position);
    if(index !== -1){
        this.sortByField('position');
        for(let i = index; i<this.length; i++){
            this[i].position+=numChange;
        }
    }
};
Object.prototype.deleteSpace = function(){
    this.sortByField('position');
    if(this.length > 1){
        deleteLastSpace(this);
        deleteInnerSpace(this);
    }
};

function deleteLastSpace(elements){
    if(elements[elements.length-1]['position'] - elements[elements.length-2]['position']> 1){
        elements[elements.length-1]['position'] = elements[elements.length-2]['position'] + 1;
    }
}

function deleteInnerSpace(elements){
    elements[0].position = 1 ;
    for(let index = 1; index<elements.length; index++){
        if(elements[index].position - elements[index-1].position> 1){
            elements.rewritePosition(elements[index].position, -(elements[index].position - elements[index-1].position -1));
        }
    }
}

helper.checkParams = (params, keys)=>{
    let myKeys = keys.slice();
    for(let keyP in params){
        let index;
        index = myKeys.findIndex(i => i === keyP);
        if(index!==-1) myKeys.splice(index, 1);
    }
    return myKeys.length < 1;
};

helper.randomId = ()=>{
    return Math.ceil(Math.random()*100);
};
helper.dateFormater = function(){
    const date = new Date();
    return `Date: ${date.getFullYear()}.${date.getMonth()}.${date.getDay()}  ` +
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

module.exports = helper;
