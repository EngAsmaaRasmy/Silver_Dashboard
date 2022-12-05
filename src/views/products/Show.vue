<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.show_product')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.product_name')}} </th>
                    <td v-if="$i18n.locale == 'English'">{{ product.name }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ product.name_ar }}</td>
                  </tr>
                   <tr>
                     <th>{{ $t('message.description')}} </th>
                     <td v-if="$i18n.locale == 'English'">{{ product.description }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ product.description_ar }}</td>
                  </tr>
                   <tr>
                    <th> {{ $t('message.product_price')}}</th>
                    <td>{{ product.price }}</td>
                  </tr>
                   <tr>
                    <th> {{ $t('message.product_quantity_stock')}}</th>
                    <td>{{ product.stock }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.category')}}</th>
                    <td>{{ product.category.name }}</td>
                  </tr>

                </table>
            </div>
        </div>
         <div class="row">
            <div class="col-md-10 m-auto">
              <div class="title my-3">
                <h1 class="text-center">{{ $t('message.product_supplier')}}</h1>
              </div>
                <table class="table table-bordered">
                  <tr>
                    <th>اسم المُورد  </th>
                      <th> البريد الإلكتروني  </th>
                       <th> الهاتف  </th>
                  </tr>
                   <tr v-for=" supplier in suppliers" :key="supplier.id">
                    <td>{{ supplier.name }}</td>
                    <td>{{ supplier.email }}</td>
                    <td>{{ supplier.phone }}</td>
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
  name: 'ShowProduct',
  data () {
    return {
      product: [],
      suppliers: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}products/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data.data.product
      })
    this.$http
      .get(`${this.$hostUrl}products/${this.$route.params.id}/suppliers`)
      .then((response) => {
        this.suppliers = response.data.data
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/products' })
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
