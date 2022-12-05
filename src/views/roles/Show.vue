<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{$t('message.show_role')}}</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{$t('message.name')}}</th>
                    <td>{{ role.name }}</td>
                  </tr>
                </table>
               <span> {{$t('message.permission')}}</span>
                                  <table>
                                    <tbody>
                                  <tr>
                                  <th>  {{$t('message.permission_id')}}</th>
                                  <th>  {{$t('message.permission_name')}}</th>
                                  </tr>
                                  <tr v-for=" permission in role.permissions" :key="permission.id">
                                  <td> {{permission.id}} </td>
                                  <td> {{permission.name}} </td>
                                  <!-- <td> {{payment.customer.name}} </td>-->
                                  </tr>
                                   </tbody>
                                  </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{$t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowCities',
  data () {
    return {
      role: []
    }
  },
  created () {
    console.log(process.env)
    this.$http
      .get(`${process.env.VUE_APP_BACKEND_SERVER_2}roles/${this.$route.params.id}`,
        {
          headers: {
            'x-api-key': process.env.VUE_APP_MS_TOKEN
          }
        })
      .then((response) => {
        this.role = response.data.data
      })
  },
  methods: {
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/roles' })
    }
  }
}
</script>
<style scoped>
span{
  font-size: 20px;
  margin-top: 10px;
}
table,td ,th{
    border: 1px solid #ddd;
  text-align: right;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 10px;
}

th, td {
  padding: 15px;
}
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
</style>
