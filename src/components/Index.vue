<template>
  <div>
    <!--检测浏览器版本-->
    <div id="ie_versions" class="ie_versions" ref="ie_versions"
         style="text-align:center;background-color:orange;display: none">
      <h3>您的ie浏览器版本过低，请进行升级。</h3>
    </div>

    <!--中间标题部分-->
    <div id="center_box" class="loginBox">
      <!--东华理工大学及标题-->
      <div class="loginTop">
        <p class="login-college">
          <img id="school_logo" class="banner-school-img" src="http://check7.cnki.net/co_pic/ecit.png" alt="">
          <span id="school_name" style="">东华理工大学</span>
        </p>
        <p class="login-paper" id="xtmc">仓 &nbsp; 库 &nbsp; 管 &nbsp; 理 &nbsp; 系 &nbsp; 统</p>
      </div>

      <!--中间主体部分-->
      <div class="brief clearfix">
        <!--中间的通告，给的是一个card-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>通告类型</span>
            <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

        <!--中间的登入窗口，再给一个卡片-->
        <!--中间的通告，给的是一个card-->
        <el-card class="login-card">
          <div slot="header" class="clearfix">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" style="width: 130px">账号密码登入</el-menu-item>
              <el-menu-item index="2" style="width: 130px">扫一扫登入</el-menu-item>
              <el-menu-item index="3" style="width: 130px">
                <router-link tag="div" to="/register">
                  <span>新用户注册</span>
                </router-link>
              </el-menu-item>
            </el-menu>
          </div>

          <!--登入的div-->
          <div class="text item" id="login_div">
            <!--输入框，账号密码-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="username">
                <el-input
                  type="input"
                  autosize
                  placeholder="请输入用户名(电话)"
                  v-model="ruleForm.username">
                </el-input>
              </el-form-item>
              <!--这个div用来隔开一点点-->
              <!--<div style="height: 20px"></div>-->
              <el-form-item prop="password">
                <el-input
                  type="password"
                  autosize
                  placeholder="请输入密码"
                  v-model="ruleForm.password">
                </el-input>
              </el-form-item>
              <!--div隔离下来-->
              <div style="height: 20px"></div>
              <!--单选钮,选择管理员,仓库管理员，系统管理员，超级管理员-->
              <el-form-item label="账号类型:">
                <el-radio-group v-model="ruleForm.identify">
                  <el-radio label="仓库管理员" style="width: 80px"></el-radio>
                  <el-radio label="系统管理员" style="width: 80px"></el-radio>
                  <el-radio label="超级管理员" style="width: 80px"></el-radio>
                </el-radio-group>
              </el-form-item>

              <!--div隔离-->
              <div style="height: 20px"></div>

              <!--验证码-->
              <el-form-item label="验证码:" prop="securityCode">
                <el-input
                  type="input"
                  autosize
                  placeholder="请输入验证码"
                  style="width: 50%"
                  v-model="ruleForm.securityCode">
                </el-input>

                <!--验证码div-->
                <div
                  style="width:100px;text-align:center;float: right;border-style: solid;border-width: 1px;font-size: 20px;background: linear-gradient(red, green);text-shadow: 5px 5px 5px #FF0000;"
                  @click="createCode">{{ck_code}}
                </div>
              </el-form-item>

              <!--div隔离-->

              <el-form-item>
                <el-button style="width: 90%;text-align: center;margin-left: 5%;height: 45px" type="primary"
                           @click="submitForm('ruleForm')">登入
                </el-button>
              </el-form-item>

            </el-form>
          </div>

          <!--扫码的div-->
          <div class="text item" id="scan_div" style="display: none">
            <div style="text-align: center;font-size: 30px;margin-bottom: 5%">微信扫码登入</div>
            <img src="../assets/scan.png" style="width: 70%;height: 70%;margin-left: 15%">

            <div style="text-align: center">
              <p>请使用微信扫描二维码登录</p>
              <p>“仓&nbsp;库&nbsp;管&nbsp;理&nbsp;系&nbsp;统”</p>
            </div>
          </div>


        </el-card>
      </div>


    </div>
    <!--底部-->
    <div style="margin-top: 3%;margin-bottom: 3%">
      <!--左边-->
      <div style="float: left">
        <p>
          <a href="#" target="_blank">关于东理</a><span>&nbsp;|&nbsp;</span>
          <a href="#" target="_blank">客户服务</a><span>&nbsp;|&nbsp;</span>
          <a href="#" target="_blank">服务条款</a><span>&nbsp;|&nbsp;</span>
          <a href="#" target="_blank">网站导航</a><span>&nbsp;|&nbsp;</span>
          <a href="#">意见反馈</a>
        </p>
        <p>
          <span>Childwanwan版权所有©1997-2019</span><span>江西省东华理工大学运营：</span><a href="http://www.ecit.edu.cn/"
                                                                            target="_blank">东理网文[2019]418-研一1010号</a>
        </p>
        <p>
          <span>违法和不良信息举报电话：157-9793-4717</span>
          <span>举报邮箱：</span><a href="#">1635679119@qq.com</a>
        </p>

      </div>
      <!--右边-->
      <div style="float: right;margin-top: -2%;margin-right: 15%">
        <div style="float: left;padding-right: 60px">
          <img width="100" height="100" src="../assets/mh1.png">
          <div style="padding: 4px;text-align: center">
            <span>东华理工网</span>
          </div>
        </div>

        <div style="float: right;">
          <img width="100" height="100" src="../assets/mh2.jpg.png">
          <div style="padding: 4px;text-align: center">
            <span style="margin-left: -15%">东华理工校友网</span>
          </div>
        </div>


        <!--<el-card :body-style="{ padding: '5px' }" style="float: right;">
            <img width="100" height="100" src="../assets/mh2.jpg.png">
            <div style="padding: 4px;text-align: center">
              <span>东华理工网</span>
            </div>
          </el-card>-->


      </div>
    </div>

  </div>


