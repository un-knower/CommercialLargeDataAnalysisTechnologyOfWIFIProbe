var last_day_traffic_amount_number;
var last_day_traffic_amount_status;
var last_day_traffic_amount_compare;
var last_day_the_amount_of_store_number;
var last_day_the_amount_of_store_status;
var last_day_the_amount_of_store_compare;
var average_the_resident_time_number;
var average_the_resident_time_status;
var average_the_resident_time_compare;
var last_day_new_customers_number;
var last_day_new_customers_status;
var last_day_new_customers_compare;
var last_day_old_customers_number;
var last_day_old_customers_status;
var last_day_old_customers_compare;
var last_day_deep_number;
var last_day_deep_status;
var last_day_deep_compare;

var the_traffic_hour_data;//客流量按小时计
var the_store_amount_hour_data;//入店量按小时计
var traffic_and_the_amount_of_store_hour_time;//客流量/入店量按小时记时间轴

var the_high_activity_week_data;//高活跃度按周计
var the_mid_activity_week_data;//中活跃度按周计
var the_low_activity_week_data;//低活跃度按周计
var the_sleep_activity_week_data;//沉睡活跃度按周计

var the_bounce_rate_day_data;//跳出率按日计
var the_deep_rate_day_data;//深访率按日计

var the_new_customers_day_data;//新顾客按日计
var the_old_customers_day_data;//老顾客按日计

var the_into_the_store_rate_hour_data;//入店率按小时计
var the_into_the_store_rate_hour_time;//入店率按小时计时间轴

var the_into_the_store_rate_day_data;//入店率按日计

var lat;//维度
var lon;//经度
$(document).ready(function(){
	request_recent_data();
	request_traffic_amount_and_the_amount_of_store_hour();
	//chart_traffic_amount_and_the_amount_of_store_hour();
	request_customer_active_week();
	//chart_customer_active_week();
	request_deep_rate_and_bounce_rate_day();
	//chart_last_day_deep_rate();
	//chart_last_day_bounce_rate();
	request_the_new_and_old_customers_day();
	//chart_last_day_new_and_old_customers_rate();
	request_into_the_store_rate_hour();
	//chart_into_the_store_rate_hour();
	request_into_the_store_rate_day();
	//chart_last_day_into_the_store_rate();
	//show_map();
	request_probe_position();
});

function request_recent_data(){
	var my_url = project_name + "/get_recent_data";
	$.ajax({
		type: "GET",
		url: my_url,
		success: recent_data_callback
	});
}

