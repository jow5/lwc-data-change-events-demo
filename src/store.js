const _remote = () => Promise.resolve({
  parents: [ {id: 'P01', name: 'Parent 1'}],
  children: [
    {id: 'C01', name: 'child-01-01', parentId: 'P01', value: 'testvalue-A'},
    {id: 'C02', name: 'child-01-02', parentId: 'P01', value: 'testvalue-B'},
    {id: 'C03', name: 'child-01-03', parentId: 'P01', value: 'testvalue-C'},
  ],
})

export default class Store {
  
  data // our reference to the data repository, which should be on the top-level component
  
  async initializeData() {
    const d = this.data
    // load the "master" local objects from the remote server
    const remoteData = await _remote()
    // copy the remote data into our repository
    remoteData.parents.forEach(p => d.parents[p.id] = {...p, children:[]})
    remoteData.children.forEach(c => d.children[c.id] = {...c})

    // remoteData.parents.forEach(p => d.parents[p.id] = new Wrapper(p))
    // remoteData.children.forEach(c => d.children[c.id] = {...c})

    // build the relationships here
    for(const cId in d.children){
      const c = d.children[cId]
      const p = d.parents[c.parentId]
      p.children.push(c)
    }
  }

  applyChangeTo(evtdetail){
    console.log('applyChangeTo>>',JSON.stringify(evtdetail))
    const {cId, value} = evtdetail
    const c = this.data.children[cId]
    c.value = value
  }

  addChild(evtdetail) {
    const {targetParentId} = evtdetail
    const p = this.data.parents[targetParentId]
    const idxNext = p.children.length + 1
    const numC = `0${idxNext}`
    const ltrC = ' ABCDEFGHI'[idxNext]
    const addme = {id: `C${numC}`, name: `child-01-${numC}`, parentId: p.id, value: `testvalue-${ltrC}`}
    const tmp = this.data.children[addme.id] = addme
    this.data.parents[addme.parentId].children.push(tmp)
    console.log( this.data.parents[addme.parentId].children )
  }

  changeParentData(evtdetail){
    const p = this.data.parents[evtdetail.parentId]
    p.name = evtdetail.name
  }

}

class Wrapper {
    obj
    summary = ''
    typeLabel = 'Object'
    children = []
    constructor(source) {
        this.obj = {...source}
        for (const [key, value] of Object.entries(this.obj)) {
            this[key] = value
        }
    }
    applySummary() {
        this.summary = `${this.typeLabel} : ${((!!this.obj) ? this.obj.Name||this.obj.Id : 'n/a')}`
    }
}

