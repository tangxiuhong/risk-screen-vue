<!--监测信息-人员定位-->
<template>
  <el-row>
    <div class="inputMargin">
      <el-select v-model="enterpriseId" clearable filterable placeholder="请输入企业名称" @change="changeEnterprise"
                 @focus="getEnterpriseByUnitTypeList()">
        <el-option
          v-for="item in EnterpriseList"
          :key="item.id"
          :label="item.enterpriseName"
          :value="item.id">
        </el-option>
      </el-select>

      <el-select v-model="cardNo" clearable filterable placeholder="请输入人员名称" @change="changeEnterprise"
                 @focus="getPersList()">
        <el-option
          v-for="item in PersList"
          :key="item.id"
          :label="item.enterpriseName"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="企业名称">
      </el-table-column>
      <el-table-column
        prop="cardNo"
        header-align="center"
        align="center"
        label="卡号">
      </el-table-column>
      <el-table-column
        prop="pName"
        header-align="center"
        align="center"
        label="人员名称">
      </el-table-column>
      <el-table-column
        prop="idNo"
        header-align="center"
        align="center"
        label="身份证">
      </el-table-column>
      <el-table-column
        prop="officeWork"
        header-align="center"
        align="center"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="nowArea"
        header-align="center"
        align="center"
        label="区域编号">
      </el-table-column>
      <el-table-column
        prop="accessTime"
        header-align="center"
        align="center"
        label="出入井时间">
      </el-table-column>
      <el-table-column
        prop="arriveNowTime"
        header-align="center"
        align="center"
        width="200"
        label="到达当前区域时间">
      </el-table-column>
      <el-table-column
        prop="V1"
        header-align="center"
        align="center"
        label="矿井是否超员">
      </el-table-column>
      <el-table-column
        prop="V2"
        header-align="center"
        align="center"
        label="重点区域是否超员">
      </el-table-column>
      <el-table-column
        prop="V3"
        header-align="center"
        align="center"
        label="限制区域是否有人">
      </el-table-column>
      <el-table-column
        prop="V5"
        header-align="center"
        align="center"
        label="矿井当前人数">
      </el-table-column>
      <el-table-column
        prop="V6"
        header-align="center"
        align="center"
        label="分站号">
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
  </el-row>

</template>
<script>
  export default {
    name: 'moniInfo-persLoca',
    data () {
      return {
        enterpriseId: '',
        cardNo: '',
        visible: false,
        dataList: [],
        EnterpriseList: [],
        PersList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        restaurants: [],
        enteName: '',
        persName: '',
        timeout: null
      }
    },
    methods: {
      init (id, no) {
        this.visible = true
        this.enterpriseId = id
        console.log('6 enterpriseId:' + this.enterpriseId)
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sensor/personnelRytz/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            unitId: id,
            cardNo: no
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
      getEnterpriseByUnitTypeList () {
        this.$http({
          url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getEnterpriseByUnitTypeList'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.EnterpriseList = data.list
          }
        })
      },
      getPersList () {
        this.$http({
          url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getEnterpriseByUnitTypeList'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.PersList = data.list
          }
        })
      },
      changeEnterprise () {
        this.init(this.enterpriseId, this.cardNo)
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style>

</style>
