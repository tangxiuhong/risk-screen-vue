<template>
  <el-dialog
    fullscreen
    :visible.sync="addDialogVisible">
    <div class="modulGround">
      <div class="modulTitle">
        <p @click="monitoringTitle()">{{name}}-企业监测信息</p>
        <span></span>
      </div>
      <!--盛放内容模块公共样式名称：moduleContent-->
      <div class="moduleContent" style="margin-top: 30px;">
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
            width="220"
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
            prop="deviceLoca"
            header-align="center"
            align="center"
            label="传感器位置">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            header-align="center"
            align="center"
            label="传感器类型">
          </el-table-column>
          <el-table-column
            prop="alarmTime"
            header-align="center"
            align="center"
            width="180"
            label="报警时间">
          </el-table-column>
          <el-table-column
            prop="realValue"
            header-align="center"
            align="center"
            width="180"
            label="报警值">
          </el-table-column>
          <el-table-column
            prop="alertDegree"
            header-align="center"
            align="center"
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
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        addDialogVisible: false,
        name: '',
        areaId: '',
        businessType: '',
        enterpriseId: '',
        cardNo: '',
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
      init (areaId, businessType, name) {
        this.addDialogVisible = true
        this.name = name
        this.areaId = areaId
        this.businessType = businessType
        this.dataListLoading = true
        this.getDataList()
      },
      getDataList () {
        this.$http({
          url: this.$http.adornUrl('/sensor/sensorDataWarn/selectMoniWarnList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            areaId: this.areaId,
            businessType: this.businessType
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
      formatAlertDegree: function (row, column) {
        return row.alertDegree == '1' ? '警报' : row.alertDegree == '0' ? '超限' : '未知'
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
      }
    }
  }


</style>
