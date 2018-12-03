<template>
  <el-dialog
    fullscreen
    :visible.sync="visible">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="风险管控企业" name="first">
        <div class="up-selectInput">
          <el-form ref="form" label-width="90px">
            <div class="formBox">
               <div class="formInput">
                 <el-form-item label="区域：">
                   <el-select placeholder="请选择" filterable>
                     <el-option label="区域一" value="shanghai"></el-option>
                     <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
                 </el-form-item>
               </div>
              <div class="formInput">
                <el-form-item label="行业类型：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-form-item label="企业名称：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-form-item label="风险等级：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="隐患治理企业" name="second">
        <div class="up-selectInput">
          <el-form ref="form" label-width="90px">
            <div class="formBox">
              <div class="formInput">
                <el-form-item label="区域：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-form-item label="行业类型：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-form-item label="企业名称：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-form-item label="风险等级：">
                  <el-select placeholder="请选择" filterable>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="formInput">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </el-tab-pane>
    </el-tabs>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first',
        visible: false
      }
    },
    methods: {
      init () {
        this.visible = true
      }
    }
  }
</script>

<style lang="scss">
  .formBox{
    display: flex;
    & .formInput{
      flex:1;
      text-align: center;
      margin-left: 10px;
    }
  }
</style>
