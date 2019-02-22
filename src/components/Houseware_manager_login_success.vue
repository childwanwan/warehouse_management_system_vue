<template>
  <div>
    <!--头部-->
    <div class="head">
      <!--东华理工大学及标题-->
      <div class="loginTop">
        <p class="login-college">
          <img id="school_logo" class="banner-school-img" src="http://check7.cnki.net/co_pic/ecit.png" alt="">
          <span id="school_name" style="">东华理工大学</span>
        </p>
        <p class="login-paper" id="xtmc">仓 &nbsp; 库 &nbsp; 管 &nbsp; 理 &nbsp; 系 &nbsp; 统</p>
      </div>
      <div style="float: right;font-size: 15px;color: white;padding: 2%;line-height: 15px;">
        <p>{{username}}({{telephone}})，&nbsp欢迎使用此系统&nbsp&nbsp&nbsp&nbsp您的被点赞次数为：{{supportTimes}}</p>
        <br>
        <p>时间：{{time}}/角色：仓库管理员/仓库号：{{housewareID}}</p>
        <br>
        <p style="color: white">
          <a id="help" href="#" style="color: white"><i></i>帮&nbsp;&nbsp;助</a>
          <a id="quit" href="#" style="color: white;padding-left: 10%"><i></i>退&nbsp;&nbsp;出</a>
        </p>
      </div>
    </div>

    <!--左边身子，主要是菜单栏-->
    <div style="height: 1800px;background-color: #D5EFF2;width: 16%;padding: 0px;margin: 0px;float: left;">
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#D5EFF2"
          text-color="#666666"
          active-text-color="#34C2D0">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单栏</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="1-1" @click="select1_1">
                仓库目前信息
              </el-menu-item>
              <el-menu-item index="1-2" @click="select1_2">
                仓库物品管理
              </el-menu-item>
              <el-menu-item index="1-3" @click="select1_3">
                仓库报损管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>

    <!--右边身子主体-->
    <div style="float: right;width:84%;">
      <div id="HousewareMessage" class="HousewareMessage">
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库目前信息</div>
        <el-table
          :data="housewareMessagetableData"
          border
          style="width: 100%">
          <el-table-column
            prop="ID"
            label="仓库ID号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="仓库名字"
            width="180">
          </el-table-column>
          <el-table-column
            prop="repertory"
            label="仓库库存">
          </el-table-column>
          <el-table-column
            prop="space"
            label="剩余空间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓库地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态码">
          </el-table-column>
        </el-table>
        <!--物品信息-->
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库物品信息</div>
        <el-table
          :data="productMessagetableData"
          border
          style="width: 100%">
          <el-table-column
            prop="ID"
            label="物品ID号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="物品名字"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="生产日期">
          </el-table-column>
          <el-table-column
            prop="damagedCondition"
            label="损坏程度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goodsDescription"
            label="物品描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="物品价格">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="物品更新时间">
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
        <!--温馨提示-->
        <div style="margin-left: 30%;margin-top: 2%;margin-bottom: 1%;font-size: 120%;color: #909399">
          <p>温馨提示：{{kindlyReminder}}</p>
        </div>

      </div>
      <div id="ProductManager" class="ProductManager"
           style="display: none;margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库物品管理
      </div>
      <div id="ReportDamages" class="ReportDamages" style="display: none">仓库报损管理</div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "Houseware_manager_login_success",
    data() {
      return {
        username: '万平平',
        token: '',
        supportTimes: '0',
        telephone: '15797934717',
        time: '2019-2-4 09:54:23',
        role: '仓库管理员',
        housewareID: '1',
        el_menu_selected: '',
        pageSize: 5,
        currentPage: 1,
        housewareMessagetableData: [
          {ID: '1', name: '东华理工', repertory: '200', space: '20', address: '江西省南昌市经济开发区广兰大道418号', status: 'OK'},
        ],
        productMessagetableData: [
          {
            ID: '',
            name: '',
            createTime: '',
            damagedCondition: '',
            goodsDescription: '',
            price: '',
            updateTime: ''
          },
          {
            ID: '',
            name: '',
            createTime: '',
            damagedCondition: '',
            goodsDescription: '',
            price: '',
            updateTime: ''
          },
          {
            ID: '',
            name: '',
            createTime: '',
            damagedCondition: '',
            goodsDescription: '',
            price: '',
            updateTime: ''
          },
          {
            ID: '',
            name: '',
            createTime: '',
            damagedCondition: '',
            goodsDescription: '',
            price: '',
            updateTime: ''
          },
          {
            ID: '',
            name: '',
            createTime: '',
            damagedCondition: '',
            goodsDescription: '',
            price: '',
            updateTime: ''
          }
        ],

        kindlyReminder: '您所管辖仓库即将会有物品出入库，忘您留心。',
      }
    },
    methods: {
      select1_1: function () {
        this.el_menu_selected = '1-1';
      },
      select1_2: function () {
        this.el_menu_selected = '1-2';
      },
      select1_3: function () {
        this.el_menu_selected = '1-3';
      },

      currentChange: function (val) {
        //alert("折哦度没进来" + val);
        //console.log(this.productMessagetableData);
        this.currentPage = val;
        this.$axios.get("http://localhost:10010/api/logic/logic_controller/get_goods_message",
          {
            params: {
              pageSize: this.pageSize, currentPage: this.currentPage,warehouseId: this.housewareID
            }
          }
        ).then((response) => {
          //console.log(response.data['data']['data'][0]['id']);

          //数据赋值
          for (let i = 0; i < this.pageSize; i++) {
            this.productMessagetableData[i].ID = response.data['data']['data'][i]['id'].toString();
            this.productMessagetableData[i].name = response.data['data']['data'][i]['name'].toString();
            //this.datetimeFormat(response.data['data']['data'][i]['createTime']['time']
            this.productMessagetableData[i].createTime = new Date(response.data['data']['data'][i]['createTime']['time']).toString();
            this.productMessagetableData[i].damagedCondition = response.data['data']['data'][i]['damagedCondition'];
            this.productMessagetableData[i].goodsDescription = response.data['data']['data'][i]['goodsDescription'];
            this.productMessagetableData[i].price = response.data['data']['data'][i]['price'];
            this.productMessagetableData[i].updateTime = new Date(response.data['data']['data'][i]['createTime']['time']).toString();
          }
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getParams: function () {
        // 取到路由带过来的参数
        this.username = this.$route.query.username;
        this.token = this.$route.query.token;
      }
    },
    created() {
      //获取带过来的参数，和设置请求的token
      this.getParams();
      this.$axios.defaults.headers.common['token'] = this.token;
      //请求物品数据第一页
      this.currentChange(1);
    },
    watch: {
      //左边点击菜单栏那个显示，那个不显示函数
      el_menu_selected: function (val) {
        if (val === '1-1') {
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
          let jQueryObject2 = $("#ProductManager");
          jQueryObject2.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "block");
        } else if (val === '1-2') {
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManager");
          jQueryObject2.css("display", "block");
        } else if (val === '1-3') {
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManager");
          jQueryObject2.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "block");
        }
      }
    }
  }
</script>

<style scoped>
  @import '../css/Wms_manager_home.css';
</style>