function recent_data_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = progect_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		var last_day_traffic_amount = obj["last_day_traffic_amount"];
		last_day_traffic_amount_number = last_day_traffic_amount["number"];
		last_day_traffic_amount_status = last_day_traffic_amount["status"];
		last_day_traffic_amount_compare = last_day_traffic_amount["compare"];
		var last_day_the_amount_of_store = obj["last_day_the_amount_of_store"];
		last_day_the_amount_of_store_number = last_day_the_amount_of_store["number"];
		last_day_the_amount_of_store_status = last_day_the_amount_of_store["status"];
		last_day_the_amount_of_store_compare = last_day_the_amount_of_store["compare"];
		var average_the_resident_time = obj["average_the_resident_time"];
		average_the_resident_time_number = average_the_resident_time["number"];
		average_the_resident_time_status = average_the_resident_time["status"];
		average_the_resident_time_compare = average_the_resident_time["compare"];
		var last_day_new_customers = obj["last_day_new_customers"];
		last_day_new_customers_number = last_day_new_customers["number"];
		last_day_new_customers_status = last_day_new_customers["status"];
		last_day_new_customers_compare = last_day_new_customers["compare"];
		var last_day_old_customers = obj["last_day_old_customers"];
		last_day_old_customers_number = last_day_old_customers["number"];
		last_day_old_customers_status = last_day_old_customers["status"];
		last_day_old_customers_compare = last_day_old_customers["compare"];
		var last_day_deep = obj["last_day_deep"];
		last_day_deep_number = last_day_deep["number"];
		last_day_deep_status = last_day_deep["status"];
		last_day_deep_compare = last_day_deep["compare"];
		
		document.getElementById("last_day_traffic_amount_number").innerHTML = last_day_traffic_amount_number;
		if(last_day_traffic_amount_status.indexOf("up") == 0){
			document.getElementById("last_day_traffic_amount_status").className = "fa fa-sort-asc";
			document.getElementById("last_day_traffic_amount").className = "green";
		}else{
			document.getElementById("last_day_traffic_amount_status").className = "fa fa-sort-desc";
			document.getElementById("last_day_traffic_amount").className = "red";
		}
		document.getElementById("last_day_traffic_amount_compare").innerHTML = last_day_traffic_amount_compare;
		
		document.getElementById("last_day_the_amount_of_store_number").innerHTML = last_day_the_amount_of_store_number;
		if(last_day_the_amount_of_store_status.indexOf("up") == 0){
			document.getElementById("last_day_the_amount_of_store_status").className = "fa fa-sort-asc";
			document.getElementById("last_day_the_amount_of_store").className = "green";
		}else{
			document.getElementById("last_day_the_amount_of_store_status").className = "fa fa-sort-desc";
			document.getElementById("last_day_the_amount_of_store").className = "red";
		}
		document.getElementById("last_day_the_amount_of_store_compare").innerHTML = last_day_the_amount_of_store_compare;
		
		document.getElementById("average_the_resident_time_number").innerHTML = average_the_resident_time_number;
		if(average_the_resident_time_status.indexOf("up") == 0){
			document.getElementById("average_the_resident_time_status").className = "fa fa-sort-asc";
			document.getElementById("average_the_resident_time").className = "green";
		}else{
			document.getElementById("average_the_resident_time_status").className = "fa fa-sort-desc";
			document.getElementById("average_the_resident_time").className = "red";
		}
		document.getElementById("average_the_resident_time_compare").innerHTML = average_the_resident_time_compare;
		
		document.getElementById("last_day_new_customers_number").innerHTML = last_day_new_customers_number;
		if(last_day_new_customers_status.indexOf("up") == 0){
			document.getElementById("last_day_new_customers_status").className = "fa fa-sort-asc";
			document.getElementById("last_day_new_customers").className = "green";
		}else{
			document.getElementById("last_day_new_customers_status").className = "fa fa-sort-desc";
			document.getElementById("last_day_new_customers").className = "red";
		}
		document.getElementById("last_day_new_customers_compare").innerHTML = last_day_new_customers_compare;
		
		document.getElementById("last_day_old_customers_number").innerHTML = last_day_old_customers_number;
		if(last_day_old_customers_status.indexOf("up") == 0){
			document.getElementById("last_day_old_customers_status").className = "fa fa-sort-asc";
			document.getElementById("last_day_old_customers").className = "green";
		}else{
			document.getElementById("last_day_old_customers_status").className = "fa fa-sort-desc";
			document.getElementById("last_day_old_customers").className = "red";
		}
		document.getElementById("last_day_old_customers_compare").innerHTML = last_day_old_customers_compare;
		
		document.getElementById("last_day_deep_number").innerHTML = last_day_deep_number;
		if(last_day_deep_status.indexOf("up") == 0){
			document.getElementById("last_day_deep_status").className = "fa fa-sort-asc";
			document.getElementById("last_day_deep").className = "green";
		}else{
			document.getElementById("last_day_deep_status").className = "fa fa-sort-desc";
			document.getElementById("last_day_deep").className = "red";
		}
		document.getElementById("last_day_deep_compare").innerHTML = last_day_deep_compare;
	}
}

function request_traffic_amount_and_the_amount_of_store_hour(){
	var my_url = project_name + "/get_traffic_amount_and_the_amount_of_store_hour";
	$.ajax({
		type: "GET",
		url: my_url,
		success: traffic_amount_and_the_amount_of_store_hour_callback
	});
}

