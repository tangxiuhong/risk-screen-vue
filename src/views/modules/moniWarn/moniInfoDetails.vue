<!--监测信息-企业监测信息详情-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    append-to-body
    fullscreen
    :visible.sync="visible"
  >
    <el-row>
      <div class="moniInfoDetails-content" :style="{height: styleHeight}">
        <div class="moniInfoDetails-top">
          <div class="moniInfoDetails-top-left">{{enterpriseName}}</div>
          <div class="moniInfoDetails-top-right">监测位置：{{moniPositionCount}} 个</div>
          <div class="moniInfoDetails-top-right">传感器数量：{{sensorCount}} 个</div>
        </div>
        <!--中-->
        <!--液位  liquidLevel
            温度  temperature
            流量  flow
            压力  pressure
            气体  gases-->
        <div class="moniInfoDetails-center">
          <div style="width: 23%;height: 50%;float: left;margin-left: 1%" v-for="sensor in sensorList">
            <div class="moniInfoDetails-module" v-if="ywVisible && sensor.deviceType=='liquidLevel'">
              <!--标题-->
              <div  class="moniInfoDetails-mo-title">
                <span><p>{{sensor.deviceName}}（{{sensor.realValue}}）</p></span>
              </div>
              <div class="moniInfoDetails-module-con">
                <div class="moniInfoDetails-module-con-top">
                  <div class="moniInfoDetails-module-con-top-left">
                    <div class="goal-thermometer" style="width: 100px; height: 160px; padding: 10px 0 0 20px;">
                      <div class="therm-numbers">
                        <div>800</div>
                        <div style="height: 28px">600</div>
                        <div style="height: 25px">400</div>
                        <div >200</div>
                      </div>
                      <div class="therm-graphics">
                        <img class="therm-top" src="../../../assets/img/wenduji/glassTop.png">
                        <img class="therm-body-bg" src="../../../assets/img/wenduji/glassBody.png" style="height: 120px;">
                        <img class="therm-body-mercury" src="../../../assets/img/wenduji/redVertical-green.png" :style="{top: ywTop,height: ywHeight}" ><!--1像素8-->
                        <div class="therm-body-fore" style="height: 100px; background-image: url('../../src/assets/img/wenduji/tickShine.png');background-size: 30px 25px;"></div>
                        <img class="therm-bottom" src="../../../assets/img/wenduji/glassBottom-green.png" style="top: 113px;">
                      </div>
                    </div>
                  </div>
                  <div class="moniInfoDetails-module-con-top-right">
                    <ul>
                      <li>液位传感器编号<span>{{sensor.deviceId.substring(14,18)}}</span></li>
                      <li>低位报警阈值<span>{{sensor.lowHeight2}}</span></li>
                      <li>高位报警阈值<span>{{sensor.lowHeight3}}</span></li>
                      <li>液位报警级别<span>{{sensor.alertDegree}}</span></li>
                      <li>液位报警时间<span>{{sensor.alarmTime}}</span></li>
                      <li>液位实时值<span>{{sensor.realValue}}</span></li>
                      <li>单位<span>{{sensor.unit}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="moniInfoDetails-module-con-down" id="ywLine"></div>
              </div>
            </div>

            <div class="moniInfoDetails-module" v-if="wdVisible && sensor.deviceType=='temperature'">
              <!--标题-->
              <div  class="moniInfoDetails-mo-title">
                <span><p>{{sensor.deviceName}}（{{sensor.realValue}}）</p></span>
              </div>
              <div class="moniInfoDetails-module-con">
                <div class="moniInfoDetails-module-con-top">
                  <div class="moniInfoDetails-module-con-top-left">
                    <div class="goal-thermometer" style="width: 100px; height: 160px; padding: 10px 0 0 20px;">
                      <div class="therm-numbers">
                        <div>100</div>
                        <div style="height: 28px">75</div>
                        <div style="height: 25px">50</div>
                        <div >25</div>
                      </div>
                      <div class="therm-graphics">
                        <img class="therm-top" src="../../../assets/img/wenduji/glassTop.png">
                        <img class="therm-body-bg" src="../../../assets/img/wenduji/glassBody.png" style="height: 120px;">
                        <img class="therm-body-mercury" src="../../../assets/img/wenduji/redVertical.png" :style="{top: wdTop,height: wdHeight}" >
                        <div class="therm-body-fore" style="height: 100px; background-image: url('../../src/assets/img/wenduji/tickShine.png');background-size: 30px 25px;"></div>
                        <img class="therm-bottom" src="../../../assets/img/wenduji/glassBottom.png" style="top: 113px;">
                      </div>
                    </div>
                  </div>
                  <div class="moniInfoDetails-module-con-top-right">
                    <ul>
                      <li>温度传感器编号<span>{{sensor.deviceId.substring(14,18)}}</span></li>
                      <li>第一级报警阈值<span>{{sensor.lowHeight2}}</span></li>
                      <li>第二级报警阈值<span>{{sensor.lowHeight3}}</span></li>
                      <li>温度报警级别<span>{{sensor.alertDegree}}</span></li>
                      <li>温度报警时间<span>{{sensor.alarmTime}}</span></li>
                      <li>温度实时值<span>{{sensor.realValue}}</span></li>
                      <li>单位<span>{{sensor.unit}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="moniInfoDetails-module-con-down" id="wdLine"></div>
              </div>
            </div>

            <div class="moniInfoDetails-module" v-if="llVisible && sensor.deviceType=='flow'">
              <!--标题-->
              <div  class="moniInfoDetails-mo-title">
                <span><p>{{sensor.deviceName}}（{{sensor.realValue}}）</p></span>
              </div>
              <div class="moniInfoDetails-module-con">
                <!--<div id="goal-thermometer"></div>-->
                <div class="moniInfoDetails-module-con-top">
                  <div class="moniInfoDetails-module-con-top-left" id="llGauge"></div>
                  <div class="moniInfoDetails-module-con-top-right">
                    <ul>
                      <li>流量传感器编号<span>{{sensor.deviceId.substring(14,18)}}</span></li>
                      <li>第一级报警阈值<span>{{sensor.lowHeight2}}</span></li>
                      <li>第二级报警阈值<span>{{sensor.lowHeight3}}</span></li>
                      <li>流量报警级别<span>{{sensor.alertDegree}}</span></li>
                      <li>流量报警时间<span>{{sensor.alarmTime}}</span></li>
                      <li>流量实时值<span>{{sensor.realValue}}</span></li>
                      <li>单位<span>{{sensor.unit}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="moniInfoDetails-module-con-down" id="llLine"></div>
              </div>
            </div>

            <div class="moniInfoDetails-module" v-if="ylVisible && sensor.deviceType=='pressure'">
              <!--标题-->
              <div  class="moniInfoDetails-mo-title">
                <span><p>{{sensor.deviceName}}（{{sensor.realValue}}）</p></span>
              </div>
              <div class="moniInfoDetails-module-con">
                <div class="moniInfoDetails-module-con-top">
                  <div class="moniInfoDetails-module-con-top-left" id="ylGauge"></div>
                  <div class="moniInfoDetails-module-con-top-right">
                    <ul>
                      <li>压力传感器编号<span>{{sensor.deviceId.substring(14,18)}}</span></li>
                      <li>第一级报警阈值<span>{{sensor.lowHeight2}}</span></li>
                      <li>第二级报警阈值<span>{{sensor.lowHeight3}}</span></li>
                      <li>压力报警级别<span>{{sensor.alertDegree}}</span></li>
                      <li>压力报警时间<span>{{sensor.alarmTime}}</span></li>
                      <li>压力实时值<span>{{sensor.realValue}}</span></li>
                      <li>单位<span>{{sensor.unit}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="moniInfoDetails-module-con-down" id="ylLine"></div>
              </div>
            </div>

            <div class="moniInfoDetails-module" v-if="ydqtVisible  && sensor.deviceType=='gases'">
            <!--标题-->
            <div  class="moniInfoDetails-mo-title">
              <span><p>{{sensor.deviceName}}（{{sensor.realValue}}）</p></span>
            </div>
            <div class="moniInfoDetails-module-con">
              <div class="moniInfoDetails-module-con-top">
                <div class="moniInfoDetails-module-con-top-left" id="qtGauge"></div>
                <div class="moniInfoDetails-module-con-top-right">
                  <ul>
                    <li>气体传感器编号<span>{{sensor.deviceId.substring(14,18)}}</span></li>
                    <li>第一级报警阈值<span>{{sensor.lowHeight2}}</span></li>
                    <li>第二级报警阈值<span>{{sensor.lowHeight3}}</span></li>
                    <li>气体报警级别<span>{{sensor.alertDegree}}</span></li>
                    <li>气体报警时间<span>{{sensor.alarmTime}}</span></li>
                    <li>气体实时值<span>{{sensor.realValue}}</span></li>
                    <li>单位<span>{{sensor.unit}}</span></li>
                  </ul>
                </div>
              </div>
              <div class="moniInfoDetails-module-con-down" id="qtLine"></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </el-row>
  </el-dialog>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        styleHeight: window.screen.availHeight - 60 + 'px',
        wdTop: 113 - 0 + 'px',
        wdHeight: 0 + 'px',
        ywTop: 113 - 0 / 8 + 'px',
        ywHeight: 0 / 8 + 'px',
        visible: false,
        ywVisible: false,
        wdVisible: false,
        llVisible: false,
        ylVisible: false,
        ydqtVisible: false,
        monitorPointId: '',
        enterpriseName: '',
        moniPositionCount: '',
        sensorCount: '',
        sensorList: []
      }
    },
    created () {
    },
    updated () {
      this.initChart()
    },
    methods: {
      init (monitorPointId, enterpriseName, moniPositionCount, sensorCount) {
        this.enterpriseName = enterpriseName
        this.moniPositionCount = moniPositionCount
        this.sensorCount = sensorCount
        this.visible = true
        this.llVisible = false
        this.ylVisible = false
        this.ydqtVisible = false
        this.monitorPointId = monitorPointId
        this.$http({
          url: this.$http.adornUrl('/monitor/enterpriseMonitorPoint/selectSensorListByMonitorPointId/' + this.monitorPointId),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.ywVisible = true
          this.wdVisible = true
          this.llVisible = true
          this.ylVisible = true
          this.ydqtVisible = true
          if (data && data.code === 0) {
            this.sensorList = data.sensorList
          }
        })
      },
      initChart () {
        // 仪表盘
        var gaugeOption = {
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            padding: '0',
            containLabel: true
          },
          series: [
            {
              name: '指标',
              type: 'gauge',
              center: ['50%', '50%'],
              radius: '90%',
              min: 0,                     // 最小值
              max: 100,                   // 最大值
              precision: 0,               // 小数精度，默认为0，无小数点
              splitNumber: 10,             // 分割段数，默认为5
              pointer: {
                width: 5,
                length: '70%',
                shadowColor: '#fff',
                shadowBlur: 5
              },
              splitLine: {
                show: true,        // 默认显示，属性show控制显示与否
                length: 10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: '#eee'
                }
              },
              axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.4, '#5EDE64'], [0.8, '#F6BA2A'], [1, '#F91D07']],
                  width: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                show: true,        // 属性show控制显示与否，默认不显示
                splitNumber: 5,    // 每份split细分多少段
                length: 5,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: '#eee',
                  width: 1,
                  type: 'solid'
                }
              },
              axisLabel: {
                textStyle: {
                  fontSize: 9
                },
                distance: 3
              },
              detail: {
                show: false,
                formatter: '{value}%',
                offsetCenter: [0, '60%'],
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 16
                }
              },
              data: [
                {
                  value: 10,
                  name: ''
                }
              ]
            }
          ]
        }

        // 折线图
        var lineOption = {
          grid: {
            top: '10%',
            left: '0%',
            right: '0%',
            bottom: '10%',
            padding: '0',
            containLabel: true
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
          },
          xAxis: [
            {
              type: 'category',
              splitLine: {show: false},
              // 设置轴线的属性
              axisLine: {
                lineStyle: {
                  color: '#CCCCCC',
                  width: 1
                }
              },
              data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
            }
          ],
          yAxis: [
            {
              type: 'log',
              splitLine: {show: false},
              // 设置轴线的属性
              axisLine: {
                lineStyle: {
                  color: '#CCCCCC',
                  width: 1
                }
              }
            }
          ],
          calculable: true,
          series: [
            {
              name: '监测值',
              type: 'line',
              data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]

            }
          ]
        }
        var ywLine
        var wdLine
        var llGauge
        var llLine
        var ylGauge
        var ylLine
        var qtGauge
        var qtLine
        // 遍历传感器
        for (var si = 0; si < this.sensorList.length; si++) {
          let xAxisData = new Array()
          let lineData = new Array()
          for (var a1 = this.sensorList[si].sensorDataList.length - 1; a1 >= 0; a1--) {
            xAxisData.push(this.sensorList[si].sensorDataList[a1].updateTime)
            lineData.push(this.sensorList[si].sensorDataList[a1].realValue)
          }
          lineOption.xAxis[0].data = xAxisData
          lineOption.series[0].data = lineData
          lineOption.series[0].name = this.sensorList[si].deviceName
          gaugeOption.series[0].data[0].value = this.sensorList[si].realValue
          gaugeOption.series[0].min = this.sensorList[si].minRange
          gaugeOption.series[0].max = this.sensorList[si].maxRange
          console.info('--------------' + this.sensorList[si].deviceType)
          // 判断传感器类型
          if (this.sensorList[si].deviceType == 'liquidLevel') { // 液位
            this.ywHeight = this.sensorList[si].realValue / 8 + 'px'
            this.ywTop = 113 - this.sensorList[si].realValue / 8 + 'px'
            ywLine = echarts.init(document.getElementById('ywLine'))
            ywLine.setOption(lineOption)
          }
          if (this.sensorList[si].deviceType == 'temperature') { // 温度
            this.wdHeight = this.sensorList[si].realValue + 'px'
            this.wdTop = 113 - this.sensorList[si].realValue + 'px'
            wdLine = echarts.init(document.getElementById('wdLine'))
            wdLine.setOption(lineOption)
          }
          if (this.sensorList[si].deviceType == 'flow') { // 流量
            gaugeOption.series[0].axisLine.lineStyle.width = 5
            gaugeOption.series[0].axisLine.lineStyle.color = [[0.4, '#59B1EF'], [0.8, '#2EC7C9'], [1, '#D87A80']]
            llGauge = echarts.init(document.getElementById('llGauge'))
            llGauge.setOption(gaugeOption)
            llLine = echarts.init(document.getElementById('llLine'))
            llLine.setOption(lineOption)
          }
          if (this.sensorList[si].deviceType == 'pressure') { // 压力
            gaugeOption.series[0].axisLine.lineStyle.width = 10
            gaugeOption.series[0].axisLine.lineStyle.color = [[0.4, '#91C7AE'], [0.8, '#63869E'], [1, '#C23531']]
            ylGauge = echarts.init(document.getElementById('ylGauge'))
            ylGauge.setOption(gaugeOption)
            ylLine = echarts.init(document.getElementById('ylLine'))
            ylLine.setOption(lineOption)
          }
          if (this.sensorList[si].deviceType == 'gases') { // 气体
            gaugeOption.series[0].axisLine.lineStyle.width = 5
            gaugeOption.series[0].axisLine.lineStyle.color = [[0.4, '#5EDE64'], [0.8, '#F6BA2A'], [1, '#F91D07']]
            qtGauge = echarts.init(document.getElementById('qtGauge'))
            qtGauge.setOption(gaugeOption)
            qtLine = echarts.init(document.getElementById('qtLine'))
            qtLine.setOption(lineOption)
          }
        }

        window.addEventListener('resize', () => {
          // if (document.getElementById('ywLine')) {
          //   ywLine.resize()
          // }
          // if (document.getElementById('wdLine')) {
          //   wdLine.resize()
          // }
          // if (document.getElementById('llGauge')) {
          //   llGauge.resize()
          // }
          // if (document.getElementById('llLine')) {
          //   llLine.resize()
          // }
          // if (document.getElementById('ylGauge')) {
          //   ylGauge.resize()
          // }
          // if (document.getElementById('ylLine')) {
          //   ylLine.resize()
          // }
          // if (document.getElementById('qtGauge')) {
          //   qtGauge.resize()
          // }
          // if (document.getElementById('qtLine')) {
          //   qtLine.resize()
          // }
        })
      }
    }
}
</script>

