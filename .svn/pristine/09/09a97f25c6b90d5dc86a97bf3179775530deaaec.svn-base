<template>
  <el-dialog
    fullscreen
    :visible.sync="Visible">
    <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="概览信息" name="first">
        <div class="cityTab1">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="modulGround moduleTop">
                <div class="modulTitle">
                  <p>重大隐患信息</p>
                  <span></span>
                </div>
                <div class="moduleContent">
                  <div class="tab1-up">
                    <el-row>
                      <el-col><span @click="hiddenInfo(1)">全部企业数量（{{qyzdyhNum}}家）</span></el-col>
                      <el-col><span @click="hiddenInfo(2)">辖区已报备重大隐患（{{zdyhNum}}条）</span><span @click="hiddenInfo(3)">本月重大隐患数量（{{byzdyhNum}}条）</span>
                      </el-col>
                      <el-col><span @click="hiddenInfo(4)">逾期未整改的重大隐患（{{exzdyhNum}}条）</span><span
                        @click="hiddenInfo(5)">上月重大隐患数量（{{syzdyhNum}}条）</span></el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="modulGround moduleTop">
                <div class="modulTitle">
                  <p>一般隐患信息</p>
                  <span></span>
                </div>
                <div class="moduleContent">
                  <div class="tab1-up">
                    <el-row>
                      <el-col><span @click="hiddenInfo(6)">逾期未整改的一般隐患（{{exybyhNum}}条）</span><span
                        @click="hiddenInfo(7)">上月一般隐患数量（{{syybyhNum}}条）</span></el-col>
                      <el-col><span @click="hiddenInfo(8)">一般隐患升级为四级隐患（{{ybzdNum}}条）</span><span @click="hiddenInfo(9)">本月一般隐患数量（{{byybyhNum}}条）</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="modulGround moduleTop">
            <div class="modulTitle">
              <p>重大隐患数量对比</p>
              <span></span>
            </div>
            <div class="moduleContent">
              <div id="zdyh" style="height: 300px;"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="重大隐患台账" name="second">
        <el-row class="tabs-card-content">
          <major-hidden-list v-if="activeTab=='second'" ref="majorHiddenList"></major-hidden-list>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <major-hidden-info v-if="majorHiddenInfoVisible" ref="majorHiddenInfo"></major-hidden-info>
    <hidden-info v-if="hiddenInfoVisible" ref="hiddenInfo"></hidden-info>
    <unit-info v-if="unitInfoVisible" ref="unitInfo"></unit-info>
  </el-dialog>
</template>

<script>
  import majorHiddenList from './hiddRiskMana-majorHiddenList'
  import majorHiddenInfo from './hiddRiskMana-maiorHiddenInfo'
  import hiddenInfo from './hiddRiskMana-hiddenInfo'
  import unitInfo from './hiddRiskMana-unitInfo'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        Visible: false,
        activeTab: 'first',
        majorHiddenListVisible: false,
        unitInfoVisible: false,
        majorHiddenInfoVisible: false,
        hiddenInfoVisible: false,
        zdyhChart: null,
        qyzdyhNum: 0, // 重大隐患企业数量
        zdyhNum: 0, // 辖区已报备重大隐患
        byzdyhNum: 0, // 本月重大隐患数量
        exzdyhNum: 0, // 逾期未整改的重大隐患
        syzdyhNum: 0, // 上月重大隐患数量
        exybyhNum: 0, // 逾期未整改的一般隐患
        syybyhNum: 0, // 上月一般隐患数量
        ybzdNum: 0, // 一般隐患升级成重大隐患数量
        byybyhNum: 0, // 本月一般隐患数量
        zdyhDate: [],
        zdyhData: []
      }
    },
    components: {
      majorHiddenList,
      majorHiddenInfo,
      hiddenInfo,
      unitInfo
    },
    mounted () {
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.zdyhChart) {
        this.zdyhChart.resize()
      }
    },
    methods: {
      init () {
        this.Visible = true
        this.getDataList()
      },
      getDataList() {
        this.$http({
          url: this.$http.adornUrl('/hiddenCity/getCityHiddenInfo'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.qyzdyhNum = data.qyzdyhNum // 重大隐患企业数量
            this.zdyhNum = data.zdyhNum // 辖区已报备重大隐患
            this.byzdyhNum = data.byzdyhNum // 本月重大隐患数量
            this.exzdyhNum = data.exzdyhNum // 逾期未整改的重大隐患
            this.syzdyhNum = data.syzdyhNum // 上月重大隐患数量
            this.exybyhNum = data.exybyhNum // 逾期未整改的一般隐患
            this.syybyhNum = data.syybyhNum // 上月一般隐患数量
            this.ybzdNum = data.ybzdNum // 一般隐患升级成重大隐患数量
            this.byybyhNum = data.byybyhNum // 本月一般隐患数量
            this.zdyhDate = data.zdyhDate
            this.zdyhData = data.zdyhData

            this.echarts()
          }
        })
      },
      dangerInfo(flag) {
        if (flag === 1) {
          // 重大隐患企业
          this.unitInfoVisible = true
          this.$nextTick(() => {
            this.$refs.unitInfo.init(4, 0, '')
          })
        } else if (flag === 2) {
          // 重大隐患详情
          this.majorHiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.majorHiddenInfo.init(0, 0, '')
          })
        } else if (flag === 3) {
          // 本月重大隐患详情
          this.majorHiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.majorHiddenInfo.init(2, 0, '')
          })
        } else if (flag === 4) {
          // 未整改重大隐患详情
          this.majorHiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.majorHiddenInfo.init(1, 0, '')
          })
        } else if (flag === 5) {
          // 上月重大隐患详情
          this.majorHiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.majorHiddenInfo.init(3, 0, '')
          })
        } else if (flag === 6) {
          // 逾期未整改的一般隐患
          this.hiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.hiddenInfo.init(1, 0, '')
          })
        } else if (flag === 7) {
          // 上月一般隐患
          this.hiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.hiddenInfo.init(4, 0, '')
          })
        } else if (flag === 8) {
          // 一般隐患升级成重大隐患
          this.hiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.hiddenInfo.init(2, 0, '')
          })
        } else if (flag === 9) {
          // 本月一般隐患
          this.hiddenInfoVisible = true
          this.$nextTick(() => {
            this.$refs.hiddenInfo.init(3, 0, '')
          })
        }
      },
      handleClick(tab, event) {
        console.log(tab.name)
        if (tab.name === 'second') {
          this.majorHiddenListVisible = true
          this.$nextTick(() => {
            this.$refs.majorHiddenList.init()
          })
        }
      },
      echarts () {
        var option = {
          title: {
            text: '重大隐患数量对比',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['重大隐患数量'],
            textStyle: {
              color: '#fff'
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {

                show: false
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: this.zdyhDate
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                show: false
              }
            },
            splitLine: {
              lineStyle: {
                color: '#515D73'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter: '{value}个'
            }
          },
          series: [
            {
              name: '重大隐患数量',
              type: 'line',
              data: this.zdyhData,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        }
        // 为echarts对象加载数据
        this.zdyhChart = echarts.init(document.getElementById('zdyh'))
        this.zdyhChart.setOption(option)
        window.addEventListener('resize', () => {
          this.zdyhChart.resize()
        })
      }
    }
  }
</script>

<style lang="scss">
  .cityTab1 {
    & .tab1-up {
      text-align: center;
      color: #fff;
      line-height: 2em;
    }
    & .tab1-up span {
      padding: 0 10px;
      &:hover {
        color: #F6D650;
        cursor: pointer;
      }
    }
  }


</style>
