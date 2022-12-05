<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <!-- <CCardHeader>
        <CCol col="6" style="font-size: 25px;"> {{ $t('message.show_sales_invoices')}} </CCol>
      </CCardHeader> -->
      <CCardBody>
        <!-- <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.sales_id')}}</th>
                    <td>{{ salesInvoices.id }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('message.product_name')}}</th>
                    <td>{{ products.product.name }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('message.product_name_ar')}}</th>
                    <td>{{ products.product.name_ar }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.payment_status')}} </th>
                    <td>{{ salesInvoices.payment.name }}</td>
                  </tr>
                   <tr>
                    <th> {{ $t('message.quantity')}}  </th>
                    <td>{{ products.quantity }}</td>
                  </tr>
                    <tr>
                    <th> {{ $t('message.price')}} </th>
                    <td>{{ products.price |toCurrency }}  {{ $t('message.sdg')}}</td>
                  </tr>
                    <tr>
                    <th> {{ $t('message.total')}} </th>
                    <td>{{ products.total | toCurrency}} {{ $t('message.sdg')}}</td>
                  </tr> 

                </table>
            </div>
        </div> -->
        <div class="container flex-col col-md-12">

        <div class="inner-container flex-col">
            <div class="title flex-row center">
                <h2>{{ $t('message.show_sales_invoices')}}</h2>
            </div>
            <table class="mb-4">
                <thead>
                    <tr class="row-heading">
                        <th> {{ $t('message.sales_id')}} </th>
                        <th> {{ $t('message.product_name')}} </th>
                        <th>  {{ $t('message.payment_status')}} </th>
                        <th> {{ $t('message.quantity')}} </th>
                        <th> {{ $t('message.price')}} </th>
                        <th> {{ $t('message.total')}} </th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr class="row-data">
                        <td > {{ salesInvoices.id }} </td>
                        <td v-if="$i18n.locale == 'English'">{{ products.product.name }}</td>
                        <td v-if="$i18n.locale == 'العربية'">{{ products.product.name_ar }}</td>
                        <td v-if="salesInvoices.payment.name == 'paid'"> {{ $t('message.paid')}}</td>
                        <td v-else> {{ $t('message.not_paid')}}</td>
                        <td v-if="products.product !=null" > {{ products.quantity }} </td>
                        <td v-if="products.product !=null" > {{ products.price |toCurrency }}  {{ $t('message.sdg')}} </td>
                        <td v-if="products.product !=null" > {{ products.total | toCurrency}} {{ $t('message.sdg')}} </td>
                    </tr>
                </tbody>
                <tfoot class="">
                    <tr class="mt-3">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <th>{{ $t('message.total')}} : </th>
                        <td class="total" v-if="products.product !=null" > {{ products.total | toCurrency}} {{ $t('message.sdg')}} </td>
                    </tr>
                </tfoot>
            </table>

            <CButton color="warning" @click="goBack" class="m-auto"> {{ $t('message.back')}}</CButton>
        </div>

    </div>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowSub-Services',
  data () {
    return {
      salesInvoices: [],
      products: [],
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/sale-invoices/${this.$route.params.id}`)
      .then((response) => {
        this.salesInvoices = response.data.data.sale_invoice
      })
       this.$http
      .get(`${this.$hostUrl}admin-dashboard/sale-invoices/${this.$route.params.id}`)
      .then((response) => {
        this.products = response.data.data.sale_invoice.products[0]
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/sales-invoices' })
    }
  }
}
</script>
<style scoped>
 /* general styling */

* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

button {
    color: #fff;
    letter-spacing: .8px;
    text-transform: uppercase;
    border-radius: 16px;
    padding: 5px;
    font-size: 1.2rem;
    background-color: #2a3647;
    width: 12rem;
    height: 3rem;
    border-width: 0px 2px 4px;
    border-style: solid;
    border-color: #2a3647;
    transition: .1s;
}

button:hover {
    background-color: #2a3647;
    border-color: #2a3647;
    cursor: pointer;
}

button:focus {
    outline: 0;
}

button:active {
    transition: .2s;
    border-width: 2px;
}

h2 {
    color: #2a3647;
    font-size: 1.5rem;
}


/* utility */

.flex-row {
    display: flex;
    flex-direction: row;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.center {
    justify-content: center;
    align-items: center;
}


/* structure */

.container {
    background-color: #fff;
    border: thick dashed #2a3647;
    padding: 2rem;
}

.title {
    text-align: center;
    padding: 1rem 0;
}

.container table {
    width: 100%;
    color: #2a3647;
    font-weight: 300;
}

.row-data td {
    /* width: 25%; */
    text-align: center;
    padding: 1rem;
    color:#2a3647 !important ;
}

tfoot {
    text-align: center;
    margin: 10px !important;
    padding: 10px !important;
}

tfoot tr * {
    padding: 1rem;
}

.row-data {
    border-bottom: .7px dashed #354728;
}

.row-heading th {
    color: #fff;
    /* width: 25%; */
    text-align: center !important;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 0.9rem;
}
.item-total,
.total {
    font-weight: 400;
}

.btn-container {
    padding: 1rem 0 0;
}


/* footer */
</style>
