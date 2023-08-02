// 左图一
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  var quyu1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var count1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var text = ["手机","笔记本电脑","书包","键盘","鼠标","手环","耳机","平板","手柄","电视","男装","运动鞋","零食","饮料","香水","洗面奶","洗发水","纸巾","帽子"]
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data1) {
      // var data=JSON.parse(data)
      for(var i = 0; i <= data1["RECORDS"].length-1;i++){  
        for(var j = 0;j <=text.length-1;j++){  
          if(data1["RECORDS"][i]["种类"] ==text[j]){
            quyu1[j]+=Number(data1["RECORDS"][i]["价格"].trim()*100)
            count1[j]++
          } 
        }         
      }
    }
  })
  var erdatas =[]
  var erdata = {}
  for(z=0;z<=text.length-1;z++){
    erdata = {
      "name" :text[z],
      "value" :Math.round(quyu1[z]/count1[z]/100),
    }
    erdatas.push(erdata)
  }
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        type: "bar",
        barWidth: "35%",        
        itemStyle: {
          barBorderRadius: 5,
          // 指明颜色渐变的方向
          // 指明不同百分比之下颜色的值
          color:{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#5052EE' // 0% 处的颜色
            }, {
              offset: 1, color: '#AB6EE5' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ]
  };
var xdata=[]
var ydata=[]
for(z=0;z<=4;z++){
  xdata.push(erdatas[z]['name'])
  ydata.push(erdatas[z]['value'])
}
var times=5
setInterval(function () {
  xdata.shift()
  xdata.push(erdatas[times]['name'])
  ydata.shift()
  ydata.push(erdatas[times]['value'])
  myChart.setOption({
  xAxis: [
    {
      data: xdata
    }
  ],
  series: [
    {
      data: ydata
    }
  ]
}); 
if(times == 18){
  times = 0
}else{
  times++
} 
}, 2000);
  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
    myChart.setOption(option);
  });
})();

