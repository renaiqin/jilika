<template>
  <p class="p2" :endTime="endTime" :callback="callback" :index="index" :showtext="showtext" :listData="listData" :endText="endText">{{showtext}}
    <i>{{hours}}</i>:<i>{{minutes}}</i>:<i>{{seconds}}</i>
    <!--.<i>{{milliseconds}}</i>-->
  </p>
</template>
<script>
  export default {
    data() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        // milliseconds: 0,
        pageTimer: [],
        holiday:['2019-05-01','2019-10-01','2019-10-02','2019-10-03','2019-10-04','2019-10-05','2019-10-06','2019-10-07','2020-01-01','2020-05-01','2020-10-01','2020-10-02','2020-10-03','2020-10-04','2020-10-05','2020-10-06','2020-10-07','2021-01-01','2021-05-01','2021-10-01','2021-10-02','2021-10-03','2021-10-04','2021-10-05','2021-10-06','2021-10-07'],//节假日只到2021年，只排出五月一号 一月一号 国庆七天
      }
    },
    props: {
      /* 倒计时时间戳 */
      endTime: {
        type: String,
        default: '0'
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: ''
      },
      /* 当前数据数组 */
      listData:{
        type:  Array,
        default: []
      },
      /* 当前数据索引 */
      index:{
        type: Number,
        default: 0
      },
      showtext:{
        type: String,
        default: ''
      }
    },
    mounted() {
      this.countdowm(this.endTime,this.item);
    },
    watch: {
       endTime(curVal, oldVal) {
        if (this.pageTimer) {   //清除所有的定时器，防止传过来的值变化出现闪烁的问题
          for (let each in this.pageTimer) {
            clearInterval(this.pageTimer[each]);
          }
        }
        this.countdowm(curVal, oldVal);
      }
    },
    methods: {
      countdowm(timestamp) {
        let self = this;
        this.pageTimer[self.index] = setInterval(function () {
          timestamp = timestamp-1000;
          let nowTime = new Date();
          let endTime = new Date(parseInt(timestamp)).getTime();
          // let t = endTime.getTime() - nowTime.getTime();
          //let date = new Date(t);
          
          if (endTime > 0) {
            let hour = Math.floor(endTime /3600000);
            let min = Math.floor((endTime / 60000) % 60);
            let sec = Math.floor((endTime / 1000) % 60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            self.hours = hour;
            self.minutes = min;
            self.seconds = sec;
            /* 排处周六周日 节假日 八点前 16点之后 但不包括补班  满足任意一种情况就停止倒计时 */
            if(nowTime.getDay() == 6 || nowTime.getDay() == 0 || nowTime.getHours() >= 16 || nowTime.getHours() <= 8 || self.holiday.filter(item => item == self.timeFormat()).length != 0){
              clearInterval(self.pageTimer[self.index]);
            }
          } else {
            // console.log(`倒计时结束啦+++++`)
            // clearInterval(self.pageTimer[self.index]);
            self._callback();
            self.hours = 0;
            self.minutes = 0;
            self.seconds = 0;
            self.$emit('changeListData',self.index);
          }
        }, 1000);
      },
      _callback() {
        if (this.callback && this.callback instanceof Function) {
          this.callback();
        }
      },
      timeFormat(isHour){
        let now = new Date(),
          year = now.getFullYear(),
          month = now.getMonth() +1,
          day = now.getDate(),
          hour = now.getHours(),
          minute = now.getMinutes(),
          second = now.getSeconds();
        if(isHour){
          return year + '-' + (month > 9 ? month : '0'+ month) + '-' + (day > 9 ? day : '0'+ day) + ' ' + (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
        }
        return year + '-' + (month > 9 ? month : '0'+ month) + '-' + (day > 9 ? day : '0'+ day)
      }
    },
  }
</script>
<style scoped lang="scss">
  .p2{
    width: 200px;
    float: left;
  }
</style>