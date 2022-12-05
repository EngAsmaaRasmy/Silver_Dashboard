<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">  {{ $t('message.show_supplier')}}</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row mb-3">
          <div class="col-md-6">
             <label for='customers' class="ml-3">
                      {{$t('message.add_product')}}
                       </label>
                      <CButton type="button" @click="showModal=true"  class="copy">
                               +
                               </CButton>
                      <Modal v-model="showModal">
                       <NewProduct />
                          </Modal>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.supplier_name')}}  </th>
                    <td>{{ suppliers.name }}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.supplier_email')}} </th>
                    <td>{{ suppliers.email }}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.supplier_phone')}}  </th>
                    <td>{{ suppliers.phone}}</td>
                  </tr>

                </table>
            </div>
          </div>
        <div class="row">
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.product_name')}}  </th>
                      <th> {{$t('message.product_description')}}  </th>
                       <th> {{$t('message.product_price')}} </th>
                  </tr>
                   <tr v-for=" product in products" :key="product.id">
                    <td v-if="$i18n.locale == 'English'">{{ product.name }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ product.name_ar }}</td>
                    <td v-if="$i18n.locale == 'English'">{{ product.description }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ product.description_ar }}</td>
                    <td>{{ product.price }}</td>
                  </tr>
                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack"> {{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
import swal from 'sweetalert'
import $ from 'jquery'
import NewProduct from '@/components/NewProduct.vue'
export default {
  name: 'ShowSupplier',
  data () {
    return {
      showModal: false,
      suppliers: [],
      products : []
    }
  },
   components: {
    NewProduct,
},
  created () {
    console.log(this.$route.params.id)
    // this.$http.get(`${this.$hostUrl}suppliers/${this.$route.params.id}`)
     this.$http.get(`http://178.79.181.70:8003/api/suppliers/${this.$route.params.id}`)
      .then((response) => {
        this.suppliers = response.data.data.info
       
      })
       this.$http
      .get(`${this.$hostUrl}suppliers/${this.$route.params.id}/products`)
      .then((response) => {
         this.products = response.data.data
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/suppliers' })
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
