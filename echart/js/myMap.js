(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".map .chart"));
  var app = {};
  var text=['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东'
  ,'广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','台湾','香港','澳门']
  var a=[]
  for(var x=0;x<=text.length-1;x++){
    a[x]=0
  }
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data) {
      // var data=JSON.parse(data)
      for(var i = 0; i <= data["RECORDS"].length-1;i++){
        for(var j=0;j<=text.length-1;j++){
          if(data["RECORDS"][i]["地址"].split(" ")[0]==text[j]){
            a[j]++
          }
        }
      }
    }
  })
  $.get("js/中华人民共和国.json",function (geoJson) {      
      echarts.registerMap('China', geoJson,{});
      var option = {
    title: {
      text: "电商分布图",
      top: '2%',
      left: "center",
      textStyle: {
        fontSize: 40,
        textBorderType: "solid",
        color: "#0bf"
      }
    },

    visualMap: {
      min: 0,
      label: {
        emphasis: {
          show: true,
          color: "#fff"
        }
      },
      textStyle: {
        color: "yellow"
      },
      roam: false,
      zoom: 1,
    },
    series: [
      {
        name: '中国地图',
        type: 'map',
        mapType: 'China', // 自定义扩展图表类型
        itemStyle: {
          emphasis: { label: { show: true, fontSize: 20, fontWeight: "bolder",color:"black" } }
        },
        data: [
          { name: '北京市', value: a[0] },
          { name: '天津市', value: a[1] },
          { name: '河北省', value: a[2] },
          { name: '山西省', value: a[3] },
          { name: '内蒙古自治区', value: a[4] },
          { name: '辽宁省', value: a[5] },
          { name: '吉林省', value: a[6] },
          { name: '黑龙江省', value: a[7] },
          { name: '上海市', value: a[8] },
          { name: '江苏省', value: a[9] },
          { name: '浙江省', value: a[10] },
          { name: '安徽省', value: a[11] },
          { name: '福建省', value: a[12] },
          { name: '江西省', value: a[13] },
          { name: '山东省', value: a[14] },
          { name: '河南省', value: a[15] },
          { name: '湖北省', value: a[16] },
          { name: '湖南省', value: a[17] },
          { name: '广东省', value: a[18] },
          { name: '广西壮族自治区', value: a[19] },
          { name: '海南省', value: a[20] },
          { name: '重庆市', value: a[21] },
          { name: '四川省', value: a[22] },
          { name: '贵州省', value: a[23] },
          { name: '云南省', value: a[24] },
          { name: '西藏自治区', value: a[25] },
          { name: '陕西省', value: a[26] },
          { name: '甘肃省', value: a[27] },
          { name: '青海省', value: a[28] },
          { name: '宁夏回族自治区', value: a[29] },
          { name: '新疆维吾尔自治区', value: a[30] },
          { name: '台湾省', value: a[31] },
          { name: '香港特别行政区', value: a[32] },
          { name: '澳门特别行政区', value: a[33] },
        ],
        // 自定义名称映射

      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
    }
  )

})();
