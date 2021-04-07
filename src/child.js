import { LightningElement, api } from "lwc";

/**
 * Show an item
 */
export default class Child extends LightningElement {
  @api object

  handleChangeData(evt){
    const newValue = this.object.value + '-changed'
    this.dispatchEvent(
      new CustomEvent("childdatachanged", {
        bubbles: true, composed: true,
        detail: { cId: this.object.id, value: newValue }
      })
    )
  }
  handleSelectChild(evt) {
     this.dispatchEvent(
      new CustomEvent("childselected", {
        bubbles: true, composed: true,
        detail: { cId: this.object.id }
      })
    )
  }
}