function traffic_amount_and_the_amount_of_store_hour_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_traffic_hour_data = obj['traffic'];
		the_store_amount_hour_data = obj['store_amount'];
		traffic_and_the_amount_of_store_hour_time = obj['time'];
		chart_traffic_amount_and_the_amount_of_store_hour();
	}
}

function chart_traffic_amount_and_the_amount_of_store_hour(){
	var traffic_amount_and_the_amount_of_store_hour = echarts.init(document.getElementById("traffic_amount_and_the_amount_of_store_hour"));
	var option = {
		title: {
			left: '50%',
			textAlign: 'center'
		},
		tooltip: {
			trigger: 'asix',
			axisPointer: {
				lineStyle: {
					color: '#ddd'
				}
			},
			backgroundColor: 'rgba(255,255,255,1)',
			padding: [5, 10],
			textStyle: {
				color: '#7588E4',
			},
			extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
		},
		legend: {
			right: 20,
			orient: 'vertical',
			data: ['客流量','入店量']
		},
		xAxis: {
			type: 'category',
			//data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
			data: traffic_and_the_amount_of_store_hour_time,
			boundaryGap: false,
			splitLine: {
				show: true,
				interval: 'auto',
				lineStyle: {
					color: ['#D4DFF5']
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#609ee9'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 14
				}
			}
		},
		yAxis: {
			type: 'value',
			splitLine: {
				lineStyle: {
					color: ['#D4DFF5']
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#609ee9'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 14
				}
			}
		},
		series: [{
			name: '客流量',
			type: 'line',
			smooth: true,
			showSymbol: false,
			symbol: 'circle',
			symbolSize: 6,
			//data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
			data: the_traffic_hour_data,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(199, 237, 250,0.5)'
					}, {
						offset: 1,
						color: 'rgba(199, 237, 250,0.2)'
					}], false)
				}
			},
			itemStyle: {
				normal: {
					color: '#f7b851'
				}
			},
			lineStyle: {
				normal: {
					width: 3
				}
			}
		}, {
			name: '入店量',
			type: 'line',
			smooth: true,
			showSymbol: false,
			symbol: 'circle',
			symbolSize: 6,
			//data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
			data: the_store_amount_hour_data,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(216, 244, 247,1)'
					}, {
						offset: 1,
						color: 'rgba(216, 244, 247,1)'
					}], false)
				}
			},
			itemStyle: {
				normal: {
					color: '#58c8da'
				}
			},
			lineStyle: {
				normal: {
					width: 3
				}
			}
		}]
	};
	traffic_amount_and_the_amount_of_store_hour.setOption(option);
	window.addEventListener("resize",function(){
		traffic_amount_and_the_amount_of_store_hour.resize();
	});
}

function request_customer_active_week(){
	var my_url = project_name + "/get_customer_active_week";
	$.ajax({
		type: "GET",
		url: my_url,
		success: customer_active_week_callback
	});
}

function customer_active_week_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_high_activity_week_data = obj["high_activity"];
        the_mid_activity_week_data = obj["mid_activity"];
        the_low_activity_week_data = obj["low_activity"];
        the_sleep_activity_week_data = obj["sleep_activity"];
		chart_customer_active_week();
	}
}

