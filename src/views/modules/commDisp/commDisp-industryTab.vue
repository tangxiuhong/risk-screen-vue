<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <el-tabs v-model="industryName" type="border-card" @tab-click="tabShow">
      <el-tab-pane label="行业风险一览图" name="first">
        <div class="industryTab1">
          <div class="tab1Head">
            鄂州市行业安全风险比较图
          </div>
          <div class="tab1Echarts">
            <el-row>
              <el-col :span="6">
                <div class="tab1Up-Echarts" id="tab1_industry_pie1"></div>
              </el-col>
              <el-col :span="6">
                <div class="tab1Up-Echarts" id="tab1_industry_pie2"></div>
              </el-col>
              <el-col :span="6">
                <div class="tab1Up-Echarts" id="tab1_industry_pie3"></div>
              </el-col>
              <el-col :span="6">
                <div class="tab1Up-Echarts" id="tab1_industry_pie4"></div>
              </el-col>
            </el-row>
          </div>
          <div class="center-quarter-box">
            <div class="center-quarter">
              <div class="quarter" @click="quarterEve(index+1)" v-for="(itemName,index) in monthList"
                   :class="{quarterCss:index==current-1}">{{itemName.title}}
              </div>
            </div>
            <div class="tab1Center-Echarts">
              <div class="main-content" style="height:300px" id="tab1_center_bar"></div>
            </div>
          </div>
          <div class="bottom-table-box">
            <div class="table-Title">主要行业风险分析</div>
            <div class="main-table">
              <table>
                <tr>
                  <td>{{feimei4}}:{{feimeiNum4}}家</td>
                  <td>{{feimei3}}:{{feimeiNum3}}家</td>
                  <td>{{feimei2}}:{{feimeiNum2}}家</td>
                  <td>{{feimei1}}:{{feimeiNum1}}家</td>
                </tr>
                <tr>
                  <td>{{shiyou4}}:{{shiyouNum4}}家</td>
                  <td>{{shiyou3}}:{{shiyouNum3}}家</td>
                  <td>{{shiyou2}}:{{shiyouNum2}}家</td>
                  <td>{{shiyou1}}:{{shiyouNum1}}家</td>
                </tr>
                <tr>
                  <td>{{gongye4}}:{{gongyeNum4}}家</td>
                  <td>{{gongye3}}:{{gongyeNum3}}家</td>
                  <td>{{gongye2}}:{{gongyeNum2}}家</td>
                  <td>{{gongye1}}:{{gongyeNum1}}家</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="industryRiskName" name="second">
        <div class="industryTab2">
          <div class="tab2Box">
            <div class="tab2-title">
              <div>上月重大风险情况：{{lastDanger}}</div>
              <div>本月重大风险情况：{{nowDanger}}</div>
            </div>
            <div class="tab2-mainBox">
              <div class="tab2-main" ref="tab2Main">
                <div class="main-content" style="height:300px" id="tab2_industry_bottom_bar">
                </div>
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
      </el-tab-pane>
      <el-tab-pane :label="industryTroubleName" name="third">
        <div class="industryTab2">
          <div class="tab2Box">
            <div class="tab2-title">
              <div>上月隐患排查情况：{{lastYH}}</div>
              <div>本月隐患排查情况：{{nowYH}}</div>
            </div>
            <div class="tab2-mainBox">
              <div class="tab2-main">
                <div class="main-content" style="height:300px" id="tab3_industry_bottom_line"></div>
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
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        industryName: 'first',
        visible: false,
        quarterClass: false,
        lastDanger: 0,
        nowDanger: 0,
        lastYH: 0,
        nowYH: 0,
        tap1IndustryPie1: null,
        tap1IndustryPie2: null,
        tap1IndustryPie3: null,
        tap1IndustryPie4: null,
        tap1businessBar5: null,
        type: 1,
        monthList: [
          {title: '第一季度'},
          {title: '第二季度'},
          {title: '第三季度'},
          {title: '第四季度'}
        ],
        current: 1,
        feimei1: '',
        feimei2: '',
        feimei3: '',
        feimei4: '',
        feimeiNum1: '',
        feimeiNum2: '',
        feimeiNum3: '',
        feimeiNum4: '',
        shiyou1: '',
        shiyou2: '',
        shiyou3: '',
        shiyou4: '',
        shiyouNum1: '',
        shiyouNum2: '',
        shiyouNum3: '',
        shiyouNum4: '',
        gongye1: '',
        gongye2: '',
        gongye3: '',
        gongye4: '',
        gongyeNum1: '',
        gongyeNum2: '',
        gongyeNum3: '',
        gongyeNum4: '',
        industryRiskName: '所有行业风险信息',
        industryTroubleName: '所有行业隐患信息',
        industryCodeName: '',
        tab2BottomBar: null,
        tab3BottomLine: null,
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
        items: [0, 1, 2, 3]
      }
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.tap1IndustryPie1) {
        this.tap1IndustryPie1.resize()
      }
      if (this.tap1IndustryPie2) {
        this.tap1IndustryPie2.resize()
      }
      if (this.tap1IndustryPie3) {
        this.tap1IndustryPie3.resize()
      }
      if (this.tap1IndustryPie4) {
        this.tap1IndustryPie4.resize()
      }
      if (this.tap1businessBar5) {
        this.tap1businessBar5.resize()
      }
      if (this.tab2BottomBar) {
        this.tab2BottomBar.resize()
      }
      if (this.tab3BottomLine) {
        this.tab3BottomLine.resize()
      }
    },
    mounted () {
      this.inittab1IndustryPie()
      this.inittap1businessBar5()
      this.getBusinessNum()
      this.inittab2BottomBar()
      this.getBusinessRiskAndHiddenNum()
    },
    methods: {
      // tab切换按需加载
      tabShow (tab, event) {
        if (tab.name === 'first') {
          this.$nextTick(() => {
            this.inittab1IndustryPie()
            this.inittap1businessBar5()
            this.getBusinessNum()
          })
        }
        if (tab.name === 'second') {
          this.$nextTick(() => {
            this.inittab2BottomBar()
            this.inittap1businessBar5()
            this.getDataList()
          })
        }
        if (tab.name === 'third') {
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
      // 顶部四个饼图
      inittab1IndustryPie () {
        var colorRed = ['#CC0000', '#d6494b', '#e9595b', '#f96868', '#fa7a7a', '#fa9898', '#fab4b4', 'fad3d3', '#ffeaea']
        var colorOrange = ['#FF9933', '#e98f2e', '#ec9940', '#f2a654', '#f4b066', '#f6be80', '#fbce9d', '#ffddb9', '#fff3e6']
        var colorYellow = ['#FFFF00', '#fbc02d', '#f9cd48', '#f7da64', '#f7e083', '#f8e59b', '#f6e7a9', '#f9eec1', '#fffae7']
        var colorBlue = ['#36A9CE', '#3583ca', '#4e97d9', '#62a8ea', '#89bceb', '#a2caee', '#bcd8f1', '#d5e4f1', '#e8f1f8']
        var businessParOption1 = {
          color: [],
          title: {
            text: '',
            left: 'center',
            top: '3%',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 40,
            data: [],
            show: false
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '50%'],
              center: ['50%', '55%'],
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
                }
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

        var businessParOption2 = {
          color: [],
          title: {
            text: '',
            left: 'center',
            top: '3%',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 40,
            data: [],
            show: false
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '50%'],
              center: ['50%', '55%'],
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
                }
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
        var businessParOption3 = {
          color: [],
          title: {
            text: '',
            left: 'center',
            top: '3%',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 40,
            data: [],
            show: false
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '50%'],
              center: ['50%', '55%'],
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
                }
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
        var businessParOption4 = {
          color: [],
          title: {
            text: '',
            left: 'center',
            top: '3%',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: '华文新魏',
              fontSize: '24'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 40,
            data: [],
            show: false
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0%', '50%'],
              center: ['50%', '55%'],
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
                }
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
          url: this.$http.adornUrl('/command/commandInfo/getBusinessRiskBar'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            businessParOption1.series[0].data = []
            businessParOption2.series[0].data = []
            businessParOption3.series[0].data = []
            businessParOption4.series[0].data = []
            var pieNum1 = 0
            var pieNum2 = 0
            var pieNum3 = 0
            var pieNum4 = 0
            for (var x in data.dataMap.firstRisk) { // 一级风险
              businessParOption1.color = colorRed
              businessParOption1.title.text = '重大风险'
              businessParOption1.series[0].name = '重大风险'
              businessParOption1.series[0].label.normal.textStyle.color = '#CC0000'
              businessParOption1.series[0].labelLine.normal.lineStyle.color = '#CC0000'
              if (data.dataMap.firstRisk[x].num !== 0) {
                var a = {}
                a.name = data.dataMap.firstRisk[x].name
                a.value = data.dataMap.firstRisk[x].num
                businessParOption1.series[0].data.push(a)
                pieNum1++
              }
              if (pieNum1 === 0) {
                businessParOption1.series[0].data = []
                var b = {}
                b.name = '无数据'
                b.value = 0
                businessParOption1.series[0].data.push(b)
              }
            }
            this.tap1IndustryPie1 = echarts.init(document.getElementById('tab1_industry_pie1'))
            this.tap1IndustryPie1.setOption(businessParOption1)
            window.addEventListener('resize', () => {
              this.tap1IndustryPie1.resize()
            })

            for (var y in data.dataMap.secondRisk) { // 二级风险
              businessParOption2.color = colorOrange
              businessParOption2.title.text = '较大风险'
              businessParOption2.series[0].name = '较大风险'
              businessParOption2.series[0].label.normal.textStyle.color = '#ff9933'
              businessParOption2.series[0].labelLine.normal.lineStyle.color = '#ff9933'
              if (data.dataMap.secondRisk[y].num !== 0) {
                var c = {}
                c.name = data.dataMap.secondRisk[y].name
                c.value = data.dataMap.secondRisk[y].num
                businessParOption2.series[0].data.push(c)
                pieNum2++
              }
              if (pieNum2 === 0) {
                businessParOption2.series[0].data = []
                var d = {}
                d.name = '无数据'
                d.value = 0
                businessParOption2.series[0].data.push(d)
              }
            }
            this.tap1IndustryPie2 = echarts.init(document.getElementById('tab1_industry_pie2'))
            this.tap1IndustryPie2.setOption(businessParOption2)
            window.addEventListener('resize', () => {
              this.tap1IndustryPie2.resize()
            })

            for (var z in data.dataMap.secondRisk) { // 三级风险
              businessParOption3.color = colorYellow
              businessParOption3.title.text = '一般风险'
              businessParOption3.series[0].name = '一般风险'
              businessParOption3.series[0].label.normal.textStyle.color = '#fbc02d'
              businessParOption3.series[0].labelLine.normal.lineStyle.color = '#fbc02d'
              if (data.dataMap.thirdRisk[z].num !== 0) {
                var e = {}
                e.name = data.dataMap.thirdRisk[z].name
                e.value = data.dataMap.thirdRisk[z].num
                businessParOption3.series[0].data.push(e)
                pieNum3++
              }
              if (pieNum3 === 0) {
                businessParOption3.series[0].data = []
                var d2 = {}
                d2.name = '无数据'
                d2.value = 0
                businessParOption3.series[0].data.push(d2)
              }
            }
            this.tap1IndustryPie3 = echarts.init(document.getElementById('tab1_industry_pie3'))
            this.tap1IndustryPie3.setOption(businessParOption3)
            window.addEventListener('resize', () => {
              this.tap1IndustryPie3.resize()
            })

            for (var k in data.dataMap.fourthRisk) { // 四级风险
              businessParOption4.color = colorBlue
              businessParOption4.title.text = '低风险'
              businessParOption4.series[0].name = '低风险'
              businessParOption4.series[0].label.normal.textStyle.color = '#36A9CE'
              businessParOption4.series[0].labelLine.normal.lineStyle.color = '#36A9CE'
              if (data.dataMap.fourthRisk[k].num !== 0) {
                var e1 = {}
                e1.name = data.dataMap.fourthRisk[k].name
                e1.value = data.dataMap.fourthRisk[k].num
                businessParOption4.series[0].data.push(e1)
                pieNum4++
              }
              if (pieNum4 === 0) {
                businessParOption4.series[0].data = []
                var e2 = {}
                e2.name = '无数据'
                e2.value = 0
                businessParOption4.series[0].data.push(e2)
              }
            }
            this.tap1IndustryPie4 = echarts.init(document.getElementById('tab1_industry_pie4'))
            this.tap1IndustryPie4.setOption(businessParOption4)
            window.addEventListener('resize', () => {
              this.tap1IndustryPie4.resize()
            })
          }
        })
      },
      inittap1businessBar5 () {
        // 行业风险比较图 四个季度
        var businessBarOption5 = {
          title: {
            text: ' ',
            textStyle: {
              fontSize: '18',
              fontFamily: '华文新魏',
              color: '#fff'
            },
            top: '3%',
            left: 'center',
            subtext: null
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['重大风险', '较大风险', '一般风险', '低风险'],
            left: 'center',
            textStyle: {
              color: '#fff'
            },
            top: '15%'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true}
            }
          },
          grid: {
            left: '5%',
            top: '30%',
            bottom: '20%'
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
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              data: []
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              type: 'value',
              y: '20'
            }
          ],
          series: [
            {
              barWidth: 50,
              name: '重大风险',
              type: 'bar',
              stack: 'a',
              data: [],
              itemStyle: {
                normal: {color: '#FF0000'}
              }
            },
            {
              barWidth: 50,
              name: '较大风险',
              type: 'bar',
              stack: 'a',
              data: [],
              itemStyle: {
                normal: {color: '#FF9900'}
              }
            },
            {
              barWidth: 50,
              name: '一般风险',
              type: 'bar',
              stack: 'a',
              data: [],
              itemStyle: {
                normal: {color: '#FDFE02'}
              }
            },
            {
              barWidth: 50,
              name: '低风险',
              type: 'bar',
              stack: 'a',
              data: [],
              itemStyle: {
                normal: {color: '#36A9CE'}
              }
            }
          ]
        }
        // 行业安全作业比较图 四个季度
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getBusinessRiskBarNum'),
          method: 'get',
          params: this.$http.adornParams({type: this.type})
        }).then(({data}) => {
          var tems = [] // 取值数组
          var dates1 = [] // 弱风险
          var dates2 = [] // 一般风险
          var dates3 = [] // 较大风险
          var dates4 = [] // 重大风险
          if (data && data.code === 0) {
            for (var x in data.dataMap.RedRiskDate) {
              tems[x] = data.dataMap.RedRiskDate[x].name
              dates4[x] = data.dataMap.RedRiskDate[x].num
            }
            for (var y in data.dataMap.BlueRiskDate) {
              dates1[y] = data.dataMap.BlueRiskDate[y].num
            }
            for (var z in data.dataMap.YellowRiskDate) {
              dates2[z] = data.dataMap.YellowRiskDate[z].num
            }
            for (var k in data.dataMap.OrangeRiskDate) {
              dates3[k] = data.dataMap.OrangeRiskDate[k].num
            }
            if (this.type === 1) {
              businessBarOption5.title.text = '第一季度行业风险比较图'
            } else if (this.type === 2) {
              businessBarOption5.title.text = '第二季度行业风险比较图'
            } else if (this.type === 3) {
              businessBarOption5.title.text = '第三季度行业风险比较图'
            } else {
              businessBarOption5.title.text = '第四季度行业风险比较图'
            }
            // 将数组中的值赋给echarts的图案
            businessBarOption5.xAxis[0].data = tems
            businessBarOption5.series[0].data = dates4
            businessBarOption5.series[1].data = dates3
            businessBarOption5.series[2].data = dates2
            businessBarOption5.series[3].data = dates1
            this.tap1businessBar5 = echarts.init(document.getElementById('tab1_center_bar'))
            this.tap1businessBar5.setOption(businessBarOption5)
            window.addEventListener('resize', () => {
              this.tap1businessBar5.resize()
            })
            // 柱状图点击事件
            var _this = this
            this.tap1businessBar5.on('click', function (param) {
              _this.industryRiskName = param.name + '风险信息'
              _this.industryTroubleName = param.name + '隐患信息'
              _this.industryCodeName = param.name
              // 点击柱状图 根据区域重新获取区域风险及隐患情况
              _this.getBusinessRiskAndHiddenNum()
              _this.inittab2BottomBar()
            })
          }
        })
      },
      // 主要行业风险分析 四个色块
      getBusinessNum () {
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/getBusinessNum'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            // 红色风险
            this.feimei1 = data.dataMap.RedDate[0].name
            this.feimeiNum1 = data.dataMap.RedDate[0].num
            this.shiyou1 = data.dataMap.RedDate[1].name
            this.shiyouNum1 = data.dataMap.RedDate[1].num
            this.gongye1 = data.dataMap.RedDate[2].name
            this.gongyeNum1 = data.dataMap.RedDate[2].num

            // 橙色风险
            this.feimei2 = data.dataMap.OrangeDate[0].name
            this.feimeiNum2 = data.dataMap.OrangeDate[0].num
            this.shiyou2 = data.dataMap.OrangeDate[1].name
            this.shiyouNum2 = data.dataMap.OrangeDate[1].num
            this.gongye2 = data.dataMap.OrangeDate[2].name
            this.gongyeNum2 = data.dataMap.OrangeDate[2].num

            // 黄色风险
            this.feimei3 = data.dataMap.YellowDate[0].name
            this.feimeiNum3 = data.dataMap.YellowDate[0].num
            this.shiyou3 = data.dataMap.YellowDate[1].name
            this.shiyouNum3 = data.dataMap.YellowDate[1].num
            this.gongye3 = data.dataMap.YellowDate[2].name
            this.gongyeNum3 = data.dataMap.YellowDate[0].num

            // 蓝色风险
            this.feimei4 = data.dataMap.BlueDate[0].name
            this.feimeiNum4 = data.dataMap.BlueDate[0].num
            this.shiyou4 = data.dataMap.BlueDate[1].name
            this.shiyouNum4 = data.dataMap.BlueDate[1].num
            this.gongye4 = data.dataMap.BlueDate[2].name
            this.gongyeNum4 = data.dataMap.BlueDate[0].num
          }
        })
      },
      // 获取行业风险和隐患数量
      getBusinessRiskAndHiddenNum () {
        this.$http({
          url: this.$http.adornUrl('/command/commandInfo/areaCount'),
          method: 'get',
          params: this.$http.adornParams({areaOrIndustryName: this.industryCodeName, type: 2})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.lastDanger = data.map.countAreaOld
            this.nowDanger = data.map.countAreaNow
            this.lastYH = data.map.countYhOld
            this.nowYH = data.map.countYhNow
          }
        })
      },
      inittab2BottomBar () {
        var barOption = {
          title: {
            text: '风险变化',
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
            data: ['风险个数']
          },
          // x轴的文本
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
          // y轴的文本
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
          params: this.$http.adornParams({areaName: this.industryCodeName, type: 2})
        }).then(({data}) => {
          if (data && data.code === 0) {
            for (var x in data.dataMap.townListBar) {
              barOption.series[0].data[x] = data.dataMap.townListBar[x]
              this.tab2BottomBar = echarts.init(document.getElementById('tab2_industry_bottom_bar'))
              this.tab2BottomBar.setOption(barOption)
              window.addEventListener('resize', () => {
                this.tab2BottomBar.resize()
              })
            }
            for (var y in data.dataMap.townListLine) {
              lineOption.series[0].data[y] = data.dataMap.townListLine[y]
              this.tab3BottomLine = echarts.init(document.getElementById('tab3_industry_bottom_line'))
              this.tab3BottomLine.setOption(lineOption)
              window.addEventListener('resize', () => {
                this.tab3BottomLine.resize()
              })
            }
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
            console.log(data)
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
      },
      quarterEve (num1) {
        this.type = num1
        this.inittap1businessBar5()
        this.current = num1
      }
    }
  }