<style>
  .moniInfoDetails-page-title span{
    font-size: 20px;
    font-weight: bold;
    color: #F6D650;
    background-image: -webkit-linear-gradient(top, #181E36, #073580 20%);
  }
  .moniInfoDetails-mo-title{
    position: absolute;
    height: 30px;
    width:100%;
    text-align: center;
    line-height: 28px;
    font-size: 20px;
    z-index: 1;
  }
  .moniInfoDetails-mo-title p {
    position: absolute;
    top:2px;
    margin-top: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
    text-align: center;
  }
  .moniInfoDetails-mo-title span{
    display: inline-block;
    width: 200px;
    margin-top: 2px;
    border-top: 28px solid #21354E;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }
  .moniInfoDetails-content{
    width:100%;
    height: 550px;
  }
  .moniInfoDetails-top{
    width:100%;
    height: 8%;
  }
  .moniInfoDetails-top-left{
    height: 100%;
    font-size: 20px;
    padding: 15px;
    margin-left: 15px;
    background-color: #042141;
    border-radius: 5px;
    float: left;
  }
  .moniInfoDetails-top-right{
    height: 100%;
    margin-left: 15px;
    font-size: 14px;
    padding: 15px;
    background-color: #042141;
    border-radius: 5px;
    color: #F6D650;
    float: left;
  }
  .moniInfoDetails-center{
    width:100%;
    height: 80%;
  }
  .moniInfoDetails-module{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px 0 0 10px;
    border-radius: 5px;
    border: 2px #133050 solid;
    float: left;
  }
  .moniInfoDetails-module-con{
    width: 100%;
    height: calc(100% - 30px);
    margin-top: 30px;
  }
  .moniInfoDetails-module-con-top{
    width: 100%;
    height: 75%;
    float: left;
  }
  .moniInfoDetails-module-con-top-left{
    width: 35%;
    height: 90%;
    margin-top: 5%;
    border-right: 1px #656565 solid;
    float: left;
  }
  .moniInfoDetails-module-con-top-right{
    width: 65%;
    height: 100%;
    float: left;
  }
  .moniInfoDetails-module-con-top-right ul{
    margin: 10px;
    padding: 5px;
  }
  .moniInfoDetails-module-con-top-right ul li{
    list-style: none;
    line-height: 22px;
  }
  .moniInfoDetails-module-con-top-right span{
    width: 50px;
    padding-left: 10px;
    font-weight: bold;
  }
  .moniInfoDetails-module-con-down{
    width: 100%;
    height: 23%;
    float: left;
  }

/*温度计*/
  .therm-numbers{
    width: 22px;
    margin-left: 10px;
    text-align: right;
    float:left;
    opacity:.4;
  }
  .therm-graphics{
    float:left;
    position:relative;
    width:30px;
  }
  .therm-top{ /*顶部*/
    position:absolute;
    top:0;
    left:2px;
    width:25px;
    height:13px;
  }
  .therm-body-bg{ /*外框*/
    position:absolute;
    top:13px;
    left:2px;
    width:25px;
  }
  .therm-body-mercury{/*颜色*/
    position:absolute;
    bottom:30px;
    left:9px;
    width: 12px;
    height:2px;
  }
  .therm-body-fore{ /*底部*/
    position:absolute;
    width:15px;
    top:13px;
    left:2px;
    background-repeat:repeat-y;
  }
  .therm-bottom{ /*底部*/
    position:absolute;
    left:0;
    width:30px;
    height:30px;
  }
</style>
