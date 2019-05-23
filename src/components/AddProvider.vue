<template>
  <div>
    <!--添加form表单-->
    <div style="margin-top: 5%">

      <el-card class="box-card" style="width: 80%;margin-left: 10%">
        <div slot="header" class="clearfix">
          <span style="margin-left: 40%;color: #909399;font-size: large">供应商新增</span>
          <el-button style="float: left; padding: 3px 0" type="text" @click="back()">&lt;返回</el-button>
        </div>

        <el-form :model="providerForm">
          <el-form-item label="供应物品编码" :label-width="formLabelWidth">
<!--            <el-input v-model="providerForm.providerType" auto-complete="off"></el-input>-->
            <el-select v-model="providerForm.providerType" placeholder="请选择供应物品编码" style="width: 40%">
              <el-option v-for="(item,index) in allGoodsCode" :value="item" :key="index">
                {{item}}
              </el-option>
            </el-select>

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
          <el-form-item label="供应商地址" :label-width="formLabelWidth">
            <el-input v-model="providerForm.addr" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>


        <!--链入物品-->
        <div>
          <span>新增供应商</span>
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
  import {insertProvider} from '../api'
  import {getGoodsDicMessage} from '../api'

  export default {
    name: "AddGoodsDir",
    data() {
      return {

        formLabelWidth: '120px',
        providerForm: {
          providerType: '',
          providerName: '',
          linkman: '',
          telephone: '',
          addr: '',
        },
        
        allGoodsCode:[],


      }
    },
    methods: {
      //添加按钮
      doInsert() {
        if (this.providerForm.providerType==''||this.providerForm.providerType.length <= 0){
          this.$message.error('请选择供应商编码');
          return;
        }
        if (this.providerForm.providerName==''||this.providerForm.providerName.length <= 0){
          this.$message.error('请填写供应商名称');
          return;
        }
        if (this.providerForm.linkman==''||this.providerForm.linkman.length <= 0){
          this.$message.error('请填写联系人');
          return;
        }
        if (this.providerForm.addr==''||this.providerForm.addr.length <= 0){
          this.$message.error('请填写联系地址');
          return;
        }
        if (this.providerForm.telephone==''||this.providerForm.telephone.length <= 0){
          this.$message.error('请填写联系电话');
          return;
        }
        this.$confirm('确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = JSON.stringify(this.providerForm);
          insertProvider(data).then((response) => {
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

      doReset() {
        this.providerForm.providerType = '';
        this.providerForm.providerName = '';
        this.providerForm.linkman = '';
        this.providerForm.telephone = '';
        this.providerForm.addr = '';
      },

      getAllGoodsDir(){
        let data = JSON.stringify({});
        getGoodsDicMessage(data).then((response) => {
          //console.log(response);
          //console.log(response.data['data']['count']);
          if (response.retCode === 1) {
            for (let i = 0;i<response.data.length;i++){
              this.allGoodsCode.push(response.data[i].goodsCode);
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
      },


      back() {
        history.back(-1);
      },
    },

    created() {
      this.getAllGoodsDir();
    }
  }
</script>

<style scoped>

</style>
