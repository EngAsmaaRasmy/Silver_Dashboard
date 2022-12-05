
<template>
  <div>
    <CRow>
      <CCol col="12">
        <CCard class="cards">
          <form id="UpdatePurchaseInvoices" @submit="UpdatePurchaseInvoices" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.update_purchase_invoices') }}</CCol>
          </CCardHeader>
           <CCardBody>
            <CRow>
              <CCol sm='6'>
               <div class='form-group'>
                    <label for='Customer'>
                       {{ $t('message.customer') }}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedCustomer'
                        id='customer_id'
                        :options='customers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder=" $t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <!-- <div v-if(errors.product_id) class="invalid-feedback">
                        {{errors.product_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='Payment'>
                       {{ $t('message.payment_status') }}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedPayment'
                        id='payment_status_id'
                        :options='payments'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder=" $t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <div v-if="errors.payment_status_id" class="invalid-feedback">
                        {{errors.payment_status_id}}
                      </div>
                    </div>
                  </div>
                 </CCol>
            </CRow>
            <hr>
            <CRow class="mt-3">
              <CCol col="6 m-auto">
                <h4 class="order text-center mb-3">{{$t('message.products')}}</h4>
              </CCol>
            </CRow>
             <button class="btn btn-primary px-5 py-2" type="button"  @click="addProduct"> {{$t('message.add_product_to_order')}}</button>
             <CRow class="mt-2">
              <table class="table">
                <thead>
                  <tr>
                 <th width="30%">  {{$t('message.product')}}<span class='star'>*</span> </th>
                  <th width="15%">  {{$t('message.price')}}<span class='star'>*</span></th>
                  <th width="20%"> {{$t('message.quantity')}}<span class='star'>*</span></th>
                  <th width="10%"> {{$t('message.total')}}</th>
                  <th width="15%"> {{$t('message.delete_product')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in products"
                    :key="index"
                  >
                    <td>
                      <multiselect
                        class='required'
                        id='product_id'
                        v-model="product.product"
                        :options='productOptions'
                        :searchable='true'
                        v-on:keypress="changeLable($event)"
                        @select="currentProduct($event)"
                       :close-on-select='true'
                       :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      
                    </td>
                    <td>
                      <CInput 
                        type='number'
                        id='price'
                        min='0'
                        disabled
                        v-model='product.product.price'
                      />
                    </td>
                    <td>
                       <CInput
                        type='number'
                        id='quantity'
                        class="required"
                        min='0'
                        @input="calcTotal($event,index)"
                        v-on:keyup.enter="submit"
                        v-model='product.quantity'
                        required
                      />
                    </td>
                    <td>
                       <CInput
                        type='number'
                        disabled
                        id='total'
                        min='0'
                        v-model='product.product.total'
                        required
                      />
                    </td>
                    <td>
                     <CButton
                        class="removeItem"
                        type="button"
                        size="sm"
                        color="danger"
                        @click="removeProduct(index)"
                      >
                      {{ $t('message.clear')}}
                      </CButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save')}}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear')}} </CButton>
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
  name: 'UpdateSalesInvoices',
  data: function () {
    return {
      salesInvoices:[] ,
      products: [],
      sendProducts:[],
      productOptions: [],
      selectedProduct: '',
      customers: [],
      selectedCustomer: '',
      payments: [],
      selectedPayment:'',
      errors: []
    }
  },
  created () {
   const productOptions = []
   const payments = []
    this.$http
      .get(`${this.$hostUrl}products`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          productOptions.push({ id: value.id, name: value.name , price:value.price})
        })
        this.productOptions = productOptions
      })
     const customers = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          customers.push({ id: value.id, name: value.name})
        })
        this.customers = customers
      })
        this.$http
      .get(`${this.$hostUrl}admin-dashboard/payment-status`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          payments.push({ id: value.id, name: value.name })
        })

        this.payments = payments
      })
      const current = this
       this.$http
      .get(`${this.$hostUrl}admin-dashboard/sale-invoices/${this.$route.params.id}/edit`)
      .then((response) => {
        this.salesInvoices = response.data.data.sale_invoice
        this.selectedCustomer = {
          id: this.salesInvoices.customer.id,
          name: this.salesInvoices.customer.name
        }
           this.selectedPayment = {
          id: this.salesInvoices.payment.id,
          name: this.salesInvoices.payment.name
        }
        $.each(this.salesInvoices.products, function (key, value) {
          current.products.push({
            product: {
            id: value.product.id,
            product_id: value.product.id,
            name:value.product.name,
            price:  value.product.price,
            total: value.product.price * value.quantity ,
            },
            id: value.id,
            quantity: value.quantity
          })
        })
    })
  },
  methods: {
   addProduct () {
      this.products.push({
        product: {
        product_id: null,
        price: null,
        total: null,
        },
        id: (this.products.length + 1),
        quantity: null,
      })
    },
    removeProduct (index) {
     this.products.splice(index, 1)
    },
        currentProduct($event){
      console.log($event)
    },
    calcTotal($event, index) {
        this.products[index].product.total= $event * this.products[index].product.price 
    },
    changeLable (e) {
      const arabic = /[\u0600-\u06FF]/
      let l = ''
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+$/.test(char)) l = 'name'
      else if (arabic.test(char)) l = 'name' // Match with regex
      else {
        e.preventDefault()
        l = 'mobile'
      } // If not match, don't add to input text
      return l
    },
    async UpdatePurchaseInvoices (e) {
      e.preventDefault()
         const formData = new FormData()
      if (this.selectedSupplier) {
        formData.append('customer_id', this.selectedSupplier.id)
      } else {
        this.errors.push('customer_id')
        this.errors.supplier_id = 'Customer field is required'
        return 0
      }
       if (this.selectedPayment) {
        formData.append('payment_status_id', this.selectedPayment.id)
      } else {
        this.errors.push('payment_status_id')
        this.errors.supplier_id = 'Payment Status field is required'
        return 0
      }
       for(var i = 0; i <= this.products.length-1; i++){
        console.log(i)
        this.sendProducts.push({product_id:this.products[i].product.id, price:this.products[i].product.price, quantity:this.products[i].quantity })
      }
      formData.append('products', JSON.stringify(this.sendProducts))

      this.errors = await this.postRequest(formData, this.$hostUrl + 'admin-dashboard/sale-invoices', '/sale-invoices')
    }
  }
}

</script>
<style>
.order{
  background-color: #9daec5;
  color: #fff;
  padding: 15px;
  border-radius: 20%;
  font-size: 30px !important;
}
.add{
   background-color: #2a3647 !important;
  color: #fff !important;
  font-size: 15px !important;
}
</style>
