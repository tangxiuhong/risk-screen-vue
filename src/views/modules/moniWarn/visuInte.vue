<template>
  <div>
    <div class="modTitleBox">
      <div class="modTitle" @click="selectLists()">
        <span class="modImg"><img src="../../../assets/img/monitoringWarning/u1649.png" alt=""></span>
        <span class="modTxt">视觉智能信息</span>
      </div>
      <div class="modSelectList" v-show="selectList" @click="selectList = false">
        <div @click="$router.push({ name: 'moniWarn' });">监测预警信息</div>
      </div>
    </div>
    <div class="rtspView_content clear">
      <!-- 页面分为左右两个部分,左边放视频，右边放图片 -->
      <!-- 左边部分 -->
      <div class="left">
        <video id="my-video" class="video-js vjs-default-skin"  preload="auto"  style="height:780px;width:780px; margin: 0 auto;"
               :autoplay="playStatus">
          <source src="http://172.16.5.94:9092/hls/cctk/index.m3u8" type="application/x-mpegURL" >
        </video>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%;">
          <el-table-column
            prop="attachmentPath"
            header-align="center"
            align="center"
            label="异常图片">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img :src="scope.row.attachmentPath" width="100%" alt=""/>
                <div slot="reference">
                  <img :src="scope.row.attachmentPath" style="width:50px;height:50px;"/>
                </div>
              </el-popover>
            </template>
            <!--<template slot-scope="scope">
              <img :src="scope.row.attachmentPath" style="width:50px;height:50px;"/>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="attachmentName"
            header-align="center"
            align="center"
            label="异常时间">
            <template slot-scope="scope">
              <span v-text="scope.row.attachmentName.substring(0,8)"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[5]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, prev, next, jumper">
        </el-pagination>
      </div>

      <!-- 放置更多点击图片 -->
      <div class="more">
        <span style="color:#00a0e9" @click="lookHandle()">更多>></span>
      </div>
      <!--  查看更多 -->
      <look-more v-if='lookMoreVisible' ref="lookMore" @refreshDataList='getDataList'></look-more>
    </div>
  </div>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  import lookMore from './visuInte-lookMore'

  export default {
    data () {
      return {
        dataList: [],
        dataListLoading: false,
        pageIndex: 1,
        pageSize: 5,
        totalPage: 0,
        playStatus: 'autoplay',
        lookMoreVisible: false,
        selectList: false
      }
    },
    components: {lookMore},
    mounted () {
      this.getDataList()
    },
    activated () {
      this.intervalBegin()
      videojs('my-video', {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      }, function () {
        this.play()
      })
    },
    deactivated () {
      console.log('keep-alive 组件停用时调用开始')
      this.intervalEnd()
      console.log('keep-alive 组件停用时调用结束')
    },
    methods: {
      selectLists () {
        this.selectList = !this.selectList
      },
      selected () {
        this.selectList = !this.selectList
      },
      intervalBegin () {
        console.log('开始定时器')
        window.intervalObj = setInterval(this.getDataList, 10000)
        console.log('定时器执行时间：' + window.intervalObj)
      },
      intervalEnd () {
        console.log('停止定时器')
        clearInterval(window.intervalObj)
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/infoDisplay/rtspView/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'state': '1'
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
      // 查看更多
      lookHandle () {
        this.lookMoreVisible = true
        this.$nextTick(() => {
          this.$refs.lookMore.init()
        })
      }
    }
  }
</script>
<style>

  .clear {
    display: block;
    overflow: hidden;
  }

  .rtspView_content {
    width: 100%;
    height: 780px;
  }

  .rtspView_content .left {
    width: 65%;
    height: 100%;
    float: left;
    border: 2px solid #113A70;
  }

  .rtspView_content .right {
    width: 28%;
    height: 100%;
    margin-left: 1%;
    float: left;
  }

  .rtspView_content .more {
    width: 5%;
    margin-left: 1%;
    float: left;
    cursor: pointer;
  }

</style>
