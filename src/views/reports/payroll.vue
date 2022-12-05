<template>
<div>

           <CCard class="cards">
            <CCardHeader>
                <CCol col="6" style="font-size: 25px;"> {{$t('message.employee_payroll')}} </CCol>
            </CCardHeader>
            <div class="body mt-3">
                <div>
       <div class="row">
        <div class="col-md-6">
         <div style="background-color: white; display:flex;flex-direction:row;">
                
          </div>
         </div>
      </div>
                </div>
                <div class="row">
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th>  {{$t('message.employee_name')}}  </th>
                    <th>  {{$t('message.job')}}  </th>
                    <th> {{$t('message.salary')}}   </th>
                    <th>  {{$t('message.total_cashout')}}  </th>
                    <th> {{$t('message.total')}}   </th>   
                  </tr>
                   <tr v-for=" payroll in payrolls" :key="payroll.id">
                    <td>{{ payroll.name }}</td>
                    <td v-if="payroll.job">{{ payroll.job.name }}</td>
                    <td v-else> </td>
                    <td>{{ payroll.salary }}</td>
                    <td>{{ payroll.total_cashout }}</td>
                    <td>{{ payroll.total }}</td>
                  </tr>
                </table>
            </div>
        </div>
                 
            </div>
        </CCard>
</div>
</template>

<script>
export default {
  name: 'ShowEmployee',
  data () {
    return {
      payrolls: [],
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}payroll`)
      .then((response) => { 
        this.payrolls = response.data.data.payroll
        console.log(this.payrolls)
      })
      
  },
  methods: {
    goBack () {
      this.customersOpened ? this.$router.go(-1) : this.$router.push({ path: '/employees' })
    }
  }
}
</script>
