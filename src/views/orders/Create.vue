<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createOrder" @submit="createOrder" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{$t('message.create_order')}}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
                <CCol sm="6" class="m-auto">
             <CCol class="mb-5">
                      <label for='orderType'>
                       {{ $t('message.order_type') }}
                      <span class='star'>*</span>
                    </label>
                    <multiselect
                        class='required'
                        v-model='selectedTypeOfOrder'
                        id='type_customer_id'
                        :options='orderTypes'
                        v-on:change="onChangeSite($event)"
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
              </CCol>
              </CCol>
            </CRow>
               <CRow v-if="selectedTypeOfOrder.id === 1">
              <CCol sm="6">
                    <label for='customers' >
                      {{$t('message.customer')}}
                      <span class='star'>*</span>
                       </label>
                         <multiselect
                        class='required mt-2'
                        id='customer_id'
                        v-model="selectedCustomer"
                        :options='customers'
                        :searchable='true'
                        v-on:keypress="changeLable($event)"
                        @select="onChange($event)"
                       :close-on-select='true'
                       :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
              </CCol>
              <CCol sm="4">
                <CInput :label="$t('message.balance')"
                  id="balance"
                  v-model="balance"
                  disabled
                  class="mt-3"
                  :placeholder="$t('message.balance')"
                />
              </CCol>
            </CRow>
            <hr>
            <CRow class="mt-3">
              <CCol col="6">
                <h3 class="mb-3">{{$t('message.products')}}</h3>
                <div class="line"></div>
              </CCol>
            </CRow>
             <button class="btn btn-primary px-3 py-2" type="button"  @click="addProduct"> {{$t('message.add_product_to_order')}}</button>
             <CRow class="mt-2">
              <table class="table">
                <thead>
                  <tr>
                  <th width="22%">  {{$t('message.category')}}<span class='star'>*</span> </th>
                  <th width="22%">  {{$t('message.product')}}<span class='star'>*</span> </th>
                  <th width="15%" v-if="selectedTypeOfOrder.id === 1">  {{$t('message.transfer_number')}}<span class='star'>*</span> </th>
                  <th width="10%">  {{$t('message.price')}}<span class='star'>*</span></th>
                  <th width="10%"> {{$t('message.quantity')}}<span class='star'>*</span></th>
                  <th width="10%"> {{$t('message.total')}}</th>
                  <th width="9%"> {{$t('message.delete_product')}}</th>
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
                        id='category_id'
                        v-model="product.selectedCategory"
                        :options='categories'
                        :searchable='true'
                        @select="onCategoriesChange($event)"
                        v-on:keypress="changeLable($event)"
                       :close-on-select='true'
                       :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect></td>
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
                     <td v-if="selectedTypeOfOrder.id === 1">
                      <CInput 
                        type='number'
                        id='transfer_n umber'
                        min='1'
                        disabled
                        class="required"
                        v-model='product.transferNumber'
                      />
                    </td>
                      <td>
                      <CInput 
                        type='number'
                        id='price'
                         class="required"
                        v-model='product.price'
                        required
                      />
                    </td>
                    <td>
                       <CInput
                        type='number'
                        id='quantity'
                        class="required"
                        min='1'
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
            <CButton type='submit' size='sm' color='primary' >
            <CIcon name='cil-check-circle'/> {{$t('message.save')}}</CButton>
              &emsp;
            <CButton type='reset' size='sm' color='danger'>
            <CIcon name='cil-ban'/>{{ $t('message.clear')}} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import swal from 'sweetalert'
