<template>
  <div>
    <!--添加form表单-->
    <div style="margin-top: 5%">

      <el-card class="box-card" style="width: 80%;margin-left: 10%">
        <div slot="header" class="clearfix">
          <span style="margin-left: 40%;color: #909399;font-size: large">物品报损</span>
          <el-button style="float: left; padding: 3px 0" type="text" @click="back()">&lt;返回</el-button>
        </div>

        <el-form ref="damage" :model="damage" label-width="100px">


          <el-row>
            <el-col :span="12">
              <el-form-item label="报损单创建者">
                <el-select v-model="damage.provideId" placeholder="请选择报损单创建者" style="width: 40%">
                  <el-option v-for="(item,index) in provideName" :value="item" :key="item">
                    {{item}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="报损单审核人">
                <el-select v-model="damage.reserverId" placeholder="请选择报损单审核人" style="width: 40%">
                  <el-option v-for="(item,index) in reserverName" :value="item" :key="item">
                    {{item}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="报损单名称">
                <el-input v-model="damage.damageName" placeholder="报损单名称" style="width: 40%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="报损单描述">
                <el-input v-model="damage.comment" placeholder="报损单描述" style="width: 40%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--链入物品-->
          <div>
            <span>报损物品</span>
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
                <tr v-for="(item, index) in damageGoods"
                    style="height: 10%;border:solid #add9c0; border-width:1px 1px 1px 1px; padding:10px 0px;">
                  <td>
                    <el-input v-model="item.goodsCode" placeholder="请输入物品编码"
                              @blur="getGoodsMessage(item.goodsCode,index)"></el-input>
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
                               @click="saveGoods(item)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle style="padding: 5%"
                               @click="delGoods(item,index)"></el-button>
                  </td>
                </tr>

              </table>
              <!--出库增加栏-->
              <div style="width: 80%;margin-left: 10%;margin-top: 5%">
                <p
                  style="display: flex;justify-content: center;align-items: center;padding: 2rem 0;font-size: 2rem;cursor: pointer;background-color: #eee;"
                  @click="addDamage(table_rows)">
                  <span style="color: #909399">+ 添加物品</span>
                </p>
              </div>

              <!--添加一个横线-->
              <hr/>

              <!--两个按钮-->
              <div style="float: right;margin-bottom: 3%;margin-top: 3%;margin-right: 3%">
                <el-button type="primary" plain @click="doDamage()">确认报损</el-button>
              </div>


            </div>
          </div>
        </el-form>

      </el-card>


    </div>
  </div>
</template>

<script>
  import {getGoodsMessage} from '../api'
  import {getEmployees} from "../api";
  import {insertInstore} from '../api';
  import {getGoodsByGoodsCode} from '../api'
  import {getGoodsByCondition} from '../api'
  import {insertOutstore} from '../api'
  import {insertDamage} from '../api'

  export default {
    name: "AddDamage",
    data() {
      return {
        damage: {},
        damageGoods: [],
        //规格
        specificationItems: [],
        goods: [{
          goodsCode: '',
          specificationItems: '',
          buyNum: 0,
          comment: ''
        }],
        table_rows: 0,
        lastDamageGoods: [],
        goodsId: '',
        reserverName: [],
        provideName: [],
        allEmployee: [],
      }
    },
    methods: {
      //添加按钮
      addDamage(index) {
        this.goods.push({
          goodsCode: '',
          specificationItems: '',
          buyNum: 0,
          comment: ''
        });
        this.damageGoods.push(this.goods[index]);
        this.table_rows++;
      },

      //获取goods信息
      getGoodsMessage(value, index) {
        let data = JSON.stringify({goodsCode: value});
        getGoodsByGoodsCode(data).then((res) => {
          //console.log(res);
          if (res.retCode === 1) {
            if (res.data.length > 0) {
              let tempSpecificationItems = [];
              for (let i = 0; i < res.data.length; i++) {
                tempSpecificationItems.push(res.data[i].specificationItems);
              }
              //console.log(tempSpecificationItems);
              this.specificationItems[index] = tempSpecificationItems;
              //console.log(this.specificationItems[index],index);
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
      },

      //保存goods
      saveGoods(item) {
        var temp = {};
        var numReg = new RegExp("^[1-9][0-9]*$");
        if (item.specificationItems === '') {
          this.$message.error("请选择规格");
        } else if (item.buyNum === '' || item.buyNum == 0 || !numReg.test(item.buyNum) || item.buyNum.length > 8) {
          this.$message.error("请输入正确的数量");
        } else {
          //console.log(item);
          let data = JSON.stringify({goodsCode: item.goodsCode, specificationItems: item.specificationItems});
          getGoodsByCondition(data).then((res) => {
            //console.log(res);
            if (res.retCode === 1) {
              if (res.data.length > 0) {
                let temp = {};
                if (res.data[0].goodsNum < item.buyNum) {
                  this.$message.error("您输入的物品数量过大，请重新输入");
                } else {
                  temp = item;
                  let m = true;
                  for (let i = 0; i < this.lastDamageGoods.length; i++) {
                    if (this.lastDamageGoods[i].goodsCode == temp.goodsCode && this.lastDamageGoods[i].specificationItems == temp.specificationItems) {
                      this.lastDamageGoods[i] = temp;
                      m = false;
                      break;
                    }
                  }
                  if (m) {
                    this.lastDamageGoods.push(temp);
                    this.$message.success("保存成功");
                  } else {
                    this.$message.warning("您已经保存过该数据了");
                  }
                  //console.log(this.lastDamageGoods);
                }
              } else {
                this.$message.error("您输入的物品信息有误，请重新输入");
              }
            } else  {
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
      //删除goods
      delGoods(item, index) {
        this.damageGoods.splice(index, 1);
        this.lastDamageGoods.splice(index, 1);
        //delete this.instoreGoods[index];
        //this.instoreGoods.pop(index-1);
        //console.log(this.outstoreGoods);
      },
      //出库
      doDamage() {
        //console.log(this.damage);
        if (JSON.stringify(this.damage) == "{}" || this.damage.provideId == '' || this.damage.reserverId == '' || this.damage.provideId.length <= 0 || this.damage.reserverId.length <= 0 || this.damage.damageName=='' || this.damage.damageName.length<1) {
          this.$alert('请选择接收人或者提供者名称', '温馨提示', {
            confirmButtonText: '确定',
          });
        } else if (this.lastDamageGoods.length < 1) {
          this.$alert('请添加出库物品', '温馨提示', {
            confirmButtonText: '确定',
          });
        } else {

          for (let i = 0; i < this.allEmployee.length; i++) {
            if (this.allEmployee[i].employeeName == this.damage.provideId) {
              this.damage.provideId = this.allEmployee[i].id;
            }
            if (this.allEmployee[i].employeeName == this.damage.reserverId) {
              this.damage.reserverId = this.allEmployee[i].id;
            }
          }
          let total = 0;
          for (let i = 0; i < this.lastDamageGoods.length; i++) {
            total = total + parseInt(this.lastDamageGoods[i].buyNum);
            this.lastDamageGoods[i]['count'] = this.lastDamageGoods[i].buyNum;
          }


          let data = JSON.stringify({
            createPersonId: this.damage.provideId,
            checkPersonId: this.damage.reserverId,
            totalNum: total,
            damageName:this.damage.damageName,
            comment:this.damage.comment,
            ids: this.lastDamageGoods,
          });
          //console.log(data);
          insertDamage(data).then((res) => {
            //console.log(res);
            if (res.retCode === 1) {
              this.back();
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
                if (res.data[i].status === 3 || res.data[i].status === 4 || res.data[i].status === 5) {
                  this.provideName.push(res.data[i].employeeName);
                }
                if (res.data[i].status === 4 || res.data[i].status === 5) {
                  this.reserverName.push(res.data[i].employeeName);
                }
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
      back() {
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