// 左图二
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));
  var num2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data2) {
      // var data=JSON.parse(data)
      for(var j = 0; j <= data2["RECORDS"].length-1;j++) {
        for(var i=3.8;i<=5.0;i+=0.1){
          if( data2["RECORDS"][j]['评分']*10 == Math.round(i*10)){
            num2[Math.round(i*10)-38]++
          }
        }
      }
    }
  })
  var option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "5%",
      top: "10px",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      name:"评分",
      nameLocation:"center",
      type: 'category',
      nameGap:30,
      axisLabel:{
        color:"white"
      },
      nameTextStyle:{
        color:"yellow"
      },
      boundaryGap: false,
      data: [3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0]
    },
    yAxis: {
      name:"评分数",
      nameLocation:"center",
      axisLabel:{
        color:"white"
      },
      nameTextStyle:{
        color:"yellow"
      },
      min:400,
      nameGap:35,
      type: 'value'
    },
    series: [
      {
        data:num2,
        type: 'line',
        areaStyle: {
          color:"#56D0E3"
        },
        lineStyle:{
          color:"#F8B448"
        }
      }
    ]
  };

  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 左图三
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  var count3=[0,0,0,0,0,0,0,0]
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data3) {
      // var data3=JSON.parse(data3)
      for(var i = 0; i <= data3["RECORDS"].length-1;i++){
        if(data3["RECORDS"][i]["价格"]>=0 && data3["RECORDS"][i]["价格"]<=100){
          count3[0]++
        }else if(data3["RECORDS"][i]["价格"]>100 && data3["RECORDS"][i]["价格"]<=500){
          count3[1]++
        }else if(data3["RECORDS"][i]["价格"]>500 && data3["RECORDS"][i]["价格"]<=1000){
          count3[2]++
        }else if(data3["RECORDS"][i]["价格"]>1000 && data3["RECORDS"][i]["价格"]<=2000){
          count3[3]++
        }else if(data3["RECORDS"][i]["价格"]>2000 && data3["RECORDS"][i]["价格"]<=3000){
          count3[4]++
        }else if(data3["RECORDS"][i]["价格"]>3000 && data3["RECORDS"][i]["价格"]<=4000){
          count3[5]++
        }else if(data3["RECORDS"][i]["价格"]>4000 && data3["RECORDS"][i]["价格"]<=5000){
          count3[6]++
        }else if(data3["RECORDS"][i]["价格"] >5000){
          count3[7]++
        }     
      }
    }
  })
  option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function(p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      data: ["100元以下","100~500元", "500~1000元", "1000~2000元", "2000~3000元", "3000~4000元","4000~5000元","5000元以上"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "商品价格分类",
        type: "pie",
        center: ["50%", "42%"],
        radius: ["40%", "60%"],
        color: [
          "#065aab",
          "#066eab",
          "#0682ab",
          "#0696ab",
          "#06a0ab",
          "#06b4ab",
          "#06c8ab",
          "#06dcab",
          "#06f0ab"
        ],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: count3[0], name: "100元以下" },
          { value: count3[1], name: "100~500元" },
          { value: count3[2], name: "500~1000元" },
          { value: count3[3], name: "1000~2000元" },
          { value: count3[4], name: "2000~3000元" },
          { value: count3[5], name: "3000~4000元" },
          { value: count3[6], name: "4000~5000元" },
          { value: count3[7], name: "5000元以上" }
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 右图一
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".bar1 .chart"));
  var p_money = [0,0,0,0,0,0]
  var p_num = [0,0,0,0,0,0]
  var com_money = [0,0,0,0,0,0]
  var com_num = [0,0,0,0,0,0]
  var ear_money = [0,0,0,0,0,0]
  var ear_num = [0,0,0,0,0,0]
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data4) {
      // var data4=JSON.parse(data4)
      for(var i = 0; i <= data4["RECORDS"].length-1;i++){ 
        if(data4["RECORDS"][i]["种类"]=="手机"){
          if(data4["RECORDS"][i]["名称"].indexOf("苹果")+1){
            p_money[0]+=Number(data4["RECORDS"][i]["价格"])
            p_num[0]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("华为")+1){
            p_money[1]+=Number(data4["RECORDS"][i]["价格"])
            p_num[1]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("小米")+1){
            p_money[2]+=Number(data4["RECORDS"][i]["价格"])
            p_num[2]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("OPPO")+1){
            p_money[3]+=Number(data4["RECORDS"][i]["价格"])
            p_num[3]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("vivo")+1){
            p_money[4]+=Number(data4["RECORDS"][i]["价格"])
            p_num[4]+=1          
          }else{
            p_money[5]+=Number(data4["RECORDS"][i]["价格"])
            p_num[5]+=1
          }
        }else if(data4["RECORDS"][i]["种类"]=="笔记本电脑"){
          if(data4["RECORDS"][i]["名称"].indexOf("华硕")+1){
            com_money[0]+=Number(data4["RECORDS"][i]["价格"])
            com_num[0]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("惠普")+1){
            com_money[1]+=Number(data4["RECORDS"][i]["价格"])
            com_num[1]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("戴尔")+1){
            com_money[2]+=Number(data4["RECORDS"][i]["价格"])
            com_num[2]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("外星人")+1){
            com_money[3]+=Number(data4["RECORDS"][i]["价格"])
            com_num[3]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("联想")+1){
            com_money[4]+=Number(data4["RECORDS"][i]["价格"])
            com_num[4]+=1          
          }else{
            com_money[5]+=Number(data4["RECORDS"][i]["价格"])
            com_num[5]+=1
          }
        }else if(data4["RECORDS"][i]["种类"]=="耳机"){
          if(data4["RECORDS"][i]["名称"].indexOf("Beats")+1){
            ear_money[0]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[0]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("AirPods")+1){
            ear_money[1]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[1]+=1
          }else if(data4["RECORDS"][i]["名称"].indexOf("漫步者")+1){
            ear_money[2]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[2]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("索尼")+1){
            ear_money[3]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[3]+=1          
          }else if(data4["RECORDS"][i]["名称"].indexOf("JBL")+1){
            ear_money[4]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[4]+=1          
          }else{
            ear_money[5]+=Number(data4["RECORDS"][i]["价格"])
            ear_num[5]+=1
          }
        }
      }
    }
  })
  var x_data=[]
  var y_data=[]
  var text2="手机"
  p_text=["苹果","华为","小米","OPPO","vivo","其他"]
  for(var i=0;i<=5;i++){
    y_data.push(Math.round(p_money[i]/p_num[i]*100)/100)
    x_data.push(p_text[i])
  }  
  document.getElementById("button_form").addEventListener("click",function(){
    text2 = document.getElementById("select_name").value
    x_data=[]
    y_data=[]
    if(text2=="手机"){
      p_text=["苹果","华为","小米","OPPO","vivo","其他"]
      for(var i=0;i<=5;i++){
        y_data.push(Math.round(p_money[i]/p_num[i]*100)/100)
        x_data.push(p_text[i])
      }
    }else if(text2=="笔记本电脑"){
      com_text=["华硕","惠普","戴尔","外星人","联想","其他"]
      for(var i=0;i<=5;i++){
        y_data.push(Math.round(com_money[i]/com_num[i]*100)/100)
        x_data.push(com_text[i])
      }
    }else if(text2=="耳机"){
      ear_text=["Beats","AirPods","漫步者","索尼","JBL","其他"]
      for(var i=0;i<=5;i++){
        y_data.push(Math.round(ear_money[i]/ear_num[i]*100)/100)
        x_data.push(ear_text[i])
      }
    }
  })
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        type: "bar",
        data: y_data,
        barWidth: "35%",        
        itemStyle: {
          barBorderRadius: 5,
          // 指明颜色渐变的方向
          // 指明不同百分比之下颜色的值
          color:{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#5052EE' // 0% 处的颜色
            }, {
              offset: 1, color: '#AB6EE5' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ]
  };
  setInterval(function () {
    myChart.setOption({
    xAxis: [
      {
        data: x_data
      }
    ],
    series: [
      {
        data: y_data
      }
    ]
  }); 
  }, 1000);
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 右图二
(function(){
  var myChart = echarts.init(document.querySelector(".line1 .chart"));
  var p_money = [0,0,0,0,0,0]
  var p_num = [0,0,0,0,0,0]
  var com_money = [0,0,0,0,0,0]
  var com_num = [0,0,0,0,0,0]
  var tv_money = [0,0,0,0,0,0]
  var tv_num = [0,0,0,0,0,0]
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data5) {
      // var data5=JSON.parse(data5)
      for(var i = 0; i <= data5["RECORDS"].length-1;i++){ 
        if(data5["RECORDS"][i]["种类"]=="手机"){
          if(data5["RECORDS"][i]["名称"].indexOf("苹果")+1){
            p_money[0]+=Number(data5["RECORDS"][i]["价格"])
            p_num[0]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("华为")+1){
            p_money[1]+=Number(data5["RECORDS"][i]["价格"])
            p_num[1]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("小米")+1){
            p_money[2]+=Number(data5["RECORDS"][i]["价格"])
            p_num[2]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("OPPO")+1){
            p_money[3]+=Number(data5["RECORDS"][i]["价格"])
            p_num[3]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("vivo")+1){
            p_money[4]+=Number(data5["RECORDS"][i]["价格"])
            p_num[4]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else{
            p_money[5]+=Number(data5["RECORDS"][i]["价格"])
            p_num[5]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }
        }else if(data5["RECORDS"][i]["种类"]=="笔记本电脑"){
          if(data5["RECORDS"][i]["名称"].indexOf("华硕")+1){
            com_money[0]+=Number(data5["RECORDS"][i]["价格"])
            com_num[0]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("惠普")+1){
            com_money[1]+=Number(data5["RECORDS"][i]["价格"])
            com_num[1]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("戴尔")+1){
            com_money[2]+=Number(data5["RECORDS"][i]["价格"])
            com_num[2]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("外星人")+1){
            com_money[3]+=Number(data5["RECORDS"][i]["价格"])
            com_num[3]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("联想")+1){
            com_money[4]+=Number(data5["RECORDS"][i]["价格"])
            com_num[4]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else{
            com_money[5]+=Number(data5["RECORDS"][i]["价格"])
            com_num[5]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }
        }else if(data5["RECORDS"][i]["种类"]=="电视"){
          if(data5["RECORDS"][i]["名称"].indexOf("三星")+1){
            tv_money[0]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[0]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("小米")+1){
            tv_money[1]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[1]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }else if(data5["RECORDS"][i]["名称"].indexOf("TCL")+1){
            tv_money[2]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[2]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("华为")+1){
            tv_money[3]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[3]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else if(data5["RECORDS"][i]["名称"].indexOf("康佳")+1){
            tv_money[4]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[4]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))          
          }else{
            tv_money[5]+=Number(data5["RECORDS"][i]["价格"])
            tv_num[5]+=Number(data5["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))
          }
        }
      }
    }
  })
  var values = []
  var text2 = "手机"
  p_text=["苹果","华为","小米","OPPO","vivo","其他"]
  for(var i=0;i<=5;i++){
    values.push(Math.round(p_num[i]/p_money[i]*100))
  }
  document.getElementById("button_form2").addEventListener("click",function(){
    text2 = document.getElementById("select_name2").value
    values = []
    if(text2=="手机"){
      p_text=["苹果","华为","小米","OPPO","vivo","其他"]
      for(var i=0;i<=5;i++){
        values.push(Math.round(p_num[i]/p_money[i]*100))
      }
    }else if(text2=="笔记本电脑"){
      com_text=["华硕","惠普","戴尔","外星人","联想","其他"]
      for(var i=0;i<=5;i++){
        values.push(Math.round(com_num[i]/com_money[i]*100))
      }
    }else if(text2=="电视"){
      tv_text=["三星","小米","TCL","华为","康佳","其他"]
      for(var i=0;i<=5;i++){
       values.push(Math.round(tv_num[i]/tv_money[i]*100))
      }
    }
  })
var option = {
  tooltip: {},
  grid: {
    left: "0%",
    top: "10px",
    right: "0%",
    bottom: "4%",
    containLabel: true
  },
  series:{
    type: "radar",

  }
};
setInterval(function () {
  p_text=["苹果","华为","小米","OPPO","vivo","其他"]
  com_text=["华硕","惠普","戴尔","外星人","联想","其他"]
  tv_text=["三星","小米","TCL","华为","康佳","其他"]
  var radar_name = []
  var radar_max = 50
  if(text2=="手机"){
    for(i=0;i<=5;i++){
      radar_name.push(p_text[i])
    }
    radar_max  = 60
  }else if(text2=="笔记本电脑"){
    for(i=0;i<=5;i++){
      radar_name.push(com_text[i])
    }
    radar_max  = 15
  }else if(text2=="电视"){
    for(i=0;i<=5;i++){
      radar_name.push(tv_text[i])
    }
    radar_max  = 20
  }
  myChart.setOption({
    radar:{
      indicator:[
        {name:radar_name[0],max:radar_max},
        {name:radar_name[1],max:radar_max},
        {name:radar_name[2],max:radar_max},
        {name:radar_name[3],max:radar_max},
        {name:radar_name[4],max:radar_max},
        {name:radar_name[5],max:radar_max}
      ]
    },
    series:{
      data:[{
        value:[values[0],values[1],values[2],values[3],values[4],values[5]],
        name:text2+"(总销量/总金额)"
      }]
    }
}); 
}, 1000);
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
});
})();