</template>


<script>
  import $ from 'jquery'

  export default {
    name: "Index",
    data() {
      var phoneNumber = (rule, value, callback) => {
        if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
          callback(new Error('手机号码不符合规范'))
        } else {
          callback()
        }
      };

      var ckNumber = (rule, value, callback) => {
        if (value.toUpperCase() != this.ck_code) {
          callback(new Error('验证码不符合规范'));
          this.ck_message = "验证码错误";
        } else {
          callback();
          this.ck_message = "验证码正确";
        }
      };

      return {
        ck_code: '',
        ck_message: '提示信息',
        activeIndex: '1',
        ipAddress:'',

        ruleForm: {
          username: '15797934717',
          password: '123456789',
          identify: '仓库管理员',
          securityCode: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户电话', trigger: 'blur'},
            {validator: phoneNumber, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 6, max: 18, message: '长度必须为 6 到 18 个字符', trigger: 'blur'}
          ],
          identify: [
            {required: true, message: '请选择身份信息', trigger: 'change'}
          ],
          securityCode: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 4, max: 4, message: '长度必须为 4 个字符', trigger: 'blur'},
            {validator: ckNumber, trigger: 'blur'}
          ],
        },
      };
    },
    methods: {
      IEVersion: function () {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
          let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          let fIEVersion = parseFloat(RegExp["$1"]);
          if (fIEVersion == 7) {
            return 7;
          } else if (fIEVersion == 8) {
            return 8;
          } else if (fIEVersion == 9) {
            return 9;
          } else if (fIEVersion == 10) {
            return 10;
          } else {
            return 6;//IE版本<=7
          }
          ;
        } else if (isEdge) {
          return 'edge';//edge
        } else if (isIE11) {
          return 11; //IE11
        } else {
          return -1;//不是ie浏览器
        }
        ;
      },
      handleSelect(key, keyPath) {
        if (key === '1') {
          $(function () {
            //返回包装了所有选择的DOM元素的jQuery实例
            let jQueryObject1 = $("#login_div");
            jQueryObject1.css("display", "block");
            let jQueryObject2 = $("#scan_div");
            jQueryObject2.css("display", "none");
          });
        } else if (key === '2') {
          $(function () {
            //返回包装了所有选择的DOM元素的jQuery实例
            let jQueryObject1 = $("#login_div");
            jQueryObject1.css("display", "none");
            let jQueryObject2 = $("#scan_div");
            jQueryObject2.css("display", "block");
          });
        } else if (key === '3') {
          alert("3")
        }
        ;
      },
      submitForm: function (formName) {
        if (this.ck_message === '验证码正确') {
          //console.log(activeIndex,username,password,identify,securityCode)
          //alert()
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //alert('submit!');
              //alert(this.ruleForm.username);
              //var data = this.ruleForm;
              //this.$http.post('http://api.wms.com/api/user/login')
              /*this.$http.get('http://www.baidu.com',{}).then(() => {
                this.$message.success("百度成功！")
              })
                .catch(() => {
                  this.$message.error("百度失败！")
                });*/
              //var _json = jQuery.param({ "username": "password", "password": "20130209","identify":"123","securityCode":"123456" });
              this.$axios.post('http://localhost:10010/api/logic/logic_controller/login',
                {
                  'username': this.ruleForm.username,
                  'password': this.ruleForm.password,
                  'identify': this.ruleForm.identify,
                  'ip':this.ipAddress,
                })
                .then((res) => {
                  console.log(res.data);//res.data['hello world']
                  if (res.data['code'].toString()==='0') {
                    this.$message.error(res.data['message']);
                  }else if (res.data['code'].toString()==='-1'){
                    this.$message.error(res.data['message']);
                  }else if(res.data['code'].toString()==='1') {
                    this.$message.success("登入成功！");
                    this.$router.push({path:'/houseware_manager_login_success',query:{username:this.ruleForm.username,token:res.data['data'].toString()}});
                  }else this.$message.error(res.data['message']);
                })
                .catch((res) => {
                  console.log(res.data);
                  this.$message.error("请求失败！")
                });

            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
        ;
      },
      createCode: function () {
        var code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
        for (var i = 0; i < codeLength; i++) {
          //循环操作
          var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.ck_code = code;//把code值赋给验证码
      },
    },
    created() {
      if (this.IEVersion() == 7 || this.IEVersion() == 6) {
        alert('您的ie浏览器版本过低，请升级您的浏览器');
        //document.querySelector("ie_versions").style.display = "block";
        $(function () {
          //返回包装了所有选择的DOM元素的jQuery实例
          let jQueryObject = $("#ie_versions");
          jQueryObject.css("display", "block");
        });
      } else {
        $(function () {
          //返回包装了所有选择的DOM元素的jQuery实例
          let jQueryObject = $("#ie_versions");
          jQueryObject.css("display", "none");
        });
      }

      /*调用验证码生成函数*/
      this.createCode();
      /*ip赋值*/
      this.ipAddress = returnCitySN["cip"];

    },
  }
</script>

<style scoped>
  @import '../css/login.css';
</style>
