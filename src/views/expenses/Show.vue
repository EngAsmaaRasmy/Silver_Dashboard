<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.show_expense')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.expenes_name')}} </th>
                    <td>{{ expense.expenes_name }}</td>
                  </tr>
                  <tr >
                    <th> {{ $t('message.expenes_price')}}</th>
                    <td>{{ expense.expenes_price }}</td>
                  </tr>
                   <tr>
                    <th>{{ $t('message.description')}} </th>
                    <td v-if="expense.description != 'undefined'">{{ expense.description }}</td>
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
  name: 'ShowExpense',
  data () {
    return {
      expense: [],
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/expenses/${this.$route.params.id}`)
      .then((response) => {
        this.expense = response.data.data.expenses
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/expenses' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
  .title
  {
    background-color: #9daec5;
    color: #f5f3f3;
    border-radius: 20%;
    padding: 7px;
  }
</style>
