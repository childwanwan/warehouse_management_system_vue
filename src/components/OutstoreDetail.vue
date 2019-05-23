<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>出库单详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back();">返回</el-button>
      </div>
      <div class="text item">
        <el-form ref="this.outstore" :model="this.outstore" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="物品出手人">
                <el-input v-model="this.outstore.providerId" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品接收人">
                <el-input v-model="this.outstore.reserveId" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="物品总数量">
                <el-input v-model="this.outstore.totalNum" :disabled="true" style="width: 30%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出库时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="this.outstore.outstoreTime"
                                  style="width: 66%;"
                                  :disabled="true"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>


        <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">出库物品清单</div>
        <el-table
          :data="outstoreItems"
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
            prop="comment"
            label="出库描述"
            align="center"
            width="245">
          </el-table-column>
          <el-table-column
            prop="sellNum"
            label="出库数量"
            width="215"
            align="center">
          </el-table-column>

        </el-table>

        <!--占格-->
        <div style="height: 30px"></div>

      </div>
    </el-card>
  </div>
</template>

<script>
  import {getdetailById} from '../api'
  import {getOutstoresById} from '../api'
  import {getEmployeeById} from '../api'
  import {getGoodsById} from '../api'
  import {getOutstoresGoodsByOutstoresId} from '../api'


  import {timeFormate} from '../public/js/dateUtils'
  import storage, {
    TOKEN_KEY,
    TELEPHONE_KEY,
    USERNAME_KEY,
    IDENTIFY_KEY,
    ADDR_KEY,
    INSTORE_KEY, OUTSTORE_KEY
  } from '../public/js/storage'

  export default {
    name: "OutstoreDetail",
    data() {
      return {
        outstore: {},
        outstoreItems: [],
      }
    },
    methods: {
      getOutstore: function () {
        let data = JSON.stringify({
          "id": storage.get(OUTSTORE_KEY),
        });
        //console.log(data);
        getOutstoresById(data).then((response) => {
          //console.log(response);
          if (response.retCode === 1) {
            //转换数据
            //转出手人id
            let dataId = JSON.stringify({
              "id": response.data['providerId'],
            })
            getEmployeeById(dataId).then((res) => {
              if (res.retCode === 1) {
                response.data['providerId'] = res.data.employeeName;
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
              "id": response.data['reserveId'],
            })
            getEmployeeById(dataReserveId).then((res) => {
              //console.log(res.retCode);//res.data['hello world']
              if (res.retCode === 1) {
                response.data['reserveId'] = res.data.employeeName;
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
            var date = new Date(response.data['createTime'].time);
            response.data['outstoreTime'] = timeFormate(date);
            //赋值
            this.outstore = response.data;

            //console.log(this.outstore);

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

        getOutstoresGoodsByOutstoresId(data).then((response) => {
          //console.log(response);
          if (response.retCode === 1) {
            for (let i = 0; i < response.data.length; i++) {
              let data = JSON.stringify({
                id: response.data[i].goodsId,
              });
              getGoodsById(data).then((res) => {
                //console.log(res);
                if (res.retCode === 1) {
                  response.data[i]['comment'] = res.data.comment;
                  //response.data[i]['goodsNum'] = res.data.goodsNum;
                  response.data[i]['goodsType'] = res.data.goodsType;
                  response.data[i]['specificationItems'] = res.data.specificationItems;
                  response.data[i]['customAttributeItems'] = res.data.customAttributeItems;
                  response.data[i]['goodsName'] = res.data.goodsName;
                  response.data[i]['goodsCode'] = res.data.goodsCode;
                } else this.$message.error(res.retMsg);
              }).catch(function (error) {
                console.log(error);
              })
            }
            this.outstoreItems = response.data;
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
      back: function () {
        history.back(-1);
      },

    },
    created() {
      this.getOutstore();
    },
  }
</script>

<style scoped>

</style>