import $ from 'jquery'
import NewCustomer from '@/components/NewCustomer.vue'
import NewOrderStatus from '@/components/NewOrderStatus.vue'
// import { component } from 'vue/types/umd'
export default {
  name: 'CreateOrder',
  data: function () {
    return {
      showModal: false,
      showModalOrder :false,
      order: {},
      products: [],
      sendProducts:[],
      productOptions: [],
      orderStatuses: [],
      searchVal: '',
      customers: [],
      categories: [],
      selectedCategory: '',
      suppliers: [],
      supplier_id:'',
      selectedSupplier: '',
      selectedProduct: '',
      selectedCustomer: '',
      selectedOrderStatus: '',
      selectedTypeOfOrder: '',
      orderTypes: [],
      transferNumber: '',
      balance: '',
      customer: {},
    }
  },
  components: {
    NewCustomer,
    NewOrderStatus
  },
  created () {
    const customers = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          customers.push({ id: value.id, name: value.name})
        })
        this.customers = customers
      })
      const suppliers = []
     this.$http
      .get(`${this.$hostUrl}suppliers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          suppliers.push({ id: value.id, name: value.name })
        })

        this.suppliers = suppliers
      })
        const orderTypes = []
     this.$http
      .get(`${this.$hostUrl}admin-dashboard/order-type`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          orderTypes.push({ id: value.id, name: value.name })
        })

        this.orderTypes = orderTypes
      })
      const categories = []
     this.$http
      .get(`${this.$hostUrl}admin-dashboard/categories`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          categories.push({ id: value.id, name: value.name })
        })
        this.categories = categories
      })
  },
  mounted:function(){
        this.oneProduct() //method1 will execute at pageload
  },
  methods: { 
    onCategoriesChange ($event) {
      const productOptions = []
      this.$http
        .get(
            `${this.$hostUrl}admin-dashboard/category/${$event.id}/products`
        )
        .then((response) => {
          $.each(response.data.data.category.products, function (key, value) {
            productOptions.push({ id: value.id, name: value.name, supplier_id: value.supplier_id })
          })
          this.productOptions = productOptions
        })
    },
    onChange ($event) {
      this.$http
        .get(
            `${this.$hostUrl}admin-dashboard/customers/${$event.id}`
        )
        .then((response) => {
          this.customer = response.data.data.customer 
          this.balance = response.data.data.blance 
      })
    },
    oneProduct: function (){
       this.products.push({
        product: {
        product_id: null,
        supplier_id: null,
        },
        id: (this.products.length + 1),
        quantity: null,
        price: null,
        total: null,
        selectedCategory: '',
        transferNumber: '',
      })
    },
    addProduct () {
      this.products.push({
        product: {
        product_id: null,
        supplier_id: null,
        },
        id: (this.products.length + 1),
        quantity: null,
        price: null,
        total: null, 
        selectedCategory: '',
        transferNumber: '',
      })
    },
    removeProduct (index) {
     this.products.splice(index, 1)
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
    currentProduct($event){
      this.supplier_id = $event.supplier_id
      console.log(this.products.length-1);
      for(var i = 0; i <= this.products.length-1; i++) {
        console.log(this.products[i].transferNumber)
        if(this.supplier_id == 6) {
          this.products[i].transferNumber = this.customer.zain_transfer_no
        } else if(this.supplier_id == 5) {
          this.products[i].transferNumber = this.customer.mtn_transfer_no
        } else if(this.supplier_id == 7) {
          this.products[i].transferNumber = this.customer.sudani_transfer_no
        } else if (this.supplier_id == 1) {
          this.products[i].transferNumber = this.customer.digitel_transfer_no   
        } else if (this.supplier_id == 4) {
          this.products[i].transferNumber = this.customer.mgurush_transfer_no 
        } else if (this.supplier_id == 9) {
          this.products[i].transferNumber = this.customer.momo_transfer_no 
        }
      }
    },
    calcTotal($event, index) {
        this.products[index].total= $event * this.products[index].price 
    },
    createOrder:function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('order_type_id', this.selectedTypeOfOrder.id)
      if (this.selectedCustomer.id) {
         formData.append('customer_id', this.selectedCustomer.id) 
      }
       if (this.selectedSupplier.id) {
         formData.append('supplier_id', this.selectedSupplier.id) 
      }
      console.log(this.products.length)
       for(var i = 0; i <= this.products.length-1; i++){
        this.sendProducts.push({product_id:this.products[i].product.id, price:this.products[i].price, quantity:this.products[i].quantity, transfer_number: this.products[i].transferNumber ?? "" })
      }
      console.log(this.sendProducts)
       formData.append('products', JSON.stringify(this.sendProducts))
      this.postRequest(formData, this.$hostUrl + 'admin-dashboard/orders', '/orders')
    }
  }
} 

</script>

<style>
.newItem{
 background:#994a69;
 border: #9c5872 3px  solid;
}
    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #643c4d; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        top: 20%;
        right: 50%;
        position: absolute;
    }
    input:read-only{
  background-color: #ccc;
  color :black;
  font-weight: bold;
}
    .cover{
        top:0;
        right:0;
        background-color: rgba(255,255,255,0.7);
        position: absolute;
        z-index: +100 !important;
        width: 100%;
        height: 100%;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<style type='text/css'>
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
    @keyframes ldio-rl19x8g8tu {
    0% { background: #d71c99 }
    12.5% { background: #d71c99 }
    12.625% { background: #4c2735 }
    100% { background: #4c2744 }
    }
    .ldio-rl19x8g8tu div {
    position: absolute;
    width: 40px;
    height: 40px;
    background: #4c2744;
    animation: ldio-rl19x8g8tu 1.4492753623188404s linear infinite;
    }
    .loadingio-spinner-blocks-7d0iqc5a70p {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;    }
    .ldio-rl19x8g8tu {
    top: 35%;
    width: 60%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
    }
    .cover{
        top:0;
        right:0;
        background-color: rgba(255,255,255,0.7);
        position: absolute;
        z-index: +100 !important;
        width: 100%;
        height: 100%;
    }
    .ldio-rl19x8g8tu div { box-sizing: content-box; }
    /* generated by https://loading.io/ */
</style>
