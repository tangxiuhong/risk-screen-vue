<!--四色分布图 -->
<template>
  <el-row>
    <div style="background-color: #181E36;">
        <el-col>
          <el-carousel indicator-position="outside" height="730px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="item" style="width:100%;height:100%;"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </div>
  </el-row>
</template>
<script>
  export default {
    data () {
      return {
        dataForm: {
          enterpriseId: ''
        },
        imgList: []
      }
    },
    components: {},
    mounted () {},
    methods: {
      init (enterpriseId) {
        console.log('enterpriseId:' + enterpriseId)
        this.dataForm.enterpriseId = enterpriseId || 0
        this.getImgList(this.dataForm.enterpriseId)
      },
      getImgList (enterpriseId) {
        this.$http({
          url: this.$http.adornUrl('/enterprise/sysEnterprise/getSiSeTulistFiles'),
          method: 'get',
          params: this.$http.adornParams({recordId: enterpriseId})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.imgList = []
            if (data.sysFiles != null && data.sysFiles.length > 0) {
              for (var i = 0; i < data.sysFiles.length; i++) {
                this.imgList.push(data.sysFiles[i].attachmentPath)
              }
            }
          }
        })
      }
    }
  }
</script>

<style>
  /*elementUI tab页样式重写*/
  .tabs-card-content{
    width: 100%;
    min-height: 550px;
  }
  .el-tabs--border-card {
    background: rgb(24, 30, 54);
    border: 0;
  }
  .el-tabs--border-card>.el-tabs__content {
    padding-top: 5px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: 1px #797979 solid;
    border-right: 0;
    color: #FFF;
    font-weight: bold;
  }
  .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    transition: transform .3s,-webkit-transform .3s;
    border: 1px #797979 solid;
    border-bottom: 0;
    float: left;
    z-index: 2;
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: rgb(24, 30, 54);
    border: 0;
    margin: 0;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #fff;
    background-color: #113A70;
    border-color: #797979;
  }
  .el-tabs__nav-wrap {
    overflow: hidden;
    position: relative;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #FFF;
  }
  /*elementUI table页样式重写*/
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #ebeef5;
    color: #FFF;
    background-color: #042141;
  }
  .el-table{
    font-size: 14px;
    color: #FFF;
    background-color: #001837;
    border: 1px #133050 solid;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #133050;
    border-right: 1px solid #133050;
  }
  .el-table__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    color: #FFF;
  }
</style>
