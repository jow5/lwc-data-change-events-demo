import { LightningElement, api } from "lwc";

const predicate = {
  odd: obj => (parseInt(obj.id.slice(-2)) % 2) === 1 ,
  even: obj => (parseInt(obj.id.slice(-2)) % 2) === 0 
}

export default class Filter extends LightningElement {
  @api object
  values = ['odd'];
  get options() {
      return [
          { label: 'Odd', value: 'odd' },
          { label: 'Even', value: 'even' },
      ];
  }
  get childrenFiltered(){
    const anyOf = this.values.reduce((accum, v) => { accum.push(predicate[v]); return accum; }, [])
    return this.object.children.filter(row => anyOf.some(filter => filter(row)))
  } 
  handleFilterSelect(evt){
    console.log('handleFilterSelect', evt.detail.value)
    this.values = evt.detail.value
  }
}
