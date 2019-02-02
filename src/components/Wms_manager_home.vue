<template>
    <div>
      欢迎来到仓库管理员界面{{telephone}};
      {{data1}}
    </div>
</template>

<script>
    export default {
        name: "wms_manager_home",
      data(){
          return{
            telephone:'',
            token:'',
            data1:''
          }
      },
      methods:{
        getParams:function () {
          // 取到路由带过来的参数
          this.telephone = this.$route.query.username;
          this.token = this.$route.query.token;

        }
      },
      created() {
        this.getParams();
        this.$axios.defaults.headers.common['token'] = this.token;
        this.$axios.get('http://localhost:10010/api/logic/logic_controller/get_warehouse_message',
          {
            params:{'telephone':this.telephone},
          emulateJSON: true})
          .then((res) => {
            console.log(res.data);//res.data['hello world']
            if (res.data['code'].toString()==='1') {
              this.$message.success("获取仓库信息成功");
            }else if (res.data['code'].toString()==='-10') {
              this.$message.error(res.data['message'].toString());
            }else if (res.data['code'].toString()==='-9900'){
              this.$message.error(res.data['message'].toString());
            }else {
              this.$message.error(res.data['message'].toString());
            }
            this.data1=res.data;
          })
          .catch((res) => {
            console.log(res.data);
            this.$message.error("请求失败！")
          });
      },
      watch: {
        '$route': 'getParams'
      }
    }
</script>

<style scoped>

</style>
