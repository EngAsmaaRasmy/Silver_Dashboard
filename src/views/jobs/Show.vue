<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;"> {{ $t('message.show_job') }} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6 ">
                <table class="table table-bordered">
                  <tr>
                    <th> {{ $t('message.job_name')}}  </th>
                    <td v-if="$i18n.locale == 'English'">{{job.name  }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ job.name_ar }}</td>
                    <!-- <td>{{ job.name }}</td> -->
                  </tr>

                </table>
            </div>
        </div>
         <div class="row" v-if="employees[0]">
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> {{ $t('message.employee_name')}}  </th>
                    <th> {{ $t('message.employee_gender')}} </th>
                      <th>   {{ $t('message.employee_email')}}   </th>
                      <th>  {{ $t('message.employee_phone')}} </th>
                    <th>  {{ $t('message.employee_contract_type')}}   </th>
                  </tr>
                   <tr v-for=" employee in employees" :key="employee.id">
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.gender }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.phone }}</td>
                     <td>{{ employee.contract_type }}</td>
                  </tr>
                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowJob',
  data () {
    return {
      job: [],
      employees: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`http://178.79.181.70:8003/api/jobs/${this.$route.params.id}`)
      .then((response) => {
        this.job = response.data.data.job
      })
       this.$http
      .get(`http://178.79.181.70:8003/api/jobs/${this.$route.params.id}/employees`)
      .then((response) => {
        this.employees = response.data.data
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/jobs' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
</style>
