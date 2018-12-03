<template>
  <el-dialog
    fullscreen
    :visible.sync="Visible">
    <div class="mod-regiEnte">
      <div class="modulGround">
        <div class="modulTitle">
          <p>13区街隐患情况</p>
          <span></span>
        </div>
        <!--盛放内容模块公共样式名称：moduleContent-->
        <div class="moduleContent" style="padding-top: 40px">
          <el-row :gutter="5">
            <el-col :span="12">
              <table class="tab-hover">
                <thead>
                <tr class="TableTitle">
                  <th rowspan="2">序号</th>
                  <th rowspan="2">区街</th>
                  <th rowspan="2">企业数量</th>
                  <th rowspan="2">申报隐患企业数量</th>
                  <th rowspan="2">未申报隐患企业数量</th>
                  <th rowspan="2">重大隐患数量</th>
                  <th rowspan="2">重大隐患逾期未整改</th>
                  <th rowspan="2">一般隐患数量</th>
                  <th rowspan="2">一般隐患逾期未整改</th>
                </tr>
                </thead>
                <tbody id="DisUnitRiskTroubleContent">
                <tr v-for="(item,index) in areaDataList.slice(0, 7)">
                  <td>{{index+1}}</td>
                  <td>{{item.town}}</td>
                  <td @click="getUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitNum}}</td>
                  <td @click="getSbUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.SbUnitNum}}</td>
                  <td @click="getWsbUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.WsbUnitNum}}</td>
                  <td @click="getMajorHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.jurisdictionTroubleListNum}}</td>
                  <td @click="getUnMajorHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.OverdueRectificationListNum}}</td>
                  <td @click="getHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitTroubleListNumListNum}}</td>
                  <td @click="getUnHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitTroubleNum}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
            <el-col :span="12">
              <table class="tab-hover">
                <thead>
                <tr class="TableTitle">
                  <th rowspan="2">序号</th>
                  <th rowspan="2">区街</th>
                  <th rowspan="2">企业数量</th>
                  <th rowspan="2">申报隐患企业数量</th>
                  <th rowspan="2">未申报隐患企业数量</th>
                  <th rowspan="2">重大隐患数量</th>
                  <th rowspan="2">重大隐患逾期未整改</th>
                  <th rowspan="2">一般隐患数量</th>
                  <th rowspan="2">一般隐患逾期未整改</th>
                </tr>
                </thead>
                <tbody id="DisUnitRiskTroubleContent2">
                <tr v-for="(item,index) in areaDataList.slice(7, 13)">
                  <td>{{index+8}}</td>
                  <td>{{item.town}}</td>
                  <td @click="getUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitNum}}</td>
                  <td @click="getSbUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.SbUnitNum}}</td>
                  <td @click="getWsbUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.WsbUnitNum}}</td>
                  <td @click="getMajorHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.jurisdictionTroubleListNum}}</td>
                  <td @click="getUnMajorHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.OverdueRectificationListNum}}</td>
                  <td @click="getHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitTroubleListNumListNum}}</td>
                  <td @click="getUnHiddenInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitTroubleNum}}</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="modulGround">
        <div class="modulTitle">
          <p>20专委会隐患情况</p>
          <span></span>
        </div>
        <!--盛放内容模块公共样式名称：moduleContent-->
        <div class="moduleContent" style="padding-top: 40px">
          <el-row :gutter="5">
            <el-col :span="12">
              <table class="tab-hover">
                <thead>
                <tr class="TableTitle">
                  <th rowspan="2">序号</th>
                  <th rowspan="2">行业</th>
                  <th rowspan="2">企业数量</th>
                  <th rowspan="2">申报隐患企业数量</th>
                  <th rowspan="2">未申报隐患企业数量</th>
                  <th rowspan="2">重大隐患数量</th>
                  <th rowspan="2">重大隐患逾期未整改</th>
                  <th rowspan="2">一般隐患数量</th>
                  <th rowspan="2">一般隐患逾期未整改</th>
                </tr>
                </thead>
                <tbody id="busUnitRiskTroubleContent">
                <tr v-for="(item,index) in industryDataList.slice(0, 10)">
                  <td>{{index+1}}</td>
                  <td>{{item.businessType}}</td>
                  <td @click="getUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitNum}}</td>
                  <td @click="getSbUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BSbUnitNum}}</td>
                  <td @click="getWsbUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BWsbUnitNum}}</td>
                  <td @click="getMajorHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BjurisdictionTroubleListNum}}</td>
                  <td @click="getUnMajorHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BOverdueRectificationListNum}}</td>
                  <td @click="getHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitTroubleListNumListNum}}</td>
                  <td @click="getUnHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitTroubleNum}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
            <el-col :span="12">
              <table class="tab-hover">
                <thead>
                <tr class="TableTitle">
                  <th rowspan="2">序号</th>
                  <th rowspan="2">行业</th>
                  <th rowspan="2">企业数量</th>
                  <th rowspan="2">申报隐患企业数量</th>
                  <th rowspan="2">未申报隐患企业数量</th>
                  <th rowspan="2">重大隐患数量</th>
                  <th rowspan="2">重大隐患逾期未整改</th>
                  <th rowspan="2">一般隐患数量</th>
                  <th rowspan="2">一般隐患逾期未整改</th>
                </tr>
                </thead>
                <tbody id="busUnitRiskTroubleContent2">
                <tr v-for="(item,index) in industryDataList.slice(10, 20)">
                  <td>{{index+11}}</td>
                  <td>{{item.businessType}}</td>
                  <td @click="getUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitNum}}</td>
                  <td @click="getSbUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BSbUnitNum}}</td>
                  <td @click="getWsbUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BWsbUnitNum}}</td>
                  <td @click="getMajorHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BjurisdictionTroubleListNum}}</td>
                  <td @click="getUnMajorHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BOverdueRectificationListNum}}</td>
                  <td @click="getHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitTroubleListNumListNum}}</td>
                  <td @click="getUnHiddenInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitTroubleNum}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <unit-info v-if="unitInfoVisible" ref="unitInfo"></unit-info>
      <major-hidden-info v-if="majorHiddenInfoVisible" ref="majorHiddenInfo"></major-hidden-info>
      <hidden-info v-if="hiddenInfoVisible" ref="hiddenInfo"></hidden-info>
    </div>
  </el-dialog>
