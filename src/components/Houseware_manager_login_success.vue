<template>
  <div>

    <div style="display: none">
    <el-button
      type="primary"
      @click="openFullScreen"
      v-loading.fullscreen.lock="fullscreenLoading">
      指令方式
    </el-button>
    </div>

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
        <p>{{username}}({{telephone}})，&nbsp欢迎使用此系统</p>
        <br>
        <p>时间：{{time}}&nbsp&nbsp角色：{{role}}&nbsp&nbsp仓库号：2019</p>
        <br>
        <p style="color: white">
          <a id="help" href="#" style="color: white" ><i></i>帮&nbsp;&nbsp;助</a>
          <a id="quit" href="#" style="color: white;padding-left: 10%" @click="loginOut"><i></i>退&nbsp;&nbsp;出</a>
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
                仓库出库管理
              </el-menu-item>
              <el-menu-item index="1-3" @click="select1_3">
                仓库入库管理
              </el-menu-item>
              <el-menu-item index="1-4" @click="select1_4">
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
        <!--物品信息-->
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库物品信息</div>
        <!--模糊查询-->
        <div style="margin-top: 15px;margin-left: 70%;margin-bottom: 1%">
          <el-input placeholder="请输入内容" v-model="searchByName" size="small" style="width: 60%">
            <el-button slot="append" icon="el-icon-search" @click="selectByName"></el-button>
          </el-input>
        </div>


        <!--所有信息-->
        <div id="allGoods">
          <el-table
            :data="productMessagetableData"
            border
            style="width: 100%">
            <el-table-column
              prop="goodsCode"
              label="物品编码"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsType"
              label="物品类型"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="物品名称"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="specificationItems"
              label="规格"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="customAttributeItems"
              label="自定义规格"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comment"
              label="物品描述"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsNum"
              label="物品数量"
              width="170"
              align="center">
            </el-table-column>

          </el-table>
          <!--分页-->
          <div style="text-align: center;margin-top: 30px;">
            <el-pagination
              @current-change="currentChange"
              background
              layout="prev, pager, next"
              :total="this.allPage*10"
            >
            </el-pagination>
          </div>
        </div>

        <!--温馨提示-->
        <div style="margin-left: 30%;margin-top: 2%;margin-bottom: 1%;font-size: 120%;color: #909399">
          <p>温馨提示：{{kindlyReminder}}</p>
        </div>

      </div>


      <!--出库管理-->
      <div id="ProductManagerOut" class="ProductManagerOut" style="display: none">
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库出库管理</div>

        <el-table
          :data="outstore"
          border
          style="width: 100%">
          <el-table-column
            prop="providerId"
            label="物品提供人"
            width="252"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reserveId"
            label="物品接收人"
            align="center"
            width="252">
          </el-table-column>
          <el-table-column
            prop="outstoreTime"
            label="出库时间"
            width="252"
            align="center">
          </el-table-column>
          <el-table-column
            prop="totalNum"
            label="物品总数量"
            width="242"
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="252"
            align="center">

            <template slot-scope="scope">　
              <el-button type="primary" style="width: 30%;text-align: center;margin-left: -35%;height: 25px"
                         @click="showOutDetail(scope.$index, scope.row)">查询详情
              </el-button>
              　　　　　
              <el-button type="danger" style="width: 30%;text-align: center;margin-right:-35%;height: 25px"
                         @click="deleteOutstore(scope.$index, scope.row)">删除
              </el-button>
              <!--<el-button width="40" type="info" @click="deleteUser(scope.row.phone)">出库</el-button>-->
              <!--<button style="width: 80px !important;">出库</button>-->
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="outStoreCurrentChange"
            background
            layout="prev, pager, next"
            :total="outstoreAllPage*10">
          </el-pagination>
        </div>

        <!--出库增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addOutstore">
            <span style="color: #909399">+ 添加出库单</span>
          </p>
        </div>


      </div>

      <div id="ProductManagerIn" class="ProductManagerIn" style="display: none">
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库入库管理</div>

        <el-table
          :data="instore"
          border
          style="width: 100%">
          <el-table-column
            prop="provideId"
            label="物品提供人"
            width="252"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reserverId"
            label="物品接收人"
            align="center"
            width="252">
          </el-table-column>
          <el-table-column
            prop="instoreTime"
            label="入库时间"
            width="252"
            align="center">
          </el-table-column>
          <el-table-column
            prop="totalNum"
            label="物品总数量"
            width="242"
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="252"
            align="center">

            <template slot-scope="scope">　
              <el-button type="primary" style="width: 30%;text-align: center;margin-left: -35%;height: 25px"
                         @click="showDetail(scope.$index, scope.row)">查询详情
              </el-button>
              　　　　　

              <el-button type="danger" style="width: 30%;text-align: center;margin-right:-35%;height: 25px"
                         @click="deleteInstore(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="inStoreCurrentChange"
            background
            layout="prev, pager, next"
            :total="instoreAllPage*10">
          </el-pagination>
        </div>

        <!--入库增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addInstore">
            <span style="color: #909399">+ 添加入库单</span>
          </p>
        </div>

      </div>

      <!--仓库报损管理-->
      <div id="ReportDamages" class="ReportDamages" style="display: none">

        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库报损管理</div>

        <el-table
          :data="damage"
          border
          style="width: 100%">
          <el-table-column
            prop="damageName"
            label="报损单名称"
            width="175"
            align="center">
          </el-table-column>

          <el-table-column
            prop="createPersonId"
            label="报损单创建人"
            align="center"
            width="175">
          </el-table-column>
          <el-table-column
            prop="checkPersonId"
            label="报损单审核人"
            width="175"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="175"
            align="center">
          </el-table-column>
          <el-table-column
            prop="approvalTime"
            label="审核时间"
            width="175"
            align="center">
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="175"
            align="center">
          </el-table-column>

          <el-table-column
            prop=""
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">　
              <el-button type="primary" style="width: 50%;text-align: center;;height: 25px"
                         @click="showDamageDetail(scope.$index, scope.row)">查询详情
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="damageCurrentChange"
            background
            layout="prev, pager, next"
            :total="damageAllPage*10">
          </el-pagination>
        </div>

        <!--报损单增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addDamage">
            <span style="color: #909399">+ 添加报损单</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {getAllgoods} from '../api'
  import {getGoodsBygoodsName} from '../api'
  import {getInstore} from '../api'
  import {getEmployeeById} from '../api'
  import {deleteInstore} from '../api'
  import {deleteOutstoresById} from '../api'
  import {getOutstores} from '../api'
  import {getDamages} from '../api'
  import {getEmployees} from '../api'
  import {logOut} from '../api'
  import storage, {
    TOKEN_KEY,
    TELEPHONE_KEY,
    USERNAME_KEY,
    IDENTIFY_KEY,
    ADDR_KEY,
    INSTORE_KEY,
    OUTSTORE_KEY,
    DAMAGE_KEY
  } from '../public/js/storage'
  import {timeFormate} from '../public/js/dateUtils'

  const allEmployee = [];
  export default {
    name: "Houseware_manager_login_success",

    data() {
      return {

        fullscreenLoading:false,

        //后台带回
        username: '万平平',
        supportTimes: '0',
        //前端直接带回数据
        telephone: '',
        //addr
        addr: '',
        //time自己获取
        time: new Date().toDateString(),
        //数据让前端带过来吧
        role: '',
        //左边选择的菜单栏
        el_menu_selected: '',
        //页数大小
        pageSize: 5,
        //当前页
        currentPage: 1,
        //所有的页数
        allPage: 0,
        //总页数
        count: 0,
        searchByName: '',

        //仓库物品信息
        productMessagetableData: [],
        //入库单
        allInstore: [],
        instore: [],
        instorePageSize: 5,
        instoreCount: 0,
        instoreCurrentPage: 0,
        instoreAllPage: 0,
        //出库单
        allOutStore: [],
        outstore: [],
        outstorePageSize: 5,
        outstoreCount: 0,
        outstoreCurrentPage: 0,
        outstoreAllPage: 0,
        //存查询返回的所有数据
        allGoods: [],
        //模糊查询的goods
        conditionGoods: [],

        //报损展示数据
        damage: [],
        //报损所有数据
        allDamage: [],

        damagePageSize: 5,
        damageCount: 0,
        damageCurrentPage: 0,
        damageAllPage: 0,

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
      select1_4: function () {
        this.el_menu_selected = '1-4';
      },

      //改变页数所触发的函数
      currentChange: function (val) {
        //console.log(this.productMessagetableData);
        this.currentPage = val;
        if (this.searchByName === '') {
          if (val > 1) {
            this.productMessagetableData = [];
            // console.log("清空后"+this.productMessagetableData);
            // console.log("(val-1)*this.pageSize="+(val - 1) * this.pageSize);
            // console.log("this.pageSize * val="+this.pageSize * val);
            // console.log("this.allGoods.length="+this.allGoods.length);
            //数组赋值
            for (let i = (val - 1) * this.pageSize; i < this.pageSize * val && i < this.allGoods.length; i++) {
              this.productMessagetableData.push(this.allGoods[i]);
            }
            //console.log("复制后"+this.productMessagetableData);
          } else {

            getAllgoods().then((response) => {
              //console.log(response);
              //console.log(response.data['data']['count']);
              if (response.retCode === 1) {
                this.allGoods = response.data;
                this.count = response.data.length;
                this.productMessagetableData = [];
                if (this.count > this.pageSize) {
                  if (this.count % this.pageSize === 0) {
                    this.allPage = this.count / this.pageSize;
                  } else {
                    this.allPage = parseInt(this.count / this.pageSize) + 1;
                  }
                  //数组赋值
                  for (let i = 0; i < this.pageSize; i++) {
                    this.productMessagetableData.push(response.data[i]);
                  }
                } else {
                  this.allPage = 1;
                  for (let i = 0; i < this.count; i++) {
                    this.productMessagetableData.push(response.data[i]);
                  }
                }

              } else {
                if (response.retCode == '000000') {
                  this.$router.push({
                    path: '/'
                  });
                } else {
                  this.$message.error(response.retMsg);
                }
              }
            })
              .catch(function (error) {
                console.log(error);
              })
          }
        } else {
          if (val > 1) {
            this.productMessagetableData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.pageSize; i < this.pageSize * val && i < this.allGoods.length; i++) {
              this.productMessagetableData.push(this.conditionGoods[i]);
            }
          } else {
            this.selectByName();
          }
        }
      },
      getParams: function () {
        // 取到登入带过来的参数
        this.telephone = storage.get(TELEPHONE_KEY);
        this.role = storage.get(IDENTIFY_KEY);
        this.username = storage.get(USERNAME_KEY);
        this.addr = storage.get(ADDR_KEY);
      },

      selectByName: function () {

        let data = JSON.stringify({
          'goodsName': this.searchByName,
        })
        getGoodsBygoodsName(data).then((res) => {
          //console.log(res);
          //console.log(res.retCode);
          if (res.retCode === 1) {
            //console.log(res.data);
            this.conditionGoods = res.data;
            this.count = res.data.length;
            this.productMessagetableData = [];
            if (this.count > this.pageSize) {
              if (this.count % this.pageSize === 0) {
                this.allPage = parseInt(this.count / this.pageSize);
              } else {
                this.allPage = parseInt(this.count / this.pageSize) + 1;
              }
              //数组赋值
              for (let i = 0; i < this.pageSize; i++) {
                this.productMessagetableData.push(res.data[i]);
              }
            } else {
              this.allPage = 1;
              for (let i = 0; i < this.count; i++) {
                this.productMessagetableData.push(res.data[i]);
              }
            }


          } else {
            if (res.retCode == '000000') {
              this.$router.push({
                path: '/'
              });
            } else {
              this.$message.error(res.retMsg);
            }
          }
        }).catch(function (error) {
          console.log(error);
        })
      },

      //获取入库信息
      getInstore: function (val) {
        this.instoreCurrentPage = val;
        if (this.allInstore.length > 0) {
          this.instore = [];
          for (let i = (val - 1) * this.instorePageSize; i < val * this.instorePageSize && i < this.allInstore.length; i++) {
            this.instore.push(this.allInstore[i]);
          }
        } else {
          let data = JSON.stringify({
            "id": "",
          })

          getInstore(data).then((res) => {
            //console.log(res);
            //console.log(res.retCode);
            if (res.retCode === 1) {
              this.instoreCount = res.instores.length;
              if (this.instoreCount % this.instorePageSize === 0) {
                this.instoreAllPage = parseInt(this.instoreCount / this.instorePageSize);
              } else {
                this.instoreAllPage = parseInt(this.instoreCount / this.instorePageSize) + 1;
              }

              //解析修改值
              for (let i = 0; i < this.instoreCount; i++) {
                //转出手人id

                let provideId = JSON.stringify({
                  "id": res.instores[i]['provideId'],
                })
                getEmployeeById(provideId).then((response) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (response.retCode === 1) {
                    res.instores[i]['provideId'] = response.data.employeeName;
                  } else {
                    if (response.retCode == '000000') {
                      this.$router.push({
                        path: '/'
                      });
                    } else {
                      this.$message.error(response.retMsg);
                    }
                  }
                }).catch(function (error) {
                  console.log(error);
                })


                //转接收人id
                let dataReserveId = JSON.stringify({
                  "id": res.instores[i]['reserverId'],
                })
                getEmployeeById(dataReserveId).then((response) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (response.retCode === 1) {
                    res.instores[i]['reserverId'] = response.data.employeeName;
                  } else {
                    if (response.retCode == '000000') {
                      this.$router.push({
                        path: '/'
                      });
                    } else {
                      this.$message.error(response.retMsg);
                    }
                  }
                }).catch(function (error) {
                  console.log(error);
                })
                //转时间
                var date = new Date(res.instores[i]['instoreTime'].time);
                res.instores[i]['instoreTime'] = timeFormate(date);
              }

              this.allInstore = res.instores;

              if (val === 1) {
                if (this.instorePageSize < this.instoreCount) {
                  for (let i = 0; i < this.instorePageSize; i++) {
                    this.instore.push(res.instores[i]);
                  }
                } else {
                  this.instoreAllPage = 1;
                  for (let i = 0; i < this.instoreCount; i++) {
                    this.instore.push(res.instores[i]);
                  }
                }
              } else {
                this.instore = [];
                for (let i = (val - 1) * this.instorePageSize; i < val * this.instorePageSize && i < this.allInstore.length; i++) {
                  this.instore.push(res.instores[i]);
                }
              }
            } else {
              if (res.retCode == '000000') {
                this.$router.push({
                  path: '/'
                });
              } else {
                this.$message.error(res.retMsg);
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      //入库分页
      inStoreCurrentChange: function (val) {
        this.getInstore(val);
      },
      //入库单查询详情
      showDetail: function (index, row) {
        storage.set(INSTORE_KEY, row.id);
        this.$router.push({
          path: '/instoreDetail'
        });
        //console.log(row);

      },
      //报损单查看详情
      showDamageDetail: function (index, row) {
        storage.set(DAMAGE_KEY, row.id);
        this.$router.push({path: '/damageDetail'});
      },

      //添加入库单
      addInstore: function () {
        this.$router.push({
          path: '/addInstore'
        });
      },


      //添加入库单
      addOutstore: function () {
        this.$router.push({
          path: '/addOutstore'
        });
      },

      //删除入库单
      deleteInstore: function (index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            instoreId: row.id,
          });
          deleteInstore(data).then((response) => {
            //console.log(res.retCode);//res.data['hello world']
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.instore.pop(index);
            } else {
              if (response.retCode == '000000') {
                this.$router.push({
                  path: '/'
                });
              } else {
                this.$message.error(response.retMsg);
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //出库单查看详情
      showOutDetail: function (index, row) {
        storage.set(OUTSTORE_KEY, row.id);
        this.$router.push({
          path: '/outstoreDetail'
        });
        //console.log(row);

      },
      //删除出库单
      deleteOutstore: function (index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            outstoreId: row.id,
          });
          deleteOutstoresById(data).then((response) => {
            //console.log(res.retCode);//res.data['hello world']
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.outstore.pop(index);
            } else {
              if (response.retCode == '000000') {
                this.$router.push({
                  path: '/'
                });
              } else {
                this.$message.error(response.retMsg);
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //出库单获取
      outStoreCurrentChange: function (val) {
        this.outstoreCurrentPage = val;
        if (val == 1 && this.allOutStore.length == 0) {
          this.outstore = [];
          getOutstores().then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              //this.allOutStore = response.data;
              //解析修改值
              for (let i = 0; i < response.data.length; i++) {
                //转出手人id
                let dataId = JSON.stringify({
                  "id": response.data[i]['providerId'],
                })
                getEmployeeById(dataId).then((res) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (res.retCode === 1) {
                    response.data[i]['providerId'] = res.data.employeeName;
                  } else {
                    if (response.retCode == '000000') {
                      this.$router.push({
                        path: '/'
                      });
                    } else {
                      this.$message.error(response.retMsg);
                    }
                  }
                }).catch(function (error) {
                  console.log(error);
                })
                //转接收人id
                let dataReserveId = JSON.stringify({
                  "id": response.data[i]['reserveId'],
                })
                getEmployeeById(dataReserveId).then((res) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (res.retCode === 1) {
                    response.data[i]['reserveId'] = res.data.employeeName;
                  } else this.$message.error(response.retMsg);
                }).catch(function (error) {
                  console.log(error);
                })
                //转时间
                var date = new Date(response.data[i]['outstoreTime'].time);
                response.data[i]['outstoreTime'] = timeFormate(date);
              }
              //console.log(response.data);
              this.allOutStore = response.data;

              if (this.allOutStore.length % this.outstorePageSize === 0) {
                this.outstoreAllPage = this.allOutStore.length / this.outstorePageSize;
              } else {
                this.outstoreAllPage = parseInt(this.allOutStore.length / this.outstorePageSize) + 1;
              }
              //console.log(this.outstoreAllPage);
              this.outstoreCount = this.allOutStore.length;

              if (this.outstoreCount > this.outstorePageSize) {
                for (let i = (val - 1) * this.outstorePageSize; i < val * this.outstorePageSize && i < this.outstoreCount; i++) {
                  this.outstore.push(this.allOutStore[i]);
                }
                //console.log(val * this.outstorePageSize);
              } else {
                for (let i = 0; i < this.outstoreCount; i++) {
                  this.outstore.push(this.allOutStore[i]);
                }
              }
            } else {
              if (response.retCode == '000000') {
                this.$router.push({
                  path: '/'
                });
              } else {
                this.$message.error(response.retMsg);
              }
            }
          }).catch(function (error) {
            console.log(error);
          });

        } else {
          this.outstore = [];
          if (this.outstoreCount > this.outstorePageSize) {
            for (let i = (val - 1) * this.outstorePageSize; i < val * this.outstorePageSize && i < this.outstoreCount; i++) {
              this.outstore.push(this.allOutStore[i]);
            }
          } else {
            for (let i = 0; i < this.outstoreCount; i++) {
              this.outstore.push(this.allOutStore[i]);
            }
          }
        }
      },

      //报损单更改页数
      damageCurrentChange: function (val) {

        this.damageCurrentPage = val;
        if (val == 1 && this.allDamage.length == 0) {
          this.damage = [];
          let data = JSON.stringify({"": ""});
          getDamages(data).then((response) => {
            //console.log(response.damages);
            if (response.retCode === 1) {
              for (let i = 0; i < response.damages.length; i++) {
                if (response.damages[i].deep == 0) {
                  response.damages[i].deep = "普通";
                } else {
                  response.damages[i].deep = "紧急";
                }

                //转创建人id
                let createPersonId = JSON.stringify({
                  "id": response.damages[i]['createPersonId'],
                })
                getEmployeeById(createPersonId).then((res) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (res.retCode === 1) {
                    response.damages[i]['createPersonId'] = res.data.employeeName;
                  } else {
                    if (response.retCode == '000000') {
                      this.$router.push({
                        path: '/'
                      });
                    } else {
                      this.$message.error(response.retMsg);
                    }
                  }
                }).catch(function (error) {
                  console.log(error);
                })

                //转审核人id
                let checkPersonId = JSON.stringify({
                  "id": response.damages[i]['checkPersonId'],
                })
                getEmployeeById(checkPersonId).then((res) => {
                  //console.log(res.retCode);//res.data['hello world']
                  if (res.retCode === 1) {
                    response.damages[i]['checkPersonId'] = res.data.employeeName;
                  } else {
                    if (response.retCode == '000000') {
                      this.$router.push({
                        path: '/'
                      });
                    } else {
                      this.$message.error(response.retMsg);
                    }
                  }
                }).catch(function (error) {
                  console.log(error);
                })

                //转时间
                var date = new Date(response.damages[i]['createTime'].time);
                response.damages[i]['createTime'] = timeFormate(date);
                //console.log(JSON.stringify(response.damages[i]['approvalTime']));
                if (JSON.stringify(response.damages[i]['approvalTime']) != "{}") {
                  var date1 = new Date(response.damages[i]['approvalTime'].time);
                  response.damages[i]['approvalTime'] = timeFormate(date1);
                } else {
                  response.damages[i]['approvalTime'] = '';
                }

                if (response.damages[i]['status']==0){
                  response.damages[i]['status'] = "待审批";
                }else if (response.damages[i]['status']==1){
                  response.damages[i]['status'] = "被打回";
                }else {
                  response.damages[i]['status'] = "审批通过";
                }


              }
              this.allDamage = response.damages;

              if (this.allDamage.length % this.damagePageSize === 0) {
                this.damageAllPage = this.allDamage.length / this.damagePageSize;
              } else {
                this.damageAllPage = parseInt(this.allDamage.length / this.damagePageSize) + 1;
              }
              this.damageCount = this.allDamage.length;

              if (this.damageCount > this.damagePageSize) {
                for (let i = (val - 1) * this.damagePageSize; i < val * this.damagePageSize && i < this.damageCount; i++) {
                  this.damage.push(this.allDamage[i]);
                }
                //console.log(val * this.outstorePageSize);
              } else {
                for (let i = 0; i < this.damageCount; i++) {
                  this.damage.push(this.allDamage[i]);
                }
              }
            } else {
              if (response.retCode == '000000') {
                this.$router.push({
                  path: '/'
                });
              } else {
                this.$message.error(response.retMsg);
              }
            }
          }).catch(function (error) {
            console.log(error);
          });

        } else {
          this.damage = [];
          if (this.damageCount > this.damagePageSize) {
            for (let i = (val - 1) * this.damagePageSize; i < val * this.damagePageSize && i < this.damageCount; i++) {
              this.damage.push(this.allDamage[i]);
            }
          } else {
            for (let i = 0; i < this.damageCount; i++) {
              this.damage.push(this.allDamage[i]);
            }
          }
        }


      },

      getAllEmployee: function () {
        getEmployees().then((response) => {
          if (response.retCode === 1) {
          } else {
            if (response.retCode == '000000') {
              this.$router.push({
                path: '/'
              });
            } else {
              this.$message.error(response.retMsg);
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      addDamage: function () {
        this.$router.push({
          path: '/addDamage'
        });
      },


      loginOut:function () {

        let data = JSON.stringify({
          token:storage.get(TOKEN_KEY)
        });
        logOut(data).then((response) => {
          if (response.retCode === 1) {
            storage.clear();
            this.$router.push({
              path: '/'
            });
          } else {
            if (response.retCode == '000000') {
              this.$router.push({
                path: '/'
              });
            } else {
              this.$message.error(response.retMsg);
            }
          }
        }).catch(function (error) {
          //console.log(error);
        });

      },

      openFullScreen() {


        //获取带过来的参数，和设置请求的token
        this.getParams();
        //this.getWarehouseData();
        //请求物品数据第一页
        this.currentChange(1);
        //请求，填充其他数据

        //请求获取入库信息
        this.getInstore(1);

        //请求获取出库信息
        this.outStoreCurrentChange(1);

        //请求获取报损信息
        this.damageCurrentChange(1);

        //获取所以得职工信息
        //this.getAllEmployee();

        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);

      },

    },

    created() {
      this.openFullScreen();
    },
    watch: {
      //左边点击菜单栏那个显示，那个不显示函数
      el_menu_selected: function (val) {
        if (val === '1-1') {
          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "block");
        } else if (val === '1-2') {
          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "block");
        } else if (val === '1-3') {
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "block");
        } else if (val === '1-4') {
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
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
