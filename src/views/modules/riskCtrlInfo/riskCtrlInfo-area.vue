<template>
  <el-dialog
    :title="'企业信息'"
    :close-on-click-modal="false"
    fullscreen
    :visible.sync="visible">
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
        prop="contactAddress"
        header-align="center"
        align="center"
        label="通讯地址">
      </el-table-column>
      <el-table-column
        prop="enterpriseId"
        header-align="center"
        align="center"
        label="企业编号">
      </el-table-column>
      <el-table-column
        prop="safePerson"
        header-align="center"
        align="center"
        label="安全部门负责人">
      </el-table-column>
      <el-table-column
        prop="safePersonMobile"
        header-align="center"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="varName3"
        header-align="center"
        align="center"
        label="所属行业">
      </el-table-column>
      <el-table-column
        prop="varName4"
        header-align="center"
        align="center"
        label="所属区域">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="街道/社区">
      </el-table-column>
      <el-table-column
        prop="regulatorName"
        header-align="center"
        align="center"
        label="主管部门">
      </el-table-column>
      <el-table-column
        prop="riskLevel"
        header-align="center"
        align="center"
        label="当前风险">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.riskLevel === 1" size="small" type="danger">红色</el-tag>
          <el-tag v-if="scope.row.riskLevel === 2" size="small">橙色</el-tag>
          <el-tag v-if="scope.row.riskLevel === 3" size="small">黄色</el-tag>
          <el-tag v-if="scope.row.riskLevel === 4" size="small">蓝色</el-tag>
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
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dataForm: {
          areaCode: 0,
          riskLevel: 4
        },
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
      init (areaCode, riskLevel) {
        this.visible = true
        console.log(areaCode)
        console.log(riskLevel)
        this.dataForm.areaCode = areaCode
        this.dataForm.riskLevel = riskLevel
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/riskCtrlAreaInfo/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'areaCode': this.dataForm.areaCode,
            'riskLevel': this.dataForm.riskLevel
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

<style>

</style>
