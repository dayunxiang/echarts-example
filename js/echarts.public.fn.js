Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
String.prototype.format = function () {
    var result = this;
    if (arguments.length == 0)
        return null;
    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
        result = result.replace(re, arguments[i]);
    }
    return result;
};
//("<div>{0}<div>").format("哈哈");
function open_ajax(url, parameter, request,type, error, async) {
    type = type ? type : "Get";
    $.ajax({
        type: type,
        url: url,
        data: parameter,
        dataType: 'JSONP',
        async: async ? async : true,
        cache:false,
        error: function () {
            if (error != null && error != "") {
                error();
            }
        },
        success: function (msg) {
            if (request)
                request(msg);
        }
    });
}
//websocket的连接函数
//wsConnection("8080", "", function(result){console.log(result)})
function wsConnection(port, type, callback) {
    // var url = location.host.indexOf(":")!=-1?location.host.slice(0, location.host.indexOf(":")):location.host
    var url="192.168.10.168"
    try {
        var SOCKECT_ADDR = "ws://" + url +":"+ port;
        ws = new WebSocket(SOCKECT_ADDR);
        ws.onopen = function (event) {
            console.log("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
            ws.send(type);
        };
       
        ws.onmessage = callback;
        ws.onclose = function (event) {
        };
        ws.onerror = function (event) {
           // console("WebSocket异常！" + event.toString());
        };
    } catch (ex) {
        console(ex.message);
    }
}

wsConnection("1236","",function(result){
    console.log(result);
    if(result){
        $(".mapChar_list").show();
    }
});

//圆环
function annulus(ID){
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            y:'bottom',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            formatter: function(name) {
                var index = 0;
                var clientlabels = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];
                var clientcounts = [335,310,234,135,1548];
                clientlabels.forEach(function(value,i){
                    if(value == name){
                        index = i;
                    }
                });
                return name + "  " + clientcounts[index];
            },
            textStyle:{
                color:'#fff'
            }
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };

    myChart.setOption(option, true);
    myChart.on('click', function (param) {
        console.log(param)
            var index = param.dataIndex;
    }); 
    return myChart; 
}

//polarChar("polar",['其它设备电力利用率','照明设备电力利用率','制冷设备电力利用率','IT设备电力利用率'],[80, 20, 30, 60]);
function polarChar(ID) {
    var xxData=['其它设备电力利用率', '照明设备电力利用率', '制冷设备电力利用率', 'IT设备电力利用率'];
    var yyData= [80, 10, 30, 60];
    var xData=['','','',''];
    var yData=['','','',''];
    xData=xData.concat(xxData);
    yData=yData.concat(yyData);
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#2480cf"],
        textStyle:{
            color:"#fff"
        },
        grid: {
            top:'0',
            bottom: '0',
            containLabel: true
        },
        angleAxis: {
            min:0,
            max: 100,
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            axisLabel:{
                show:false
            },
            splitLine:{
                show:false
            },
        },
        radiusAxis: {
            type: 'category',
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            z:999,
            data: xData
        },
        polar: {
        },
        series: [{
            type: 'bar', 
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2b84d6'},
                            {offset: 0.5, color: '#00b2eb'},
                            {offset: 0.99, color: '#00e8e8'}
                        ]
                    )
                }
            },
            data: yData,
        }]
    };
    myChart.setOption(option, true);
    
    return myChart; 
}
function polarChar1(ID) {
    // var xxData=['其它设备电力利用率', '照明设备电力利用率', '制冷设备电力利用率', 'IT设备电力利用率'];
    // var yyData= [80, 10, 30, 60];
    // var xData=['','','',''];
    // var yData=['','','',''];
    // xData=xData.concat(xxData);
    // yData=yData.concat(yyData);
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#f00","#ccc"],
        textStyle:{
            color:"#fff"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:"{b0}: {c0}", 
        },
        title:{
            text:"设备总数\r\n\n320",  
            y: 'center',
            x:'center',
            textStyle:{
                color:"#fff",
            },
        },
        angleAxis: {
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            axisLabel:{
                show:false
            },
            splitLine:{
                show:false
            },
        },
        radiusAxis: {
            type: 'category',
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            data: ['','','','在线', '离线', '告警', '屏蔽'],
            z: 9999
        },
        polar: {
            center:['50%', '50%'],           
            radius:'100%'  
        },
        series: [{
            type: 'bar',
            barWidth: '10%',
            data: ['','','',1, 5, 3, 11],
            coordinateSystem: 'polar',
            stack: 'a',
            itemStyle:{
                normal:{
                    color: function(params){
                        var index_color = params.name;
                        if(index_color=="在线"){
                            return '#70AD47';
                        }else if(index_color=='离线') {
                            return '#4472C4';
                        }else if(index_color=='告警'){
                            return '#FFC000';
                        }else if(index_color=='屏蔽'){
                            return '#43682B';
                        }else if(index_color=='过保'){
                            return '#997300';
                        }
                    } 
                }
            }
        }, {
            type: 'bar',
            data: ['','','',19, 15, 17, 9],
            coordinateSystem: 'polar',
            stack: 'a'
        }],
    };
    
    myChart.setOption(option, true);
    
    return myChart; 
}

