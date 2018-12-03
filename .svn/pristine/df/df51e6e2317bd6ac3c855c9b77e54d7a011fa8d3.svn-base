<!--监测信息-历史数据-->
<template>
  <el-row>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.eId" filterable clearable placeholder="企业" @focus="getEnterpriseTree()">
      <el-option
      v-for="item in eidOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select>
      <el-select v-model="dataForm.date" placeholder="时间" class="search_sensor">
        <el-option
          v-for="item in dateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="dataForm.startTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始时间" :disabled="this.dataForm.status==1">
      </el-date-picker>
      <el-date-picker
        v-model="dataForm.endTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束时间" :disabled="this.dataForm.status==1">
      </el-date-picker>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>

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
        :formatter="formatStatus"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="deviceLoca"
        header-align="center"
        align="center"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="realValue"
        header-align="center"
        align="center"
        label="实时值">
      </el-table-column>
      <el-table-column
        prop="unit"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="数据时间">
      </el-table-column>
      <el-table-column
        prop="alertDegree"
        header-align="center"
        align="center"
        width="200"
        :formatter="formatAlertDegree"
        label="报警级别">
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
    name: 'moniInfo-histData',
    data () {
      return {
        dataForm: {
          date: '60',
          eid: '',
          updateTime: '',
          startTime: '',
          endTime: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        eidOptions: [],
        dateOptions: [
            {label: '最近一小时', value: '60'},
            {label: '最近三小时', value: '180'},
            {label: '最近十二小时', value: '12'},
            {label: '最近三天', value: '3'},
            {label: '最近7天', value: '7'},
            {label: '最近一个月', value: '30'},
            {label: '最近3个月', value: '90'},
            {label: '最近一年', value: '365'}
        ],
        visible: false
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        this.visible = true
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sensor/sensorDataHistory/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'updateTime': this.dataForm.date,
            'unitId': this.dataForm.eId,
            'startTime': this.dataForm.startTime,
            'endTime': this.dataForm.endTime
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
      // 获取企业树
      getEnterpriseTree () {
        this.$http({
          url: this.$http.adornUrl('/enterprise/sysEnterprise/selectSysEnterpriseTree/0/0'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.eidOptions = data.list
          } else {
            this.eidOptions = []
          }
        })
      },
      formatAlertDegree: function (row, column) {
        return row.alertDegree == '1' ? '警报' : row.alertDegree == '0' ? '超限' : '未知'
      },
      formatStatus: function (row, column) {
        return row.status == '1' ? '禁用' : row.status == '0' ? '启用' : '未知'
      }
    }
  }
</script>

<style>

</style>