function chart_customer_active_week(){
	var customer_active_week = echarts.init(document.getElementById("customer_active_week"));
	var colors = ['#1790CF', '#1BB2D8', '#99D2DD', '#88B0BB', '#1C7099','#038CC4'];
	var option = {
	    color: colors,
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    title: {
	        left: 'center'
	    },
	    legend: {
	        bottom: '20',
	        data:  ['高活跃度','中活跃度','低活跃度','沉睡活跃度'],
	        icon: 'square'
	    },
	    series : [
	        {
	            name: '顾客活跃度',
	            type: 'pie',
	            radius : '50%',
	            data:[
	                {value:the_high_activity_week_data, name:'高活跃度'},
	                {value:the_mid_activity_week_data, name:'中活跃度'},
	                {value:the_low_activity_week_data, name:'低活跃度'},
	                {value:the_sleep_activity_week_data, name:'沉睡活跃度'}
	            ],
				/*
				data:[
	                {value:34, name:'高活跃度'},
	                {value:42, name:'中活跃度'},
	                {value:64, name:'低活跃度'},
	                {value:83, name:'沉睡活跃度'}
	            ],*/
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	customer_active_week.setOption(option);
	window.addEventListener("resize",function(){
		customer_active_week.resize();
	});
}

function request_deep_rate_and_bounce_rate_day(){
	var my_url = project_name + "/get_deep_rate_and_bounce_rate_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: deep_rate_and_bounce_rate_day_callback
	});
}

function deep_rate_and_bounce_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_bounce_rate_day_data = obj['bounce_rate'];
		the_deep_rate_day_data = obj['deep_rate'];
		chart_last_day_deep_rate();
		chart_last_day_bounce_rate();
	}
}

function chart_last_day_deep_rate(){
	var last_day_deep_rate = echarts.init(document.getElementById("last_day_deep_rate"));
	var deep_rate = parseFloat(the_deep_rate_day_data[11].toFixed(4));
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '深访率',
			type: 'pie',
			radius: ['60%', '70%'],
			label: {
				normal: {
					position: 'center'
				}
			},
			data: [{
				value: deep_rate,
				name: '深访率',
				label: {
					normal: {
						formatter: '{d} %',
						textStyle: {
							fontSize: 30
						}
					}
				}
			}, {
				value: 1 - deep_rate,
				name: '其他',
				label: {
					normal: {
						formatter: '\n深访率',
						textStyle: {
							color: '#555',
							fontSize: 20
						}
					}
				},
				tooltip: {
					show: false
				},
				itemStyle: {
					normal: {
						color: '#aaa'
					},
					emphasis: {
						color: '#aaa'
					}
				},
				hoverAnimation: false
			}]
		}]
	};
	last_day_deep_rate.setOption(option);
	window.addEventListener("resize",function(){
		last_day_deep_rate.resize();
	});
}

function chart_last_day_bounce_rate(){
	var last_day_bounce_rate = echarts.init(document.getElementById("last_day_bounce_rate"));
	var bounce_rate = parseFloat(the_bounce_rate_day_data[11].toFixed(4));
	var option = {
		"title": {
			"top": '85%',
			"left": '42%',
			"textStyle": {
				"fontSize": 28,
				"fontWeight": "bold",
				"color": "#bcbfff"
			}
		},
		"tooltip": {
			"trigger": 'item',
			"formatter": "{a} : ({d}%)"
		},
		"series": [{
			"name": "跳出率",
			"center": [
				"50%",
				"50%"
			],
			"radius": [
				"49%",
				"50%"
			],
			"clockWise": false,
			"hoverAnimation": false,
			"type": "pie",
			"data": [{
				"value": bounce_rate,
				"name": "",
				"label": {
					"normal": {
						"show": true,
						"formatter": '{d} %',
						"textStyle": {
							"fontSize": 28,
							"fontWeight": "bold"
						},
						"position": "center"
					}
				},
				"labelLine": {
					"show": false
				},
				"itemStyle": {
					"normal": {
						"color": "#5886f0",
						"borderColor": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#00a2ff'
						}, {
							offset: 1,
							color: '#70ffac'
						}]),
						"borderWidth": 25
					},
					"emphasis": {
						"color": "#5886f0",
						"borderColor": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#85b6b2'
						}, {
							offset: 1,
							color: '#6d4f8d'
						}]),
						"borderWidth": 25
					}
				},
			}, {
				"name": " ",
				"value": 1 - bounce_rate,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false
						},
						"labelLine": {
							"show": false
						},
						"color": 'rgba(0,0,0,0)',
						"borderColor": 'rgba(0,0,0,0)',
						"borderWidth": 0
					},
					"emphasis": {
						"color": 'rgba(0,0,0,0)',
						"borderColor": 'rgba(0,0,0,0)',
						"borderWidth": 0
					}
				}
			}]
		}, {
			"name": "跳出率",
			"center": [
				"50%",
				"50%"
			],
			"radius": [
				"59%",
				"60%"
			],
			"clockWise": false,
			"hoverAnimation": false,
			"type": "pie",
			"data": [{
				"value": bounce_rate,
				"name": "",
				"label": {
					"normal": {
						"show": true,
						"formatter": '{d} %',
						"textStyle": {
							"fontSize": 28,
							"fontWeight": "bold"
						},
						"position": "center"
					}
				},
				"labelLine": {
					"show": false
				},
				"itemStyle": {
					"normal": {
						"color": "#5886f0",
						"borderColor": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#00a2ff'
						}, {
							offset: 1,
							color: '#70ffac'
						}]),
						"borderWidth": 1
					},
					"emphasis": {
						"color": "#5886f0",
						"borderColor": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#85b6b2'
						}, {
							offset: 1,
							color: '#6d4f8d'
						}]),
						"borderWidth": 1
					}
				},
			}, {
				"name": " ",
				"value": 1 - bounce_rate,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false
						},
						"labelLine": {
							"show": false
						},
						"color": 'rgba(0,0,0,0)',
						"borderColor": 'rgba(0,0,0,0)',
						"borderWidth": 0
					},
					"emphasis": {
						"color": 'rgba(0,0,0,0)',
						"borderColor": 'rgba(0,0,0,0)',
						"borderWidth": 0
					}
				}
			}]
		}]
	};
	last_day_bounce_rate.setOption(option);
	window.addEventListener("resize",function(){
		last_day_bounce_rate.resize();
	});
}

