<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">  {{ $t('message.accounting_reports')}}</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.total_withdrawn_money')}}  </th>
                    <td>{{ accounting.total_withdrawn_money }}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.total_received_money')}} </th>
                    <td>{{ accounting.total_received_money }}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.profist')}}  </th>
                    <td>{{ accounting.profist}}</td>
                  </tr>

                </table>
            </div>
          </div>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
import swal from 'sweetalert'
import $ from 'jquery'
export default {
  name: 'ShowSupplier',
  data () {
    return {
      accounting: []
    }
  },
  created () {
       this.$http
      .get(`${this.$hostUrl}admin-dashboard/report/accounting`)
      .then((response) => {
         this.accounting = response.data.data
      })
  },
}
</script>
