<!--监测信息-视频监控-->
<template>
  <div class="moniInfo-videoMoni-content"  :style="{height: styleHeight}">
    <div class="moniInfo-videoMoni-left">
      <el-tree :data="data" :props="defaultProps" @node-click="nodeClick"></el-tree>
    </div>
    <div class="moniInfo-videoMoni-right">
      <div class="moniInfo-videoMoni-right-left">
        <div class="moniInfo-videoMoni-right-left-top"></div>
        <div class="moniInfo-videoMoni-right-left-down">
          <table cellspacing="0" cellpadding="0" border="0">
            <tbody>
            <tr>
              <td class="tt" style="color:#FFFFFF;">已登录设备</td>
              <td><select id="ip" class="sel" onchange="getChannelInfo();" style="color:#FFFFFF;background-color:#43516C;border:1px #2E435B solid;"></select></td>
              <td class="tt" style="color:#FFFFFF;">通道列表</td>
              <td><select id="channels" class="sel" style="color:#FFFFFF;background-color:#43516C;border:1px #2E435B solid;"></select></td>
            </tr>
            </tbody>
          </table>
          <div id="mesDiv" style="color: rgb(255, 255, 255);">
            您的电脑未安装视频控件,<a href="/RiskLargeScreen/static/video/WebComponentsKit.exe">下载安装</a>
          </div>
        </div>
      </div>
      <div class="moniInfo-videoMoni-right-right">
        <p>{{enterpriseName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'moniInfo-videoMoni',
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
            } else {
              this.moniPositionCount = 0
              this.sensorCount = 0
            }
          })
        }
      }
    }
  }
</script>

<style>
  .moniInfo-videoMoni-content{
    width: 100%;
    height: 550px;
  }
  .moniInfo-videoMoni-left{
    width: 19%;
    height: 100%;
    border-radius: 5px;
    border: 2px #133050 solid;
    background-color: #001837;
    float: left;
  }
  .moniInfo-videoMoni-right{
    width: 79%;
    height: 100%;
    margin-left: 5px;
    border-radius: 5px;
    border: 2px #133050 solid;
    background-color: #001837;
    float: left;
  }
  .moniInfo-videoMoni-right-left{
    width: 60%;
    height: 100%;
    float: left;
  }
  .moniInfo-videoMoni-right-left-top{
    width: 100%;
    height: 85%;
  }
  .moniInfo-videoMoni-right-left-down{
    width: 100%;
    height: 15%;
  }
  .moniInfo-videoMoni-right-right{
    width: 40%;
    height: 100%;
    float: left;
  }
</style>
