/* 青岛研锦网络科技有限公司   版权所有*/
$(function () {
    map();

    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
        function randomData() {
            return Math.round(Math.random()*500);
        }
        var mydata = [
            {name: '北京',value: randomData() },{name: '天津',value: randomData() },
            {name: '上海',value: randomData() },{name: '重庆',value: randomData() },
            {name: '河北',value: randomData() },{name: '河南',value: randomData() },
            {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
            {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
            {name: '安徽',value: randomData() },{name: '山东',value: randomData() },
            {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
            {name: '浙江',value: randomData() },{name: '江西',value: randomData() },
            {name: '湖北',value: randomData() },{name: '广西',value: randomData() },
            {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
            {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
            {name: '吉林',value: randomData() },{name: '福建',value: randomData() },
            {name: '贵州',value: randomData() },{name: '广东',value: randomData() },
            {name: '青海',value: randomData() },{name: '西藏',value: randomData() },
            {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
            {name: '海南',value: randomData() },{name: '台湾',value: randomData() },
            {name: '香港',value: randomData() },{name: '澳门',value: randomData() }
        ];
        option = {
            title: {
                text: '全国地图',
                subtext: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: function (params) {
                    return params.name;
                }
            },
            visualMap: {
                show : false,
                x: 'left',
                y: 'bottom',
                splitList: [
                    {start: 500, end:600},{start: 400, end: 500},
                    {start: 300, end: 400},{start: 200, end: 300},
                    {start: 100, end: 200},{start: 0, end: 100},
                ],
                color: ['#66CC33', '#00FF00', '#66FF33','#339900', '#33CC00', '#00CC00']
            },
            series: [{
                name: '省份',
                type: 'map',
                mapType: 'china',
                roam: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:mydata
            }]
        };

        myChart.setOption(option);
        //地图点击事件
        myChart.on('click', function (params) {
            var xData = [];
            var yData = [];
            $.ajax({
                async: false,
                url: "/typenums",
                type: "post",
                data: {
                    "province": params.name
                },
                success: function (data) {
                    xData = data.type_name;
                    yData = data.count;
                }
            })
            //不同类别大学数量
            echarts.init(document.getElementById('echart1')).setOption({
                title: {
                    text: params.name + '省不同类别大学数量',
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: yData,
                        type: 'bar'
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                }
            });
            var data1 = []; //本专课数量
            $.ajax({
                async: false,
                url: "/level_name",
                data: {
                    "province": params.name
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.level_name.length; i++) {
                        var dataDict = {'value': 0, 'name': ''};
                        dataDict['value'] = data.count[i];
                        dataDict['name'] = data.level_name[i];
                        data1.push(dataDict);
                    }
                }
            })
            //本专科数量
            echarts.init(document.getElementById('echart2')).setOption({
                title: {
                    text: params.name + '省本专科数量',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data1
                    }
                ]
            });
            var data2 = [];
            $.ajax({
                async: false,
                url: '/school_nature_name',
                type: 'post',
                dataType: 'json',
                data: {
                    "province": params.name
                },
                success: function (data) {
                    for (var i = 0; i < data.school_nature_name.length; i++) {
                        var dataDict = {'value': 0, 'name': ''};
                        dataDict['value'] = data.count[i];
                        dataDict['name'] = data.school_nature_name[i];
                        data2.push(dataDict);
                    }
                    console.log(data1);
                }
            })
            //办学类型数量
            echarts.init(document.getElementById('fb1')).setOption({
                title: {
                    text: params.name + '办学类型数量',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '10%',
                    left: 'center'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data2
                    }
                ]
            });
            //985/211数量
            var data3 = [];
            $.ajax({
                async: false,
                url: '/f985_211',
                data: {
                    "province": params.name
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    var dataDict1 = {'value': 0, 'name': ''};
                    dataDict1['value'] = data.f985;
                    dataDict1['name'] = '985';
                    data3.push(dataDict1);
                    var dataDict2 = {'value': 0, 'name': ''};
                    dataDict2['value'] = data.f211;
                    dataDict2['name'] = '211';
                    data3.push(dataDict2);
                    var dataDict3 = {'value': 0, 'name': ''};
                    dataDict3['value'] = data.dual_class_name;
                    dataDict3['name'] = '双一流';
                    data3.push(dataDict3);
                }
            })
            echarts.init(document.getElementById('fb2')).setOption({
                title: {
                    text: params.name + '985，211和双一流数量',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '15%',
                    left: 'center'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data3
                    }
                ]
            });
            //综合实力
            var data4 = [];
            var data5 = [];
            var data6 = [];
            var data7 = [];
            var data8 = [];
            $.ajax({
                async: false,
                url: '/message',
                data: {
                    "province": params.name
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.name.length; i++) {
                        data4.push(data.name[i]);
                        data5.push(data.num_master[i]);
                        data6.push(data.num_doctor[i]);
                        data7.push(data.num_subject[i]);
                        data8.push(data.gbh_num[i]);
                    }
                }
            })
            echarts.init(document.getElementById('echart4')).setOption({
                title: {
                    text: params.name+'高校综合实力'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    top:'10%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data4
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '博士点',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data5
                    },
                    {
                        name: '硕士点',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data6
                    },
                    {
                        name: '国家重点学科',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data7
                    },
                    {
                        name: '科研项目',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data8
                    }
                ],
                dataZoom : [
                    {
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: 30,
                        xAxisIndex: [0],
                    },
                ]
            })
            //占地面积
            var data9 = [];
            var data10 = [];
            $.ajax({
                async:false,
                url: '/area',
                type: 'post',
                data: {
                    "province": params.name
                },
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.name.length; i++) {
                        data9.push(data.name[i]);
                        data10.push(data.area[i]);
                    }
                }
            })
            echarts.init(document.getElementById('echart5')).setOption({
                title: {
                    text: params.name+'高校占地面积'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },

                grid: {
                    left: '0%',
                    top: '10px',
                    right: '0%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: data9,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 1,
                            type: "solid"
                        },
                    },

                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        // rotate:50,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        //formatter: '{value} %'
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1	)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        }
                    }
                }],
                series: [{
                    type: 'bar',
                    data: data10,
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }],
                dataZoom : [
                    {
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: 60,
                        xAxisIndex: [0],
                    },
                ],
            })
            //排名
            var data11 = [];
            var data12 = [];
            var data13 = [];
            var data14 = [];
            var data15 = [];
            var data16 = [];
            $.ajax({
                async:false,
                url: '/paiming',
                type: 'post',
                data: {
                    "province": params.name
                },
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.name.length; i++) {
                        data11.push(data.name[i]);
                        data12.push(data.ruanke_rank[i]);
                        data13.push(data.xyh_rank[i]);
                        data14.push(data.wsl_rank[i]);
                        data15.push(data.qs_world[i]);
                        data16.push(data.us_rank[i]);
                    }
                }
            })
            var dataStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            };
            var placeHolderStyle = {
                normal: {
                    color: 'rgba(255,255,255,.05)',
                    label: {show: false,},
                    labelLine: {show: false}
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            };
            echarts.init(document.getElementById('echart6')).setOption({
                title: {
                    text: params.name+'高校各排名情况'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['软科排名', '校友会排名', '武书连排名', 'qs世界排名','us世界排名'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data11
                },
                yAxis: {
                    type: 'value',
                    inverse: true,
                },
                series: [
                    {
                        name: '软科',
                        type: 'line',
                        stack: 'Total',
                        data: data12
                    },
                    {
                        name: '校友会',
                        type: 'line',
                        stack: 'Total',
                        data: data13
                    },
                    {
                        name: '武书连',
                        type: 'line',
                        stack: 'Total',
                        data: data14
                    },
                    {
                        name: 'qs世界',
                        type: 'line',
                        stack: 'Total',
                        data: data15
                    },
                    {
                        name: 'us世界',
                        type: 'line',
                        stack: 'Total',
                        data: data16
                    }
                ],
                dataZoom : [
                    {
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: 30,
                        xAxisIndex: [0],
                    },
                ]
            })

        });
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

})

