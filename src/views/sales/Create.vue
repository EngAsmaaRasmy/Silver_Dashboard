
<template>
  <div>
    <CRow>
      <CCol col="12">
        <CCard class="cards">
          <form id="createSalesInvoices" @submit="createSalesInvoices" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_sales_invoices') }}</CCol>
          </CCardHeader>
          <CCardBody>
             <CRow>
              <CCol sm="4">
                 <CInput :label="$t('message.order_no')"
                  id="order_no"
                  v-model="order_no"
                  class="required"
                  :placeholder="$t('message.search_order_no')"
                  :invalidFeedback="errors.order_no"
                  required
                />
              </CCol>
              <div class="col-md-4 mt-4 cardButton" >
              <CButton square color="primary" v-on:click="search">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp; {{ $t('message.search')}}
              </CButton>
            </div>
            </CRow>
            <hr>
            <CRow class="mt-1">
              <CCol col="6">
                <h3 class=" mb-3">{{$t('message.products')}}</h3>
                <div class="line"></div>
              </CCol>
            </CRow>
             <CRow>
              <table class="table">
                <thead>
                  <tr>
                  <th width="30%">  {{$t('message.product')}}<span class='star'>*</span> </th>
                  <th width="15%">  {{$t('message.price')}}<span class='star'>*</span></th>
                  <th width="20%"> {{$t('message.quantity')}}<span class='star'>*</span></th>
                  <th width="15%"> {{$t('message.total')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in products"
                    :key="index"
                  >
                    <td>
                       <CInput 
                        type='text'
                        id='product_id'
                        min='0'
                        disabled
                        v-model='product.product.name'
                      />
                    </td>
                    <td>
                      <CInput 
                        type='number'
                        id='price'
                        min='0'
                        disabled
                        v-model='product.price'
                      />
                    </td>
                    <td>
                       <CInput
                        type='number'
                        id='quantity'
                        class="required"
                        min='0'
                        disabled
                         @input="calcTotal($event,index)"
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
                        v-model='product.total'
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </CRow>
            <hr>
            <CRow>
              <CCol v-if="order" sm="6">
                 <CInput :label="$t('message.total_order_price')"
                  id="total_order"
                  v-model="order.total"
                  :placeholder="$t('message.total_order_price')"
                  :invalidFeedback="errors.total_order"
                  disabled
                />
            </CCol>
            <CCol sm="6">
                 <CInput :label="$t('message.invoice_price')"
                  id="invoice_price"
                  v-model="invoice_price"
                  class="required"
                  :placeholder="$t('message.invoice_price')"
                  :invalidFeedback="errors.invoice_price"
                  required
                />
            </CCol>

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
  name: 'createSalesInvoices',
  data: function () {
    return {
      salesInvoices: {},
      products: [],
      selectedProduct: '',
      sendProducts:[],
      productOptions: [],
      customer: '',
      selectedCustomer: '',
      payments: [],
      selectedPayment: '',
      errors: []
    }
  },
  methods: {
    search() {
      console.log(this.order_no)
       const current = this
         this.$http
            .get(
              `${this.$hostUrl}admin-dashboard/order/sales?order_no=${this.order_no}`,
            ) .then((response) => {
              if (!response.data.data.order[0]) {
                swal({
                  title: '???? ???????? ?????? ??????????',
                  buttons: '????'
                })
              }
              this.order = response.data.data.order[0]
              console.log(this.order.customer.id)
              this.customer = this.order.customer.id
              $.each(this.order.products, function (key, value) {
              current.products.push({
                product: {
                id: value.product.id,
                product_id: value.product.id,
                name:value.product.name,
                },
                id: value.id,
                quantity: value.quantity,
                price:  value.price,
                total: value.price * value.quantity ,
              })
            })
          })
    },
    async createSalesInvoices (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('order_id', this.order.id);
      formData.append('price_paid', this.invoice_price);
      formData.append('customer_id', this.customer);
      formData.append('payment_status_id', 2);
      for(var i = 0; i <= this.products.length-1; i++){
        this.sendProducts.push({product_id:this.products[i].product.id, price:this.products[i].price, quantity:this.products[i].quantity, transfer_number:this.products[i].transferNumber })
      }
      formData.append('products', JSON.stringify(this.sendProducts))
      this.errors = await this.postRequest(formData, this.$hostUrl + 'admin-dashboard/sale-invoices', '/sales-invoices')
    }
  }
}
</script>
<style scoped>
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
.line {
    width: 80px;
    height: 4px;
    background: #2a3647;
    margin-bottom: 32px;
}
  
</style>
