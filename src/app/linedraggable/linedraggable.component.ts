import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as echarts from 'echarts';
import * as util from 'zrender/lib/core/util';

var cData = [
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

@Component({    
  selector: 'app-linedraggable',
  templateUrl: './linedraggable.component.html',
  styleUrls: ['./linedraggable.component.scss']
})
export class LinedraggableComponent implements OnDestroy {
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
    symbolPath : any = [];
    echartsInstance: any;
    loading : boolean = true;
    updatePosition: () => void;

    constructor(private elRef:ElementRef) { }

    ngOnInit(): void {
        
        setTimeout(() => {        
            this.loading = false; 
        }, 3000);

        
        var symbolPath1 = cData;
        this.options = {
            tooltip: {
                triggerOn: 'none',
                // trigger: 'item',
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
                    type: 'value',
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
            // xAxis: [
            //     {
            //         type: 'value',
            //         boundaryGap: false,
            //         // axisLine: { onZero: false },
            //     }
            // ],
            // yAxis:{
            //     // type: 'value',
            //     // axisLine: { onZero: false },
            //     splitLine: {
            //         lineStyle: {
            //             type: 'dashed'
            //         }
            //     }
            // },
            // dataZoom: [{
            //     type: 'inside',
            //     start: 0,
            //     end: 100
            // }, {
            //     start: 0,
            //     end: 10
            // }],
 
            // tooltip: {
            //     trigger: 'item',                
            //     padding: 15,
            //     backgroundColor: '#3c3b5d',
            //     borderColor: '#3c3b5d',
            //     className: 'k-chart-tooltip',
            //     textStyle: {
            //         color: '#fff' ,
            //         fontSize: 10,
            //         fontWeight: 500 ,
            //         fontFamily: 'Poppins',
            //     },
            //     grid: {
            //         top: '8%',
            //         bottom: '12%',
            //     },
            //     formatter: function (params) {
            //         return `<div>
            //             <div class="d-flex">
            //                 <div style="min-width: 70px;">Age <p style="font-weight: 600;font-size: 12px">${params.name}</p> </div>
            //                 <div style="min-width: 70px;">Year<p style="font-weight: 600;font-size: 12px">2020</p> </div>
            //             </div>
            //             <div class="d-flex" style="border-top: solid 1px rgba(32, 30, 69, 0.6);padding-top:10px;margin-top: 10px;">
            //                 <div style="min-width: 70px;">Net Worth <p style="font-weight: 600;font-size: 12px">₹ 25 lac</p></div>
            //                 <div style="min-width: 70px;">Savings <p style="font-weight: 600;font-size: 12px">₹ 20 lac</p> </div>
            //             </div>
            //         </div>`;
            //     }
            // },
            // title: {
            //     left: 'center',
            //     text: '',
            // },
            // responsive: true,
            // grid: {
            //     left: 50,
            //     right: 20
            // },
            // toolbox: {
            //     show: false
            // },
            series: [
                {
                    name: '',
                    id: 'drag',
                    type: 'line',
                    smooth: true,
                    data: cData,

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
        };
     
    }
    
    ngDoCheck(){
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
        cData.push([this.year,this.amount, img]);
        cData.sort();
        var sPath = cData;

        this.resizeChart();
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
                    type: 'value',
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
                    data: cData,
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

    ngOnDestroy() {
        if (this.updatePosition) {
          window.removeEventListener('resize', this.updatePosition);
        }
    }

    onChartReady(myChart: any) {

        this.echartsInstance = myChart;
        const onPointDragging = function(item,dataIndex) {
            cData[dataIndex] = myChart.convertFromPixel({ gridIndex: 0 }, this.position) as number[];

            if(!cData[dataIndex][2]){
                cData[dataIndex][2] = item[2];
            }
            // Update data
            myChart.setOption({
                series: [
                    {
                        id: 'drag',
                        data: cData,
                    },
                ],
            });
        };

        const updatePosition = () => {
            myChart.setOption({
                graphic: util.map(cData, (item) => ({
                    position: myChart.convertToPixel({ gridIndex: 0 }, item),
                })),
            });
        };
    
        window.addEventListener('resize', updatePosition);
        myChart.on('dataZoom', updatePosition);
    
        // save handler and remove it on destroy
        this.updatePosition = updatePosition;
        const SymbolSize = 20;

        setTimeout(() => {
            myChart.setOption({
                graphic: util.map(cData, (item, dataIndex) => {
                    return {
                        type: 'circle',
                        position: myChart.convertToPixel({ gridIndex: 0 }, item),
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: SymbolSize / 2,
                        },
                        invisible: true,
                        draggable: true,
                        ondrag: util.curry<(item: any, dataIndex: any) => void, any, any>(onPointDragging, item, dataIndex),
                        z: 100,
                    };
                }),
            });
        }, 1);
    }

    

      
    resizeChart() {
        if (this.echartsInstance) {
          this.echartsInstance.resize();
        }
    }

    // active event click
    onChartClick(ec) {
        this.isLifePlanModalShow = true;
        // console.log(ec);
        // if(!ec.value[2]){
        //     this.isLifePlanModalShow = true;
        // }        
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



