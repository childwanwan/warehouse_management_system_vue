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
        <p>时间：{{time}}&nbsp&nbsp角色：{{role}}&nbsp&nbsp仓库号：{{housewareID}}</p>
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
        //后台带回
        username: '万平平',
        token: '',
        supportTimes: '0',
        //前端直接带回数据
        telephone: '',
        //time自己获取
        time: new Date().toDateString(),
        //数据让前端带过来吧
        role: '',
        housewareID: '1',
        //左边选择的菜单栏
        el_menu_selected: '',
        //页数大小
        pageSize: 5,
        //当前页
        currentPage: 1,
        //仓库带过来的信息
        housewareMessagetableData: [
          {ID: '', name: '', repertory: '', space: '', address: '', status: ''},
        ],
        //仓库物品信息
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

        //提示内容
        kindlyReminder: '您所管辖仓库即将会有物品出入库，忘您留心。',
        //接一个对象
        getObj: {},
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

      //改变页数所触发的函数
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
          //console.log(response.data['data']['code']);

          if (response.data['data']['code'].toString()==='1') {
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
          }else {
            this.$message.error(response.data['data']['message']);
          }
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getParams: function () {
        // 取到路由带过来的参数
        this.telephone = this.$route.query.tel;
        this.token = this.$route.query.token;
        this.role = this.$route.query.identify;
        this.username = this.$route.query.username;
        this.supportTimes = this.$route.query.supportTimes;
        this.warehouseId = this.$route.query.warehouseID;
        //仓库信息{ID: '', name: '', repertory: '', space: '', address: '', status: ''}
        this.getObj = this.$route.query.warehouse;
        /*console.log(this.getObj['name'].toString());
        console.log(this.housewareMessagetableData['name']);
        this.housewareMessagetableData['name']=this.getObj['name'];
        console.log("前期"+this.housewareMessagetableData['name']);*/


  },
      getWarehouseData:function () {
        this.housewareMessagetableData[0]['ID']=this.getObj['id'];
        this.housewareMessagetableData[0]['name']=this.getObj['name'];
        this.housewareMessagetableData[0]['repertory']=this.getObj['repertory'];
        this.housewareMessagetableData[0]['space']=this.getObj['space'];
        this.housewareMessagetableData[0]['address']=this.getObj['address'];
        this.housewareMessagetableData[0]['status']=this.getObj['status'];
      }

    },
    created() {
      //获取带过来的参数，和设置请求的token
      this.getParams();
      this.getWarehouseData();
      this.$axios.defaults.headers.common['token'] = this.token;
      //请求物品数据第一页
      this.currentChange(1);
      //请求，填充其他数据

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
