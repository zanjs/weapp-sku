import api from '../../util/api.js';

Page({
  data: {
    Skus: [{
      "SkuId": "B00TSUGXKE",
      "Title": "Fire",
      "Price": 39.99,
      "ListPrice": 49.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:0", "2:0", "1:0"],
      "Selected": true
    }, {
      "SkuId": "B00ZDWGF7W",
      "Title": "Fire",
      "Price": 54.99,
      "ListPrice": 64.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:0", "2:1", "1:0"],

      "Selected": false
    }, {
      "SkuId": "B018Y227MY",
      "Title": "Fire",
      "Price": 39.99,
      "ListPrice": 49.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:0", "2:0", "1:1"],

      "Selected": false
    }, {
      "SkuId": "B018Y229OU",
      "Title": "Fire",
      "Price": 39.99,
      "ListPrice": 49.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:0", "2:0", "1:2"],

      "Selected": false
    }, {
      "SkuId": "B018Y23P7K",
      "Title": "Fire",
      "Price": 39.99,
      "ListPrice": 49.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:0", "2:0", "1:3"],

      "Selected": false
    }, {
      "SkuId": "B018Y22BI4",
      "Title": "Fire",
      "Price": 49.99,
      "ListPrice": 69.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:1", "2:0", "1:0"],

      "Selected": false
    }, {
      "SkuId": "B018Y229K4",
      "Title": "Fire",
      "Price": 64.99,
      "ListPrice": 84.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:1", "2:1", "1:0"],

      "Selected": false
    }, {
      "SkuId": "B018Y225IA",
      "Title": "Fire",
      "Price": 49.99,
      "ListPrice": 69.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:1", "2:0", "1:1"],

      "Selected": false
    }, {
      "SkuId": "B018Y224PY",
      "Title": "Fire",
      "Price": 49.99,
      "ListPrice": 69.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:1", "2:0", "1:2"],
      "Selected": false

    }, {
      "SkuId": "B018Y227A6",
      "Title": "Fire",
      "Price": 49.99,
      "ListPrice": 69.99,
      "Freight": 0.0,
      "Quantity": 30,
      "PropIds": ["0:1", "2:0", "1:3"],
      "Selected": false
    }],
    SkuClasses: [{
      "TypeName": "DigitalStorageCapacity",
      "SkuProperties": [{
        "PropId": "0:0",
        "PropertieName": "8 GB",
      }, {
        "PropId": "0:1",
        "PropertieName": "16 GB",
      }]
    }, {
      "TypeName": "Color",
      "SkuProperties": [{
        "PropId": "1:0",
        "PropertieName": "Black",
      }, {
        "PropId": "1:1",
        "PropertieName": "Blue",

      }, {
        "PropId": "1:2",
        "PropertieName": "Magenta",
      }, {
        "PropId": "1:3",
        "PropertieName": "Tangerine",
      }]
    }, {
      "TypeName": "Configuration",
      "SkuProperties": [{
        "PropId": "2:0",
        "PropertieName": "With Special Offers"
      }, {
        "PropId": "2:1",
        "PropertieName": "Without Special Offers"
      }]
    }],
    // 保存最后的组合结果信息
    SKUResult: {}
  },
  processSkuClasses(SkuClasses){
    let vm = this
    let list = SkuClasses
    let leng = list.length

    for(var i=0;i<leng;i++){
      let item = list[i]
      item.SkuProperties = vm.processSkuTags(item.SkuProperties)
     }

     return list
  },
  processSkuTags(tags){
    let list = tags
    let leng = list.length

    for(var i=0;i<leng;i++){
      let item = list[i]
      item.ison = false
  
     }

     return list
  },
  saveSKUResult(SKUResult) {
    this.setData({
      SKUResult: SKUResult
    })
  },
  saveSkuClasses(SkuClasses){
    this.setData({
      SkuClasses: SkuClasses
    })
  },
  updateSkuClasses(SkuClasses,x,y){
    let vm = this
    let arr = SkuClasses
    let tags = arr[x].SkuProperties
    let leng = tags.length
    let ison = tags[y].ison
    for(var i =0;i<leng;i++){
      let item = tags[i]
      if(i==y){
         item.ison = !ison
      }else{
        item.ison = false
      }
    }

    arr[x].SkuProperties = tags
    return SkuClasses
  },
  getSelect(SkuClasses){
    let vm = this
    let arr = SkuClasses
    let newArr = []
    let leng = arr.length

    for(var i = 0;i<leng;i++){
      let item = arr[i].SkuProperties
      let newItem = vm.getSelectTags(item)
      if(newItem.length){
        newArr.push(newItem)
      }
      
    }

    return newArr

  },
  getSelectTags(tags){
    let arr = tags
    let leng = arr.length
    let id = ''

   
    for(var i=0;i<leng;i++){
      let item = arr[i]
     
      if(item.ison){
       
        id = item.PropId
      }

    }
 
    return id

  },
  skuClick(event) {
    let vm = this
    let pid = api.event(event, 'id')
    let x = api.event(event, 'x')
    let y = api.event(event, 'y')
    let SkuClasses = vm.data.SkuClasses
    console.log(x)
    console.log(y)
 
    let newSkuClasses = vm.updateSkuClasses(SkuClasses,x,y)
    vm.saveSkuClasses(newSkuClasses)

    let sellA = vm.getSelect(newSkuClasses)
    let selObj = sellA.join(";")
    let tre = vm.data.SKUResult[selObj]
    console.log(tre)
    console.log(selObj)
 
  },
  init() {
    let vm = this
    let skus = vm.data.Skus
    let indata = api.SkusObj(skus)
    let SKUResult = {}
    SKUResult = api.initSKU(SKUResult,indata)
    vm.saveSKUResult(SKUResult)
    let newC = vm.processSkuClasses(vm.data.SkuClasses)
    console.log(newC)
    vm.saveSkuClasses(newC)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.init()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})