/* eslint-disable key-spacing */
<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createPayments" @submit="createPayments" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{$t('message.create_payment')}}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='payment Types'>
                    {{$t('message.payment_type')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedPaymentType'
                        id='worker'
                        :options='payment_types'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
                        required

                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow v-if="selectedPaymentType.name === 'payment type 1 (customer => worker)'">
            <CCol>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='worker'>
                      {{$t('message.worker')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedWorker'
                        id='worker'
                        :options='workers'
                        :searchable='true'
                             :close-on-select='true'
                        :placeholder="$t('message.worker_payment')"
                        label='name'
                        track-by='name'
                        required

                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='customer'>
                       {{$t('message.customer')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedCustomer'
                        id='customer'
                        :options='customers'
                        :searchable='true'
                             :close-on-select='true'
                        :placeholder="$t('message.customer_payment')"
                        label='name'
                        track-by='name'
                        required

                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
             <CRow>
              <CCol sm='12'>
                <CInput label=' amount'
                  id='amount'
                  v-model='payments.amount'
                   oninvalid="this.setCustomValidity('الرجاء ادخال قيمة اكبر من 0')"
                  min='1'
                  type='number'
                   @keypress="onlyNumbers"
                  class='required'
                  :placeholder="$t('message.amount')"
                  required

                />
              </CCol>
            </CRow>
            </CCol>
             </CRow>
            <CRow v-if="selectedPaymentType.name === 'payment type 2 (Fanni company => worker)'">
             <CCol sm='12'>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='worker'>
                      {{$t('message.worker')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedWorker'
                        id='worker'
                        :options='workers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.worker_payment')"
                        label='name'
                        track-by='name'
                        required

                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
             <CRow>
              <CCol sm='12'>
                <CInput label=' amount'
                  id='amount'
                  v-model='payments.amount'
                   oninvalid="this.setCustomValidity('الرجاء ادخال قيمة أكبر من 0')"
                  min='1'
                  type='number'
                   @keypress="onlyNumbers"
                  class='required'
                  :placeholder="$t('message.amount')"
                  required

                />
              </CCol>
            </CRow>
            </CCol>
             </CRow>
            <CRow v-if="selectedPaymentType.name ===  'payment type 3 (customer => Fanni company)'">
            <CCol>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='customer'>
                       {{$t('message.customer')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedCustomer'
                        id='customer'
                        :options='customers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.customer_payment')"
                        label='name'
                        track-by='name'
                        required
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
             <CRow>
              <CCol sm='12'>
                <CInput label=' amount'
                  id='amount'
                   oninvalid="this.setCustomValidity('الرجاء ادخال قيمة اكبر من 0')"
                  v-model='payments.amount'
                  min='1'
                  type='number'
                   @keypress="onlyNumbers"
                  class='required'
                  :placeholder="$t('message.amount')"
                 required
                />
              </CCol>
            </CRow>
            </CCol>
             </CRow>
              <CRow v-if="selectedPaymentType.name === 'payment type 4 (worker => Fanni company)'">
             <CCol sm='12'>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='worker'>
                      {{$t('message.worker')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedWorker'
                        id='worker'
                        :options='workers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.worker')"
                         label='name'
                        track-by='name'
                        required

                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
             <CRow>
              <CCol sm='12'>
                <CInput label=' amount'
                  id='amount'
                  v-model='payments.amount'
                   oninvalid="this.setCustomValidity('الرجاء ادخال قيمة أكبر من 0')"
                  min='1'
                  type='number'
                   @keypress="onlyNumbers"
                  class='required'
                  :placeholder="$t('message.amount')"
                  required

                />
              </CCol>
            </CRow>
            </CCol>
             </CRow>
             <CRow v-if="selectedPaymentType.name === 'payment type 5 (fanni => Customer)'">
             <CCol sm='12'>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='customer'>
                      {{$t('message.customer')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        v-model='selectedCustomer'
                        id='customer'
                        :options='customers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.customer')"
                         required
                        label='name'
                        track-by='name'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
            </CRow>
            </CCol>
            <CCol>
             <CRow>
              <CCol sm='12'>
                <CInput label=' amount'
                  id='amount'
                  v-model='payments.amount'
                   oninvalid="this.setCustomValidity('الرجاء ادخال قيمة أكبر من 0')"
                  min='1'
                  type='number'
                   @keypress="onlyNumbers"
                  class='required'
                  :placeholder="$t('message.amount')"
                  required

                />
              </CCol>
            </CRow>
            </CCol>
             </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{$t('message.save')}}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{$t('message.clear')}} </CButton>
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
  name: 'CreateArea',
  data: function () {
    return {
      payments: {},
      workers: [],
      customers: [],
      payment_types: [],
      selectedPaymentType: '',
      selectedCustomer: '',
      selectedWorker: '',
      errors: []
    }
  },
  created () {
    const workers = []
    this.$http
      .get(`${this.$hostUrl}workers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          workers.push({ id: value.id, name: value.name })
        })
        this.workers = workers
      })
    const customers = []
    this.$http
      .get(`${this.$hostUrl}customers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          customers.push({ id: value.id, name: value.name })
        })
        this.customers = customers
      })
    const paymentTypes = []
    this.$http
      .get(`${this.$hostUrl}payment-types`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          paymentTypes.push({ id: value.id, name: value.name })
        })
        this.payment_types = paymentTypes
      })
  },
  methods: {
    onlyNumbers (event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault()
      }
    },
    async createPayments (e) {
      e.preventDefault()
      const formData = new FormData()
      if (this.selectedPaymentType) {
        formData.append('payment_type_id', this.selectedPaymentType.id)
      } else {
        this.errors.push('payment_type_id')
        this.errors.payment_type_id = 'payment type  field is required'
        return 0
      }
      if (this.selectedPaymentType.name === 'payment type 1 (customer => worker)') {
        if (this.selectedWorker) {
          formData.append('worker_id', this.selectedWorker.id)
        } else {
          this.errors.push('worker_id')
          this.errors.worker_id = 'worker field is required'
          return 0
        }
        if (this.selectedCustomer) {
          formData.append('customer_id', this.selectedCustomer.id)
        } else {
          this.errors.push('customer_id')
          this.errors.customer_id = 'customer field is required'
          return 0
        }
        formData.append('amount', this.payments.amount)
      }
      if (this.selectedPaymentType.name === 'payment type 2 (Fanni company => worker)') {
        if (this.selectedWorker) {
          formData.append('worker_id', this.selectedWorker.id)
        } else {
          this.errors.push('worker_id')
          this.errors.worker_id = 'worker field is required'
          return 0
        }
        formData.append('amount', this.payments.amount)
      }
      if (this.selectedPaymentType.name === 'payment type 3 (customer => Fanni company)') {
        if (this.selectedCustomer) {
          formData.append('customer_id', this.selectedCustomer.id)
        } else {
          this.errors.push('customer_id')
          this.errors.customer_id = 'customer field is required'
          return 0
        }
        formData.append('amount', this.payments.amount)
      }
      if (this.selectedPaymentType.name === 'payment type 4 (worker => Fanni company)') {
        formData.append('amount', this.payments.amount)
        if (this.selectedWorker) {
          formData.append('worker_id', this.selectedWorker.id)
        } else {
          this.errors.push('worker_id')
          this.errors.customer_id = 'worker field is required'
          return 0
        }
      }
      if (this.selectedPaymentType.name === 'payment type 5 (fanni => Customer)') {
        formData.append('amount', this.payments.amount)
        if (this.selectedCustomer) {
          formData.append('customer_id', this.selectedCustomer.id)
        } else {
          this.errors.push('customer_id')
          this.errors.customer_id = 'worker field is required'
          return 0
        }
      }
      this.errors = await this.postRequest(formData, this.$hostUrl + 'payments', '/payments')
    }
  }
}

</script>