function pieChar(ID) {
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#1c79c2","#234591"],
        title:{
            text:"电力利用率",  
            top: 15,
            x:'center',
            textStyle:{
                color:"#fff",
            },
        },
        grid: {
            top:'20%',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                type:'pie',
                radius: ['50%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                hoverOffset:5,  //高亮扇区的偏移距离,默认10，就是hover时候的放大的距离
                silent:true,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter:function(){
                            return '73%\r\n使用率'
                        },
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold',
                            color:"#fff"
                        },
                        
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {   
                        itemStyle:{
                            normal:{
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2b84d6'},
                                        {offset: 0.5, color: '#00b2eb'},
                                        {offset: 0.99, color: '#00e8e8'}
                                    ]
                                )
                            }
                        },
                        label:{
                            normal:{
                                color:'#fff'
                            }
                        },
                        value:73, 
                        name:'使用',
                        
                    },
                    {
                        itemStyle:{
                            normal:{
                                color:'#234591'
                            }
                        },
                        value:27, 
                        name:'剩余'
                    },
                ]
            }
        ]
    };
    myChart.setOption(option, true);
    
    return myChart; 
}

function areaChar(ID){
    var xData=["2018-10-11 09:00:11", "2018-10-11 09:03", "2018-10-11 09:13", "2018-10-11 09:14",
     "2018-10-11 09:24","2018-10-11 09:34","2018-10-11 09:44","2018-10-11 09:54","2018-10-11 10:04","2018-10-11 10:14","2018-10-11 10:24"];
    var yData=[
         {
            name:'实时IT设备电能',
            type:'line',
            smooth:"true", //平滑
            symbolSize:'40px',
            data:[320, 232, 301, 234, 390, 230, 310,18, 391, 234, 290, 343, 310]
        },
        {
            name:'机房实时总电能',
            type:'line',
            areaStyle: {normal: {color:new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#3695f7'},
                            {offset: 0.5, color: '#123b62'},
                            {offset: 0.99, color: '#0a2137'}
                        ]
                    )}},
            smooth:"true", //平滑
            //symbol:"line", //不要圆圈
            symbolSize:2, //平滑的时候设置为0
            data:[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18]
        },
    ];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#5df5f4","#277ace"],
         title: {
            text: '千瓦',
            top:15,
            left:10,
            textStyle:{
                color:"#fff",
                verticalAlign:'top',
                fontWeight:'normal',
                fontSize:'14'
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            bottom: 10,
            textStyle:{
                color:"#fff"
            },
            data:["实时IT设备电能", "机房实时总电能"]
        },
        grid: {
            left: '15px',
            right: '45px',
            top:'15%',
            bottom: '15%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    rotate:-40,
                    color:"#fff",
                    formatter: function (value, index) {
                        // 格式化成月/日，只在第一个刻度显示年份
                        return new Date(value).Format('hh:mm');
                    }
                },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
                 splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#1c3042",
                        width:1,
                        type:"dashed",
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#fff",
					formatter: '{value} W'
                }
            }
        ],
        series : yData
    };
    myChart.setOption(option, true);
    setInterval(function () {
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(new Date().Format("yyyy-MM-dd hh:mm:ss"));
        option.series[0].data.shift();
        option.series[0].data.push((Math.round(Math.random() * 300)));
        option.series[1].data.shift();
        option.series[1].data.push((Math.round(Math.random() * 280)));
        myChart.setOption(option, true);
    },3000);
    return myChart; 
}


