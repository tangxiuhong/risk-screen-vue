<template>
  <div class="loginBody" id="login">
    <div class="loginGround">
      <div class="loginfixed">
        <h1 class="loginTitle">鄂州市双重预防信息管理平台</h1>
        <div class="loginBox">
          <div class="loginFormBox">
            <div class="modulTitle">
              <h6>登录账号</h6>
              <span></span>
            </div>
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
              <el-form-item prop="userName">
                <el-input v-model="dataForm.userName" placeholder="帐号" class="login-input"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="dataForm.password" type="password" class="login-input" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input v-model="dataForm.captcha" class="login-input" placeholder="验证码">
                    </el-input>
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" @click="getCaptcha()" alt="">
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn-submit loginSubmit" type="primary" @click="dataFormSubmit()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="loginFoot">
          <p>© 1999-2018 湖北兴业华德威安全信息技术股份有限公司</p>
          <p>*建议使用ie9或以上版本浏览器访问*</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        console.log('UUID：' + this.dataForm.uuid)
        this.captchaPath = this.$http.adornUrl(`/kaptcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style>
  .loginBody {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(0px);
    -ms-filter: blur(0px);
    filter: blur(0px);
    background-image: url(~@/assets/img/login_bg.jpg);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%; }

  .loginGround {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center; }

  .loginfixed {
    position: fixed;
    width: 100%;
    height: 100%;
    left:0;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1); }

  .loginTitle {
    line-height: 1em;
    text-align: center;
    top: 6%;
    font-size: 38px;
    color: #181E36;
    font-weight: 700; }

  .loginBox {
    width: 100%; }

  .loginFoot {
    text-align: center;
    bottom: 0px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    font-size:14px;
    color:#fff;
    padding-top: 10px; }

  .loginTitle, .loginFoot {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 9; }

  .loginFormBox {
    width: 400px;
    margin: 0px auto;
    padding: 60px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: #181E36;
    position: relative; }

  .loginFormBox > .modulTitle > h6 {
    position: absolute;
    top: -30px;
    left: 0px;
    width: 100%;
    z-index: 10;
    font-size: 16px;
    font-weight: normal;
    color: #fff;
    text-align: center; }

  .loginFormBox > .modulTitle > span {
    display: inline-block;
    width: 130px;
    margin-top: 2px;
    border-top: 28px solid rgba(255, 255, 255, 0.3);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent; }

  .loginFormBox .login-input input{
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.5em;
    color: #ccc;
    border: 0;
    border-bottom: 1px solid #488ef7;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    background: none; }

  .login-captcha img{
    width: 100%;
  }
  .loginFormBox .checkbox {
    margin-top: 20px;
    margin-bottom: 20px;
    color: #fff;
    line-height: 2em; }

  .loginFormBox .checkbox label {
    line-height: 1.3em; }

  .modulTitle{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    text-align: center;
  }

  .modulTitle span{
    display: inline-block;
    width: 160px;
    margin-top: 2px;
    border-top: 28px solid #133050;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  .loginSubmit {
    width: 100%;
    background: #488ef7;
    color: #181E36; }

  .loginSubmit:hover {
    -webkit-box-shadow: inset 0 0 20px rgba(93, 3, 190, 0.6);
    -moz-box-shadow: inset 0 0 20px rgba(93, 3, 190, 0.6);
    box-shadow: inset 0 0 20px rgba(93, 3, 190, 0.6); }

</style>
