<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <el-tabs v-model="mailList" type="border-card" @tab-click="mailClick">
      <el-tab-pane label="企业通讯录" name="first">
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
            prop="varName"
            header-align="center"
            align="center"
            label="所属区域">
          </el-table-column>
          <el-table-column
            prop="varName1"
            header-align="center"
            align="center"
            label="所属行业">
          </el-table-column>
          <el-table-column
            prop="mainPerson"
            header-align="center"
            align="center"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="mainPersonMobile"
            header-align="center"
            align="center"
            label="联系电话">
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
      </el-tab-pane>
      <el-tab-pane label="监管部门通讯录" name="second">
        <el-table
          :data="dataList1"
          border
          v-loading="dataListLoading1"
          @selection-change="selectionChangeHandle1"
          style="width: 100%;">
          <el-table-column
            prop="regulatorName"
            header-align="center"
            align="center"
            label="监管部门名称">
          </el-table-column>
          <el-table-column
            prop="varName"
            header-align="center"
            align="center"
            label="监管部门类型">
          </el-table-column>
          <el-table-column
            prop="contacts"
            header-align="center"
            align="center"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="phone"
            header-align="center"
            align="center"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            header-align="center"
            align="center"
            label="邮箱">
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
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataList1: [],
        pageIndex1: 1,
        pageSize1: 10,
        totalPage1: 0,
        dataListLoading1: false,
        visible: false,
        mailList: 'first'
      }
    },
    methods: {
      init () {
        this.visible = true
        this.getDataList()
        this.getDataList2()
      },
      mailClick (tab, event) {
        if (tab.name === 'first') {

        }
        if (tab.name === 'second') {

        }
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/emergency/appEmergencyRegulator/list'),
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
      // 获取数据列表
      getDataList2 () {
        this.dataListLoading1 = true
        this.$http({
          url: this.$http.adornUrl('/emergency/appEmergencyRegulator/Regulatorlist'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex1,
            'limit': this.pageSize1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1 = data.page.list
            this.totalPage1 = data.page.totalCount
          } else {
            this.dataList1 = []
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

<style>
  .mailBox {
    overflow: hidden;
    width: 700px;
    margin: 0 auto;
  }

  .mailLeft, .mailRight {
    float: left;
    width: 350px;
  }

</style>