// 地图
function mapChar(ID){

    var myChart = echarts.init(document.getElementById(ID));
    var data = [
    {
        name: '惠州', 
        value: 300,
        color:"#f00",
        fontSize: 16,
        position: 'right',
        tooltip : {
            trigger: 'item',
            formatter : '{b}'
        },
    },
    {name: '深圳', value: 200,color:"#fff",fontSize: 14,position: 'left',}
];

var geoCoordMap = {
    '惠州':[114.4,23.09],
    '深圳':[114.07,22.62]
};

function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                itemStyle:{
                    normal:{
                        color:data[i].color,
                    }
                },
                label:{
                    normal:{
                        fontSize:data[i].fontSize,
                        position: data[i].position,
                    }
                },
                markPoint:{
                    data:[{
                        type:"max",
                        value: 222
                    }]
                },
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
    
function randomValue() {
    return Math.round(Math.random()*10);
}
option = {
    // tooltip:{
    //     trigger:'item',
    //     alwaysShowContent:true,
    //     formatter:function(params){
    //         return '<span>1、温湿度过高告警</span>'
    //     }
    // },
    visualMap: {
        show:false,
        min: 0,
        max: 10,
        seriesIndex: [1],
        inRange: {
            color: ['#27b1de', '#20689f']
        },
        calculable : true
    },
    geo: {
            map: 'china',
            roam: false,
            top:'5%',
            bottom:'0',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#0d2941',
                    borderColor: '#0d2941'
                },
                emphasis:{
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        
    series: [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 10,
            symbolRotate: 35,
            itemStyle: {
                normal: {
                    color: '#F06C00'
                    }
                }
            },
        {
            type: 'map',
            geoIndex: 0,
            data:[
                {name: '北京', value: randomValue()},
                {name: '天津', value: randomValue()},
                {name: '上海', value: randomValue()},
                {name: '重庆', value: randomValue()},
                {name: '河北', value: randomValue()},
                {name: '河南', value: randomValue()},
                {name: '云南', value: randomValue()},
                {name: '辽宁', value: randomValue()},
                {name: '黑龙江', value: randomValue()},
                {name: '湖南', value: randomValue()},
                {name: '安徽', value: randomValue()},
                {name: '山东', value: randomValue()},
                {name: '新疆', value: randomValue()},
                {name: '江苏', value: randomValue()},
                {name: '浙江', value: randomValue()},
                {name: '江西', value: randomValue()},
                {name: '湖北', value: randomValue()},
                {name: '广西', value: randomValue()},
                {name: '甘肃', value: randomValue()},
                {name: '山西', value: randomValue()},
                {name: '内蒙古', value: randomValue()},
                {name: '陕西', value: randomValue()},
                {name: '吉林', value: randomValue()},
                {name: '福建', value: randomValue()},
                {name: '贵州', value: randomValue()},
                {name: '广东', value: randomValue()},
                {name: '青海', value: randomValue()},
                {name: '西藏', value: randomValue()},
                {name: '四川', value: randomValue()},
                {name: '宁夏', value: randomValue()},
                {name: '海南', value: randomValue()},
                {name: '台湾', value: randomValue()},
                {name: '香港', value: randomValue()},
                {name: '澳门', value: randomValue()}
            ]
        },
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 2)),
            symbolSize: function (val) {
                return val[2] / 30;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    
                    formatter: '{b}',
                    
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f00',
                    shadowBlur: 1,
                    shadowColor: '#fff'
                }
            },
            
            zlevel: 1
        },
        {
            type:'custom',
            coordinateSystem: 'geo',
            geoIndex:0,
            renderItem: function (params, api) {
                console.log(params);
                console.log(api)
            },
            data:[2],
        }
        
    ]
};
    myChart.setOption(option, true);
    myChart.dispatchAction({
        type: 'showTip',
        name:'深圳'
        //seriesIndex: 1,
        //dataIndex: 1
    });
    return myChart; 
}

