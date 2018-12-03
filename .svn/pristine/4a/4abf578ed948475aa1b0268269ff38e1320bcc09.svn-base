<!--监测信息-实时监测-->
<template>
  <div class="moniInfo-realTime-content"  :style="{height: styleHeight}">
    <div class="moniInfo-realTime-left">
      <el-tree :data="data" :props="defaultProps" @node-click="nodeClick" ref="tree"></el-tree>
    </div>
    <div class="moniInfo-realTime-right">
      <div class="moniInfo-realTime-right-top">
        <div class="moniInfo-realTime-right-top-left">{{enterpriseName}}</div>
        <div class="moniInfo-realTime-right-top-right">监测位置：{{moniPositionCount}} 个</div>
        <div class="moniInfo-realTime-right-top-right">传感器数量：{{sensorCount}} 个</div>
      </div>
      <div class="moniInfo-realTime-right-down">
        <div class="content" >
          <div v-for="item in monitorPointList" :class="getColorClass(item.monitorPointColor)" @click="moniInfoDetailsClick(item.id)" :style="{left:item.monitorPointXmap-10+'px',top:item.monitorPointYmap-10+'px'}">
            <p></p><span></span>
            <div class="name">{{item.monitorPointName}}</div>
          </div>
          <div  id="picBox" ref="picSvgDiv" style="width: 900px;height: 500px;">
            <svg v-html="monitorPointPictureUrl" ref="picSvg" style="width: 100%;height:100%;background-color: #FFF;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
          </div>
        </div>
      </div>
    </div>
    <moni-info-details v-if="moniInfoDetailsVisible" ref="MoniInfoDetails"></moni-info-details>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import MoniInfoDetails from './moniInfoDetails'
