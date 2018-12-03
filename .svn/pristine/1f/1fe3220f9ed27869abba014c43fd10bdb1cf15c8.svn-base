<template>
  <el-dialog
    fullscreen
    :visible.sync="addDialogVisible">
    <div class="mod-tableList">
      <div class="modulGround">
        <div class="modulTitle">
          <p>应急专家信息</p>
          <span></span>
        </div>
        <!--盛放内容模块公共样式名称：moduleContent-->
        <div class="moduleContent moduleTop"  :style="{height: styleHeight}">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;">
          <el-table-column
            prop="expertName"
            header-align="center"
            align="center"
            label="专家名称">
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="专家类型">
          </el-table-column>
          <el-table-column
            prop="unit"
            header-align="center"
            align="center"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="position"
            header-align="center"
            align="center"
            label="职称">
          </el-table-column>
          <el-table-column
            prop="serviceField"
            header-align="center"
            align="center"
            label="服务领域">
          </el-table-column>
          <el-table-column
            prop="phone"
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
      </div>
    </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        styleHeight: window.screen.availHeight - 35 + 'px',
        type: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        addDialogVisible: false
      }
    },
    mounted() {
    },
    methods: {
      init(id) {
        this.type = id
        this.addDialogVisible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/emergency/appEmergencyManager/EmergencyExpertlist'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'expertType': this.type
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

<style lang="scss">
  .mod-tableList {
    color: #fff;
    & .table-responsive {
      width: 100%;
      & td {
        white-space: nowrap;
      }
      & .item {
        background: #042141;
        line-height: 2em;
      }
      & #context {
        & tr {
          border-bottom: 1px solid #fff;
          line-height: 2em;
        }
        :hover {
          background: rgba(255, 255, 255, .1);
        }
      }
    }
  }


</style>
