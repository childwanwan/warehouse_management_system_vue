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
          <a id="help" href="#" style="color: white"><i></i>帮&nbsp;&nbsp;助</a>
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
              <el-menu-item index="1-5" @click="select1_5">
                仓库用户管理
              </el-menu-item>
              <el-menu-item index="1-6" @click="select1_6">
                仓库物品管理
              </el-menu-item>
              <el-menu-item index="1-7" @click="select1_7">
                仓库供应商管理
              </el-menu-item>
              <el-menu-item index="1-8" @click="select1_8">
                仓库职工管理
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
              width="180"
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
            width="252"
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
              　　　　　
              <el-button type="primary" style="width: 30%;text-align: center;margin-right:-35%;height: 25px"
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
            width="252"
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
              　　　　　

              <el-button type="primary" style="width: 30%;text-align: center;margin-right:-35%;height: 25px"
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
              <el-button type="primary" style="width: 40%;text-align: center;;height: 25px"
                         @click="showDamageDetail(scope.$index, scope.row)">查询详情
              </el-button>
              <el-button type="danger" style="width: 40%;text-align: center;;height: 25px"
                         @click="deleteDamage(scope.$index, scope.row)" v-if="scope.row.status!='待审批'">删除
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

      <!--用户管理-->
      <div id="userManage" style="display: none">
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库用户管理</div>

        <el-table
          :data="user"
          border
          style="width: 100%">
          <el-table-column
            prop="employeeName"
            label="用户名称"
            width="300"
            align="center">
          </el-table-column>

          <el-table-column
            prop="telephone"
            label="用户电话"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="用户地址"
            width="300"
            align="center">
          </el-table-column>

          <el-table-column
            prop=""
            label="操作"
            width="362"
            align="center">
            <template slot-scope="scope">　
              <el-button type="primary" style="width: 30%;text-align: center;;height: 35px"
                         @click="updateUser(scope.$index, scope.row)">修改
              </el-button>


              <!--弹框-->
              <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户电话" :label-width="formLabelWidth">
                    <el-input v-model="form.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户地址" :label-width="formLabelWidth">
                    <el-input v-model="form.addr" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户身份" :label-width="formLabelWidth">
                    <el-select v-model="form.identity" placeholder="请选择用户身份" style="width: 100%">
                      <el-option label=" 仓库管理员" value="3"></el-option>
                      <el-option label=" 普通职工" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">取 消
                  </el-button>
                  <el-button type="primary" @click="updateUserToDataBase(scope.$index, scope.row)"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">确 定
                  </el-button>
                </div>
              </el-dialog>


              <el-button type="danger" style="width: 30%;text-align: center;height: 35px;"
                         @click="deleteUser(scope.$index, scope.row)">删除
              </el-button>

            </template>
          </el-table-column>

        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="userCurrentChange"
            background
            layout="prev, pager, next"
            :total="userAllPage*10">
          </el-pagination>
        </div>

        <!--用户管理增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addUser">
            <span style="color: #909399">+ 添加用户</span>
          </p>
        </div>
      </div>

      <!--物品管理-->
      <div id="goodsManage" style="display: none">
        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库物品管理</div>


        <!--商品字典信息-->
        <!--          <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">商品字典信息</div>-->
        <!--模糊查询-->
        <div style="margin-top: 15px;margin-left: 70%;margin-bottom: 1%">
          <el-input placeholder="请输入内容" v-model="searchGoodsDirByName" size="small" style="width: 60%">
            <el-button slot="append" icon="el-icon-search" @click="selectGoodsDirByName"></el-button>
          </el-input>
        </div>


        <!--所有信息-->
        <div id="allGoodsDir">
          <el-table
            :data="goodsDirData"
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
              label="规格集"
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
            <!--              <el-table-column-->
            <!--                prop="goodsNum"-->
            <!--                label="物品数量"-->
            <!--                width="180"-->
            <!--                align="center">-->
            <!--              </el-table-column>-->

            <el-table-column
              prop=""
              label="操作"
              width="180"
              align="center">
              <template slot-scope="scope">　
                <el-button type="primary" style="width: 30%;text-align: center;;height: 25px"
                           @click="updateGoodsDir(scope.$index, scope.row)">修改
                </el-button>

                <!--弹框-->
                <el-dialog title="商品字典信息修改" :visible.sync="goodsDirDialogFormVisible">
                  <el-form :model="goodsDirForm">
                    <el-form-item label="物品编码" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.goodsCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品类型" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.goodsType" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品名称" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.goodsName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规格集" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.specificationItems" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="自定义规格" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.customAttributeItems" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品描述" :label-width="formLabelWidth">
                      <el-input v-model="goodsDirForm.comment" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="goodsDirDialogFormVisible = false"
                               style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">取 消
                    </el-button>
                    <el-button type="primary" @click="updateGoodsDirToDataBase(scope.$index, scope.row)"
                               style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">确 定
                    </el-button>
                  </div>
                </el-dialog>


                <el-button type="danger" style="width: 30%;text-align: center;;height: 25px"
                           @click="deleteGoodsDir(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>


          </el-table>

          <!--分页-->
          <div style="text-align: center;margin-top: 30px;">
            <el-pagination
              @current-change="goodsDirCurrentChange"
              background
              layout="prev, pager, next"
              :total="this.goodsDirAllPage*10"
            >
            </el-pagination>
          </div>


          <!--物品管理增加栏-->
          <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
            <p
              style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
              @click="addGoodsDir">
              <span style="color: #909399">+ 添加物品字典</span>
            </p>
          </div>

        </div>
      </div>


    </div>

    <!--职工管理-->
    <div id="employeeManage" style="display: none">
      <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库职工管理</div>

      <!--模糊查询-->
      <div style="margin-top: 15px;margin-left: 70%;margin-bottom: 1%">
        <el-input placeholder="请输入内容" v-model="searchEmployeeByName" size="small" style="width: 60%">
          <el-button slot="append" icon="el-icon-search" @click="selectEmployeeByName"></el-button>
        </el-input>
      </div>

      <!--所有信息-->
      <div id="allEmployee" style="float: right">
        <el-table
          :data="employeeData"
          border
          style="width: 100%">
          <el-table-column
            prop="employeeName"
            label="职工名称"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="职工电话"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="职工地址"
            width="300"
            align="center">
          </el-table-column>

          <el-table-column
            prop=""
            label="操作"
            width="300"
            align="center">
            <template slot-scope="scope">　
              <el-button type="primary" style="width: 30%;text-align: center;;height: 25px"
                         @click="updateEmployee(scope.$index, scope.row)">修改
              </el-button>

              <!--弹框-->
              <el-dialog title="职工信息修改" :visible.sync="employeeDialogFormVisible">
                <el-form :model="employeeForm">
                  <el-form-item label="职工名称" :label-width="formLabelWidth">
                    <el-input v-model="employeeForm.employeeName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="职工电话" :label-width="formLabelWidth">
                    <el-input v-model="employeeForm.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="职工地址" :label-width="formLabelWidth">
                    <el-input v-model="employeeForm.addr" auto-complete="off"></el-input>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="employeeDialogFormVisible = false"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">取 消
                  </el-button>
                  <el-button type="primary" @click="updateEmployeeToDataBase(scope.$index, scope.row)"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">确 定
                  </el-button>
                </div>
              </el-dialog>


              <el-button type="danger" style="width: 30%;text-align: center;;height: 25px"
                         @click="deleteEmployee(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>


        </el-table>
        <!--分页-->
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="employeeCurrentChange"
            background
            layout="prev, pager, next"
            :total="this.employeeAllPage*10"
          >
          </el-pagination>
        </div>


        <!--物品管理增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addEmployee">
            <span style="color: #909399">+ 添加职工</span>
          </p>
        </div>

      </div>

    </div>
    <!--供应商管理-->
    <div id="providerManage" style="display: none">
      <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库供应商管理</div>

      <!--模糊查询-->
      <div style="margin-top: 15px;margin-left: 70%;margin-bottom: 1%">
        <el-input placeholder="请输入内容" v-model="searchProviderByName" size="small" style="width: 60%">
          <el-button slot="append" icon="el-icon-search" @click="selectProviderByName"></el-button>
        </el-input>
      </div>

      <!--所有信息-->
      <div id="allProvider" style="float: right">
        <el-table
          :data="providerData"
          border
          style="width: 100%">
          <el-table-column
            prop="providerType"
            label="供应物品编码"
            width="210"
            align="center">
          </el-table-column>
          <el-table-column
            prop="providerName"
            label="供应商名称"
            align="center"
            width="210">
          </el-table-column>
          <el-table-column
            prop="linkman"
            label="联系人"
            width="210"
            align="center">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系电话"
            width="210"
            align="center">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="联系地址"
            width="210"
            align="center">
          </el-table-column>

          <el-table-column
            prop=""
            label="操作"
            width="210"
            align="center">
            <template slot-scope="scope">　
              <el-button type="primary" style="width: 30%;text-align: center;;height: 25px"
                         @click="updateProvider(scope.$index, scope.row)">修改
              </el-button>

              <!--弹框-->
              <el-dialog title="商品字典信息修改" :visible.sync="providerDialogFormVisible">
                <el-form :model="providerForm">
                  <el-form-item label="供应物品编码" :label-width="formLabelWidth">
                    <el-input v-model="providerForm.providerType" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商名称" :label-width="formLabelWidth">
                    <el-input v-model="providerForm.providerName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="providerForm.linkman" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="providerForm.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系地址" :label-width="formLabelWidth">
                    <el-input v-model="providerForm.addr" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="providerDialogFormVisible = false"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">取 消
                  </el-button>
                  <el-button type="primary" @click="updateproviderToDataBase(scope.$index, scope.row)"
                             style="width: 10%;height: 40px;border: 1px solid #dcdfe6;">确 定
                  </el-button>
                </div>
              </el-dialog>


              <el-button type="danger" style="width: 30%;text-align: center;;height: 25px"
                         @click="deleteprovider(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>


        </el-table>
        <!--分页-->
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="providerCurrentChange"
            background
            layout="prev, pager, next"
            :total="this.providerAllPage*10"
          >
          </el-pagination>
        </div>


        <!--供应商管理增加栏-->
        <div data-v-f81d8020="" style="width: 80%;margin-left: 10%;margin-top: 5%">
          <p
            style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
            @click="addProvider">
            <span style="color: #909399">+ 添加供应商</span>
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
  import {updateEmployees} from '../api'
  import {getGoodsDicMessage} from '../api'
  import {updateGoodsDicById} from '../api'
  import {deleteGoodsDicByGoodsCode} from "../api";
  import {getProviderByCondition} from "../api"
  import {getProvider} from '../api'
  import {updateProviderById} from '../api'
  import {getEmployeeByEmployeeName} from '../api'
  import {getEmployeesByStatus} from '../api'
  import {updateDamage} from '../api'
  import {logOut} from "../api";
  import storage, {
    TOKEN_KEY,
    TELEPHONE_KEY,
    USERNAME_KEY,
    IDENTIFY_KEY,
    ADDR_KEY,
    INSTORE_KEY,
    OUTSTORE_KEY,
    DAMAGE_KEY,
    USER_KEY,
    GOODSDIR_KEY,
    PROVIDER_KEY,
    EMPLOYEE_KEY
  } from '../public/js/storage'
  import {timeFormate} from '../public/js/dateUtils'

  const allEmployee = [];
  export default {
    name: "System_manager_login_success",

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

        //用户信息
        user: [],
        allUser: [],
        userPageSize: 5,
        userCount: 0,
        userCurrentPage: 0,
        userAllPage: 0,

        //商品字典信息
        goodsDirData: [],
        allGoodsDir: [],
        goodsDirPageSize: 5,
        goodsDirCount: 0,
        goodsDirCurrentPage: 0,
        goodsDirAllPage: 0,
        //模糊查询字段
        searchGoodsDirByName: '',
        //模糊查询的goods字典
        conditionGoodsDir: [],


        //修改用户弹框信息
        dialogFormVisible: false,
        form: {
          name: '',
          identity: '',
          telephone: '',
          addr: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',


        //商品字典修改弹框
        goodsDirDialogFormVisible: false,
        goodsDirForm: {
          goodsCode: '',
          goodsType: '',
          goodsName: '',
          specificationItems: '',
          customAttributeItems: '',
          comment: '',
        },


        //供应商信息
        providerData: [],
        allProvider: [],
        providerPageSize: 5,
        providerCount: 0,
        providerCurrentPage: 0,
        providerAllPage: 0,
        //模糊查询字段
        searchProviderByName: '',
        //模糊查询的goods字典
        conditionProvider: [],

        //供应商修改弹框
        providerDialogFormVisible: false,
        providerForm: {
          providerType: '',
          providerName: '',
          linkman: '',
          telephone: '',
          addr: '',
        },


        //职工信息
        employeeData: [],
        allEmployee: [],
        employeePageSize: 5,
        employeeCount: 0,
        employeeCurrentPage: 0,
        employeeAllPage: 0,
        //模糊查询字段
        searchEmployeeByName: '',
        //模糊查询的goods字典
        conditionEmployee: [],

        //供应商修改弹框
        employeeDialogFormVisible: false,
        employeeForm: {
          telephone: '',
          employeeName: '',
          addr: '',
        },


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
      select1_5: function () {
        this.el_menu_selected = '1-5';
      },
      select1_6: function () {
        this.el_menu_selected = '1-6';
      },
      select1_7: function () {
        this.el_menu_selected = '1-7';
      },
      select1_8: function () {
        this.el_menu_selected = '1-8';
      },

      //改变页数所触发的函数
      currentChange: function (val) {
        //console.log(this.productMessagetableData);
        this.currentPage = val;
        if (this.searchByName === '') {
          if (val > 1) {
            this.productMessagetableData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.pageSize; i < this.pageSize * val, i < this.allGoods.length; i++) {
              this.productMessagetableData.push(this.allGoods[i]);
            }
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
            for (let i = (val - 1) * this.pageSize; i < this.pageSize * val, i < this.allGoods.length; i++) {
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
          for (let i = (val - 1) * this.instorePageSize; i < val * this.instorePageSize, i < this.allInstore.length; i++) {
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
                for (let i = (val - 1) * this.instorePageSize; i < val * this.instorePageSize, i < this.allInstore.length; i++) {
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

      //报损单删除
      deleteDamage: function (index, row) {
        //console.log(row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            id: row.id,
            status: 9999
          });
          updateDamage(data).then((response) => {
            //console.log(res.retCode);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              location.reload();
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

                if (response.damages[i]['status'] == 0) {
                  response.damages[i]['status'] = "待审批";
                } else if (response.damages[i]['status'] == 1) {
                  response.damages[i]['status'] = "被打回";
                } else {
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

      //添加仓库管理员
      addUser: function () {
        this.$router.push({
          path: '/addUser'
        });
      },

      userCurrentChange: function (val) {


        this.userCurrentPage = val;
        if (val == 1 && this.allUser.length == 0) {
          this.user = [];
          getEmployees().then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {

              //console.log(response.data);

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status == 3) {
                  this.allUser.push(response.data[i]);
                }
              }
              //console.log(this.allUser);
              //this.allUser = response.data;

              if (this.allUser.length % this.userPageSize === 0) {
                this.userAllPage = this.allUser.length / this.userPageSize;
              } else {
                this.userAllPage = parseInt(this.allUser.length / this.userPageSize) + 1;
              }
              //console.log(this.outstoreAllPage);
              this.userCount = this.allUser.length;

              if (this.userCount > this.userPageSize) {
                for (let i = (val - 1) * this.userPageSize; i < val * this.userPageSize && i < this.userCount; i++) {
                  this.user.push(this.allUser[i]);
                }
                //console.log(val * this.outstorePageSize);
              } else {
                for (let i = 0; i < this.userCount; i++) {
                  this.user.push(this.allUser[i]);
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
          this.user = [];
          if (this.userCount > this.userPageSize) {
            for (let i = (val - 1) * this.userPageSize; i < val * this.userPageSize && i < this.userCount; i++) {
              this.user.push(this.allUser[i]);
            }
          } else {
            for (let i = 0; i < this.userCount; i++) {
              this.user.push(this.allUser[i]);
            }
          }
        }

      },

      deleteUser: function (index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            id: row.id,
            status: 9999,
          });
          updateEmployees(data).then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.user.pop(index);
              //location.reload();
              // this.el_menu_selected = '1-5';
              //this.userCurrentChange(1);
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
        })
      },
      updateUser: function (index, row) {
        storage.set(USER_KEY, row.id);
        // this.$router.push({
        //   path: '/updateUser'
        // });
        this.form.name = this.user[index].employeeName;
        this.form.telephone = this.user[index].telephone;
        this.form.addr = this.user[index].addr;
        this.form.identity = '3';
        this.dialogFormVisible = true;
      },
      updateUserToDataBase: function (index, row) {
        //console.log(this.form);
        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            id: storage.get(USER_KEY),
            employeeName: this.form.name,
            telephone: this.form.telephone,
            addr: this.form.addr,
            status: this.form.identity,
          });
          updateEmployees(data).then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              location.reload();
              // this.el_menu_selected = '1-5';
              //this.userCurrentChange(1);
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
        })
        this.dialogFormVisible = false;
      },


      //商品字典信息处理
      //根据名称模糊查询
      selectGoodsDirByName: function () {
        let data = JSON.stringify({
          'goodsName': this.searchGoodsDirByName,
        })
        getGoodsDicMessage(data).then((res) => {
          //console.log(res);
          //console.log(res.retCode);
          if (res.retCode === 1) {
            //console.log(res.data);
            this.conditionGoodsDir = res.data;
            this.goodsDirCount = res.data.length;
            this.goodsDirData = [];
            if (this.goodsDirCount > this.goodsDirPageSize) {
              if (this.goodsDirCount % this.goodsDirPageSize === 0) {
                this.goodsDirAllPage = parseInt(this.goodsDirCount / this.goodsDirPageSize);
              } else {
                this.goodsDirAllPage = parseInt(this.goodsDirCount / this.goodsDirPageSize) + 1;
              }
              //数组赋值
              for (let i = 0; i < this.goodsDirPageSize; i++) {
                res.data[i].specificationItems = "[" + res.data[i].specificationItems.toString() + "]";
                this.goodsDirData.push(res.data[i]);
              }
            } else {
              this.goodsDirAllPage = 1;
              for (let i = 0; i < this.goodsDirCount; i++) {
                res.data[i].specificationItems = "[" + res.data[i].specificationItems.toString() + "]";
                this.goodsDirData.push(res.data[i]);
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

      goodsDirCurrentChange: function (val) {
        //console.log(this.productMessagetableData);
        this.goodsDirCurrentPage = val;
        if (this.searchGoodsDirByName === '') {
          if (val > 1) {
            this.goodsDirData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.goodsDirPageSize; i < this.goodsDirPageSize * val, i < this.allGoodsDir.length; i++) {
              this.allGoodsDir[i].specificationItems = "[" + this.allGoodsDir[i].specificationItems.toString() + "]";
              this.goodsDirData.push(this.allGoodsDir[i]);
            }
          } else {
            let data = JSON.stringify({});
            getGoodsDicMessage(data).then((response) => {
              //console.log(response);
              //console.log(response.data['data']['count']);
              if (response.retCode === 1) {
                this.allGoodsDir = response.data;
                this.goodsDirCount = response.data.length;
                this.goodsDirData = [];
                if (this.goodsDirCount > this.goodsDirPageSize) {
                  if (this.goodsDirCount % this.goodsDirPageSize === 0) {
                    this.goodsDirAllPage = this.goodsDirCount / this.goodsDirPageSize;
                  } else {
                    this.goodsDirAllPage = parseInt(this.goodsDirCount / this.goodsDirPageSize) + 1;
                  }
                  //数组赋值
                  for (let i = 0; i < this.goodsDirPageSize; i++) {

                    response.data[i].specificationItems = "[" + response.data[i].specificationItems.toString() + "]";
                    this.goodsDirData.push(response.data[i]);

                  }
                } else {
                  this.goodsDirAllPage = 1;
                  for (let i = 0; i < this.goodsDirCount; i++) {
                    response.data[i].specificationItems = "[" + response.data[i].specificationItems.toString() + "]";
                    this.goodsDirData.push(response.data[i]);
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
            this.goodsDirData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.goodsDirPageSize; i < this.goodsDirPageSize * val, i < this.allGoodsDir.length; i++) {
              this.goodsDirData.push(this.conditionGoodsDir[i]);
            }
          } else {
            this.selectGoodsDirByName();
          }
        }
      },


      updateGoodsDir: function (index, row) {
        storage.set(GOODSDIR_KEY, row.id);
        this.goodsDirForm.goodsCode = this.goodsDirData[index].goodsCode;
        this.goodsDirForm.goodsType = this.goodsDirData[index].goodsType;
        this.goodsDirForm.goodsName = this.goodsDirData[index].goodsName;
        this.goodsDirForm.specificationItems = this.goodsDirData[index].specificationItems;
        this.goodsDirForm.customAttributeItems = this.goodsDirData[index].customAttributeItems;
        this.goodsDirForm.comment = this.goodsDirData[index].comment;
        //console.log(this.goodsDirForm);
        this.goodsDirDialogFormVisible = true;
      },
      updateGoodsDirToDataBase: function (index, row) {
        console.log(this.goodsDirForm);

        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsDirForm['id'] = storage.get(GOODSDIR_KEY);
          let data = JSON.stringify(this.goodsDirForm);
          updateGoodsDicById(data).then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              location.reload();
              // this.el_menu_selected = '1-5';
              //this.userCurrentChange(1);
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
        })
        this.goodsDirDialogFormVisible = false;
      },
      deleteGoodsDir: function (index, row) {
        //console.log(row.goodsCode);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({goodCode: row.goodsCode});
          deleteGoodsDicByGoodsCode(data).then((response) => {
            //console.log(response);
            //console.log(response.data['data']['count']);

            if (response.retCode === 1) {

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.goodsDirData.pop(index);
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
        })
      },

      //添加物品字典
      addGoodsDir: function () {
        this.$router.push({
          path: '/addGoodsDir'
        });
      },


      //供应商信息处理
      //根据名称模糊查询
      selectProviderByName: function () {
        let data = JSON.stringify({
          'providerName': this.searchProviderByName,
        })
        getProviderByCondition(this.searchProviderByName).then((res) => {
          //console.log(res);
          //console.log(res.retCode);
          if (res.retCode === 1) {
            //console.log(res.data);
            this.conditionProvider = res.data;
            this.providerCount = res.data.length;
            this.providerData = [];
            if (this.providerCount > this.providerPageSize) {
              if (this.providerCount % this.providerPageSize === 0) {
                this.providerAllPage = parseInt(this.providerCount / this.providerPageSize);
              } else {
                this.providerAllPage = parseInt(this.providerCount / this.providerPageSize) + 1;
              }
              //数组赋值
              for (let i = 0; i < this.providerPageSize; i++) {
                this.providerData.push(res.data[i]);
              }
            } else {
              this.providerAllPage = 1;
              for (let i = 0; i < this.providerCount; i++) {
                this.providerData.push(res.data[i]);
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

      providerCurrentChange: function (val) {
        //console.log(this.productMessagetableData);
        this.providerCurrentPage = val;
        if (this.searchProviderByName === '') {
          if (val > 1) {
            this.providerData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.providerPageSize; i < this.providerPageSize * val, i < this.allProvider.length; i++) {
              this.providerData.push(this.allProvider[i]);
            }
          } else {
            getProvider().then((response) => {
              //console.log(response);
              //console.log(response.data['data']['count']);
              if (response.retCode === 1) {
                this.allProvider = response.data;
                this.providerCount = response.data.length;
                this.providerData = [];
                if (this.providerCount > this.providerPageSize) {
                  if (this.providerCount % this.providerPageSize === 0) {
                    this.providerAllPage = this.providerCount / this.providerPageSize;
                  } else {
                    this.providerAllPage = parseInt(this.providerCount / this.providerPageSize) + 1;
                  }
                  //数组赋值
                  for (let i = 0; i < this.providerPageSize; i++) {

                    this.providerData.push(response.data[i]);

                  }
                } else {
                  this.providerAllPage = 1;
                  for (let i = 0; i < this.providerCount; i++) {
                    this.providerData.push(response.data[i]);
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
            this.providerData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.providerPageSize; i < this.providerPageSize * val, i < this.allProvider.length; i++) {
              this.providerData.push(this.conditionProvider[i]);
            }
          } else {
            this.selectProviderByName();
          }
        }
      },


      updateProvider: function (index, row) {
        storage.set(EMPLOYEE_KEY, row.id);
        this.providerForm.providerType = this.providerData[index].providerType;
        this.providerForm.providerName = this.providerData[index].providerName;
        this.providerForm.linkman = this.providerData[index].linkman;
        this.providerForm.telephone = this.providerData[index].telephone;
        this.providerForm.addr = this.providerData[index].addr;
        this.providerDialogFormVisible = true;
      },
      updateproviderToDataBase: function (index, row) {
        //console.log(this.providerForm);

        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.providerForm['id'] = storage.get(PROVIDER_KEY);
          let data = JSON.stringify(this.providerForm);
          updateProviderById(data).then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              location.reload();
              // this.el_menu_selected = '1-5';
              //this.userCurrentChange(1);
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
        })
        this.providerDialogFormVisible = false;
      },
      deleteprovider: function (index, row) {
        //console.log(row.id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({id: row.id, status: 9999});
          updateProviderById(data).then((response) => {
            //console.log(response);
            //console.log(response.data['data']['count']);
            if (response.retCode === 1) {

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //location.reload();
              setTimeout(function () {
                location.reload();
              }, 1000)
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
        })
      },

      //添加供应商
      addProvider: function () {
        this.$router.push({
          path: '/addProvider'
        });
      },


      //职工信息处理
      //根据名称模糊查询
      selectEmployeeByName: function () {
        let data = JSON.stringify({
          'employeeName': this.searchEmployeeByName,
        })
        getEmployeeByEmployeeName(data).then((res) => {
          //console.log(res);
          //console.log(res.retCode);
          if (res.retCode === 1) {
            //console.log(res.data);
            this.conditionEmployee = res.data;
            this.employeeCount = res.data.length;
            this.employeeData = [];
            if (this.employeeCount > this.employeePageSize) {
              if (this.employeeCount % this.employeePageSize === 0) {
                this.employeeAllPage = parseInt(this.employeeCount / this.employeePageSize);
              } else {
                this.employeeAllPage = parseInt(this.employeeCount / this.employeePageSize) + 1;
              }
              //数组赋值
              for (let i = 0; i < this.employeePageSize; i++) {
                this.employeeData.push(res.data[i]);
              }
            } else {
              this.employeeAllPage = 1;
              for (let i = 0; i < this.employeeCount; i++) {
                this.employeeData.push(res.data[i]);
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

      employeeCurrentChange: function (val) {
        //console.log(this.productMessagetableData);
        this.employeeCurrentPage = val;
        if (this.searchEmployeeByName === '') {
          if (val > 1) {
            this.employeeData = [];
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.employeePageSize; i < this.employeePageSize * val, i < this.allEmployee.length; i++) {
              this.employeeData.push(this.allEmployee[i]);
            }
          } else {
            let data = JSON.stringify({status: 1})
            getEmployeesByStatus(data).then((response) => {
              //console.log(response);

              if (response.retCode === 1) {
                this.allEmployee = response.data;
                this.employeeCount = response.data.length;
                this.employeeData = [];
                if (this.employeeCount > this.employeePageSize) {
                  if (this.employeeCount % this.employeePageSize === 0) {
                    this.employeeAllPage = this.employeeCount / this.employeePageSize;
                  } else {
                    this.employeeAllPage = parseInt(this.employeeCount / this.employeePageSize) + 1;
                  }
                  //数组赋值
                  for (let i = 0; i < this.employeePageSize; i++) {
                    this.employeeData.push(response.data[i]);
                  }
                } else {
                  this.employeeAllPage = 1;
                  for (let i = 0; i < this.employeeCount; i++) {
                    this.employeeData.push(response.data[i]);
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
            //console.log(this.employeeData);
            this.employeeData = [{"employeeName": '', "telephone": '', "adde": ''}];
            //  for (let i = 0;i<this.employeeData.length;i++){
            //    this.employeeData.pop(i);
            //  }
            //console.log(this.employeeData);
            //console.log(this.productMessagetableData);
            //数组赋值
            for (let i = (val - 1) * this.employeePageSize; i < this.employeePageSize * val, i < this.allEmployee.length; i++) {
              this.employeeData.push(this.conditionEmployee[i]);
            }
          } else {
            this.selectEmployeeByName();
          }
        }
      },


      updateEmployee: function (index, row) {
        storage.set(EMPLOYEE_KEY, row.id);
        this.employeeForm.telephone = this.employeeData[index].telephone;
        this.employeeForm.employeeName = this.employeeData[index].employeeName;
        this.employeeForm.addr = this.employeeData[index].addr;

        this.employeeDialogFormVisible = true;
      },
      updateEmployeeToDataBase: function (index, row) {
        //console.log(this.employeeForm);

        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.employeeForm['id'] = storage.get(EMPLOYEE_KEY);
          let data = JSON.stringify(this.employeeForm);
          updateEmployees(data).then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              location.reload();
              // this.el_menu_selected = '1-5';
              //this.userCurrentChange(1);
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
        })
        this.employeeDialogFormVisible = false;
      },
      deleteEmployee: function (index, row) {
        //console.log(row.id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({id: row.id, status: 9999});
          updateEmployees(data).then((response) => {
            //console.log(response);
            //console.log(response.data['data']['count']);
            if (response.retCode === 1) {

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //location.reload();
              setTimeout(function () {
                location.reload();
              }, 1000)
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
        })
      },

      //添加职工
      addEmployee: function () {
        this.$router.push({
          path: '/addEmployee'
        });
      },

      loginOut: function () {

        let data = JSON.stringify({
          token: storage.get(TOKEN_KEY)
        });
        logOut(data).then((response) => {
          if (response.retCode === 1) {
            //console.log("hello world");
            storage.clear();
            this.$router.push({path: '/'});
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

        //获取仓库管理员信息
        this.userCurrentChange(1);

        //获取商品字典信息
        this.goodsDirCurrentChange(1);

        //获取供应商信息
        this.providerCurrentChange(1);

        //获取职工信息
        this.employeeCurrentChange(1);

        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
      }


    },

    created() {
      this.openFullScreen();
    }
    ,
    watch: {
      //左边点击菜单栏那个显示，那个不显示函数
      el_menu_selected: function (val) {
        //userManage  goodsManage   providerManage employeeManage
        if (val === '1-1') {
          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");


          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "block");
        } else if (val === '1-2') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "none");
          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "block");
        } else if (val === '1-3') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ReportDamages");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ProductManagerIn");
          jQueryObject3.css("display", "block");
        } else if (val === '1-4') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "block");
        } else if (val === '1-5') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "block");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
        } else if (val === '1-6') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "block");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
        } else if (val === '1-7') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "none");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "block");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
        } else if (val === '1-8') {

          let jQueryObject8 = $("#employeeManage");
          jQueryObject8.css("display", "block");

          let jQueryObject7 = $("#providerManage");
          jQueryObject7.css("display", "none");

          let jQueryObject6 = $("#goodsManage");
          jQueryObject6.css("display", "none");

          let jQueryObject5 = $("#userManage");
          jQueryObject5.css("display", "none");

          let jQueryObject1 = $("#HousewareMessage");
          jQueryObject1.css("display", "none");
          let jQueryObject2 = $("#ProductManagerOut");
          jQueryObject2.css("display", "none");
          let jQueryObject4 = $("#ProductManagerIn");
          jQueryObject4.css("display", "none");
          let jQueryObject3 = $("#ReportDamages");
          jQueryObject3.css("display", "none");
        }
      }
    }
  }
</script>

<style scoped>
  @import '../css/Wms_manager_home.css';
</style>