// 右图三
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie1  .chart"));
  var sj_price = []
  var com_price = []
  var ear_price = []
  var pb_price = []
  var tv_price = [] 
  $.ajax({
    url: "js/data.json",    //请求的接口名
    type: 'GET',
    dataType: "json",
    charset: "utf-8",
    async: false, //调用方法执行结束后，却发现赋值的全局变量的值是undefined，
    //这时很有可能是因为ajax的参数async，他的默认值是true，即异步执行，即你没拿到数据也能继续走下去
    success: function (data6) {
      // var data6=JSON.parse(data6)
      for(var i = 0; i <= data6["RECORDS"].length-1;i++){
        if(data6["RECORDS"][i]["种类"]=="手机" && data6["RECORDS"][i]["销量"]!=""){
          sj_price.push([Number(data6["RECORDS"][i]["价格"]),Number(data6["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))])
        }else if(data6["RECORDS"][i]["种类"]=="笔记本电脑"&& data6["RECORDS"][i]["销量"]!=""){
          com_price.push([Number(data6["RECORDS"][i]["价格"]),Number(data6["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))])
        }else if(data6["RECORDS"][i]["种类"]=="耳机"&& data6["RECORDS"][i]["销量"]!=""){
          ear_price.push([Number(data6["RECORDS"][i]["价格"]),Number(data6["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))])
        }else if(data6["RECORDS"][i]["种类"]=="平板"&& data6["RECORDS"][i]["销量"]!=""){
          pb_price.push([Number(data6["RECORDS"][i]["价格"]),Number(data6["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))])
        }else if(data6["RECORDS"][i]["种类"]=="电视"&& data6["RECORDS"][i]["销量"]!=""){
          tv_price.push([Number(data6["RECORDS"][i]["价格"]),Number(data6["RECORDS"][i]["销量"].replace("万","0000").match(/\d+/g))])
        }
      }
    }
  })
var text = "手机"
document.getElementById("button_form3").addEventListener("click",function(){
    text = document.getElementById("select_name3").value
})
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel:{
        color:"white"
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel:{
        color:"white"
      }
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter'
      }
    ]
  };
  var data=[]
setInterval(function () {
  data=[]
  if(text=="手机"){
    for(var i=0;i<=sj_price.length-1;i++){
      if(sj_price[i][1]>=100){
        data.push(sj_price[i])
      }
    }
  }else if(text=="笔记本电脑"){
    for(var i=0;i<=com_price.length-1;i++){
      if(com_price[i][1]>=100){
        data.push(com_price[i])
      }
    }
  }else if(text=="耳机"){
    for(var i=0;i<=ear_price.length-1;i++){
      if(ear_price[i][1]>=100){
        data.push(ear_price[i])
      }
    }
  }else if(text=="平板"){
    for(var i=0;i<=pb_price.length-1;i++){
      if(pb_price[i][1]>=100){
        data.push(pb_price[i])
      }
    }
  }else if(text=="电视"){
    for(var i=0;i<=tv_price.length-1;i++){
      if(tv_price[i][1]>=100){
        data.push(tv_price[i])
      }
    }
  }
  myChart.setOption({
    series:{
      data:data
    }
}); 
}, 1000);  
  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
