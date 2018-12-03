<!--企业信息-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    fullscreen
    :visible.sync="visible">
    <el-row>
      <div style="background-color: #181E36;">
        <div style="color: #FFF;">
          <el-tabs type="border-card" v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="四色分布图" name="1">
              <el-row class="tabs-card-content">
                  <enterprise-sise v-if="activeTab=='1'" ref="EnterpriseSise"></enterprise-sise>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="企业基本信息" name="2">
              <el-row class="tabs-card-content">
                  <ente-base-info v-if="activeTab=='2'" ref="EnteBaseInfo"></ente-base-info>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="企业风险报送" name="3">
              <el-row class="tabs-card-content">
                  <ente-risk-sub v-if="activeTab=='3'" ref="EnteRiskSub"></ente-risk-sub>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="企业周边信息" name="4">
              <el-row class="tabs-card-content">
                  <ente-peri-envi v-if="activeTab=='4'" ref="EntePeriEnvi"></ente-peri-envi>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="企业监测预警" name="5">
              <el-row class="tabs-card-content">
                  <ente-moni-warn v-if="activeTab=='5'" ref="EnteMoniWarn"></ente-moni-warn>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="重大风险公告" name="6">
              <el-row class="tabs-card-content">
                  <ente-major-notice v-if="activeTab=='6'" ref="EnteMajorNotice"></ente-major-notice>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="风险告知卡" name="7">
              <el-row class="tabs-card-content">
                  <ente-risk-card v-if="activeTab=='7'" ref="EnteRiskCard"></ente-risk-card>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="作业安全比较图" name="8">
              <el-row class="tabs-card-content">
                  <ente-safety-work v-if="activeTab=='8'" ref="EnteSafetyWork"></ente-safety-work>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="企业管控文件" name="9">
              <el-row class="tabs-card-content">
                  <ente-risk-control-file v-if="activeTab=='9'" ref="EnteRiskControlFile"></ente-risk-control-file>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-row>
  </el-dialog>
</template>
<script>
  import EnterpriseSise from './enterpriseSiSe'
  import EnteBaseInfo from './enteBaseInfo'
  import EntePeriEnvi from './entePeriEnvi'
  import EnteMoniWarn from './enteMoniWarn'
  import EnteMajorNotice from './enteMajorNotice'
  import EnteRiskCard from './enteRiskCard'
  import EnteRiskControlFile from './enteRiskControlFile'
  import EnteSafetyWork from './enteSafetyWork'
  import EnteRiskSub from './enteRiskSub'

  export default {
    data () {
      return {
        activeTab: '1',
        visible: false,
        enterpriseList: [],
        enterpriseId: '',
        enterpriseName: '',
        imgList: [],
        dataRule: {}
      }
    },
    components: {
      EnterpriseSise,
      EnteRiskSub,
      EnteRiskControlFile,
      EnteRiskCard,
      EnteMajorNotice,
      EnteMoniWarn,
      EntePeriEnvi,
      EnteBaseInfo,
      EnteSafetyWork
    },
    mounted () {
    },
    methods: {
      init (enterpriseId) {
        console.log('enterpriseId:' + enterpriseId)
        this.visible = true
        this.enterpriseId = enterpriseId || 0
        // 调用四色分布图
        this.$nextTick(() => {
          this.$refs.EnterpriseSise.init(this.enterpriseId)
        })
      },
      handleClick (tab, event) {
        console.log(tab.name)
        if (tab.name === '1') {
          this.$nextTick(() => {
            this.$refs.EnterpriseSise.init(this.enterpriseId)
          })
        } else if (tab.name === '2') {
          this.$nextTick(() => {
            this.$refs.EnteBaseInfo.init(this.enterpriseId)
          })
        } else if (tab.name === '3') {
          this.$nextTick(() => {
            this.$refs.EnteRiskSub.init(this.enterpriseId)
          })
        } else if (tab.name === '4') {
          this.$nextTick(() => {
            this.$refs.EntePeriEnvi.init(this.enterpriseId)
          })
        } else if (tab.name === '5') {
          this.$nextTick(() => {
            this.$refs.EnteMoniWarn.init(this.enterpriseId)
          })
        } else if (tab.name === '6') {
          this.$nextTick(() => {
            this.$refs.EnteMajorNotice.init(this.enterpriseId)
          })
        } else if (tab.name === '7') {
          this.$nextTick(() => {
            this.$refs.EnteRiskCard.init(this.enterpriseId)
          })
        } else if (tab.name === '8') {
          this.$nextTick(() => {
            this.$refs.EnteSafetyWork.init(this.enterpriseId)
          })
        } else if (tab.name === '9') {
          this.$nextTick(() => {
            this.$refs.EnteRiskControlFile.init(this.enterpriseId)
          })
        }
      }
    }
  }
</script>

<style>
  /*elementUI tab页样式重写*/
  .tabs-card-content {
    width: 100%;
    min-height: 550px;
  }

  .el-tabs--border-card {
    background: rgb(24, 30, 54);
    border: 0;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding-top: 5px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    border: 1px #797979 solid;
    border-right: 0;
    color: #FFF;
    font-weight: bold;
  }

  .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    transition: transform .3s, -webkit-transform .3s;
    border: 1px #797979 solid;
    border-bottom: 0;
    float: left;
    z-index: 2;
  }

  .el-tabs--border-card > .el-tabs__header {
    background-color: rgb(24, 30, 54);
    border: 0;
    margin: 0;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #fff;
    background-color: #113A70;
    border-color: #797979;
  }

  .el-tabs__nav-wrap {
    overflow: hidden;
    position: relative;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #FFF;
  }

  /*elementUI table页样式重写*/
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: 1px solid #ebeef5;
    color: #FFF;
    background-color: #042141;
  }

  .el-table {
    font-size: 14px;
    color: #FFF;
    background-color: #001837;
    border: 1px #133050 solid;
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #133050;
    border-right: 1px solid #133050;
  }

  .el-table__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #FFF;
  }
</style>
