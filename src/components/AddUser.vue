<template>
  <div>
    <!--添加form表单-->
    <div style="margin-top: 5%">

      <el-card class="box-card" style="width: 80%;margin-left: 10%">
        <div slot="header" class="clearfix">
          <span style="margin-left: 40%;color: #909399;font-size: large">仓库管理员新增</span>
          <el-button style="float: left; padding: 3px 0" type="text" @click="back()">&lt;返回</el-button>
        </div>


          <!--链入物品-->
          <div>
            <div style="margin-left: 40%;margin-top: 1%;margin-bottom: 1%;font-size: 120%;color: #909399">仓库用户管理</div>

            <el-table
              :data="user"
              border
              style="width: 100%">
              <el-table-column
                prop="employeeName"
                label="用户名称"
                width="290"
                align="center">
              </el-table-column>

              <el-table-column
                prop="telephone"
                label="用户电话"
                align="center"
                width="280">
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
                width="270"
                align="center">
                <template slot-scope="scope">　

                  <el-button type="primary" style="width: 70%;text-align: center;;height: 35px"
                             @click="updateUser(scope.$index, scope.row)">添加为仓库管理员
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


          </div>


      </el-card>


    </div>
  </div>
</template>

<script>

import {getEmployees} from "../api";
import {updateEmployees} from "../api";

export default {
    name: "AddUser",
    data() {
      return {
        //用户信息
        user: [],
        allUser: [],
        userPageSize: 5,
        userCount: 0,
        userCurrentPage: 0,
        userAllPage: 0,
      }
    },
    methods: {

      userCurrentChange: function (val) {


        this.userCurrentPage = val;
        if (val == 1 && this.allUser.length == 0) {
          this.user = [];
          getEmployees().then((response) => {
            //console.log(response.data);
            if (response.retCode === 1) {

              //console.log(response.data);

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status == 1) {
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

      updateUser: function (index, row) {
        //console.log(this.form);
        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify({
            id: row.id,
            status: 3,
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

      back() {
        history.back(-1);
      },
    },

    created() {
      this.userCurrentChange(1);
    }
  }
</script>

<style scoped>

</style>
