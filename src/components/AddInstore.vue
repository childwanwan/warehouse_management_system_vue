<template>
  <div>
    <!--添加form表单-->
    <div style="margin-top: 5%">

      <el-card class="box-card" style="width: 80%;margin-left: 10%">
        <div slot="header" class="clearfix">
          <span style="margin-left: 40%;color: #909399;font-size: large">物品入库</span>
          <el-button style="float: left; padding: 3px 0" type="text" @click="back()">&lt;返回</el-button>
        </div>

        <el-form ref="instore" :model="instore" label-width="100px">


          <el-row>
            <el-col :span="12">
              <el-form-item label="物品提供者">
                <el-select v-model="instore.provideId" placeholder="请选择物品提供者" style="width: 40%">
                  <el-option v-for="(item,index) in provideName" :value="item" :key="item">
                    {{item}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="物品接收者">
                <el-select v-model="instore.reserverId" placeholder="请选择物品接收者" style="width: 40%">
                  <el-option v-for="(item,index) in reserverName" :value="item" :key="item">
                    {{item}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--链入物品-->
          <div>
            <span>入库物品</span>
            <div>

              <table cellspacing="0" cellpadding="0" border="1"
                     style="width: 100%;border:solid #add9c0; border-width:0px 0px 0px 0px;">
                <colgroup>
                  <col name="el-table_6_column_21" width="180">
                  <col name="el-table_6_column_22" width="180">
                  <col name="el-table_6_column_23" width="180">
                  <col name="el-table_6_column_24" width="300">
                  <col name="el-table_6_column_24" width="138">
                  <col name="gutter" width="0">
                </colgroup>
                <thead style="color: #909399;font-weight: 500;">
                <tr class="">
                  <th colspan="1" rowspan="1"
                      style="height: 5%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                    <div class="cell">物品编码</div>
                  </th>
                  <th colspan="1" rowspan="1"
                      style="height: 5%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                    <div class="cell">规格</div>
                  </th>
                  <th colspan="1" rowspan="1"
                      style="height: 5%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                    <div class="cell">数量</div>
                  </th>
                  <th colspan="1" rowspan="1"
                      style="height: 5%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                    <div class="cell">描述</div>
                  </th>
                  <th colspan="1" rowspan="1"
                      style="height: 5%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                    <div class="cell">操作</div>
                  </th>
                  <th class="gutter" style="width: 0px; display: none;"></th>
                </tr>
                </thead>

                <!--应该是一个vue循环-->
                <tr v-for="(item, index) in instoreGoods"
                    style="height: 10%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                  <td>
                    <el-input v-model="item.goodsCode" placeholder="请输入物品编码"
                              @blur="getGoodsDicMessage(item.goodsCode,index)"></el-input>
                  </td>
                  <td>
                    <el-select v-model="item.specificationItems" placeholder="请选择物品规格">
                      <el-option v-for="(specification,specificationIndex) in specificationItems[index]"
                                 :value="specification"
                                 :key="specification">
                        {{specification}}<!--lallalalallala{{specificationItems[index]}}-->
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="item.buyNum" placeholder="请输入物品数量"></el-input>
                  </td>
                  <td>
                    <el-input v-model="item.comment" placeholder="物品描述"></el-input>
                  </td>
                  <td>
                    <el-button type="success" icon="el-icon-check" circle style="margin-left: 20%;padding: 5%"
                               @click="saveGoods(item)" id="isClick"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle style="padding: 5%"
                               @click="delGoods(item,index)"></el-button>
                  </td>
                </tr>

              </table>
              <!--入库增加栏-->
              <div style="width: 80%;margin-left: 10%;margin-top: 5%">
                <p
                  style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
                  @click="addInstore(table_rows)">
                  <span style="color: #909399">+ 添加物品</span>
                </p>
              </div>

              <!--添加一个横线-->
              <hr/>

              <!--两个按钮-->
              <div style="float: right;margin-bottom: 3%;margin-top: 3%;margin-right: 3%">
                <el-button type="primary" plain @click="doInstore()">确认入库</el-button>
              </div>


            </div>
          </div>
        </el-form>

      </el-card>


    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  import {getGoodsDicMessage} from '../api'
  import {getEmployees} from "../api";
  import {insertInstore} from  '../api';
  import {getGoodsByGoodsCode} from '../api'

  export default {
    name: "AddInstore",
    data() {
      return {
        instore: {},
        instoreGoods: [],
        //规格
        specificationItems: [],
        goods: [{
          goodsCode: '',
          specificationItems: '',
          buyNum: 0,
          comment: ''
        }],
        table_rows: 0,
        lastInstoreGoods: [],
        goodsId: '',
        reserverName: [],
        provideName: [],
        allEmployee: [],
      }
    },
    methods: {
      //添加按钮
      addInstore(index) {
        this.goods.push({
          goodsCode: '',
          specificationItems: '',
          buyNum: 0,
          comment: ''
        });
        this.instoreGoods.push(this.goods[index]);
        this.table_rows++;
      },

      //获取goodsDic信息
      getGoodsDicMessage(value, index) {
        let data = JSON.stringify({goodsCode: value});
        getGoodsDicMessage(data).then((res) => {
          //console.log(res);//res.data['hello world']
          if (res.retCode === 1) {
            if (res.data.length > 0) {
              //this.specificationItems = [];
              this.goodsId = res.data[0].id;
              this.specificationItems[index] = res.data[0].specificationItems;
              //console.log(this.specificationItems);
              // for (let i = 0; i < res.data[0].specificationItems.length; i++) {
              //   this.specificationItems[i][''] = res.data[0].specificationItems[i];
              // }
            } else {
              this.$message.error("您输入的物品编码有误，请重新输入");
            }

          } else this.$message.error("您输入的物品编码有误，请重新输入");
        }).catch(function (error) {
          console.log(error);
        })
      },

      //保存goods
      saveGoods(item) {
        // $("#isClick").attr('disabled',true);
       console.log( $("#isClick").text());
        $("#isClick").attr("disabled", true);
        var temp = {};
        var numReg = new RegExp("^[1-9][0-9]*$");
        if (item.specificationItems === '') {
          this.$message.error("请选择规格");
        } else if (item.buyNum === '' || item.buyNum == 0 || !numReg.test(item.buyNum) || item.buyNum.length > 8) {
          this.$message.error("请输入正确的数量");
        } else {
          //console.log(item);
          let data = JSON.stringify({goodsCode: item.goodsCode});
          getGoodsDicMessage(data).then((res) => {
            //console.log(res);//res.data['hello world']
            if (res.retCode === 1) {
              if (res.data.length > 0) {
                this.goodsId = res.data[0].id;
                item['id'] = res.data[0].id;
                temp['id'] = res.data[0].id;
              } else {
                this.$message.error("您输入的物品编码有误，请重新输入");
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

          temp['goodsNum'] = item.buyNum;
          temp['comment'] = item.comment;
          temp['specificationItems'] = item.specificationItems;
          // delete item['goodsCode'];
          // item['goodsNum'] = item.buyNum;
          // delete item['buyNum'];
          // console.log(item['id']);
          // console.log(temp);
          let m = true;
          //console.log(this.lastInstoreGoods[i].id);
          //console.log(temp.specificationItems);
          for (let i = 0; i < this.lastInstoreGoods.length; i++) {
            if (this.lastInstoreGoods[i].id == this.goodsId && this.lastInstoreGoods[i].specificationItems == temp.specificationItems) {
              this.lastInstoreGoods[i] = temp;
              //this.lastInstoreGoods.push(temp);
              m = false;
              break;
            }
          }
          if (m) {
            this.lastInstoreGoods.push(temp);
          } else {
            this.$message.warning("您已经保存过该数据了");
          }
          console.log(this.lastInstoreGoods);
        }
        //$("#isClick").attr('disabled',false);
      },
      //删除goods
      delGoods(item, index) {
        this.instoreGoods.splice(index, 1);
        this.lastInstoreGoods.splice(index, 1);
        //delete this.instoreGoods[index];
        //this.instoreGoods.pop(index-1);
        console.log(this.instoreGoods);
      },
      //入库
      doInstore() {
        if (JSON.stringify(this.instore)=="{}"||this.instore.provideId == '' || this.instore.reserverId == '' || this.instore.provideId.length <= 0 || this.instore.reserverId.length <= 0) {
          this.$alert('请选择接收人或者提供者名称', '温馨提示', {
            confirmButtonText: '确定',
          });
        }else if(this.lastInstoreGoods.length<1){
          this.$alert('请添加入库物品', '温馨提示', {
            confirmButtonText: '确定',
          });
        }else {

          for (let i = 0; i < this.allEmployee.length; i++) {
            if (this.allEmployee[i].employeeName == this.instore.provideId) {
              this.instore.provideId = this.allEmployee[i].id;
            }
            if (this.allEmployee[i].employeeName == this.instore.reserverId) {
              this.instore.reserverId = this.allEmployee[i].id;
            }
          }
          let total = 0;
          for (let i = 0; i < this.lastInstoreGoods.length; i++) {
            total = total + parseInt(this.lastInstoreGoods[i].goodsNum);
          }
          let data = JSON.stringify({
            provideId: this.instore.provideId,
            reserverId: this.instore.reserverId,
            totalNum: total,
            goodsList: this.lastInstoreGoods,
          });
          //console.log(data);
          insertInstore(data).then((res) => {
            //console.log(res);
            if (res.retCode === 1) {
              this.$router.push({
                path: '/houseware_manager_login_success'
              });
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
      //获取所以employee的信息
      getAllEmployeeName: function () {
        getEmployees().then((res) => {
          //console.log(res);
          if (res.retCode === 1) {
            if (res.data.length > 0) {
              this.allEmployee = res.data;
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].status===3 ||res.data[i].status===4||res.data[i].status===5) {
                  this.reserverName.push(res.data[i].employeeName);
                }
                this.provideName.push(res.data[i].employeeName);
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
      back(){
        history.back(-1);
      },
    },

    created() {
      this.getAllEmployeeName();
    }
  }
</script>

<style scoped>

</style>