function request_the_new_and_old_customers_day(){
	var my_url = project_name + "/get_the_new_and_old_customers_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: the_new_and_old_customers_day_callback
	});
}

function the_new_and_old_customers_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_new_customers_day_data = obj['new_customers'];
		the_old_customers_day_data = obj['old_customers'];
		chart_last_day_new_and_old_customers_rate();
	}
}

function chart_last_day_new_and_old_customers_rate(){
	var last_day_new_and_old_customers_rate = echarts.init(document.getElementById("last_day_new_and_old_customers_rate"));
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:['新顾客','老顾客']
		},
		series: [
			{
				name:'新老顾客占比',
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
					{value:the_new_customers_day_data[11], name:'新顾客'},
					{value:the_old_customers_day_data[11], name:'老顾客'},
				]
			}
		]
	};

	last_day_new_and_old_customers_rate.setOption(option);
	window.addEventListener("resize",function(){
		last_day_new_and_old_customers_rate.resize();
	});
}

function request_into_the_store_rate_hour(){
	var my_url = project_name + "/get_into_the_store_rate_hour";
	$.ajax({
		type: "GET",
		url: my_url,
		success: into_the_store_rate_hour_callback
	});
}

function into_the_store_rate_hour_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_into_the_store_rate_hour_data = obj['into_the_store_rate'];
		the_into_the_store_rate_hour_time = obj["time"];
		chart_into_the_store_rate_hour();
	}
}