//仪表盘
function gaugeChar(ID){
    var myChart = echarts.init(document.getElementById(ID));
   var option = {
        
        tooltip : {
            formatter: "{a} : {c}"
        },
        series: [
            {
                name: 'PUE',
                type: 'gauge',
                radius:'98%',
                min:1,
                max:3,
                splitNumber:0,
                axisLine:{
                    lineStyle:{
                        color:[[0.9, '#f00'],[1, '#00ffff']],
                        width:'10',
                    }
                },
                splitLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                pointer:{
                    length:'75%',
                    width:'4%'
                },
                itemStyle:{
                    normal:{
                        color:'#00ffff'
                    }
                },
                title:{
                    show:false
                },
                detail: {
                        show: true,
						textStyle: {
							fontSize: 15,
							color:'#00ffff',
						},
                        formatter: 'PUE=' + '{value}',
                        offsetCenter: [0, '88%'],
                        

                    },
                data: [{value: 0}]
            }
        ]
    };
    myChart.setOption(option, true);
    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 3).toFixed(2) - 0;
        myChart.setOption(option, true);
    },4000);
    return myChart; 
}

//类型于仪表盘的半圆数据显示
function gaugeChar1(ID,value,all,title,color){
    var value=1.53;
    var all=4;
    var color=color?color:["#00AB6F","#E4E5ED"];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        title:{
            text:title,  
            bottom: 15,
            x:'center',
            textStyle:{
                color:"#999",
                fontSize:'16'
            },
        },
        series: [
            {
                name: title,
                type: 'gauge',
                radius:'70%',
                min:1,
                max:all,
                splitNumber:0,
                axisLine:{
                    lineStyle:{
                        color:[[value/all, color[0]],[1, color[1]]],
                        width:'10',
                    }
                },
                splitLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                pointer:{
                    length:'75%',
                    width:'0.1%'
                },
                itemStyle:{
                    normal:{
                        color:'transparent'
                    }
                },
                detail: {
                        show: true,
						textStyle: {
							fontSize: 26,
							color:'#fff',
						},
                        formatter: '{value}',
                        offsetCenter: ['0%', '0%'],
                        

                    },
                data: [{value: value}]
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}
//带刻度的带颜色分隔的仪表盘
function gaugeChar2(ID,value,min,max,title,color){
    var value=1.53,min=1,max=2.2,title="PUE";
    var color=[[0.333333, '#00AB6F'],[0.5,"#FFA63A"],[1, '#F73A00']];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        tooltip : {
            formatter: "{a}<br/>{c}"
        },
        series: [
            {
                name: title,
                type: 'gauge',
                radius:'100%',
                min:min,
                max:max,
                startAngle:180,
                endAngle:0,
                splitNumber:6,
                center: ['50%', '60%'],
                axisLine:{
                    lineStyle:{
                        color:color,
                        width:'10',
                    }
                },
                splitLine:{
                    show:true,
                    length:'10',
                },
                pointer:{
                    length:'75%',
                    width:'5%'
                },
                detail: {
                    show: true,
                    textStyle: {
                        fontSize: 16,
                        color:'#4A78FF',
                    },
                    formatter: title+'={value}',
                    offsetCenter: ['0%', '50%'],
                    

                },
                data: [{value: value}]
            }
        ]
    };
    
    myChart.setOption(option, true);
    return myChart; 
}

//画水球图
//json = {
//    value: 0.2,
//    color: ["#14688E", "#1E8CB6"],
//}
function drawWater(domID, json) {
    var myChart = echarts.init(document.getElementById(domID));
    var option = {
        grid: {
            top:'0',
            bottom: '0'
        },
        series: [{
            type: 'liquidFill',
            radius: '95%',
            backgroundStyle: {
                color: 'transparent'
            },
            itemStyle: {
                normal: {
                    shadowBlur: 0
                }
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: json.color[0],
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: json.color[0],
                        fontSize: 12,
                        align: 'center',
                        baseline: 'middle'
                    },
                    position: 'inside'
                }
            },
            waveAnimation: true,
            data: [
        	{
        	    value: json.value,
        	    itemStyle: {
        	        normal: {
        	            color: json.color[1]
        	        }
        	    }
        	}
            ]
        }]
    }
    myChart.setOption(option,true);
    return myChart; 
}

