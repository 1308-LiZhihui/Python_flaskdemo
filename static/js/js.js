$(function () {
    echarts_1();
    echarts_2();
    echarts_4();
    echarts_31();
    echarts_32();
    echarts_5();
    echarts_6();

    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));
        var xData = [];
        var yData = [];
        $.ajax({
            async:false,
            url: '/typenums',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                xData = data.type_name;
                yData = data.count;
            }
        })
        option = {
            title: {
                text: '全国不同类别大学数量'
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
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        var data1 = [];
        $.ajax({
            async:false,
            url: '/level_name',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.level_name.length; i++) {
                    var dataDict = {'value': 0, 'name': ''};
                    dataDict['value'] = data.count[i];
                    dataDict['name'] = data.level_name[i];
                    data1.push(dataDict);
                }
                console.log(data1);
            }
        })
        option = {
            title: {
                text: '本专科数量'
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
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
        var data1 = [];
        var data2 = [];
        $.ajax({
            async:false,
            url: '/area',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.name.length; i++) {
                    data1.push(data.name[i]);
                    data2.push(data.area[i]);
                }
            }
        })
        option = {
            title: {
                text: '软科Top10大学占地面积'
            },
            //  backgroundColor: '#00265f',
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
                data: data1,
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
                data: data2,
                barWidth: '35%', //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                    normal: {
                        color: '#2f89cf',
                        opacity: 1,
                        barBorderRadius: 5,
                    }
                }
            }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        var data1 = []; //高校名称
        var data2 = []; //博士点
        var data3 = []; //硕士点
        var data4 = []; //国家重点学科
        var data5 = []; //科研项目
        $.ajax({
            async:false,
            url: '/message',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.name.length; i++) {
                    data1.push(data.name[i]);
                    data2.push(data.num_master[i]);
                    data3.push(data.num_doctor[i]);
                    data4.push(data.num_subject[i]);
                    data5.push(data.gbh_num[i]);
                }
            }
        })
        option = {
            title: {text: '软科Top10综合实力'},
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
                    data: data1
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
                    data: data2
                },
                {
                    name: '硕士点',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data3
                },
                {
                    name: '国家重点学科',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data4
                },
                {
                    name: '科研项目',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data5
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));
        var data1 = []; //高校名称
        var data2 = [];
        var data3 = [];
        var data4 = [];
        var data5 = [];
        var data6 = [];
        $.ajax({
            async:false,
            url: '/paiming',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.name.length; i++) {
                    data1.push(data.name[i]);
                    data2.push(data.ruanke_rank[i]);
                    data3.push(data.xyh_rank[i]);
                    data4.push(data.wsl_rank[i]);
                    data5.push(data.qs_world[i]);
                    data6.push(data.us_rank[i]);
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
                //shadowBlur: 40,
                //shadowColor: 'rgba(40, 40, 40, 1)',
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
        option = {
            title: {
                text: '软科Top10各排名情况'
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
                data: data1
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
                    data: data2
                },
                {
                    name: '校友会',
                    type: 'line',
                    stack: 'Total',
                    data: data3
                },
                {
                    name: '武书连',
                    type: 'line',
                    stack: 'Total',
                    data: data4
                },
                {
                    name: 'qs世界',
                    type: 'line',
                    stack: 'Total',
                    data: data5
                },
                {
                    name: 'us世界',
                    type: 'line',
                    stack: 'Total',
                    data: data6
                }

            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_31() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb1'));
        var data1 = [];
        $.ajax({
            async: false,
            url: '/school_nature_name',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.school_nature_name.length; i++) {
                    var dataDict = {'value': 0, 'name': ''};
                    dataDict['value'] = data.count[i];
                    dataDict['name'] = data.school_nature_name[i];
                    data1.push(dataDict);
                }
                console.log(data1);
            }
        })
        option = {
            title: {
                text: '办学类型数量'
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
                    data: data1
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_32() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));
        var data1 = [];
        $.ajax({
            async: false,
            url: '/f985_211',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                var dataDict1 = {'value': 0, 'name': ''};
                dataDict1['value'] = data.f985;
                dataDict1['name'] = '985';
                data1.push(dataDict1);
                var dataDict2 = {'value': 0, 'name': ''};
                dataDict2['value'] = data.f211;
                dataDict2['name'] = '211';
                data1.push(dataDict2);
                var dataDict3 = {'value': 0, 'name': ''};
                dataDict3['value'] = data.dual_class_name;
                dataDict3['name'] = '双一流';
                data1.push(dataDict3);
            }
        })
        option = {
            title: {text: '985，211和双一流数量'},
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
                    data: data1
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


})




