export default {
    name: 'moniInfo-realTime',
    components: {echarts, MoniInfoDetails},
    data () {
      return {
        styleHeight: window.screen.availHeight - 60 + 'px',
        moniInfoDetailsVisible: false,
        enterpriseId: '',
        enterpriseName: '',
        moniPositionCount: 0,
        sensorCount: 0,
        pictureId: '',
        pictureUrl: '',
        monitorPointList: [],
        picRiskTgLs: [],
        monitorPointPictureUrl: '',
        data: [{
          label: '所有区域',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          id: 'id'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.monitorPointPictureUrl = ''
        this.$http({
          url: this.$http.adornUrl('/sensor/sensorDataWarn/getTreeSecondLevelAndEnterprise'),
          method: 'get',
          params: this.$http.adornParams({
            parentId: 16
          })
        }).then(({data}) => {
          if (data) {
            this.data[0].children = data
            if (data[0].children[0] && data[0].children[0].id) {
              this.enterpriseId = data[0].children[0].id
              this.enterpriseName = data[0].children[0].label
            } else if (!data[0].children[0] && data[1].children[0] && data[1].children[0].id) {
              this.enterpriseId = data[1].children[0].id
              this.enterpriseName = data[1].children[0].label
            } else if (!data[0].children[0] && !data[1].children[0] && data[2].children[0] && !data[2].children[0].id) {
              this.enterpriseId = data[2].children[0].id
              this.enterpriseName = data[2].children[0].label
            }
          }
          this.dataListLoading = false
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/monitor/enterpriseMonitorPointPicture/monitorPointPictureList/' + this.enterpriseId),
            method: 'get',
            params: this.$http.adornParams({
              enterpriseId: this.enterpriseId
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log('----企业信息----')
              this.moniPositionCount = data.pointCount
              this.sensorCount = data.sensorCount
              this.pictureId = data.pictureId
              this.pictureUrl = data.pictureUrl
              this.monitorPointList = data.monitorPointList
              this.pickMonitorPointPictureUrl(this.pictureId)
            } else {
              this.moniPositionCount = 0
              this.sensorCount = 0
            }
          })
        })
      },
      nodeClick (data) { // 点击左侧企业
        console.log(data)
        if (data.id && data.id !== '') {
          this.enterpriseId = data.id
          this.enterpriseName = data.label
          this.$http({
            url: this.$http.adornUrl('/monitor/enterpriseMonitorPointPicture/monitorPointPictureList/' + this.enterpriseId),
            method: 'get',
            params: this.$http.adornParams({
              enterpriseId: this.enterpriseId
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.moniPositionCount = data.pointCount
              this.sensorCount = data.sensorCount
              this.pictureId = data.pictureId
              this.pictureUrl = data.pictureUrl
              this.monitorPointList = data.monitorPointList
              this.pickMonitorPointPictureUrl(this.pictureId)
            } else {
              this.moniPositionCount = 0
              this.sensorCount = 0
            }
          })
        }
      },
      moniInfoDetailsClick (vid) { // 点击监测点
        this.moniInfoDetailsVisible = true
        this.$nextTick(() => {
          this.$refs.MoniInfoDetails.init(vid, this.enterpriseName, this.moniPositionCount, this.sensorCount)
        })
      },
      getColorClass (value) { // 监测点颜色
        return value
      },
      pickMonitorPointPictureUrl (vId) { // 显示分布图
        this.monitorPointPictureUrl = ''
        this.monitorPointPictureId = vId // 分布图ID
        this.picRiskTgLs = []
        this.$http({
          url: this.$http.adornUrl(`/monitor/enterpriseMonitorPointPicture/lookPictureInfo`),
          method: 'get',
          params: this.$http.adornParams({ id: this.pictureId })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.monitorPointPictureUrl = data.riskPicture.svgXml
            this.$refs.picSvgDiv.style.width = data.riskPicture.viewBoxW + 'px'
            this.$refs.picSvgDiv.style.height = data.riskPicture.viewBoxH + 'px'
            this.$refs.picSvg.setAttribute('viewBox', '0 0 ' + data.riskPicture.viewBoxW + ' ' + data.riskPicture.viewBoxH)
          }
        })
      }
    }
  }
</script>

<style>
  .moniInfo-realTime-content{
    width: 100%;
    height: 550px;
  }
  .moniInfo-realTime-left{
    width: 19%;
    height: 100%;
    border-radius: 5px;
    border: 2px #133050 solid;
    background-color: #001837;
    float: left;
  }
  .moniInfo-realTime-right{
    width: 79%;
    height: 100%;
    margin-left: 5px;
    border-radius: 5px;
    border: 2px #133050 solid;
    background-color: #001837;
    float: left;
  }
  .moniInfo-realTime-right-top{
    width: 100%;
    height: 9%;
    margin-top: 1%;
    font-weight: bold;
    float: left;
  }
  .moniInfo-realTime-right-top-left{
    height: 100%;
    font-size: 20px;
    padding: 15px;
    margin-left: 15px;
    background-color: #042141;
    border-radius: 5px;
    float: left;
  }
  .moniInfo-realTime-right-top-right{
    height: 100%;
    margin-left: 15px;
    font-size: 14px;
    padding: 15px;
    background-color: #042141;
    border-radius: 5px;
    color: #F6D650;
    float: left;
  }
  .moniInfo-realTime-right-down{
    position: relative;
    width: 100%;
    height: 90%;
    float: left;
  }
  /*图内点样式*/
  .moniInfo-realTime-right-down img{width: 100%;height: 100%;}
  .moniInfo-realTime-right-down .content{width: 100%;height:100%;position: absolute;left: 0px;top: 0px;color: #0D1E41}
  .moniInfo-realTime-right-down .content .name {background-color: #0D1E41;color: #FFF;margin-left: 30px;width: 100px;padding-left: 5px}
  .moniInfo-realTime-right-down .content .red p{position: absolute;width: 20px;height: 20px;margin: 0;border-radius:50%;animation: myfirst 1.5s  infinite;background-color: rgba(255,0,0,0.6); }
  .moniInfo-realTime-right-down .content .red span{position: absolute;display:block;width: 20px;height: 20px;border-radius:50%;animation: myfirst 1.5s  infinite;background-color: rgba(255,0,0,0.5); animation-delay: 0.5s;}

  .moniInfo-realTime-right-down .content .yellow{width: 20px;height: 20px;border-radius:50%;position: relative;background: yellow;position: absolute;cursor: pointer;}
  .moniInfo-realTime-right-down .content .orange{width: 20px;height: 20px;border-radius:50%;position: relative;background: orange;position: absolute;cursor: pointer;}
  .moniInfo-realTime-right-down .content .blue{width: 20px;height: 20px;border-radius:50%;position: relative;background: blue;position: absolute;cursor: pointer;}
  .moniInfo-realTime-right-down .content .red{width: 20px;height: 20px;border-radius:50%;position: relative;background: red;position: absolute;cursor: pointer;}
  @keyframes myfirst{
    20% {transform: scale(1);}
    40% {transform: scale(2);}
    60% {transform: scale(3);}
    80% {transform: scale(4);}
    100% {transform: scale(5);}
  }
</style>
