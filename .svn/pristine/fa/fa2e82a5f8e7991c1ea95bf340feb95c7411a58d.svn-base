<!--安全作业比较图-->
<template>
  <el-row>
    <div style="background-color: #181E36;">
      <el-row>
        <el-carousel indicator-position="outside" height="730px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src="item" style="width:100%;height:100%;"/>
          </el-carousel-item>
        </el-carousel>
      </el-row>
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
    methods: {
      init (id) {
        this.dataForm.enterpriseId = id || 0
        console.log('8 enterpriseId:' + this.dataForm.enterpriseId)
        this.getImgList(this.dataForm.enterpriseId)
      },
      getImgList (enterpriseId) {
        this.$http({
          url: this.$http.adornUrl('/enterprise/sysEnterprise/getAnQuanTulistFiles'),
          method: 'get',
          params: this.$http.adornParams({recordId: enterpriseId})
        }).then(({data}) => {
          if (data && data.code === 0) {
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

</style>
