<template>
  <el-dialog
    append-to-body
    width="60%"
    :visible.sync="visible">
    <div class="emerManage-mo-title">
      <span><p>附件列表</p></span>
    </div>
    <el-upload
      ref="upload"
      class="upload-recordDetail"
      :action="uploadUrl"
      name="file"
      :auto-upload="false"
      :disabled="true"
      multiple
      :file-list="fileList"
      :on-preview="handlePreview">
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'perfEval-enterprise',
    data() {
      return {
        id: '',
        visible: false,
        carouselVisible: false,
        imgList: [],
        uploadUrl: '',
        fileList: [],
        dataForm: {
          id: '0'
        }
      }
    },
    methods: {
      init(id) {
        this.imgList = []
        this.fileList = []
        this.dataForm.id = id
        this.visible = true
        this.$nextTick(() => {
          this.carouselVisible = false
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/emergency/appEmergencyCase/listFile/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                for (var x in data.sysFiles) {
                  var f = {name: data.sysFiles[x].attachmentName, url: data.sysFiles[x].attachmentPath}
                  this.fileList.push(f)
                  if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(data.sysFiles[x].attachmentName)) {
                    this.imgList.push(f)
                  }
                  if (this.imgList.length > 0) {
                    this.carouselVisible = true
                  }
                }
              }
            })
          }
        })
      },
      handlePreview(file, fileList) {  // 点击文件下载
        // console.log(file, fileList)
        window.open(file.url)
      }
    }
  }
</script>

<style scoped>

</style>
