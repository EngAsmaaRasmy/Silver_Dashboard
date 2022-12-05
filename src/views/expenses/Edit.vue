
<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateExpense" @submit.prevent="UpdateExpense" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px">{{ $t('message.update_expense') }}</CCol>
        </CCardHeader>
           <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.expenes_name')"
                  id="expenes_name"
                  v-model="expense.expenes_name"
                  class="required"
                  v-on:keypress="isLetter($event)"
                  :placeholder=" $t('message.expenes_name') "
                  :invalidFeedback="errors.expenes_name"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.expenes_price')"
                  id="expenes_price"
                  v-model="expense.expenes_price"
                  class="required"
                 :placeholder=" $t('message.expenes_price') "
                  :invalidFeedback="errors.expenes_price"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                 <CTextarea :label=" $t('message.description')"
                        type='text'
                        id='description'
                        v-model='expense.description'
                    ></CTextarea>
              </CCol>
            </CRow>
   
          </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'UpdateExpense',
  data () {
    return {
      expense: [],
      errors: [],
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/expenses/${this.$route.params.id}/edit`)
      .then((response) => {
        this.expense = response.data.data.expenses
      })
  },
  methods: {
    calcTotal($event) {
        this.expense.total= $event * this.expense.expenes_price
    },
    async UpdateExpense () {
      const formData = new FormData()
     formData.append('expenes_name', this.expense.expenes_name)
     if (this.expense.description != undefined) {
        formData.append('description', this.expense.description)
     }
      if (this.expense.expenes_price > 0) {
        formData.append('expenes_price', this.expense.expenes_price)
      } else {
        swal({title: this.$t('message.price_greate_zero')})
        $('#expenes_price').addClass('redborder')
        return 0
      }
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/expenses/${this.$route.params.id}`, '/expenses')
    },
    goBack () {
      this.productsOpened ? this.$router.go(-1) : this.$router.push({ path: '/expenses' })
    }
  }
}
</script>
<style scoped>
.redborder{
  border-color:red !important
}
</style>
