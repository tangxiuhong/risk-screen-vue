<template>
  <div class="perfEval">
    <el-row>
      <el-col :span="18">
        <!--内容区标题公共样式contentTitle，contentImg，contentTxt-->
        <div class="modTitleBox">
          <div class="modTitle" @click="selectLists()">
            <span class="modImg"><img src="../../../assets/img/hiddenRiskManagement/u236.png" alt=""></span>
            <span class="modTxt">行业绩效</span>
          </div>
          <div class="modSelectList" v-show="selectList" @click="selectList = false">
            <div @click="$router.push({ name: 'perfEval' });">绩效评估信息</div>
            <div @click="$router.push({ name: 'perfEval-region' });">区域绩效</div>
            <div @click="$router.push({ name: 'perfEval-enterprise' });">企业绩效</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="tableHead-up">
          <div class="regionSelect-up-right">
            <el-select v-model="industryName" filterable placeholder="行业" clearable @change="changeIndustry"
                       @focus="getIndustryTree()">
              <el-option
                v-for="item in industryCodeOptions"
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
            <td rowspan="5">一、组织与机构 （15分）</td>
            <td>成立风险分级管控工作组织或机构</td>
            <td rowspan="5">
              1、提供文件、资料供查阅。<br>
              2、审核相关要素，突出时效性、真实性、符合性。<br>
              3、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              4、每项修正系数为0.8，酌情掌握。
            </td>
            <td id="id1">
              <input type="checkbox" value="67" class="name"><label for="">+3分</label>
              <input type="checkbox" value="68" class="name"><label for="">+2分</label>
              <input type="checkbox" value="69" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>由单位领导担任组长，相关分管领导为主要成员</td>
            <td id="id2">
              <input type="checkbox" value="70" class="name"><label for="">+3分</label>
              <input type="checkbox" value="71" class="name"><label for="">+2分</label>
              <input type="checkbox" value="72" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>工作组织或机构有固定办公地点</td>
            <td id="id3">
              <input type="checkbox" value="73" class="name"><label for="">+3分</label>
              <input type="checkbox" value="74" class="name"><label for="">+2分</label>
              <input type="checkbox" value="75" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>工作组织或建构建立管理制度</td>
            <td id="id4">
              <input type="checkbox" value="76" class="name"><label for="">+3分</label>
              <input type="checkbox" value="77" class="name"><label for="">+2分</label>
              <input type="checkbox" value="78" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>配备有专兼职人员负责风险分级管控工作</td>
            <td id="id5">
              <input type="checkbox" value="79" class="name"><label for="">+3分</label>
              <input type="checkbox" value="80" class="name"><label for="">+2分</label>
              <input type="checkbox" value="81" class="name"><label for="">0分</label>
            </td>
          </tr>
          <!--第二行-->
          <tr>
            <td rowspan="2">二、目标与计划（5分）</td>
            <td>制定年度风险分级管控目标</td>
            <td rowspan="2">1、提供文件、资料供查阅。<br>
              2、审核相关要素，突出时效性、真实性、符合性。<br>
              3、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              4、每项修正系数为0.9，酌情掌握。
            </td>
            <td id="id6">
              <input type="checkbox" value="82" class="name"><label for="">+2分</label>
              <input type="checkbox" value="83" class="name"><label for="">+1分</label>
              <input type="checkbox" value="84" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>制定年度风险分级管控实施计划</td>
            <td id="id7">
              <input type="checkbox" value="85" class="name"><label for="">+3分</label>
              <input type="checkbox" value="86" class="name"><label for="">+2分</label>
              <input type="checkbox" value="87" class="name"><label for="">0分</label>
            </td>
          </tr>
          <!--第三行-->
          <tr>
            <td rowspan="12">三、风险分级管控（60分）</td>
            <td>建立行业相关的安全生产责任制</td>
            <td rowspan="6">1、提供文件、资料供查阅。<br>
              2、审核相关要素，突出时效性、真实性、符合性。<br>
              3、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              4、每项修正系数为0.8，酌情掌握。

            </td>
            <td id="id8">
              <input type="checkbox" value="88" class="name"><label for="">+5分</label>
              <input type="checkbox" value="89" class="name"><label for="">+3分</label>
              <input type="checkbox" value="90" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>建立重点监管对象、重大风险预警监测机制</td>
            <td id="id9">
              <input type="checkbox" value="91" class="name"><label for="">+5分</label>
              <input type="checkbox" value="92" class="name"><label for="">+3分</label>
              <input type="checkbox" value="93" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>建立重大风险联防联控工作机制</td>
            <td id="id10">
              <input type="checkbox" value="94" class="name"><label for="">+5分</label>
              <input type="checkbox" value="95" class="name"><label for="">+3分</label>
              <input type="checkbox" value="96" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>建立安全风险评估与论证工作机制</td>
            <td id="id11">
              <input type="checkbox" value="97" class="name"><label for="">+5分</label>
              <input type="checkbox" value="98" class="name"><label for="">+3分</label>
              <input type="checkbox" value="99" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>建立行业重大风险应急响应机制</td>
            <td id="id12">
              <input type="checkbox" value="100" class="name"><label for="">+5分</label>
              <input type="checkbox" value="101" class="name"><label for="">+3分</label>
              <input type="checkbox" value="102" class="name"><label for="">0分</label>
            </td>
          </tr>

          <tr>
            <td>制定完善安全风险分级管控的实用标准或操作指南</td>
            <td id="id13">
              <input type="checkbox" value="103" class="name"><label for="">+5分</label>
              <input type="checkbox" value="104" class="name"><label for="">+3分</label>
              <input type="checkbox" value="105" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>建立完善行业风险防控体系，组织企业开展对标活动</td>
            <td rowspan="2">1、核实活动记录、文件、资料等。<br>
              2、审核相关要素，突出时效性、真实性、符合性。<br>
              3、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              4、每项修正系数为0.9，酌情掌握。


            </td>
            <td id="id14">
              <input type="checkbox" value="106" class="name"><label for="">+5分</label>
              <input type="checkbox" value="107" class="name"><label for="">+3分</label>
              <input type="checkbox" value="108" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>组织对行业内的风险进行全面辨识和评估，确定行业风险等级</td>
            <td id="id15">
              <input type="checkbox" value="109" class="name"><label for="">+5分</label>
              <input type="checkbox" value="110" class="name"><label for="">+3分</label>
              <input type="checkbox" value="111" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>结合企业上报的重大风险情况，汇总建立行业安全风险数据库/风险清单</td>
            <td>1、向平台提供数据库。<br>
              2、该项修正系数为0.9，酌情掌握。
            </td>
            <td id="id16">
              <input type="checkbox" value="112" class="name"><label for="">+5分</label>
              <input type="checkbox" value="113" class="name"><label for="">+3分</label>
              <input type="checkbox" value="114" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>绘制行业安全风险比较图</td>
            <td>1、向平台提供分布图。<br>
              2、符合不扣分，不完善、部分符合扣分，不提供均不得分。<br>
              3、该项修正系数为0.9，酌情掌握。
            </td>
            <td id="id17">
              <input type="checkbox" value="115" class="name"><label for="">+5分</label>
              <input type="checkbox" value="116" class="name"><label for="">+3分</label>
              <input type="checkbox" value="117" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>定期开展行业内的风险分级管控培训</td>
            <td>1、核实活动记录、文件、资料等。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、该项修正系数为0.9，酌情掌握。
            </td>
            <td id="id18">
              <input type="checkbox" value="118" class="name"><label for="">+5分</label>
              <input type="checkbox" value="119" class="name"><label for="">+3分</label>
              <input type="checkbox" value="120" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>建立行业重大风险智能监测系统/平台台</td>
            <td>1、现场检查、查看。<br>
              2、符合不扣分，不完善、部分符合扣分，不符合或不提供均不得分。<br>
              3、该项修正系数为0.9，酌情掌握。
            </td>
            <td id="id19">
              <input type="checkbox" value="121" class="name"><label for="">+5分</label>
              <input type="checkbox" value="122" class="name"><label for="">+3分</label>
              <input type="checkbox" value="123" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>四、档案管理（5分）</td>
            <td>是否对风险分级管控资料、记录、图纸等进行分类管理，并按要求报送相关部门</td>
            <td>1、现场检查、查看。<br>
              2、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              3、该项修正系数为0.8，酌情掌握。现场检查、查看。
            </td>
            <td id="id20">
              <input type="checkbox" value="124" class="name"><label for="">+5分</label>
              <input type="checkbox" value="125" class="name"><label for="">+3分</label>
              <input type="checkbox" value="126" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td rowspan="2">五、监督检查（15分）</td>
            <td>建立安全风险分级管控监督检查制度</td>
            <td>1、提供文件、资料供查阅。<br>
              2、符合不扣分，缺项、不完善、部分符合扣分，不符合或不提供均不得分。<br>
              3、每项修正系数为0.8，酌情掌握。
            </td>
            <td id="id21">
              <input type="checkbox" value="127" class="name"><label for="">+5分</label>
              <input type="checkbox" value="128" class="name"><label for="">+3分</label>
              <input type="checkbox" value="129" class="name"><label for="">0分</label>
            </td>
          </tr>
          <tr>
            <td>定期进行监督检查，督促指导企业持续改进</td>
            <td>1、核实活动记录、文件、资料等。<br>
              2、符合不扣分，不完善扣分，不符合或不提供均不得分。<br>
              3、该项修正系数为0.8，酌情掌握。

            </td>
            <td id="id22">
              <input type="checkbox" value="130" class="name"><label for="">+10分</label>
              <input type="checkbox" value="131" class="name"><label for="">+5分</label>
              <input type="checkbox" value="132" class="name"><label for="">0分</label>
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
    data () {
      return {
        checked: true,
        industryName: '',
        industryCodeOptions: [],
        selectedOptions: [],
        selectList: false,
        styleHeight: window.screen.availHeight - 105 + 'px'
      }
    },
    mounted () {
      this.getIndustryTree()
    },
    methods: {
      // 标题切换
      selectLists () {
        this.selectList = !this.selectList
      },
      // 获取行业树
      getIndustryTree () {
        this.$http({
          url: this.$http.adornUrl('/sys/dic/selectTree/9'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.industryCodeOptions = data.list
            this.industryName = this.industryCodeOptions[0].value
          } else {
            this.industryCodeOptions = []
          }
          this.$nextTick(() => {
            this.$http({
              url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getNextMark'),
              method: 'get',
              params: this.$http.adornParams({unitType: this.industryName})
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
      changeIndustry () {
        this.industryName = this.industryName
        this.$http({
          url: this.$http.adornUrl('/performance/bsPerformanceTotalMark/getNextMark'),
          method: 'get',
          params: this.$http.adornParams({unitType: this.industryName})
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
      & .tableRulesOfTerms {
        & tr {
          line-height: 2em;
        }
      }
    }
  }

</style>