</template>
<script>
  import unitInfo from './hiddRiskMana-unitInfo'
  import majorHiddenInfo from './hiddRiskMana-maiorHiddenInfo'
  import hiddenInfo from './hiddRiskMana-hiddenInfo'
  export default {
    data () {
      return {
        Visible: false,
        unitInfoVisible: false,
        majorHiddenInfoVisible: false,
        hiddenInfoVisible: false,
        areaDataList: [],
        industryDataList: []
      }
    },
    components: {
      unitInfo,
      majorHiddenInfo,
      hiddenInfo
    },
    mounted () {
    },
    methods: {
      init () {
        this.Visible = true
        this.getAreaData()
        this.getIndustryCodeData()
      },
      // 注册企业街区隐患信息
      getAreaData () {
        this.$http({
          url: this.$http.adornUrl('/hiddenCheck/getAreaData'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.areaDataList = []
            this.areaDataList = data.dataList
          }
        })
      },
      // 注册企业专委会隐患信息
      getIndustryCodeData () {
        this.$http({
          url: this.$http.adornUrl('/hiddenCheck/getIndustryCodeData'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.industryDataList = []
            this.industryDataList = data.dataList
          }
        })
      },
      getUnitInfo (flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(1, flag, code)
        })
      },
      // 申报隐患企业
      getSbUnitInfo (flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(2, flag, code)
        })
      },
      // 未申报隐患企业
      getWsbUnitInfo (flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(3, flag, code)
        })
      },
      // 重大隐患企业
      getMajorHiddenInfo (flag, code) {
        console.log(code)
        this.majorHiddenInfoVisible = true
        this.$nextTick(() => {
          this.$refs.majorHiddenInfo.init(0, flag, code)
        })
      },
      // 逾期未整改重大隐患
      getUnMajorHiddenInfo (flag, code) {
        console.log(code)
        this.majorHiddenInfoVisible = true
        this.$nextTick(() => {
          this.$refs.majorHiddenInfo.init(1, flag, code)
        })
      },
      // 一般隐患企业
      getHiddenInfo (flag, code) {
        console.log(code)
        this.hiddenInfoVisible = true
        this.$nextTick(() => {
          this.$refs.hiddenInfo.init(0, flag, code)
        })
      },
      // 逾期未整改一般企业
      getUnHiddenInfo (flag, code) {
        console.log(code)
        this.hiddenInfoVisible = true
        this.$nextTick(() => {
          this.$refs.hiddenInfo.init(1, flag, code)
        })
      }
    }
  }
</script>

<style lang="scss">
  .mod-regiEnte {
    & .tab-hover {
      & td{
        white-space:nowrap;
      }
      & .TableTitle {
        background: #042141;
        padding: 5px 0;
      }
    }
  }


</style>
