<template>
    <div class="cardchart">
        <div class="m_headchart">
            <div class="f_cardnum">{{CardNum}}</div>
            <div class="f_txt">卡片总数</div>
        </div>

        <div class="m_chart_1">
            <div class="m_chart_1_text">2018-2019 上学期</div>
            <div id="myChart_1"></div>
        </div>

        <div class="m_garybox">
            <div class="m_chart_2">
                <div class="m_chart_2_text">我的卡片数量走势
                    <div class="m_chart_sel" v-on:click="changeCardLx(2)">
                        {{chart2lx.kpmc}}
                    </div>
                </div>
                <div id="myChart_2"></div>
            </div>
        </div>

        <div class="m_garybox">
            <div class="m_chart_3">
                <div class="m_chart_3_text">我的金榜题名
                    <div class="m_chart_sel" v-on:click="changeCardLx(3)">
                        {{chart3lx.kpmc}}
                    </div>
                </div>
                <div id="myChart_3"></div>
            </div>
        </div>

        <transition name="upinto">
        <van-picker v-if="isChangeCardLx" show-toolbar title="选择卡片类型" :columns="kplx" @cancel="onCancel"
  @confirm="onConfirm" class="f_grade_picker"/>
        </transition>
        <div class="mask" v-if="isMask"></div>

  </div>
</template>

<script>
    
    import { api } from "../../../../utils/Api/index";
    import * as utils from "../../../../utils/global";
    import _ from "lodash";
