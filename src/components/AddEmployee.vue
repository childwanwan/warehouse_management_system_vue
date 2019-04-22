<template>
  <div>
    <!--添加form表单-->
    <div style="margin-top: 5%">

      <el-card class="box-card" style="width: 80%;margin-left: 10%">
        <div slot="header" class="clearfix">
          <span style="margin-left: 40%;color: #909399;font-size: large">职工新增</span>
          <el-button style="float: left; padding: 3px 0" type="text" @click="back()">&lt;返回</el-button>
        </div>

        <el-form :model="addEmployeeForm">
          <el-form-item label="职工名称" :label-width="formLabelWidth">
            <el-input v-model="addEmployeeForm.employeeName" auto-complete="off"></el-input>
<!--            <el-input v-model="addEmployeeForm.employeName" auto-complete="off"></el-input>-->
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input   v-model="addEmployeeForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职工电话" :label-width="formLabelWidth">
            <el-input v-model="addEmployeeForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职工地址" :label-width="formLabelWidth">
            <el-input v-model="addEmployeeForm.addr" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>


        <!--链入物品-->
        <div>
          <span>新增职工</span>
          <div>

            <!--添加一个横线-->
            <hr/>

            <!--两个按钮-->
            <div style="float: right;margin-bottom: 3%;margin-top: 3%;margin-right: 3%">
              <el-button type="primary" plain @click="doReset()">重置</el-button>
              <el-button type="primary" plain @click="doInsert()">确认新增</el-button>
            </div>


          </div>
        </div>

      </el-card>


    </div>
  </div>
</template>

<script>
  import {addEmployee} from '../api'

  export default {
    name: "AddEmployee",
    data() {
      return {
        formLabelWidth: '120px',
        addEmployeeForm: {
          employeeName: '',
          password: '',
          telephone: '',
          addr: '',
        },


      }
    },
    methods: {
      //添加按钮
      doInsert() {
        this.$confirm('确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify(this.addEmployeeForm);
          addEmployee(data).then((response) => {
            //console.log(response);
            //console.log(response.data['data']['count']);
            if (response.retCode === 1) {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              //this.goodsDirData.pop(index);
              history.back(-1);
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

      //获取goods信息
      doReset() {
        this.addEmployeeForm.employeeName = '';
        this.addEmployeeForm.password = '';
        this.addEmployeeForm.telephone = '';
        this.addEmployeeForm.addr = '';

      },

      back() {
        history.back(-1);
      },
    },

    created() {
      this.doReset();
    },

  }
</script>

<style scoped>

</style>
