<!--企业监测预警-->
<template>
  <el-row>
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
        prop="deviceName"
        header-align="center"
        align="center"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="deviceLoca"
        header-align="center"
        align="center"
        label="安装位置">
      </el-table-column>
      <el-table-column
        prop="realValue"
        header-align="center"
        align="center"
        label="报警值">
      </el-table-column>
      <el-table-column
        prop="alarmTime"
        header-align="center"
        align="center"
        label="报警时间">
      </el-table-column>
      <el-table-column
        prop="unit"
        header-align="center"
        align="center"
        label="计量单位">
      </el-table-column>
      <el-table-column
        prop="alertDegree"
        header-align="center"
        align="center"
        label="报警级别">
        <template slot-scope="scope">
          <span v-if="scope.row.alertDegree=== '0'">报警</span>
          <span v-else-if="scope.row.alertDegree === '1'">预警</span>
        </template>
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
    data () {
      return {
        dataForm: {
          enterpriseId: '',
          alertDegree: '',
          quarter: 8
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: []
      }
    },
    methods: {
      init (id) {
        this.dataForm.enterpriseId = id || 0
        console.log('5 enterpriseId:' + this.dataForm.enterpriseId)
        this.getDataList()
      },
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sensor/sensorDataWarn/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'enterpriseId': this.dataForm.enterpriseId,
            'quarter': this.dataForm.quarter
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
      }
    }
  }
</script>

<style>

</style>