import { parse } from 'querystring';
    export default {
        name: "cardsList",
        data(){
        return {
            option_radar:{
                tooltip: {},
                legend: {
                    //data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
                radar: {
                    
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#666',
                            fontSize:12,
                        },
                        
                        width:50
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#FFF']
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#EEE'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#EEE'
                        }
                    },
                    indicator: [],
                    radius: 80,
                },
                series: [{
                    // name: '2018-2019 上学期',
                    type: 'radar',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color : "rgba(71,135,241,.8)", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#4787f1"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data : [
                        {
                            //value : [2, 4, 7, 8, 9, 4],
                            //value:[],
                        }
                    ]
                }]
            },
            option_category:{
                legend: {
                    data:['全校平均','年级平均','班级平均','我的'],
                    icon: "circle",
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 25, // 设置间距
                    top:15,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    //data: ['9月', '10月', '11月', '12月', '1月', '2月'],
                    data:[],
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            color: '#eff1f3'
                        }
                    },
                },
                series: [{
                    name:'全校平均',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color : "rgba(254,167,29,.8)", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#fea71d"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    //data: [1, 2, 8, 2, 6, 5],
                    data:[],
                    type: 'line',
                    areaStyle: {}
                },{
                    name:'年级平均',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color : "rgba(160,129,242,.8)", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#a081f2"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    //data: [5, 6, 2, 5, 2, 1],
                    data:[],
                    type: 'line',
                    areaStyle: {}
                },{
                    name:'班级平均',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color : "rgba(79,219,121,.8)", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#a081f2"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    //data: [5, 6, 2, 5, 2, 7],
                    data:[],
                    type: 'line',
                    areaStyle: {}
                },{
                    name:'我的',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color : "rgba(69,189,251,.8)", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#a081f2"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    //data: [5, 6, 5, 5, 6, 1],
                    data:[],
                    type: 'line',
                    areaStyle: {}
                }]
            },
            option_scatter:{//排名数据
                legend: {
                    data:[],
                    icon: "circle",
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 40, // 设置间距
                    top:15,
                },
                xAxis: {
                    type: 'category',
                    //data: ['9月', '10月', '11月', '12月', '1月', '2月'],
                    data:[],
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    name:"名次",
                    type: 'category',
                    //data: [10,9,8,7,6,5,4,3,2,1],
                    data:[],
                },
                series: [{
                    name:'全校前十',
                    symbol: 'circle',
                    symbolSize: 35,
                    itemStyle: {
                        normal: {
                            color : "rgba(160,129,242,.2)", // 图表中各个图区域的边框线拐点颜色
                            borderColor:"#a081f2",
                            borderWidth:1,
                            lineStyle: {
                                color:"#a081f2"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [],
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        color:"#FFF",

                    },
                    type: 'scatter',
                    areaStyle: {}
                }
                ,{
                    name:'年级前十',
                    symbol: 'circle',
                    symbolSize: 35,
                    itemStyle: {
                        normal: {
                            color : "rgba(254,167,29,.2)", // 图表中各个图区域的边框线拐点颜色
                            borderColor:"#fea71d",
                            borderWidth:1,
                            lineStyle: {
                                color:"#fea71d"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [],
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        color:"#FFF",

                    },
                    type: 'scatter',
                    areaStyle: {}
                }
                ,{
                    name:'班级前十',
                    symbol: 'circle',
                    symbolSize: 35,
                    itemStyle: {
                        normal: {
                            color : "rgba(79,219,121,.2)", // 图表中各个图区域的边框线拐点颜色
                            borderColor:"#4fdb79",
                            borderWidth:1,
                            lineStyle: {
                                color:"#4fdb79"
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                    ],
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        color:"#FFF",

                    },
                    type: 'scatter',
                    areaStyle: {}
                }
                ]
            },

            //普通的变量
            isMask:false,
            isChangeCardLx:false,
            CardNum:0,                          //卡片的总数
            RadarIndicator:[],
            RadarValue:[],      
            kplx:[],
            chart2lx:{},
            chart3lx:{},
            typenum:0, //打开的是哪个图表 2折线图 3排名图
            isSchool:true,// 卡片数量走势是否显示全校排名    
            showrank:true,        
        }
        },
        mounted() {
            this.init();
            //console.log(utils.convert('100'))
        },
        components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册
        
        },
        methods: {
            
            async init(){
                //获取卡片类型列表
                var parmaobj = {
                    xxdm:localStorage.getItem('xxdm'),
                    dqxn:localStorage.getItem('xn'),
                    dqxq:localStorage.getItem('xq'),
                    xh:localStorage.getItem('xh')
                };
                var {data} = await this.$fetch(api.geKplxList(),parmaobj);
                //类型返回格式处理成 text value格式
                this.kplx = this.formatCardType(data);
                this.$set(this.chart2lx,'id',this.kplx[0].value)
                this.$set(this.chart2lx,'kpmc',this.kplx[0].text)
                this.$set(this.chart3lx,'id',this.kplx[0].value)
                this.$set(this.chart3lx,'kpmc',this.kplx[0].text)
                //console.log(this.kplx[0],777)


                this.getRaderData();
                this.getLineData();
                this.getRankData();
                

               


            },
            /**
             * 说明:获取雷达图数据
             * 作者:RayJ
             * 更新时间:2019-03-07
             */
            async getRaderData(lx){
                // if(!lx){
                //     lx = 
                // }
                //获取雷达图
                var parmaobj = {
                    xxdm:localStorage.getItem('xxdm'),
                    xndm:localStorage.getItem('xn'),
                    xqdm:localStorage.getItem('xq'),
                    xh:localStorage.getItem('xh'),
                };
                var {data} = await this.$fetch(api.getRadarInfo(),parmaobj); 
                this.CardNum = data.cardTotals;
                this.formatRadarData(data.cardData);
            },

             /**
             * 说明:获取折线图数据
             * 作者:RayJ
             * 更新时间:2019-03-07
             */
            async getLineData(lx){
                if(!lx){
                    lx = ""
                }
                var parmaobj = {
                    xxdm:localStorage.getItem('xxdm'),
                    xndm:localStorage.getItem('xn'),
                    xqdm:localStorage.getItem('xq'),
                    // xndm:"2017-2018",
                    // xqdm:"02",
                    xh:localStorage.getItem('xh'),
                    // xh:"02",
                    kplx:lx,
                };
                //var {data} = await this.$fetch(api.getRankInfo(),parmaobj);
                var {data} = await this.$fetch(api.getLineChartInfo(),parmaobj);
                // console.log(data)
                this.formatLineData(data);
            },

             /**
             * 说明:获取排行图数据
             * 作者:RayJ
             * 更新时间:2019-03-07
             */
            async getRankData(lx){
                if(!lx){
                    lx = "All"
                }
                var parmaobj = {
                    xxdm:localStorage.getItem('xxdm'),
                    // xndm:this.$route.query.xn,
                    // xqdm:this.$route.query.xq,
                    xndm:localStorage.getItem('xn'),
                    xqdm:localStorage.getItem('xq'),
                    // xh:"30170115145913001",
                    xh:localStorage.getItem('xh'),
                    kplx:lx,
                };
                //var {data} = await this.$fetch(api.getRankInfo(),parmaobj);
                var {data} = await this.$fetch(api.getRankInfo(),parmaobj);
                // console.log(data);
                this.formatRankData(data);
            },
            /**
             * 说明:格式化卡片类型数据
             * 作者:RayJ
             * 更新时间:2019-03-06
             */
            formatCardType(data){
                var resarr = [];
                resarr.push({text:"全部",value:""})
                for(var i=0;i<data.length;i++){
                    resarr.push({text:data[i].kpmc,value:data[i].jlid})
                }
                //console.log(resarr)
                return resarr
            },
            /**
             * 说明:格式化雷达图,赋值雷达图的基础变量,然后启动雷达图
             * 作者:RayJ
             * 更新时间:2019-03-05
             */
            formatRadarData(data){
                //格式化雷达图
                this.RadarIndicator = [];
                this.RadarValue = [];
                for(var i=0;i<data.length;i++){
                    this.RadarIndicator.push({name:data[i].nameAndValue,max:parseFloat(data[i].max)})
                    this.RadarValue.push(parseInt(data[i].value));
                }
                this.option_radar.radar.indicator = this.RadarIndicator;
                this.option_radar.series[0].data[0] = this.RadarValue;
                //this.option_radar.series[0].data = [1,1,1,1,1]
                // console.log(this.option_radar.radar.indicator,527);
                // console.log(this.option_radar.series[0].data,528);
                
                let myChart = this.$echarts.init(document.getElementById('myChart_1'));
                myChart.setOption(this.option_radar);
            },
            /**
             * 说明:格式化折线图,赋值折线图的基础变量,然后启动折线图
             * 作者:RayJ
             * 更新时间:2019-03-05
             */
            formatLineData(data){
                this.option_category.xAxis.data = [];
                this.option_category.series[0].data = [];
                this.option_category.series[1].data = [];
                this.option_category.series[2].data = [];
                if(this.option_category.series.length == 4){
                  this.option_category.series[3].data = []
                }
                //console.log(this.isSchool,777777777777)
                var showSchool = false;
                //console.log(this.isSchool,33333333)
                for(var i=0;i<data.length;i++){
                    this.option_category.xAxis.data.push(data[i].month+"月");
                    if(this.option_category.series.length == 4){
                        this.option_category.series[0].data.push(data[i].value.school?data[i].value.school.avgNum:0);
                        this.option_category.series[1].data.push(data[i].value.grade?data[i].value.grade.avgNum:0);
                        this.option_category.series[2].data.push(data[i].value.class?data[i].value.class.avgNum:0);
                        this.option_category.series[3].data.push(data[i].value.mine?data[i].value.mine.avgNum:0);
                    }else{
                        //this.option_category.series[0].data.push(data[i].value.school?data[i].value.school.avgNum:0);
                        this.option_category.series[0].data.push(data[i].value.grade?data[i].value.grade.avgNum:0);
                        this.option_category.series[1].data.push(data[i].value.class?data[i].value.class.avgNum:0);
                        this.option_category.series[2].data.push(data[i].value.mine?data[i].value.mine.avgNum:0);
                    }
                }
                var temp = _.filter(data, function(o) { return o.value.school!= null ; });
                //console.log(temp,77777)
                if(temp.length == 0 && this.isSchool){
                    showSchool = true;
                }
                if(showSchool){
                    this.option_category.legend.data=this.option_category.legend.data.splice(1);
                    this.option_category.series=this.option_category.series.splice(1);
                }
                //console.log(this.option_category);
                let myChart2 = this.$echarts.init(document.getElementById('myChart_2'));
               // console.log(this.option_category);
                myChart2.setOption(this.option_category);
            },
            /**
             * 说明:格式化排行图,赋值排行图的基础变量,然后启动排行图
             * 作者:RayJ
             * 更新时间:2019-03-07
             */
            formatRankData(data){
                var RankWord = data.rankRuleName
                this.option_scatter.yAxis.data = [];
                this.option_scatter.xAxis.data = [];
                console.log(this.option_scatter,898989898);
                this.option_scatter.series[0].data = [];
                this.option_scatter.series[1].data = [];
                if(this.option_scatter.series.length == 3){
                    this.option_scatter.series[2].data = [];
                }
                if(data.rankRule == 1){
                    if(data.schoolFlag){//不需要全校
                        this.option_scatter.legend.data = ["全校第"+RankWord,"年级第"+RankWord,"班级第"+RankWord];
                        this.option_scatter.series[0].name = "全校第"+RankWord;
                        this.option_scatter.series[1].name = "年级第"+RankWord;
                        this.option_scatter.series[2].name = "班级第"+RankWord;
                    }else{
                        
                        this.option_scatter.legend.data = ["年级第"+RankWord,"班级第"+RankWord];
                        if(this.option_scatter.series.length == 3){
                            this.option_scatter.series[1].name = "年级第"+RankWord;
                            this.option_scatter.series[2].name = "班级第"+RankWord;
                        }else{
                           this.option_scatter.series[0].name = "年级第"+RankWord;
                            this.option_scatter.series[1].name = "班级第"+RankWord; 
                        }
                    }
                } else{
                    if(data.schoolFlag){//不需要全校
                        this.option_scatter.legend.data = ["全校前"+RankWord,"年级前"+RankWord,"班级前"+RankWord];
                        this.option_scatter.series[0].name = "全校前"+RankWord;
                        this.option_scatter.series[1].name = "年级前"+RankWord;
                        this.option_scatter.series[2].name = "班级前"+RankWord;
                    }else{
                        if(this.option_scatter.series.length == 3){
                            this.option_scatter.series[1].name = "年级前"+RankWord;
                            this.option_scatter.series[2].name = "班级前"+RankWord;
                        }else{
                            this.option_scatter.series[0].name = "年级前"+RankWord;
                            this.option_scatter.series[1].name = "班级前"+RankWord;
                        }
                        this.option_scatter.legend.data = ["年级前"+RankWord,"班级前"+RankWord];
                        
                    }
                }
                for(var j=0;j<data.rankRule;j++){
                    this.option_scatter.yAxis.data.push(data.rankRule-j);
                }
                for(var i=0;i<data.topTen.length;i++){
                    this.option_scatter.xAxis.data.push(data.topTen[i].month+"月");
                    //console.log(data.topTen[i].value.type,888)
                    if(data.topTen[i].value.type=="school"){
                        this.option_scatter.series[0].data.push({name:'第' + utils.convert(data.topTen[i].value.rank),value:[i,this.transformRank(data.topTen[i].value.rank,data.rankRule)],label:{show:true,color:'#a081f2',position:"inside"}})
                    }else if(data.topTen[i].value.type=="grade"){
                        //if(){
                            this.option_scatter.series[this.option_scatter.series.length == 3 ? 1 : 0].data.push({name:'第' + utils.convert(data.topTen[i].value.rank),value:[i,this.transformRank(data.topTen[i].value.rank,data.rankRule)],label:{show:true,color:'#fea71d',position:"inside"}})
                       // }
                    }else if(data.topTen[i].value.type=="class"){
                        this.option_scatter.series[this.option_scatter.series.length == 3 ? 2 : 1].data.push({name:'第' + utils.convert(data.topTen[i].value.rank),value:[i,this.transformRank(data.topTen[i].value.rank,data.rankRule)],label:{show:true,color:'#4fdb79',position:"inside"}})
                    }
                }
                if(this.showrank && !data.schoolFlag){
                    this.option_scatter.series = this.option_scatter.series.splice(1);
                }
                    // console.log(this.option_scatter,11111111111)
                let myChart3 = this.$echarts.init(document.getElementById('myChart_3'));
                    //console.log(JSON.stringify(this.option_scatter),5555);
                myChart3.setOption(this.option_scatter);
            },

            /**
             * 说明:排行图中名次和具体数字的转换
             * 作者:RayJ
             * 更新时间:2019-03-07
             */
            transformRank(rank,rankRule){
                return  (rankRule-rank)
            },

            changeCardLx(num){
                this.typenum = num;
                this.isMask = true;
                this.isChangeCardLx = true;
            },
            onCancel(){
                this.isMask = false;
                this.isChangeCardLx = false;
            },
            onConfirm(value,event){
                if(this.typenum==2){
                    this.$set(this.chart2lx,'id',value.value)
                    this.$set(this.chart2lx,'kpmc',value.text)
                    this.getLineData(value.value);
                    this.isSchool = false;
                }else if(this.typenum==3){
                    this.$set(this.chart3lx,'id',value.value)
                    this.$set(this.chart3lx,'kpmc',value.text)
                    this.getRankData(value.value);
                    this.showrank = false;
                }
                this.isMask = false;
                this.isChangeCardLx = false;
            },
        },
    }
</script>

<style scoped lang="scss">
@import '../../../../style/style.scss';
    body{
        background-color: #fff !important;
    }
    .flod-enter-active{
        animation-name:fadeInRight;animation-duration:.5s;
    }
    .upinto-enter-active{
        animation-name:fadeInUp;animation-duration:.5s;
    }
    .cardchart{
        width: 100%;
        float: left;
        min-height: 100%;
    }
    .m_headchart{
        width: 100%;
        height: px2rem(302px);
        background: url(../../../../assets/bg_charthead.png) no-repeat;
        background-size: 100% 100%;
        color: #FFF;
        .f_cardnum{
            width: 100%;
            padding-top: px2rem(80px);
            text-align: center;
            font-size: px2rem(100px)
        }
        .f_txt{
            width: 100%;
            text-align: center;
            padding-top: px2rem(25px);
            font-size: px2rem(32px)
        }
    }
    .m_garybox{
        background: #eff1f3;
        width: 100%;
        float: left;
    }
    .m_chart_1{
        padding:px2rem(90px) px2rem(5px) px2rem(40px);
        .m_chart_1_text{
            font-size: px2rem(32px);
            width: 100%;
            text-align: center;
            font-weight: 700;
            margin-top:px2rem(-40px);
            float: left;
        }
        #myChart_1{
            width: 100%;
            height: px2rem(500px);
            text-align: center;
            // margin:0 10%;
        }
    }

    .m_chart_2,.m_chart_3{
        margin-top: px2rem(20px);
        background: #FFF;
        float: left;
        width: 100%;
        .m_chart_2_text,.m_chart_3_text{
            height: px2rem(100px);
            line-height: px2rem(100px);
            font-size: px2rem(32px);
            font-weight: 700;
            border-bottom: 1px solid #e0e0e0;
            padding:0 px2rem(35px);
            position: relative;
        }
        #myChart_2,#myChart_3{
            width: 100%;
            height: px2rem(600px);
            text-align: center;
        }
    }
    .m_chart_sel{
        position: absolute;
        right: px2rem(30px);
        font-size: px2rem(28px);
        padding-right: px2rem(40px);
        top: 0;
        height: px2rem(100px);
        background: url(../../../../assets/arrow_down.png) no-repeat right center;
        background-size: auto 20%;
    }

    .f_grade_picker{
        z-index: 550;
        position: fixed;
        width: 100%;
        bottom: 0;
    }

</style>


<style lang="scss">
  @import '../../../../style/style.scss';
  .rankwarp{
    .van-tab__pane{
      margin-top:px2rem(120px);
    }
  }
  
</style>
