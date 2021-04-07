import { LightningElement, api, track } from "lwc";
import Store from './store'

export default class App extends LightningElement {
  title = "Data Change Event Demo!";

  @track data = {parents:[], children: []}  // HAS to reside next to the store
  currentParent = {}
  currentChild = {}
  showData = false;

  async connectedCallback(){
    this.store = new Store()
    this.store.data = this.data // tell the store to use OUR tracked variable as its repository
    await this.store.initializeData()
    this.currentParent = this.data.parents.P01
    console.log('connectedCallback>>',JSON.stringify(this.data.parents.P01.children))
    this.showData = true
  }
  
  handleChildSelected (evt) {
    console.log('handleSelectChild>>',JSON.stringify(evt.detail))
    this.currentChild = this.data.children[evt.detail.cId]
  }
  handleChildDataChanged (evt) {
    console.log('handleChildDataChanged>>',JSON.stringify(evt.detail))
    this.store.applyChangeTo(evt.detail)
  }

  handleAddChild (evt) {
    console.log('handleChildDataChanged>>',JSON.stringify(evt.detail))
    this.store.addChild({...evt.detail, targetParentId : this.currentParent.id})
  }

  handleParentDataChanged (evt) {
    console.log('handleParentDataChanged>>',JSON.stringify(evt.target.value))
    this.store.changeParentData({...evt.detail, parentId: this.currentParent.id, name: evt.target.value })
  }

  get currentParentName() {
    return (!!!this.currentParent) ? '-None-' : this.currentParent.name
  }

}
