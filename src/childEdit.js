import { LightningElement, api } from "lwc";

/**
 * Show an item
 */
export default class ChildEdit extends LightningElement {
  @api object

  handleChildDataChanged(evt){
    console.log('handleChildDataChanged', evt.target.value)
    const newValue = evt.target.value
    this.dispatchEvent(
      new CustomEvent("childdatachanged", {
        bubbles: true, composed: true,
        detail: { cId: this.object.id, value: newValue }
      })
    )
  }
}
