<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <div class="mod-tableList">
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
          prop="safePerson"
          header-align="center"
          align="center"
          label="安全责任人">
        </el-table-column>
        <el-table-column
          prop="safePersonMobile"
          header-align="center"
          align="center"
          label="移动电话">
        </el-table-column>
        <el-table-column
          prop="staticRiskLevel"
          header-align="center"
          align="center"
          label="固有风险等级">
          <template slot-scope="scope">
            <span v-if="scope.row.staticRiskLevel=== 1">红色</span>
            <span v-else-if="scope.row.staticRiskLevel === 2">橙色</span>
            <span v-else-if="scope.row.staticRiskLevel === 3">黄色</span>
            <span v-else-if="scope.row.staticRiskLevel === 4">蓝色</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskLevel"
          header-align="center"
          align="center"
          label="当前风险等级">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel=== 1">红色</span>
            <span v-else-if="scope.row.riskLevel === 2">橙色</span>
            <span v-else-if="scope.row.riskLevel === 3">黄色</span>
            <span v-else-if="scope.row.riskLevel === 4">蓝色</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmType"
          header-align="center"
          align="center"
          label="预警类型">
          <template slot-scope="scope">
            <span v-if="scope.row.alarmType=== 1">实时监测</span>
            <span v-else-if="scope.row.alarmType === 2">隐患排查治理</span>
            <span v-else-if="scope.row.alarmType === 3">企业管理</span>
            <span v-else-if="scope.row.alarmType === 4">企业/行业安全责任事故</span>
            <span v-else-if="scope.row.alarmType === 5">气象环境</span>
            <span v-else-if="scope.row.alarmType === 6">固有风险评估</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          header-align="center"
          align="center"
          show-overflow-tooltip
          label="预警内容">
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
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: []
      }
    },
    methods: {
      init () {
        this.visible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/dashboard/riskChangeList'),
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
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      }
    }
  }
</script>

<style scoped>

</style>
