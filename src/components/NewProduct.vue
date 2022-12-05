<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createProduct" @submit="createProduct" >
          <CCardBody>
            <CRow>
                <div class=' col-md-12 form-group'>
                    <label for='product'>
                      {{$t('message.product_create')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedProduct'
                        id='product_id'
                        :options='products'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <!-- <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div> -->
                    </div>
                  </div>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/>  {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/>  {{ $t('message.clear') }} </CButton>
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
  name: 'CreateCustomer',
  data: function () {
    return {
      products: {},
      selectedProduct: '',
      errors: []
    }
  },
     created () {
    const products = []
    this.$http
      .get(`${this.$hostUrl}products`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          products.push({ id: value.id, name: value.name })
        })
        this.products = products
        console.log(products)
      })
  },
  methods: {
   createProduct:function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('product_id', this.selectedProduct.id)
      formData.append('supplier_id', this.$route.params.id)

      this.postRequest(formData, this.$hostUrl + 'suppliers/products', '/suppliers')
    }
  }
}
</script>
