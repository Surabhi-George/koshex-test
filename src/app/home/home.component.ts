import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild("main") divView: ElementRef;

    options: any;
    isModalShow : boolean = false;
    isLifePlanModalShow : boolean = false;
    model: NgbDateStruct;
    droppedData: string;
    public xData : any = [];
    public yData : any = [];
    symbolPath : any = [];
    echartsInstance: any;

    constructor() { }

    ngOnInit(): void {

        this.yData = [150, 400, 750, 450, 170, 400, 750, 1500, 550, 290,400,90];
        this.xData = [28,32,36,40,44,48,52,56,60,70,80,90];


        this.symbolPath = ['','assets/img/c_house.png','','','assets/img/c_kids.png','','','assets/img/c_beach.png','assets/img/c_kids.png','','assets/img/c_hospital.png',''];
         var symbolPath1 = this.symbolPath;
        this.options = {
            tooltip: {
                trigger: 'item',
                padding: 15,
                backgroundColor: '#3c3b5d',
                borderColor: '#3c3b5d' ,
                className: 'k-chart-tooltip',
                textStyle: {
                    color: '#fff' ,
                    fontSize: 10,
                    fontWeight: 500 ,
                    fontFamily: 'Poppins' ,
                },
                formatter: function (params) {
                    return `<div>
                        <div class="d-flex">
                            <div style="min-width: 70px;">Age <p style="font-weight: 600;font-size: 12px">${params.name}</p> </div>
                            <div style="min-width: 70px;">Year<p style="font-weight: 600;font-size: 12px">2020</p> </div>
                        </div>
                        <div class="d-flex" style="border-top: solid 1px rgba(32, 30, 69, 0.6);padding-top:10px;margin-top: 10px;">
                            <div style="min-width: 70px;">Net Worth <p style="font-weight: 600;font-size: 12px">₹ 25 lac</p></div>
                            <div style="min-width: 70px;">Savings <p style="font-weight: 600;font-size: 12px">₹ 20 lac</p> </div>
                        </div>
                    </div>`;
                }
            },
            title: {
                left: 'center',
                text: '',
            },
            responsive: true,
            grid: {
                left: 50,
                right: 20
            },
            toolbox: {
                show: false
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData
                }
            ],
            yAxis:{
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 10
            }],
            series: [
                {
                    name: '',
                    type: 'line',
                    sampling: 'lttb',
                    // symbol: 'circle' ,
                    symbol: function(yData,params){
                        if(symbolPath1[params.dataIndex] == '' || symbolPath1[params.dataIndex] == "undefined"){
                            
                        }else{
                            var d = 'image://' + symbolPath1[params.dataIndex];                   
                            return d;
                        }                        
                    },
                    symbolSize: function(yData,params){
                        if(symbolPath1[params.dataIndex] == '' || symbolPath1[params.dataIndex] == "undefined"){
                            return 10;
                        }else{
                            return 33;
                        }                        
                    },
                    smooth: true,
                    // symbolSize: 25,
                    itemStyle: {
                        color: '#3366ff'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#95bbff'
                        }, {
                            offset: 1,
                            color: 'rgba(92, 133, 255, 0)'
                        }])
                    },
                    data: this.yData,
                    label: {
                        show: false,
                        position: 'top',
                        color: "black",
                        fontSize: 12
                    }
                },
            
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,
        }
        
    }

    kData = {
        retireAt: 60,
        financialEnd: 90,
        netWorth: 14.2
    }
    events =[
        {
        name: 'House',
        image: 'house.png'
        },
        {
        name: 'Education',
        image: 'education.png'
        },
        {
        name: 'Family',
        image: 'family.png'
        },
        {
        name: 'Vacation',
        image: 'vacation.png'
        },
        {
        name: 'Vehicle',
        image: 'vehicle.png'
        },
        {
        name: 'Startup',
        image: 'startup.png'
        },
        {
        name: 'Gadget',
        image: 'gadget.png'
        },
        {
        name: 'Charity',
        image: 'charity.png'
        },
        {
        name: 'Custom',
        image: 'custom.png'
        }
    ]
    
    // DRAG & DROP
    dragEnd(event) {
        this.isModalShow = true;
    }
    drop(event){
        this.isModalShow = true;
    }

    // MODAL CLICKS
    clearModal(){
        this.isModalShow = false;
    }    
    saveModal(){
        this.isModalShow = false;
        var d = this.xData.slice(-1)[0];
        this.xData.push(d + 10);
        this.yData.push(600);
        this.symbolPath.push('assets/img/c_house.png');
        var sPath = this.symbolPath;

        this.options = {
            tooltip: {
                trigger: 'item',
                padding: 15,
                backgroundColor: '#3c3b5d',
                borderColor: '#3c3b5d' ,
                className: 'k-chart-tooltip',
                textStyle: {
                    color: '#fff' ,
                    fontSize: 10,
                    fontWeight: 500 ,
                    fontFamily: 'Poppins' ,
                },
                formatter: function (params) {
                    return `<div>
                        <div class="d-flex">
                            <div style="min-width: 70px;">Age <p style="font-weight: 600;font-size: 12px">${params.name}</p> </div>
                            <div style="min-width: 70px;">Year<p style="font-weight: 600;font-size: 12px">2020</p> </div>
                        </div>
                        <div class="d-flex" style="border-top: solid 1px rgba(32, 30, 69, 0.6);padding-top:10px;margin-top: 10px;">
                            <div style="min-width: 70px;">Net Worth <p style="font-weight: 600;font-size: 12px">₹ 25 lac</p></div>
                            <div style="min-width: 70px;">Savings <p style="font-weight: 600;font-size: 12px">₹ 20 lac</p> </div>
                        </div>
                    </div>`;
                }
            },
            title: {
                left: 'center',
                text: '',
            },
            responsive: true,
            grid: {
                left: 50,
                right: 20
            },
            toolbox: {
                show: false
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData
                }
            ],
            yAxis:{
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 10
            }],
            series: [
                {
                    name: '',
                    type: 'line',
                    sampling: 'lttb',
                    // symbol: 'circle' ,
                    symbol: function(yData,params){
                        if(sPath[params.dataIndex] == '' || sPath[params.dataIndex] == "undefined"){
                            
                        }else{
                            var d = 'image://' + sPath[params.dataIndex];                   
                            return d;
                        }                        
                    },
                    symbolSize: function(yData,params){
                        if(sPath[params.dataIndex] == '' || sPath[params.dataIndex] == "undefined"){
                            return 10;
                        }else{
                            return 33;
                        }                        
                    },
                    smooth: true,
                    // symbolSize: 25,
                    itemStyle: {
                        color: '#3366ff'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#95bbff'
                        }, {
                            offset: 1,
                            color: 'rgba(92, 133, 255, 0)'
                        }])
                    },
                    data: this.yData,
                    label: {
                        show: false,
                        position: 'top',
                        color: "black",
                        fontSize: 12
                    }
                },
            
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,
        }
        alert('Goal added successfully!')
    }

    onChartInit(ec) {
        this.echartsInstance = ec;
    }

    onChartClick(ec) {
        console.log(ec);
        this.isLifePlanModalShow = true;
    }

    closeLifePlan(){
        this.isLifePlanModalShow = false;
    }
      
    
    // PLUS MINUS INPUT
    public amount: number = 1;
    plusInput(qdata){
        this.amount = qdata + 1;
    }
    minusInput(qdata){
        this.amount = qdata - 1;
        if(this.amount == 0){
            this.amount = 1;
        }
    };
    view_pills = 1;
    changeTab = function(tab) {
        this.view_pills = tab;
    }
 
}



