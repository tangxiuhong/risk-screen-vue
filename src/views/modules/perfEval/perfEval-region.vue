<template>
  <div class="perfEval">
    <el-row>
      <el-col :span="18">
        <!--内容区标题公共样式contentTitle，contentImg，contentTxt-->
        <div class="modTitleBox">
          <div class="modTitle" @click="selectLists()">
            <span class="modImg"><img src="../../../assets/img/hiddenRiskManagement/u236.png" alt=""></span>
            <span class="modTxt">区域绩效</span>
          </div>
          <div class="modSelectList" v-show="selectList" @click="selectList = false">
            <div @click="$router.push({ name: 'perfEval' });">绩效评估信息</div>
            <div @click="$router.push({ name: 'perfEval-industry' });">行业绩效</div>
            <div @click="$router.push({ name: 'perfEval-enterprise' });">企业绩效</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="tableHead-up">
          <div class="regionSelect-up-right">
            <el-select v-model="areaName" filterable placeholder="区域" clearable @change="changeIndustry"
                       @focus="getIndustryTree()">
              <el-option
                v-for="item in areaCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="perfEval-content" :style="{height: styleHeight}">
      <div class="table-down">
        <table class="tableRulesOfTerms">
          <thead>
          <tr>
            <th>项目</th>
            <th>内容</th>
            <th>考核方式</th>
            <th>当前得分</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="5">一、组织与机构 （12分）</td>
            <td>成立风险分级管控工作组织或机构</td>
            <td rowspan="5">
              1、向平台提供资料、文件供查阅核实。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、每项修正系数为0.9，酌情掌握。
            </td>
            <td id="id1" align="center">
              <input type="checkbox" value="1" class="name"><label for="">+3分</label>
              <input type="checkbox" value="2" class="name"><label for="">+2分</label>
              <input type="checkbox" value="3" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>由单位领导担任组长，相关分管领导为主要成员</td>
            <td id="id2" align="center">
              <input type="checkbox" value="4" class="name"><label for="">+3分</label>
              <input type="checkbox" value="5" class="name"><label for="">+2分</label>
              <input type="checkbox" value="6" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>工作组织或机构有固定办公地点</td>
            <td id="id3" align="center">
              <input type="checkbox" value="7" class="name"><label for="">+3分</label>
              <input type="checkbox" value="8" class="name"><label for="">+2分</label>
              <input type="checkbox" value="9" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>工作组织或建构建立管理制度</td>
            <td id="id4" align="center">
              <input type="checkbox" value="10" class="name"><label for="">+3分</label>
              <input type="checkbox" value="11" class="name"><label for="">+2分</label>
              <input type="checkbox" value="12" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>配备有专兼职人员负责风险分级管控工作</td>
            <td id="id5" align="center">
              <input type="checkbox" value="13" class="name"><label for="">+3分</label>
              <input type="checkbox" value="14" class="name"><label for="">+2分</label>
              <input type="checkbox" value="15" class="name"><label for="">0分</label>
            </td>
          </tr>
          <!--第二行-->
          <tr>
            <td rowspan="2">二、目标与计划（8分）</td>
            <td>制定年度风险分级管控目标</td>
            <td rowspan="2">
              1、向平台提供资料、文件供查阅核实。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、每项修正系数为0.9，酌情掌握。
            </td>
            <td id="id6" align="center">
              <input type="checkbox" value="16" class="name"><label for="">+2分</label>
              <input type="checkbox" value="17" class="name"><label for="">+1分</label>
              <input type="checkbox" value="18" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>制定风险分级管控实施计划</td>
            <td id="id7" align="center">
              <input type="checkbox" value="19" class="name"><label for="">+3分</label>
              <input type="checkbox" value="20" class="name"><label for="">+2分</label>
              <input type="checkbox" value="21" class="name"><label for="">0分</label>
            </td>
          </tr>
          <!--第三行-->
          <tr>
            <td rowspan="12">三、风险分级管控（65分）</td>
            <td>建立辖区内相应的安全生产责任制</td>
            <td rowspan="5">
              1、向平台提供资料、文件供查阅核实。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、每项修正系数为0.9，酌情掌握。
            </td>
            <td id="id8" align="center">
              <input type="checkbox" value="22" class="name"><label for="">+5分</label>
              <input type="checkbox" value="23" class="name"><label for="">+3分</label>
              <input type="checkbox" value="24" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>是否建立重点监管对象、重大风险预警监测机制</td>
            <td id="id9" align="center">
              <input type="checkbox" value="25" class="name"><label for="">+5分</label>
              <input type="checkbox" value="26" class="name"><label for="">+3分</label>
              <input type="checkbox" value="27" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>是否建立重大风险联防联控工作机制</td>
            <td id="id10" align="center">
              <input type="checkbox" value="28" class="name"><label for="">+5分</label>
              <input type="checkbox" value="29" class="name"><label for="">+3分</label>
              <input type="checkbox" value="30" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>是否建立安全风险评估与论证工作机制</td>
            <td id="id11" align="center">
              <input type="checkbox" value="31" class="name"><label for="">+5分</label>
              <input type="checkbox" value="32" class="name"><label for="">+3分</label>
              <input type="checkbox" value="33" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>是否建立辖区重大风险应急响应机制</td>
            <td id="id12" align="center">
              <input type="checkbox" value="34" class="name"><label for="">+5分</label>
              <input type="checkbox" value="35" class="name"><label for="">+3分</label>
              <input type="checkbox" value="36" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>制定完善安全风险分级管控的实用标准或操作指南</td>
            <td rowspan="7">
              1、向平台提供数据、文件供查阅核实。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、每项修正系数为0.9，酌情掌握。
            </td>
            <td id="id13" align="center">
              <input type="checkbox" value="37" class="name"><label for="">+5分</label>
              <input type="checkbox" value="38" class="name"><label for="">+3分</label>
              <input type="checkbox" value="39" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>建立完善区域风险防控体系，组织企业开展对标活动</td>
            <td id="id14" align="center">
              <input type="checkbox" value="40" class="name"><label for="">+5分</label>
              <input type="checkbox" value="41" class="name"><label for="">+3分</label>
              <input type="checkbox" value="42" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>组织对辖区内的风险进行全面辨识和评估，确定区域风险等级</td>
            <td id="id15" align="center">
              <input type="checkbox" value="43" class="name"><label for="">+5分</label>
              <input type="checkbox" value="44" class="name"><label for="">+3分</label>
              <input type="checkbox" value="45" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>结合企业上报的重大风险情况，汇总建立区域安全风险数据库/风险清单</td>
            <td id="id16" align="center">
              <input type="checkbox" value="46" class="name"><label for="">+5分</label>
              <input type="checkbox" value="47" class="name"><label for="">+3分</label>
              <input type="checkbox" value="48" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>绘制区域红、橙、黄、蓝四色安全风险分布图</td>
            <td id="id17" align="center">
              <input type="checkbox" value="49" id="name49"><label for="">+5分</label>
              <input type="checkbox" value="50" id="name50"><label for="">+3分</label>
              <input type="checkbox" value="51" id="name51"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>定期开展辖区内的风险分级管控培训</td>
            <td id="id18" align="center">
              <input type="checkbox" value="52" class="name"><label for="">+5分</label>
              <input type="checkbox" value="53" class="name"><label for="">+3分</label>
              <input type="checkbox" value="54" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>建立区域重大风险智能监测系统/平台</td>
            <td id="id19" align="center">
              <input type="checkbox" value="55" class="name"><label for="">+5分</label>
              <input type="checkbox" value="56" class="name"><label for="">+3分</label>
              <input type="checkbox" value="57" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>四、资料管理（5分）</td>
            <td>是否对风险分级管控资料、记录、图纸等进行分类管理，并按要求报送相关部门</td>
            <td>
              1、现场检查、查看核实。<br>
              2、该项修正系数为0.8，酌情掌握。
            </td>
            <td id="id20" align="center">
              <input type="checkbox" value="58" class="name"><label for="">+5分</label>
              <input type="checkbox" value="59" class="name"><label for="">+3分</label>
              <input type="checkbox" value="60" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td rowspan="2">五、监督检查（15分）</td>
            <td>建立安全风险分级管控监督检查制度</td>
            <td rowspan="2">
              1、现场检查、查看核实。<br>
              2、该项修正系数为0.8，酌情掌握。
            </td>
            <td id="id21" align="center">
              <input type="checkbox" value="61" class="name"><label for="">+3分</label>
              <input type="checkbox" value="62" class="name"><label for="">+2分</label>
              <input type="checkbox" value="63" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>定期进行监督检查，督促指导企业持续改进</td>
            <td id="id22" align="center">
              <input type="checkbox" value="64" class="name"><label for="">+10分</label>
              <input type="checkbox" value="65" class="name"><label for="">+5分</label>
              <input type="checkbox" value="66" class="name"><label for="">0分</label>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true,
        areaName: '',
        label: '',
        areaCodeOptions: [],
        selectedOptions: [],
        selectList: false,
        styleHeight: window.screen.availHeight - 105 + 'px'
      }
    },
    mounted() {
      this.getIndustryTree()
    },
    methods: {
      // 标题切换
      selectLists() {
        this.selectList = !this.selectList
      },
      // 获取区域树
      getIndustryTree() {
        this.$http({
          url: this.$http.adornUrl('/sys/dic/selectTree/16'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.areaCodeOptions = data.list
            this.areaName = this.areaCodeOptions[0].value
          } else {
            this.areaCodeOptions = []
          }
          this.$nextTick(() => {
            this.$http({
              url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getNextMark'),
              method: 'get',
              params: this.$http.adornParams({unitType: this.areaName})
            }).then(({data}) => {
              if (data && data.code === 0) {
                var obj = document.querySelectorAll('.name')
                for (var x in data.list) {
                  for (var i = 0; i < obj.length; i++) {
                    if (obj[i].value === data.list[x].perforId) {
                      obj[i].checked = true
                    }
                  }
                }
              }
            })
          })
        })
      },
      changeIndustry() {
        this.areaName = this.areaName
        this.$http({
          url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getNextMark'),
          method: 'get',
          params: this.$http.adornParams({unitType: this.areaName})
        }).then(({data}) => {
          if (data && data.code === 0) {
            var obj = document.querySelectorAll('.name')
            for (var k = 0; k < obj.length; k++) {
              obj[k].checked = false
            }
            for (var x in data.list) {
              for (var i = 0; i < obj.length; i++) {
                if (obj[i].value === data.list[x].perforId) {
                  obj[i].checked = true
                }
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .perfEval {
    & .tableHead-up {
      display: flex;
      margin-bottom: 10px;
      & .regionName-up-left {
        line-height: 2em;
        font-size: 20px;
        font-weight: bold;
      }
      & .regionName-up-left,
      & .regionSelect-up-right {
        flex: 1;
        text-align: center;
      }
    }

    & .table-down {
      overflow-y: auto;
      & .tableRulesOfTerms {
        & tr {
          line-height: 2em;
        }
      }
    }
  }

</style>
