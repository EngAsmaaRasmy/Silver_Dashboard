<template>
<div>

           <CCard class="cards">
            <CCardHeader>
              <CRow>
                <CCol col="6" style="font-size: 25px;">{{$t('message.show_employee')}} </CCol>
                <CCol col="6" style="font-size: 25px;">{{$t('message.total_cachouts')}} :{{sumCachout}} </CCol>
              </CRow>
               
            </CCardHeader>
            <div class="body mt-3">
                <div>
       <div class="row">
        <div class="col-md-6">
         <div style="background-color: white; display:flex;flex-direction:row;">
                 <div style="flex:1; ">

                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>{{$t('message.name')}} </th>
                                        <td v-if="$i18n.locale == 'English'">{{ employee.name}}</td>
                                        <td v-else-if="$i18n.locale == 'العربية' && employee.name_ar">{{ employee.name_ar }}</td>
                                        <td v-else>{{ employee.name}}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.gender')}} </th>
                                        <td>{{ employee.gender }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.birth_date')}} </th>
                                        <td>{{ employee.birth_date }}</td>
                                    </tr>
                                    <tr v-if="employee.email!='undefined'">
                                        <th >  {{$t('message.employee_email')}}</th>
                                        <td>{{ employee.email }}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.phone')}} </th>
                                        <td>{{ employee.phone }}</td>
                                    </tr>
                                     <tr>
                                        <th>  {{$t('message.job_name')}} </th>
                                        <td v-if="$i18n.locale == 'English'">{{  employee.job.name  }}</td>
                                         <td v-if="$i18n.locale == 'العربية'">{{  employee.job.name_ar }}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.hire_date')}}  </th>
                                        <td>{{ employee.hire_date }}</td>
                                    </tr>
                                    <tr>
                                        <th> {{$t('message.contract_type')}}  </th>
                                        <td>{{ employee.contract_type }}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.salary')}}  </th>
                                        <td>{{ employee.salary| toCurrency }}</td>
                                    </tr>

                                </tbody>

                            </table>
                           
                  </div>
          </div>
         </div>

      </div>
                </div>
                 <CButton color="warning" @click="goBack">{{$t('message.back')}} </CButton>
            </div>
        </CCard>
</div>
</template>

<script>
export default {
  name: 'ShowEmployee',
  data () {
    return {
      employee: [],
      sumCachout: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}employees/${this.$route.params.id}`)
      .then((response) => {
        this.employee = response.data.data.employee[0]
      })
      this.$http
      .get(`${this.$hostUrl}employees/${this.$route.params.id}/cashouts/sum`)
      .then((response) => {
        this.sumCachout = response.data.data
      })
  },
  methods: {
    goBack () {
      this.customersOpened ? this.$router.go(-1) : this.$router.push({ path: '/employees' })
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

th, td {
  padding: 15px;
}
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
  .cont{
    display: inline;
    margin: 20px;
  }
  button{
    margin: 30px;
  }
  .left{
    margin: 30px;
  }
</style>
