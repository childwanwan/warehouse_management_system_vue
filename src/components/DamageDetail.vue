<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>报损单详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back()">返回</el-button>
      </div>
      <div class="text item">
        <el-form ref="this.damage" :model="this.damage" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报损单名称">
                <el-input v-model="this.damage.damageName" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报损单类型">
                <el-input v-model="this.damage.damageType" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="报损单创建人">
                <el-input v-model="this.damage.createPersonId" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报损单审核人">
                <el-input v-model="this.damage.checkPersonId" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="this.damage.createTime" style="width: 66%;"
                                  :disabled="true"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="this.damage.approvalTime" style="width: 66%;"
                                  :disabled="true"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>


        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">入库物品清单</div>
        <el-table
          :data="damageItems"
          border
          style="width: 100%">
          <el-table-column
            prop="goodsCode"
            label="物品编码"
            width="245"
            align="center">
          </el-table-column>

          <el-table-column
            prop="goodsName"
            label="物品名称"
            width="245"
            align="center">
          </el-table-column>

          <el-table-column
            prop="goodsType"
            label="物品类型"
            width="245"
            align="center">
          </el-table-column>

          <el-table-column
            prop="specificationItems"
            label="物品规格"
            width="245"
            align="center">
          </el-table-column>



          <el-table-column
            prop="goodsNum"
            label="报损数量"
            width="225"
            align="center">
          </el-table-column>

          <el-table-column
            prop="comment"
            label="物品描述"
            width="235"
            align="center">
          </el-table-column>



        </el-table>

        <div style="padding: 5%;float: right" v-if=" this.identify != '仓库管理员' && this.damage.status == 0">

        <el-button plain @click="callbackDamage">报损打回</el-button>
        <el-button type="success" plain @click="aggreDamage">同意报损</el-button>
        </div>

        <!--占格-->
        <div style="height: 30px"></div>

      </div>
    </el-card>
  </div>
</template>

<script>
  import {getEmployeeById} from '../api'
  import {getDamageById} from '../api'

  import {timeFormate} from '../public/js/dateUtils'
  import {updateDamage} from '../api'
  import {updateDamageStatus} from '../api'
  import storage, {
    TOKEN_KEY,
    TELEPHONE_KEY,
    USERNAME_KEY,
    IDENTIFY_KEY,
    ADDR_KEY,
    INSTORE_KEY,
    DAMAGE_KEY
  } from '../public/js/storage'

  export default {
    name: "DamageDetail",
    data() {
      return {
        damage: {},
        damageItems: [],
        identify:'',
      }
    },
    methods: {
      getDamage: function () {
        let data = JSON.stringify({
          "damageId": storage.get(DAMAGE_KEY),
        });
        //console.log(data);
        getDamageById(data).then((response) => {
          //console.log(response);
          if (response.retCode === 1) {
            //转换数据
            //转出手人id
            let dataId = JSON.stringify({
              "id": response.damage['createPersonId'],
            })
            getEmployeeById(dataId).then((res) => {
              if (res.retCode === 1) {
                response.damage['createPersonId'] = res.data.employeeName;
              } else this.$message.error(response.retMsg);
            }).catch(function (error) {
              console.log(error);
            })
            //转接收人id
            let dataReserveId = JSON.stringify({
              "id": response.damage['checkPersonId'],
            })
            getEmployeeById(dataReserveId).then((res) => {
              //console.log(res.retCode);//res.data['hello world']
              if (res.retCode === 1) {
                response.damage['checkPersonId'] = res.data.employeeName;
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
            //转时间
            var date = new Date(response.damage['createTime'].time);
            response.damage['createTime'] = timeFormate(date);

            if (JSON.stringify(response.damage['approvalTime']) != "{}") {
              var date1 = new Date(response.damage['approvalTime'].time);
              response.damage['approvalTime'] = timeFormate(date1);
            } else {
              response.damage['approvalTime'] = '';
            }

            //赋值
            this.damage = response.damage;
            this.damageItems = response.goods;
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

       },
      back:function () {
        history.back(-1);
      },
      callbackDamage:function () {
        let data = JSON.stringify({
          id:storage.get(DAMAGE_KEY),
          status:1,
          approvalTime:new Date(),
        });
        updateDamage(data).then((res) => {
          if (res.retCode === 1) {
            //res.damage['checkPersonId'] = res.data.employeeName;
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
      },
      aggreDamage:function () {
        let data = JSON.stringify({
          id:storage.get(DAMAGE_KEY),
          status:2,
        });
        updateDamageStatus(data).then((res) => {
          if (res.retCode === 1) {
            //res.damage['checkPersonId'] = res.data.employeeName;
            this.$message.success("操作成功");
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
    created() {
      this.getDamage();
      this.identify = storage.get(IDENTIFY_KEY);
    },
  }
</script>

<style scoped>

</style>

