<template>
  <el-dialog
    fullscreen
    :visible.sync="addDialogVisible">
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
                  <th rowspan="2">申报重大隐患企业数量</th>
                  <th rowspan="2">逾期未整改企业数量</th>
                </tr>
                </thead>
                <tbody id="DisUnitRiskTroubleContent">
                <tr v-for="(item,index) in areaDataList.slice(0, 7)">
                  <td>{{index+1}}</td><td>{{item.town}}</td>
                  <td @click="getUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitNum}}</td>
                  <td @click="getSbMajorHiddenUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.SbUnitNum}}</td>
                  <td @click="getOverdueMajorHiddenUnitInfo(0,item.areaCode)" style="cursor:pointer;">
                    {{item.OverdueRectificationListNum}}
                  </td>
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
                  <th rowspan="2">申报重大隐患企业数量</th>
                  <th rowspan="2">逾期未整改企业数量</th>
                </tr>
                </thead>
                <tbody id="DisUnitRiskTroubleContent2">
                <tr v-for="(item,index) in areaDataList.slice(7, 13)">
                  <td>{{index+8}}</td><td>{{item.town}}</td>
                  <td @click="getUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.unitNum}}</td>
                  <td @click="getSbMajorHiddenUnitInfo(0,item.areaCode)" style="cursor:pointer;">{{item.SbUnitNum}}</td>
                  <td @click="getOverdueMajorHiddenUnitInfo(0,item.areaCode)" style="cursor:pointer;">
                    {{item.OverdueRectificationListNum}}
                  </td>
                </tr>
                <tr>
                  <td>14</td><td>-</td>
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
                  <th rowspan="2">申报重大隐患企业数量</th>
                  <th rowspan="2">逾期未整改企业数量</th>
                </tr>
                </thead>
                <tbody id="busUnitRiskTroubleContent">
                <tr v-for="(item,index) in industryDataList.slice(0, 10)">
                  <td>{{index+1}}</td>
                  <td>{{item.businessType}}</td>
                  <td @click="getUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitNum}}</td>
                  <td @click="getSbMajorHiddenUnitInfo(1,item.industryCode)" style="cursor:pointer;">
                    {{item.BSbUnitNum}}
                  </td>
                  <td @click="getOverdueMajorHiddenUnitInfo(1,item.industryCode)" style="cursor:pointer;">
                    {{item.BOverdueRectificationListNum}}
                  </td>
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
                  <th rowspan="2">申报重大隐患企业数量</th>
                  <th rowspan="2">逾期未整改企业数量</th>
                </tr>
                </thead>
                <tbody id="busUnitRiskTroubleContent2">
                <tr v-for="(item,index) in industryDataList.slice(10, 20)">
                  <td>{{index+11}}</td>
                  <td>{{item.businessType}}</td>
                  <td @click="getUnitInfo(1,item.industryCode)" style="cursor:pointer;">{{item.BunitNum}}</td>
                  <td @click="getSbMajorHiddenUnitInfo(1,item.industryCode)" style="cursor:pointer;">
                    {{item.BSbUnitNum}}
                  </td>
                  <td @click="getOverdueMajorHiddenUnitInfo(1,item.industryCode)" style="cursor:pointer;">
                    {{item.BOverdueRectificationListNum}}
                  </td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <unit-info v-if="unitInfoVisible" ref="unitInfo"></unit-info>
  </el-dialog>
</template>

<script>
  import unitInfo from './hiddRiskMana-unitInfo'
  export default {
    data () {
      return {
        addDialogVisible: false,
        unitInfoVisible: false,
        areaDataList: [],
        industryDataList: []
      }
    },
    components: {
      unitInfo
    },
    mounted () {
    },
    methods: {
      init () {
        this.addDialogVisible = true
        this.getHiddenAreaData()
        this.getHiddenBusinessType()
      },
      // 13区街重大隐患情况
      getHiddenAreaData () {
        this.$http({
          url: this.$http.adornUrl('/hiddenCheck/getHiddenAreaData'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.areaDataList = []
            this.areaDataList = data.dataList
          }
        })
      },
      // 20个专委会隐患情况
      getHiddenBusinessType () {
        this.$http({
          url: this.$http.adornUrl('/hiddenCheck/getHiddenBusinessType'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.industryDataList = []
            this.industryDataList = data.dataList
          }
        })
      },
      // 企业
      getUnitInfo(flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(1, flag, code)
        })
      },
      // 申报重大隐患企业
      getSbMajorHiddenUnitInfo(flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(6, flag, code)
        })
      },
      // 逾期未整改重大隐患企业
      getOverdueMajorHiddenUnitInfo(flag, code) {
        console.log(code)
        this.unitInfoVisible = true
        this.$nextTick(() => {
          this.$refs.unitInfo.init(7, flag, code)
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