//告警饼状
function piemoreChar(ID) {
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#e92f0d","#fbf320","#fff","#3ff504"],
        title:{
            text:"告警",  
            x:'center',
            top: 15,
            textStyle:{
                color:"#fff",
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            x: 'center',
            bottom:'15px',
            textStyle:{
                color:'#fff'
            },
            data:['紧急告警','重要告警','一般告警','提示告警']
        },
        series: [
            {
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:60, name:'紧急告警'},
                    {value:30, name:'重要告警'},
                    {value:2, name:'一般告警'},
                    {value:8, name:'提示告警'}
                ]
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}

//横向柱状 设备告警top
function hbarChar(ID){
    var xMax = 1600;
    var dataShadow = [];
    var yData=['UPS','温湿度','电量仪','ATS','水','发电机','烟感'];
    for (var i = 0; i < yData.length; i++) {
        dataShadow.push(xMax);
    }

    var myChart = echarts.init(document.getElementById(ID));

    var option = {
        
        color:["#3ff504","#fff","#fbf320","#e92f0d"],
        title:{
            text:"设备告警TOP",  
            x:'center',
            top: 15,
            textStyle:{
                color:"#fff",
            },
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            } 
        },
        legend: {
            bottom:'10px',
            textStyle:{
                color:"#fff",
            },
            data: ['告警提示', '一般告警','重要告警','紧急告警']
        },
        grid: {
            top:"40px",
            bottom: '40px',
            containLabel: true
        },
        xAxis:  {
            
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:"#304a5d",
                    width:3,
                }
            },
            splitLine:{
                show:false,
            },
            axisTick:{
                show:false
            },
            axisLabel:{
                color:"#fff"
            },
            data: yData,
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    color:"#304a5d",
                    width:3,
                }
            },
            axisTick:{
                show:false
            },
            max:xMax,
            splitLine:{
                show:true,
                lineStyle:{
                    color:"#213342",
                    width:1,
                    type:"dashed",
                }
            },
            axisLabel:{
                color:"#fff"
            },
            
        },
        series: [
            // { // For shadow
            //     type: 'bar',
            //     itemStyle: {
            //         normal: {color: '#434343'}
            //     },
            //     barGap:'-100%',
            //     barCategoryGap:'0%',
            //     data: dataShadow,
            //     animation: false
            // },
            {
                name: '告警提示',
                type: 'bar',
                stack: 'all',
                barWidth: '50%',
                data: [400, 302, 301, 334, 390, 330, 400]
            },
            {
                name: '一般告警',
                type: 'bar',
                stack: 'all',
                barWidth: '50%',
                data: [120, 132, 101, 134, 90, 230, 400]
            },
            {
                name: '重要告警',
                type: 'bar',
                stack: 'all',
                barWidth: '50%',
                data: [220, 182, 191, 234, 290, 330, 400]
            },
            {
                name: '紧急告警',
                type: 'bar',
                stack: 'all',
                barWidth: '50%',
                data: [150, 212, 201, 154, 190, 330, 400]
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}

//温度
function barCharWD(ID){
    var yMax = 45;
    var dataShadow = [];
    var yData=['UPS','温湿度','电量仪','ATS','水','发电机','烟感','发电机1','烟感1'];
    for (var i = 0; i < yData.length; i++) {
        dataShadow.push(yMax);
    }

    var myChart = echarts.init(document.getElementById(ID));
    
    option = {
        
        color: ['#3398DB'],
        title:{
            text:"温度",  
            x:'center',
            top: 15,
            textStyle:{
                color:"#fff",
            },
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:'{b}：{c}'
        },
        grid: {
            top:'40px',
            bottom: '15px',
            left:'15px',
            right:'15px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : yData,
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#fff"
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                max:yMax,
                axisLabel:{
                    color:"#fff"
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
            }
        ],
        series : [
            // { // For shadow
            //     type: 'bar',
            //     itemStyle: {
            //         normal: {color: '#0c2f3f'}
            //     },
            //     barGap:'-100%',
            //     barCategoryGap:'0%',
            //     data: dataShadow,
            //     animation: false
            // },
            {
                type:'bar',
                barWidth: '50%',
                itemStyle:{
                    normal:{
                        color: function(params){
                            var index_color = params.value;
                            if(index_color<=10){
                                return '#2f8fbe';
                            }else if(index_color>10&&index_color<=25) {
                                return '#0dff00';
                            }else if(index_color>25&&index_color<=35){
                                return '#fae70b';
                            }else if(index_color>35){
                                return '#fd0000';
                            }
                        } 
                    }
                },
                data:[10, 28, 24, 34, 39, 33, 45,22,8]
            }
        ]
    };


    myChart.setOption(option, true);
    return myChart; 
}

//湿度
function barCharSD(ID){
    var yMax = 45;
    var dataShadow = [];
    var yData=['温湿度13_(机房G区)','温湿度12_(UPS1机房)','温湿度11_(UPS2机房)','温湿度10_(测试机房)','温湿度09_(机房B区)','温湿度08_(机房C区)','温湿度07_(机房C区)','温湿度06_(机房F区)','温湿度05_(机房E区)','温湿度04_(机房D区)'];
    for (var i = 0; i < yData.length; i++) {
        dataShadow.push(yMax);
    }

    var myChart = echarts.init(document.getElementById(ID));
    
    option = {
        
        color: ['#3398DB'],
        title:{
            text:"湿度",  
            x:'center',
            top:15,
            textStyle:{
                color:"#fff",
            },
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:'{b}：{c}'
        },
        grid: {
            top:'40px',
            bottom: '85px',
            left:'15px',
            right:'15px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : yData,
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#fff"
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
                axisLabel:{
                    interval:0,
                    rotate:-50,
                    color: "#fff"
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                max:yMax,
                axisLabel:{
                    color:"#fff"
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
            }
        ],
        series : [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: '#0c2f3f'}
                },
                barGap:'-100%',
                barCategoryGap:'0%',
                data: dataShadow,
                animation: false
            },
            {
                type:'bar',
                barWidth: '50%',
                itemStyle:{
                    normal:{
                        color: function(params){
                            var index_color = params.value;
                            if(index_color<=10){
                                return '#2f8fbe';
                            }else if(index_color>10&&index_color<=25) {
                                return '#0dff00';
                            }else if(index_color>25&&index_color<=35){
                                return '#fae70b';
                            }else if(index_color>35){
                                return '#fd0000';
                            }
                        } 
                    }
                },
                data:[10, 8, 14, 34, 29, 33, 45,30,25]
            }
        ]
    };


    myChart.setOption(option, true);
    return myChart; 
}

