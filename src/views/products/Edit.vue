
<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateProduct" @submit.prevent="UpdateProduct" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px">{{ $t('message.update_product') }}</CCol>
        </CCardHeader>
        <CCardBody>
           <CRow>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='category'>
                      {{$t('message.category')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedCategory'
                        id='category_id'
                        :options='categories'
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
                      <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='supplier'>
                      {{$t('message.supplier')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedSupplier'
                        id='supplier_id'
                        :options='suppliers'
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
              </CCol>
            </CRow>
          <CRow>
            <CCol sm="6">
              <CInput :label=" $t('message.name')"
                id="name"
                v-model="product.name"
                class="required"
                :placeholder="  $t('message.name') "
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
            <CCol sm="6">
              <CInput :label=" $t('message.name_ar')"
                id="name"
                class="required"
                v-model="product.name_ar"
                :placeholder=" $t('message.name_ar') "
                :invalidFeedback="errors.name_ar"
              />
            </CCol>
          </CRow>
            <CRow>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description')"
                  id="description"
                  v-model="product.description"
                  class="required"
                  :placeholder=" $t('message.description') "
                  :invalidFeedback="errors.description"
                  required
                ></CTextarea>
              </CCol>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description_ar')"
                  id="description"
                  v-model="product.description_ar"
                 :placeholder=" $t('message.description_ar') "
                  :invalidFeedback="errors.description"
               ></CTextarea>
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.price')"
                  id="price"
                  v-model="product.price"
                  class="required"
                  :placeholder=" $t('message.price') "
                  :invalidFeedback="errors.price"
                  required
                />
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
  name: 'EditProduct',
  data () {
    return {
      product: [],
      errors: [],
      categories : [],
      selectedCategory : '',
      suppliers:[],
      selectedSupplier:''
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}products/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data.data.product
        this.selectedCategory = {
          id: this.product.category.id,
          name: this.product.category.name
        }
         this.selectedSupplier = {
          id: this.product.supplier.id,
          name: this.product.supplier.name
        }
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
   const suppliers = []
    this.$http
      .get(`${this.$hostUrl}suppliers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          suppliers.push({ id: value.id, name: value.name })
        })
        this.suppliers = suppliers
      })
  },
  methods: {
    async UpdateProduct () {
      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('name_ar', this.product.name_ar)
      formData.append('description', this.product.description)
      formData.append('description_ar', this.product.description_ar)
      formData.append('category_id', this.selectedCategory.id)
      formData.append('supplier_id', this.selectedSupplier.id)
      formData.append('price', this.product.price)
      formData.append('_method', 'PUT')
      console.log()

      this.errors = await this.postRequest(formData, `${this.$hostUrl}products/${this.$route.params.id}`, '/products')
    },
    goBack () {
      this.productsOpened ? this.$router.go(-1) : this.$router.push({ path: '/products' })
    }
  }
}
</script>
