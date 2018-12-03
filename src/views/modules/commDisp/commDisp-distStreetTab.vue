<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <el-tabs v-model="activeName" type="border-card" stretch="true" @tab-click="tabShow">
      <el-tab-pane label="区街风险一览图" name="1">
        <div class="min-height">
          <!--<keep-alive>-->
          <div class="streetTab1" ref="streetTab1">
            <el-row>
              <el-col :span="6">
                <div class="left_map" id="tab1_left_map" style="height: 600px;"></div>
                <!-- 用于放不同区域下行业风险情况的echarts图 -->
                <div class="business_echarts" id="business_echarts">
                  <div style="width:900px;height:400px;" id="line_echarts"></div>
                </div>
              </el-col>
              <el-col :span="18">
                <el-row>
                  <el-col :span="6">
                    <div style="height: 300px;" class="pie1" id="tab1_pie1"></div>
                  </el-col>
                  <el-col :span="6">
                    <div style="height: 300px;" class="pie2" id="tab1_pie2"></div>
                  </el-col>
                  <el-col :span="6">
                    <div style="height: 300px;" class="pie3" id="tab1_pie3"></div>
                  </el-col>
                  <el-col :span="6">
                    <div style="height: 300px;" class="pie4" id="tab1_pie4"></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div style="height: 300px;" class="bottom_bar" id="tab1_bottom_bar"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!--</keep-alive>-->
        </div>

      </el-tab-pane>
      <el-tab-pane :label="streetRiskName" name="2" lazy="true">
        <div class="min-height">
          <!--<keep-alive>-->
          <div class="streetTab2" ref="streetTab2">
            <div class="tab2Box">
              <div class="tab2-title">
                <div>上月重大风险情况：{{lastDanger}}</div>
                <div>本月重大风险情况：{{nowDanger}}</div>
              </div>
              <div class="tab2-mainBox">
                <div class="tab2-main tab2_bottom" ref="tab2Main">
                  <div class="main-content" style="min-width: 800px; width:100%; height:300px;"
                       id="tab2_bottom_bar"></div>
                </div>
                <div class="tab2-main">
                  <div class="main-title">重大风险清单信息：</div>
                  <div class="main-content">
                    <el-table
                      :data="dataList"
                      border
                      v-loading="dataListLoading"
                      @selection-change="selectionChangeHandle"
                      style="width: 100%;">
                      <el-table-column
                        prop="enterpriseName"
                        header-align="center"
                        align="center"
                        label="企业名称">
                      </el-table-column>
                      <el-table-column
                        prop="reviewElement"
                        header-align="center"
                        align="center"
                        label="风险名称">
                      </el-table-column>
                      <el-table-column
                        prop="value"
                        header-align="center"
                        align="center"
                        label="风险值">
                      </el-table-column>
                      <el-table-column
                        prop="updateTime"
                        header-align="center"
                        align="center"
                        label="时间">
                      </el-table-column>
                    </el-table>
                    <el-pagination
                      @size-change="sizeChangeHandle"
                      @current-change="currentChangeHandle"
                      :current-page="pageIndex"
                      :page-sizes="[10, 20, 50, 100]"
                      :page-size="pageSize"
                      :total="totalPage"
                      layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--</keep-alive>-->
        </div>

      </el-tab-pane>
      <el-tab-pane :label="streetTroubleName" name="3" lazy="true">
        <div class="min-height">
          <!--<keep-alive>-->
          <div class="streetTab2 streetTab3" ref="streetTab3">
            <div class="tab2Box">
              <div class="tab2-title">
                <div>上月隐患排查情况：{{lastYH}}</div>
                <div>本月隐患排查情况：{{nowYH}}</div>
              </div>
              <div class="tab2-mainBox">
                <div class="tab2-main">
                  <div class="main-content" style="width: 100%;height:300px;" id="tab3_bottom_line"></div>
                </div>
                <div class="tab2-main">
                  <div class="main-title">重大隐患信息：</div>
                  <div class="main-content">
                    <el-table
                      :data="dataList2"
                      border
                      v-loading="dataListLoading1"
                      @selection-change="selectionChangeHandle1"
                      style="width: 100%;">
                      <el-table-column
                        prop="enterpriseName"
                        header-align="center"
                        align="center"
                        label="企业名称">
                      </el-table-column>
                      <el-table-column
                        prop="highTroubleName"
                        header-align="center"
                        align="center"
                        label="隐患名称">
                      </el-table-column>
                      <el-table-column
                        prop="findDate"
                        header-align="center"
                        align="center"
                        label="排查日期">
                      </el-table-column>
                      <el-table-column
                        prop="rectificationTypeVal"
                        header-align="center"
                        align="center"
                        label="整改类型">
                      </el-table-column>
                      <el-table-column
                        prop="troubleLevelVal"
                        header-align="center"
                        align="center"
                        label="隐患级别">
                      </el-table-column>
                    </el-table>
                    <el-pagination
                      @size-change="sizeChangeHandle1"
                      @current-change="currentChangeHandle1"
                      :current-page="pageIndex1"
                      :page-sizes="[10, 20, 50, 100]"
                      :page-size="pageSize1"
                      :total="totalPage1"
                      layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--</keep-alive>-->
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        activeName: '1',
        tab1LeftMap: null,
        tabLine: null,
        leftTopPie: null,
        rightTopPie: null,
        leftBottomPie: null,
        rightBottomPie: null,
        tab1BottomBar: null,
        tab2BottomBar: null,
        tab3BottomLine: null,
        lastDanger: 0,
        nowDanger: 0,
        lastYH: 0,
        nowYH: 0,
        visible: false,
        streetRiskName: '所有区街风险信息',
        streetTroubleName: '所有区街隐患信息',
        areaName: '',
        dataList: [],
        dataList2: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        pageIndex1: 1,
        pageSize1: 10,
        totalPage1: 0,
        dataListLoading1: false,
        name: [],
        areaColor: [],
        color: [],
        // 左侧地图
        lineOption: '',
        lineEcharts: '',
        movex: '',
        movey: '',
        businessName: ''
      }
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.tab1BottomBar) {
        this.tab1BottomBar.resize()
      }
      if (this.leftTopPie) {
        this.leftTopPie.resize()
      }
      if (this.tab2BottomBar) {
        this.tab2BottomBar.resize()
      }
      if (this.tab3BottomLine) {
        this.tab3BottomLine.resize()
      }
    },
    mounted () {
      this.inittab1BottomBar()
      this.getRiskAndHiddenNum()
      // this.inittab2BottomBar()
      this.getCenterMap()
      this.leftMap()
    },
    updated () {
      // this.echartsWH()
      // this.parentWidth = this.$refs.tab2Main.offsetWidth
      // this.parentHeight = this.$refs.tab2Main.offsetHeight
      // this.echartsWidth = document.getElementsByClassName('tab2_bottom')[0].
      // this.echartsHeight = this.parentHeight
      // console.log(this.echartsWidth)
    },
    methods: {
      tabShow (tab, event) {
        if (tab.name === '1') {
          this.$nextTick(() => {
            this.leftMap()
            this.inittab1BottomBar()
          })
        }
        if (tab.name === '2') {
          this.$nextTick(() => {
            this.inittab2BottomBar()
            this.getDataList()
          })
        }
        if (tab.name === '3') {
          this.$nextTick(() => {
            this.inittab2BottomBar()
            this.getDataList2()
          })
        }
      },
      init () {
        this.visible = true
        this.getDataList()
        this.getDataList2()
      },
      // tab1:左——地图
      leftMap () {
        var _this = this
        var bdColor = '#000000'// 地图边界颜色
        $.get('/static/plugins/echarts-3.8.5/ezhou_Q.json', function (chinaJson) {
          echarts.registerMap('ezhou', chinaJson)
          var mapOption = {
            title: {
              text: '区街风险预览图',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: '华文新魏',
                fontSize: '36'
              }
            },
            toolbox: {
              // 工具栏
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return '企业名称：' + params.value[2] + '<br/> 地址：' + params.value[3] + '<br/> 安全负责人姓名：' + params.value[4] + '<br/> 电话：' + params.value[5]
              }
            },
            geo: {// 地理坐标系组件
              map: 'ezhou',
              // selectedMode:true,
              zoom: 1.1,
              label: {// 图形上的文本标签
                normal: {
                  show: true,
                  textStyle: {color: '#000'}
                },
                emphasis: {
                  show: true,
                  textStyle: {color: '#000'}
                }
              },
              roam: true,
              nameTextStyle: {
                fontWeight: 'bolder',
                fontSize: 16
              },
              itemStyle: {
                normal: {
                  borderColor: '#dadfde',
                  areaColor: ['#ff7640'],
                  color: ['#f00']
                },
                emphasis: {
                  borderColor: '#dadfde', // 图形描边颜色
                  areaColor: '#ddb926'// 区块颜色
                }
              },
              regions: [{
                name: [],
                nameTextStyle: {
                  fontWeight: 'bolder',
                  fontSize: 16
                },
                itemStyle: {
                  normal: {
                    areaColor: [],
                    color: [],
                    borderColor: bdColor
                  }
                }
              }]

            },
            series: []
          }
          mapOption.geo.regions[0].name.push(this.name)
          mapOption.geo.regions[0].itemStyle.normal.areaColor.push(this.areaColor)
          mapOption.geo.regions[0].itemStyle.normal.color.push(this.color)
          _this.tab1LeftMap = echarts.init(document.getElementById('tab1_left_map'))
          _this.tab1LeftMap.setOption(mapOption)
          window.addEventListener('resize', () => {
            _this.tab1LeftMap.resize()
          })
          document.onmousemove = mousemove

          //用来获取鼠标位置的方法
          function mousemove (e) {
            // console.log(e)
            e = e || window.event
            if (e.pageX || e.pageY) {
              _this.movex = e.pageX
              _this.movey = e.pageY
            }
          }

          _this.tab1LeftMap.on('mouseover', function (params) {
            _this.businessName = params.name
            var x = _this.movex + 30 + 'px'
            var y = _this.movey - 100 + 'px'
            console.log(x)
            $('.business_echarts').css({
              left: x,
              top: y,
              display: 'block'
            })
            _this.lineChart()
          })
          _this.tab1LeftMap.on('mouseout', function (params) {
            $('.business_echarts').css('display', 'none')
          })
        })
      },
      lineChart () {
        // 区域行业下的option
        var lineOption = {
          title: {
            text: '',
            left: 'center',
            top: '2%',
            textStyle: {
              color: '#fff',
            }
          },
          color: ['#FF0000', '#FF9900', '#FDFE02', '#36A9CE'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            left: 'center',
            top: '10%',
            data: ['重大风险', '较大风险', '一般风险', '低风险'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'category',
            name: '',
            splitLine: {show: false},
            axisLabel: {
              interval: 0,
              rotate: 20, // 60度角倾斜显示
              textStyle: {
                color: '#fff'
              }
            },
            data: []
          },
          grid: {
            top: '16%',
            left: '4%',
            right: '3%',
            bottom: '16%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            name: '企业个数',
            nameTextStyle: {
              color: '#fff'
            },
            splitLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
          },
          series: [
            {
              name: '重大风险',
              type: 'bar',
              stack: '风险',
              barCategoryGap: '50%',
              data: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
            },
            {
              name: '较大风险',
              type: 'bar',
              stack: '风险',
              barCategoryGap: '50%',
              data: [3, 4]
            },
            {
              name: '一般风险',
              type: 'bar',
              stack: '风险',
              barCategoryGap: '50%',
              data: [5, 6]
            },
            {
              name: '低风险',
              type: 'bar',
              stack: '风险',
              barCategoryGap: '50%',
              data: [7, 8]
            }
          ]
        }
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getLineData'),
          method: 'get',
          params: this.$http.adornParams({townName: this.businessName})
        }).then(({data}) => {
          if (data && data.code === 0) {
            lineOption.xAxis.data = []
            lineOption.series[0].data = []
            lineOption.series[1].data = []
            lineOption.series[2].data = []
            lineOption.series[3].data = []
            for (var x in data.dataList) {
              lineOption.xAxis.data.push(data.dataList[x].businessTypeName)
              lineOption.series[0].data.push(data.dataList[x].redRisk)
              lineOption.series[1].data.push(data.dataList[x].orangeRisk)
              lineOption.series[2].data.push(data.dataList[x].yellowRisk)
              lineOption.series[3].data.push(data.dataList[x].blueRisk)
            }
            lineOption.title.text = this.businessName + "各行业风险分布图"
            this.tabLine = echarts.init(document.getElementById('line_echarts'))
            this.tabLine.setOption(lineOption)
            window.addEventListener('resize', () => {
              this.tabLine.resize()
            })
          }
        })
      },
      // tab1下——柱状图
      inittab1BottomBar () {
        var Option = {
          title: {
            text: '各区街按整体风险水平排序',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            },
            left: 'center',
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '5%',
            bottom: '10%',
            padding: '0',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: [],
            textStyle: {
              color: '#fff'
            },
            show: false
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              name: [],
              splitLine: {show: false},
              axisLabel: {
                interval: 0,
                rotate: 20, // 60度角倾斜
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              },
              /*  axisLine :{
                   lineStyle:{
                       color:'#fff'
                   }
               }, */
              data: ['华容区', '鄂城区', '梁子湖区']
            }
          ],
          yAxis: [
            {
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              },
              /* axisLine :{
                  lineStyle:{
                      color:'#fff'
                  }
              }, */
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: '#515D73'
                }
              }
            }
          ],
          series:
            [
              {
                name: '企业风险值总和',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#3398DB'
                  }
                },
                data: [0.4, 0.35, 0.25],
                barCategoryGap: '30'

              }
            ]
        }
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getRightBar'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            for (var x in data.dataList) {
              Option.xAxis[0].data[x] = data.dataList[x].town
              Option.series[0].data[x] = data.dataList[x].riskNum
              this.tab1BottomBar = echarts.init(document.getElementById('tab1_bottom_bar'))
              this.tab1BottomBar.setOption(Option)
              window.addEventListener('resize', () => {
                this.tab1BottomBar.resize()
              })
              // 柱状图点击事件
              var _this = this
              this.tab1BottomBar.on('click', function (param) {
                _this.streetRiskName = param.name + '风险信息'
                _this.streetTroubleName = param.name + '隐患信息'
                _this.areaName = param.name
                // 点击柱状图 根据区域重新获取区域风险及隐患情况
                _this.getRiskAndHiddenNum()
                _this.inittab2BottomBar()
              })
            }
          }
        })
        var colorRed = ['#CC0000', '#fad3d3', '#d6494b', '#e9595b', '#f96868', '#fa7a7a', '#fa9898', '#fab4b4', '#ffeaea']
        var colorOrange = ['#FF9933', '#e98f2e', '#ec9940', '#f2a654', '#f4b066', '#f6be80', '#fbce9d', '#ffddb9', '#fff3e6']
        var colorYellow = ['#FFFF00', '#fbc02d', '#f9cd48', '#f7da64', '#f7e083', '#f8e59b', '#f6e7a9', '#f9eec1', '#fffae7']
        var colorBlue = ['#36A9CE', '#3583ca', '#4e97d9', '#62a8ea', '#89bceb', '#a2caee', '#bcd8f1', '#d5e4f1', '#e8f1f8']
        var tab1LeftOption1 = {
          title: {
            text: '',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            },
            left: 'center',
          },
          color: [],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '40%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontWeight: '700',
                    fontSize: '12',
                    color: '#00ffff'
                  },
                  formatter: '{b}:\n{c}({d}%)'

                },
              },
              labelLine: {
                normal: {
                  length: 12,
                  length2: 5,
                  lineStyle: {
                    color: '#00ffff'
                  },
                  smooth: true
                }
              },
              data: []
            }
          ]
        }
        var tab1LeftOption2 = {
          title: {
            text: '',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            },
            left: 'center'
          },
          color: [],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '40%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontWeight: '700',
                    fontSize: '12',
                    color: '#00ffff'
                  },
                  formatter: '{b}:\n{c}({d}%)'

                },
              },
              labelLine: {
                normal: {
                  length: 12,
                  length2: 5,
                  lineStyle: {
                    color: '#00ffff'
                  },
                  smooth: true
                }
              },
              data: []
            }
          ]
        }
        var tab1LeftOption3 = {
          title: {
            text: '',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            },
            left: 'center',
          },
          color: [],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '40%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontWeight: '700',
                    fontSize: '12',
                    color: '#00ffff'
                  },
                  formatter: '{b}:\n{c}({d}%)'

                },
              },
              labelLine: {
                normal: {
                  length: 12,
                  length2: 5,
                  lineStyle: {
                    color: '#00ffff'
                  },
                  smooth: true
                }
              },
              data: []
            }
          ]
        }
        var tab1LeftOption4 = {
          title: {
            text: '',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            },
            left: 'center',
          },
          color: [],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '40%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontWeight: '700',
                    fontSize: '12',
                    color: '#00ffff'
                  },
                  formatter: '{b}:\n{c}({d}%)'

                },
              },
              labelLine: {
                normal: {
                  length: 12,
                  length2: 5,
                  lineStyle: {
                    color: '#00ffff'
                  },
                  smooth: true
                }
              },
              data: []
            }
          ]
        }
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getPieData'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            tab1LeftOption1.series[0].data = []
            tab1LeftOption2.series[0].data = []
            tab1LeftOption3.series[0].data = []
            tab1LeftOption4.series[0].data = []
            var pieNum1 = 0
            var pieNum2 = 0
            var pieNum3 = 0
            var pieNum4 = 0
            for (var x in data.dataMap.redData) { // 一级风险
              tab1LeftOption1.color = colorRed
              tab1LeftOption1.title.text = '重大风险'
              tab1LeftOption1.series[0].name = '重大风险'
              tab1LeftOption1.series[0].label.normal.textStyle.color = '#CC0000'
              tab1LeftOption1.series[0].labelLine.normal.lineStyle.color = '#CC0000'
              if (data.dataMap.redData[x].num !== 0) {
                var a = {}
                a.name = data.dataMap.redData[x].name
                a.value = data.dataMap.redData[x].num
                tab1LeftOption1.series[0].data.push(a)
                pieNum1++
              }
              if (pieNum1 === 0) {
                tab1LeftOption1.series[0].data = []
                var a = {}
                a.name = '无数据'
                a.value = 0
                tab1LeftOption1.series[0].data.push(a)
              }
            }
            this.leftTopPie = echarts.init(document.getElementById('tab1_pie1'))
            this.leftTopPie.setOption(tab1LeftOption1)
            window.addEventListener('resize', () => {
              this.leftTopPie.resize()
            })

            for (var y in data.dataMap.orangeData) { // 二级风险
              tab1LeftOption2.color = colorOrange
              tab1LeftOption2.title.text = '较大风险'
              tab1LeftOption2.series[0].name = '较大风险'
              tab1LeftOption2.series[0].label.normal.textStyle.color = '#ff9933'
              tab1LeftOption2.series[0].labelLine.normal.lineStyle.color = '#ff9933'
              if (data.dataMap.orangeData[y].num !== 0) {
                var a = {}
                a.name = data.dataMap.orangeData[y].name
                a.value = data.dataMap.orangeData[y].num
                tab1LeftOption2.series[0].data.push(a)
                pieNum2++
              }
              if (pieNum2 === 0) {
                tab1LeftOption2.series[0].data = []
                var a = {}
                a.name = '无数据'
                a.value = 0
                tab1LeftOption2.series[0].data.push(a)
              }
              this.rightTopPie = echarts.init(document.getElementById('tab1_pie2'))
              this.rightTopPie.setOption(tab1LeftOption2)
              window.addEventListener('resize', () => {
                this.rightTopPie.resize()
              })
            }

            for (var z in data.dataMap.yellowData) { // 三级风险
              tab1LeftOption3.color = colorYellow
              tab1LeftOption3.title.text = '一般风险'
              tab1LeftOption3.series[0].name = '一般风险'
              tab1LeftOption3.series[0].label.normal.textStyle.color = '#fbc02d'
              tab1LeftOption3.series[0].labelLine.normal.lineStyle.color = '#fbc02d'
              if (data.dataMap.yellowData[z].num !== 0) {
                var a = {}
                a.name = data.dataMap.yellowData[z].name
                a.value = data.dataMap.yellowData[z].num
                tab1LeftOption3.series[0].data.push(a)
                pieNum3++
              }
              if (pieNum3 === 0) {
                tab1LeftOption3.series[0].data = []
                var a = {}
                a.name = '无数据'
                a.value = 0
                tab1LeftOption3.series[0].data.push(a)
              }
              this.leftBottomPie = echarts.init(document.getElementById('tab1_pie3'))
              this.leftBottomPie.setOption(tab1LeftOption3)
              window.addEventListener('resize', () => {
                this.leftBottomPie.resize()
              })
            }

            for (var k in data.dataMap.blueData) { // 四级风险
              tab1LeftOption4.color = colorBlue
              tab1LeftOption4.title.text = '低风险'
              tab1LeftOption4.series[0].name = '低风险'
              tab1LeftOption4.series[0].label.normal.textStyle.color = '#36A9CE'
              tab1LeftOption4.series[0].labelLine.normal.lineStyle.color = '#36A9CE'
              if (data.dataMap.blueData[k].num !== 0) {
                var a = {}
                a.name = data.dataMap.blueData[k].name
                a.value = data.dataMap.blueData[k].num
                tab1LeftOption4.series[0].data.push(a)
                pieNum4++
              }
              if (pieNum4 === 0) {
                tab1LeftOption4.series[0].data = []
                var a = {}
                a.name = '无数据'
                a.value = 0
                tab1LeftOption4.series[0].data.push(a)
              }
              this.rightBottomPie = echarts.init(document.getElementById('tab1_pie4'))
              this.rightBottomPie.setOption(tab1LeftOption4)
              window.addEventListener('resize', () => {
                this.rightBottomPie.resize()
              })
            }
          }
        })
      },
      //tab2柱状图
      inittab2BottomBar () {
        var barOption = {
          title: {
            text: '风险变化',
            textStyle: {
              color: '#fff',
              textStyle: {
                color: '#fff'
              },
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            textStyle: {
              color: '#fff'
            },
            data: ['风险个数']
          },
          //x轴的文本
          xAxis: {
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            /*  axisLine :{
                 lineStyle:{
                     color:'#fff'
                 }
             }, */
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          //y轴的文本
          yAxis: {
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            /* axisLine :{
                  lineStyle:{
                      color:'#fff'
                  }
              }, */
            splitLine: {
              lineStyle: {
                color: '#515D73'
              }
            }
          },
          series: [{
            name: '风险个数',
            type: 'bar',
            barCategoryGap: '50',
            data: []
          }]
        }
        var lineOption = {
          title: {
            text: '隐患变化',
            textStyle: {
              color: '#fff',
              textStyle: {
                color: '#fff'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            textStyle: {
              color: '#fff'
            },
            data: ['隐患个数']
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              /* axisLine :{
                  lineStyle:{
                      color:'#fff'
                  }
              }, */
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value',
              /*  axisLine :{
                   lineStyle:{
                       color:'#fff'
                   }
               }, */
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                formatter: '{value}'
              },
              splitLine: {
                lineStyle: {
                  color: '#515D73'
                }
              }
            }
          ],
          series: [
            {
              name: '隐患个数',
              type: 'line',
              data: []
            }
          ]
        }
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getRiskData'),
          method: 'get',
          params: this.$http.adornParams({areaName: this.areaName, type: 1})
        }).then(({data}) => {
          if (data && data.code === 0) {
            for (var x in data.dataMap.townListBar) {
              barOption.series[0].data[x] = data.dataMap.townListBar[x]
              this.tab2BottomBar = echarts.init(document.getElementById('tab2_bottom_bar'))
              this.tab2BottomBar.setOption(barOption)
              window.addEventListener('resize', () => {
                this.tab2BottomBar.resize()
              })
            }
            for (var y in data.dataMap.townListLine) {
              lineOption.series[0].data[y] = data.dataMap.townListLine[y]
              this.tab3BottomLine = echarts.init(document.getElementById('tab3_bottom_line'))
              this.tab3BottomLine.setOption(lineOption)
              window.addEventListener('resize', () => {
                this.tab3BottomLine.resize()
              })
            }
          }
        })
      },
      getCenterMap () {
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getCenterMap'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            for (var x in data.dataMap.districtList) {
              this.name[x] = data.dataMap.districtList[x].districtName
              this.areaColor[x] = data.dataMap.districtList[x].bgColor
              this.color[x] = data.dataMap.districtList[x].bgColor
            }
          }
        })
      },
      // 获取区域风险和隐患数量
      getRiskAndHiddenNum () {
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/areaCount'),
          method: 'get',
          params: this.$http.adornParams({areaOrIndustryName: this.areaName, type: 1})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.lastDanger = data.map.countAreaOld
            this.nowDanger = data.map.countAreaNow
            this.lastYH = data.map.countYhOld
            this.nowYH = data.map.countYhNow
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/reviewelementsList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      getDataList2 () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/enterpriseHighTroubleList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex1,
            'limit': this.pageSize1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList2 = data.page.list
            this.totalPage1 = data.page.totalCount
          } else {
            this.dataList2 = []
            this.totalPage1 = 0
          }
          this.dataListLoading1 = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },

      // 每页数
      sizeChangeHandle1 (val) {
        this.pageSize1 = val
        this.pageIndex1 = 1
        this.getDataList2()
      },
      // 当前页
      currentChangeHandle1 (val) {
        this.pageIndex1 = val
        this.getDataList2()
      },
      // 多选
      selectionChangeHandle1 (val) {
        this.dataListSelections1 = val
      }
    }
  }
</script>

<style lang="scss">
  .streetTab1 {
    & .business_echarts {
      position: absolute;
      top: 30%;
      left: 35%;
      width: 900px;
      height: 400px;
      z-index: 999;
      display: none;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 12px;
    }
  }

  .streetTab2 {
    & .tab2Box {
      & .tab2-title {
        display: flex;
        width: 100%;
        color: #fff;
        background: #133050;
        & div {
          flex: 1;
          text-align: center;
          line-height: 2em;
          font-size: 20px;
        }
      }
      & .tab2-mainBox {
        border: 2px solid #133050;
        border-top: 0;
        & .tab2-main {
          border-top: 1px solid #133050;
          padding: 10px;
          width: 100%;
        }
        & .main-title {
          color: #F6D650;
          font-size: 20px;
          line-height: 2em;
          display: inline-block;
        }
        & .main-content {
          text-align: center;
        }
      }
    }

  }
</style>
