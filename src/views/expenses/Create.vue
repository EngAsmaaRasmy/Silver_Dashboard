<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createExpense" @submit="createExpense" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_expense') }}</CCol>
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
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'createProduct',
  data: function () {
    return {
      expense: {},
      errors: []
    }
  },
  methods: {
     isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
     onlyNumbers (e) {
      const num = String.fromCharCode(e.keyCode) // Get the character
      if (/^[1-9]+[0-9]*\.?[0-9]{0,3}$/.test(char)) return true
      else if (num.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    calcTotal($event) {
        this.expense.total= $event * this.expense.expenes_price
    },
    createExpense:function (e) {
      e.preventDefault()
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

       this.postRequest(formData, this.$hostUrl + 'admin-dashboard/expenses', '/expenses')
    }
  }
}

</script>
<style scoped>
.redborder{
  border-color:red !important
}
</style>