function lineZoom(ID){
    var xData=["09:00", "09:03", "09:13", "09:14", "09:24","09:34","09:44","09:54","10:04","10:14","10:24"];
    var yData=[
         {
            name:'实时IT设备电能',
            type:'line',
            symbolSize:8,
            data:[320, 232, 301, 234, 390, 230, 310,18, 391, 234, 290, 343, 310]
        },
        {
            name:'机房实时总电能',
            type:'line',
            //smooth:"true", //平滑
            //symbol:"line", //不要圆圈
            symbolSize:8,
            data:[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18]
        },
    ];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#5df5f4","#277ace"],
        tooltip : {
            trigger: 'axis'
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                bottom:10,
            },
            {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
            }
        ],
        grid: {
            left: '15px',
            right: '45px',
            top:'15%',
            bottom: '25%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#fff"    
                },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:3,
                    }
                },
                 splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#1c3042",
                        width:1,
                        type:"dashed",
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#fff",
					formatter: '{value}'
                }
            }
        ],
        series : yData
    };
    myChart.setOption(option, true);
    
    return myChart; 
}
//降水量，平均温度
function twoValue(ID){
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#fff'
                }
            }
        },
        legend: {
            textStyle:{
                color:"#fff"
            },
            orient:'vertical',
            data:['降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                },  
                axisLabel:{
                    color:"#fff"    
                },            
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 30,
                interval: 5,
                axisLabel: {
                    color:"#fff",    
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '平均温度',
                min: 0,
                max: 150,
                interval: 50,
                axisLabel: {
                    color:"#fff",
                    formatter: '{value}'
                }
            }
        ],
        series: [
            // { // For shadow
            //     type: 'bar',
            //     barWidth: '30%',
            //     itemStyle: {
            //         normal: {color: '#F4F4F4'}
            //     },
            //     barGap:'-100%',
            //     barCategoryGap:'0%',
            //     data: [30,30,30,30,30,30,30,30,30,30,30,30],
            //     animation: false
            // },
            {
                name:'降水量',
                type:'bar',
                data:[12, 9, 11, 23, 5, 11, 3, 10, 10, 10,11, 10]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,  //如果设置shadow  去掉这个就可以了
                data:[2.0, 4, 7, 11,12, 14, 13, 17, 20, 23, 24, 25]
            }
        ]
    };
    myChart.setOption(option, true);
    
    return myChart; 
}