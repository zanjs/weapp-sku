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
  skuClick(event) {
    let vm = this
    let pid = vm.evevt(event, 'id')
    console.log(pid)
  },
  //把组合的key放入结果集SKUResult
  add2SKUResult(combArrItem, sku) {
    var key = combArrItem.join(";");
    if (SKUResult[key]) { //SKU信息key属性·
      SKUResult[key].count += sku.Quantity;
      SKUResult[key].prices.push(sku.Price);
    } else {
      SKUResult[key] = {
        count: sku.Quantity,
        prices: [sku.Price]
      };
    }
  },
  //初始化得到结果集
  initSKU(data) {
    var i, j, skuKeys = getObjKeys(data);
    for (i = 0; i < skuKeys.length; i++) {
      var skuKey = skuKeys[i]; //一条SKU信息key
      var sku = data[skuKey]; //一条SKU信息value
      var skuKeyAttrs = skuKey.split(";"); //SKU信息key属性值数组
      skuKeyAttrs.sort(function (value1, value2) {
        return parseInt(value1) - parseInt(value2);
      });

      //对每个SKU信息key属性值进行拆分组合
      var combArr = combInArray(skuKeyAttrs);
      for (j = 0; j < combArr.length; j++) {
        add2SKUResult(combArr[j], sku);
      }

      //结果集接放入SKUResult
      SKUResult[skuKeyAttrs.join(";")] = {
        count: sku.Quantity,
        prices: [sku.Price]
      }
    }
  },
  evevt(event, key) {
    return event.currentTarget.dataset[key]
  },
  init() {
    let vm = this
    let skus = vm.data.Skus
    var indata = SkusObj(skus)

    initSKU(indata)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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