function chart_into_the_store_rate_hour(){
	var into_the_store_rate_hour = echarts.init(document.getElementById("into_the_store_rate_hour"));
	var option = {
		title:{
			left: 110,
			textStyle: {
				color: '#000',
				fontSize: 26,
				fontWeight: 100
			}
		},
		tooltip : {
        	trigger: 'asix',
        	backgroundColor: 'rgba(255,255,255,1)',
        	padding: [5,10],
        	textStyle: {
        		color: '#7588E4',
        	},
        	extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    	},
		xAxis: {
			type: 'category',
			//data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			data: the_into_the_store_rate_hour_time,
			boundaryGap: false,
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#7588E4'
				}
			},
			axisLabel: {
				margin: 18,
				textStyle: {
					fontSize: 14
				}
			}
		},
		yAxis: {
			type: 'value',
			splitLine: {
				lineStyle: {
					color: ['#D4DFF5']
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#7588E4'
				}
			},
			axisLabel: {
				margin: 27,
				textStyle: {
					fontSize: 16
				}
			}
		},
		series: [
			{
				name: '入店率',
				type: 'line',
				smooth: true,				
				showSymbol: false,		
				symbol: 'circle',
				symbolSize: 15,
				//data:['12','4','8','4','6','8','10','16','11','10','8','3'],
				data: the_into_the_store_rate_hour_data,
				areaStyle: {				
					normal: {
						color: new echarts.graphic.LinearGradient(0,0,0,1,[{
							offset: 0, color: 'rgba(117,136,228,0.5)'
						},{
							offset: 1, color: 'rgba(117,136,228,0.2)'
						}],false)
					}
				},  
				itemStyle: {			
					normal: {	
						color: '#ffd178'
					}
				},
				lineStyle: {
					normal: {
						width: 3,
						color: new echarts.graphic.LinearGradient(0,0,1,0,[{
							offset: 0, color: '#5B6DC1'
						},{
							offset: 1, color: '#4AA8FF'
						}],false)
					}
				}
			}
		]
	};
	into_the_store_rate_hour.setOption(option);
	window.addEventListener("resize",function(){
		into_the_store_rate_hour.resize();
	});
}

function request_into_the_store_rate_day(){
	var my_url = project_name + "/get_into_the_store_rate_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: into_the_store_rate_day_callback
	});
}

function into_the_store_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_into_the_store_rate_day_data = obj['into_the_store_rate'];
		chart_last_day_into_the_store_rate();
	}
}

function chart_last_day_into_the_store_rate(){
	var last_day_into_the_store_rate = echarts.init(document.getElementById("last_day_into_the_store_rate"));
	var into_the_store_rate = parseFloat(the_into_the_store_rate_day_data[11].toFixed(4))
	var option = {
		series: [{
			type: 'liquidFill',
			radius: '80%',
			data: [into_the_store_rate, into_the_store_rate - 0.05, into_the_store_rate - 0.1, into_the_store_rate - 0.15],
			label: {
				normal: {
					textStyle: {
						color: 'red',
						insideColor: 'yellow',
						fontSize: 50
					}
				}
			}
		}]
	};
	last_day_into_the_store_rate.setOption(option);
	window.addEventListener("resize",function(){
		last_day_into_the_store_rate.resize();
	});
}

function request_probe_position(){
	var my_url = project_name + "/get_probe_position";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_point_callback,
        error: function(data){
            alert("连接服务器出错！");
        }
    });
}

function get_point_callback(data)
{
    var obj = JSON.parse(data);
    lat = obj["lat"];
    lon = obj["lon"];
    show_map();
}

function show_map()
{
	//lon = 116.404;
	//lat = 39.915;
    var map = new BMap.Map("probe_position");          // 创建地图实例  
    var opts={
        width:250,//信息窗口宽度
	    height:100,//信息窗口高度
	    title:"当前位置"//信息窗口标题
    };
    var point = new BMap.Point(lon, lat); // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl()); 
    map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
    map.enableKeyboard();//启动键盘操作地图
    var maker = new BMap.Marker(point);//创建标注
    maker.addEventListener("click", function(e){
	    var myGeo = new BMap.Geocoder();
        //根据坐标的到地址描述
        myGeo.getLocation(point, function(result){
	        var infoWindow = new BMap.InfoWindow(result.address, opts);//创建信息窗口对象
	        map.openInfoWindow(infoWindow, point);//打开信息窗口
        });
    });
    map.addOverlay(maker);//将标注添加到地图中
    //创建地理编码实例
    var myGeo = new BMap.Geocoder();
    //根据坐标的到地址描述
    myGeo.getLocation(point, function(result){
        //alert(result.address);
	    var infoWindow = new BMap.InfoWindow(result.address, opts);//创建信息窗口对象
	    map.openInfoWindow(infoWindow, map.getCenter());//打开信息窗口
    });
}