</script>

<style lang="scss">
  .industryTab1 {
    color: #fff;
    & .tab1Head {
      font-size: 23px;
      line-height: 2em;
      text-align: center;
      font-family: '华文新魏';
    }
    & .tab1Up-Echarts {
      height: 190px;
      text-align: center;
    }
    & .center-quarter-box {
      overflow: hidden;
      & .center-quarter {
        display: flex;
        width: 400px;
        line-height: 2em;
        margin-top: 20px;
        & .quarter {
          cursor: pointer;
          flex: 1;
          text-align: center;
          color: #FFF;
        }
        & .quarterCss {
          background: #1aa8ee;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
    }
    & .tab1Center-Echarts {
      height: 300px;
      text-align: center;
    }
    & .bottom-table-box {
      margin: 20px 0;
      & .table-Title {
        font-size: 20px;
        line-height: 2em;
      }
      & .main-table {
        & table {
          width: 100%;
          border-collapse: collapse;
          & tr {
            line-height: 1.5em;
            & td {
              padding: 6px;
            }
            & td:nth-child(1) {
              background: #31A9CE;
            }
            & td:nth-child(2) {
              background: #C6CA21;
            }
            & td:nth-child(3) {
              background: #FF9900;
            }
            & td:nth-child(4) {
              background: #FF0000;
            }
          }
        }
      }
    }
  }

  .industryTab2 {
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
