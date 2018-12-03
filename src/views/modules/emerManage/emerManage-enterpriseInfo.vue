<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <div class="modulGround moduleTop" :style="{height: styleHeight}">
      <div class="modulTitle">
        <p>企业信息</p>
        <span></span>
      </div>
      <div class="moduleContent">
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
            label="安全部门负责人">
          </el-table-column>
          <el-table-column
            prop="safePersonMobile"
            header-align="center"
            align="center"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="varName1"
            header-align="center"
            align="center"
            label="所在辖区">
          </el-table-column>
          <el-table-column
            prop="varName2"
            header-align="center"
            align="center"
            label="所属行业">
          </el-table-column>
          <el-table-column
            prop="riskLevel"
            header-align="center"
            align="center"
            label="当前风险">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.riskLevel === 0 || scope.row.riskLevel === 1" size="small">红色</el-tag>
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
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        styleHeight: window.screen.availHeight - 35 + 'px',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        visible: false
      }
    },
    methods: {
      init() {
        this.visible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/emergency/appEmergencyRegulator/Enterpriselist'),
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
