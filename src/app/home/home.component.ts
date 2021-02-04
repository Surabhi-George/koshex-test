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
    droppedData: string;    
    error: any;
    public goalTitle :  any;        
    public amount: any = 0;
    public year: any = 0;
    public xData : any = [];
    public yData : any = [];
    public cData : any = [];
    symbolPath : any = [];
    echartsInstance: any;

    constructor() { }

    ngOnInit(): void {

        this.cData = [
            [10,50,''],
            [28,150,'assets/img/c_house.png'],
            [32,400,''],
            [36,750,''],
            [40,450,''],
            [44,170,'assets/img/c_kids.png'],
            [48,400,''],
            [52,750,''],
            [56,1500,''],
            [60,550,'assets/img/c_beach.png'],
            [70,290,''],
            [80,400,'assets/img/c_hospital.png'],
            [90,90,'']
        ]
        var symbolPath1 = this.cData;

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
                    // data: this.xData
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
                    symbol: function(cData,params){
                        if(symbolPath1[params.dataIndex][2] == '' || symbolPath1[params.dataIndex][2] == "undefined"){
                            
                        }else{                            
                            var d = 'image://' + symbolPath1[params.dataIndex][2];                   
                            return d;
                        }                        
                    },
                    symbolSize: function(cData,params){
                        if(symbolPath1[params.dataIndex][2] == '' || symbolPath1[params.dataIndex][2] == "undefined"){
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
                    data: this.cData,
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
        if(!this.goalTitle){
            this.error = 'Please enter your goal title';
            return;
        }
        if(!this.amount || this.amount == 0){
            this.error = 'Please add amount';
            return;
        }
        if(!this.year || this.year == 0){
            this.error = 'Please add goal year';
            return;
        }
        
        this.isModalShow = false;       

        const img = 'assets/img/c_beach.png';
        this.cData.push([this.year,this.amount, img]);
        this.cData.sort();
        var sPath = this.cData;

        // this.resizeChart();
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
                    // data: this.xData
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
                    symbol: function(cData,params){
                        if(sPath[params.dataIndex][2] == '' || sPath[params.dataIndex][2] == "undefined"){
                            
                        }else{                            
                            var d = 'image://' + sPath[params.dataIndex][2];                   
                            return d;
                        }                        
                    },
                    symbolSize: function(cData,params){
                        if(sPath[params.dataIndex][2] == '' || sPath[params.dataIndex][2] == "undefined"){
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
                    data: this.cData,
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
        
        alert('Goal added successfully!');
        this.error = '';
        this.amount = 0;
        this.goalTitle = '';
        this.year = 0;
    }

    onChartInit(ec) {
        this.echartsInstance = ec;
    }

      
    resizeChart() {
        if (this.echartsInstance) {
          this.echartsInstance.resize();
        }
    }

    // active event click
    onChartClick(ec) {
        if(ec.value[2] != ""){
            this.isLifePlanModalShow = true;
        }        
    }
    closeLifePlan(){
        this.isLifePlanModalShow = false;
    }
      
    
    // PLUS MINUS INPUT
    plusInput(qdata){
        this.amount = qdata + 1;
    }
    minusInput(qdata){
        this.amount = qdata - 1;
        if(this.amount == 0){
            this.amount = 0;
        }
    };
    plusYearInput(qdata){
        this.year = qdata + 1;
    }
    minusYearInput(qdata){
        this.year = qdata - 1;
        if(this.year == 0){
            this.year = 0;
        }
    };

    // popup goal priority
    view_pills = 1;
    changeTab = function(tab) {
        this.view_pills = tab;
    }
 
}



