<template>
  <el-dialog
    fullscreen
    append-to-body
    :visible.sync="Visible">
    <div class="mod-tableList">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getAreaDataList()">
        <el-form-item label="企业">
          <el-select v-model="dataForm.id" filterable placeholder="企业" clearable @focus="getEnterpriseTree()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排查时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.startTime"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="date" placeholder="选择时间" v-model="dataForm.endTime"
                            style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="隐患级别">
          <el-select v-model="dataForm.troubleLevelId" filterable placeholder="隐患级别" clearable
                     @focus="getEnterpriseTree()">
            <el-option
              v-for="item in troubleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getAreaDataList()">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%;">
        <el-table-column
          prop="highTroubleId"
          header-align="center"
          align="center"
          label="隐患ID">
        </el-table-column>
        <el-table-column
          prop="highTroubleName"
          header-align="center"
          align="center"
          label="隐患名称">
        </el-table-column>
        <el-table-column
          prop="entName"
          header-align="center"
          align="center"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="rectificationTypeVal"
          header-align="center"
          align="center"
          label="整改类型">
        </el-table-column>
        <el-table-column
          prop="findDate"
          header-align="center"
          align="center"
          label="排查日期">
        </el-table-column>
        <el-table-column
          prop="rectifyLimit"
          header-align="center"
          align="center"
          label="整改期限">
        </el-table-column>
        <el-table-column
          prop="troubleLevelVal"
          header-align="center"
          align="center"
          label="隐患级别">
        </el-table-column>
        <el-table-column
          prop="departName"
          header-align="center"
          align="center"
          label="评估部门">
        </el-table-column>
        <el-table-column
          prop="deathCasualtiesVal"
          header-align="center"
          align="center"
          label="伤亡人数">
        </el-table-column>
        <el-table-column
          prop="economicLossVal"
          header-align="center"
          align="center"
          label="经济损失">
        </el-table-column>
        <el-table-column
          prop="timeMoneyScopeVal"
          header-align="center"
          align="center"
          label="时间金额范围">
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
        dataForm: {
          id: '',
          startTime: '',
          endTime: '',
          troubleLevelId: ''
        },
        Visible: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        areaCode: '',
        industryCode: '',
        isRegist: 0,
        state: 0,
        monthFlag: '',
        options: [],
        troubleOptions: [{
          value: '1',
          label: '重大隐患1级'
        }, {
          value: '2',
          label: '重大隐患2级'
        }, {
          value: '3',
          label: '重大隐患3级'
        }, {
          value: '4',
          label: '重大隐患4级'
        }]
      }
    },
    mounted () {
    },
    methods: {
      /**
       * @param flag 0 重大隐患 1 逾期未整改重大隐患
       * 2 本月重大隐患 3 上月重大隐患
       * @param type 0 区域 1 行业
       * @param code 区域ID、行业ID
       */
      init (flag, type, code) {
        this.Visible = true
        if (flag === 0) {
          this.monthFlag = ''
          if (type === 0) {
            this.areaCode = code
            this.state = 0
            this.getAreaDataList()
          } else if (type === 1) {
            this.industryCode = code
            this.state = 0
            this.getIndustryDataList()
          }
        } else if (flag === 1) {
          if (type === 0) {
            this.areaCode = code
            this.state = 1
            this.getAreaDataList()
          } else if (type === 1) {
            this.state = 1
            this.industryCode = code
            this.getIndustryDataList()
          }
        } else if (flag === 2) {
          this.monthFlag = 0
          if (type === 0) {
            this.areaCode = code
            this.state = 1
            this.getAreaDataList()
          } else if (type === 1) {
            this.state = 1
            this.industryCode = code
            this.getIndustryDataList()
          }
        } else if (flag === 3) {
          this.monthFlag = 1
          if (type === 0) {
            this.areaCode = code
            this.state = 1
            this.getAreaDataList()
          } else if (type === 1) {
            this.state = 1
            this.industryCode = code
            this.getIndustryDataList()
          }
        }
      },
      // 获取数据列表
      getAreaDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/hiddenCompany/majorHiddenList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'isRegist': this.isRegist,
            'areaCode': this.areaCode,
            'state': this.state,
            'monthFlag': this.monthFlag,
            'enterpriseId': this.dataForm.id,
            'startTime': this.dataForm.startTime,
            'endTime': this.dataForm.endTime,
            'troubleLevelId': this.dataForm.troubleLevelId
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
      getIndustryDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/hiddenCompany/majorHiddenList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'isRegist': this.isRegist,
            'industryCode': this.industryCode,
            'state': this.state,
            'monthFlag': this.monthFlag
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
      getEnterpriseTree() {
        this.$http({
          url: this.$http.adornUrl('/enterprise/sysEnterprise/selectSysEnterpriseTree/0/0'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.list
          } else {
            this.options = []
          }
        })
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
      & #context{
        & tr{
          border-bottom: 1px solid #fff;
          line-height: 2em;
        }
        :hover{
          background: rgba(255,255,255,.1);
        }
      }
    }
  }
</style>
