
<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
                {{ $t('message.order')}}
            </CCol>
             <CCol col="6"  class="cardButton">
                <CButton  to="/orders/create"  square color="primary">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;    {{ $t('message.create_order')}}
                </CButton>
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
            @edit="doAlertEdit"
            @show="doAlertShow"
            @status ="doAlertChange"
            @delete="doAlertDelete"
            @reloaded="doAfterReload"
            @table-creating="doCreating"
            @table-created="doCreated"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import swal from 'sweetalert'
import VdtnetTable from '../VdtnetTable.vue'
import jquery from 'jquery'
export default {
  name: 'orders',
  components: { VdtnetTable },
  data () {
    return {
      orders: [],
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'admin-dashboard/orders',
          dataSrc: (json) => {
            return json.data
          }
        },
        buttons: [
          {
            extend: 'print',
            text: this.$t('message.print'),
            titleAttr: '',
            className: 'print',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          },
          {
            extend: 'copy',
            text: this.$t('message.copy'),
            className: 'copy',
            titleAttr: ''
          },
          {
            extend: 'excel',
            text: '',
            titleAttr: 'إكسل',
            className: 'fa fa-table btn-success',
            // extend: 'pdfHtml5',
            exportOptions: {
              columns: ':visible(:not(.not-export-col))'
            }
          }
        ],
        dom:
          "<'row'<'col-sm-6 col-md-6'f><'col-sm-6 col-md-6 added'l>>" +
          "<'row'<'col-sm-12'Btr>>" +
          "<'row'<'col-sm-12 col-md-5'p><'col-sm-12 col-md-7'i>>",
        paging: true,
        language: {
          url: this.$t('message.url')
        },
        responsive: true,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: false,
        fixedHeader: true,
        saveState: true,
        info: false,
        select: {
          style: 'multi'
        }
      },
      fields: {
        id: {
          label: this.$t('message.id'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        order_no: {
          label: this.$t('message.order_id'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        type: {
          label: this.$t('message.order_type'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        status: {
          label: this.$t('message.order_status'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        total: {
          label: this.$t('message.total_cost'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
         products: {
          label: this.$t('message.product'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: this.$t('message.date'),
          isLocal: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        actions: {
          isLocal: true,
          label: this.$t('message.operation'),
          defaultContent: '<button href="javascript:void(0);" data-action="show" class="btn btn-info btn-sm" title="عرض الطلب"><i class="mdi mdi-square-show-outline"></i>' + this.$t('message.show') + ' </button>' +
            '&ensp;<button href="javascript:void(0);" data-action="edit" class="btn btn-dark btn-sm"><i class="mdi mdi-square-edit-outline"></i>' + this.$t('message.update') + ' </button>' 
        }

      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.postJSON(
        this.$hostUrl + 'admin-dashboard/orders',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAlertShow (data) {
      this.$router.push({ path: `/orders/${data.id}/show`, params: { id: data.id } })
    },
    doAlertEdit (data) {
      this.$router.push({
        path: `/orders/${data.id}/edit`,
        params: { id: data.id }
      })
    },
    doAlertDelete (data, row, tr, target) {
      console.log(`deleting item ID: ${data.id}`)

      swal({
        title: 'هل انت متأكد ؟',
        text: 'بمجرد الحذف ، لن تتمكن من استرداد هذا العنصر !',
        icon: 'warning',
        buttons: ['لا', 'نعم'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .delete(
              `http://178.79.181.70:8003/api/admin-dashboard/orders/${data.id}`,
              { _method: 'delete' }
            )
            .then((response) => {
              console.log(response.data.message)
              localStorage.orders = Number(localStorage.orders) - 1
              jquery('#services_badge').text(localStorage.orders)
              swal({ title: response.data.message, buttons: 'تم' })
            })
          tr.remove()
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' تم الغاء الحذف !', buttons: 'تم' })
        }
      })
    },
    doAlertChange (data, row, tr, target) {
      swal({
        title: 'هل انت متأكد ؟',
        text: 'من تغيير حالة الطلب',
        icon: 'warning',
        buttons: ['لا', 'نعم'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .get(
              `http://178.79.181.70:8003/api/admin-dashboard/status/${data.id}`,
            )
            .then((response) => {
              console.log(response.data.message)
              localStorage.orders = Number(localStorage.orders) - 1
              jquery('#services_badge').text(localStorage.orders)
              swal({ title: response.data.message, buttons: 'تم' })
            })
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' تم الغاء تغيير حالة الطلب !', buttons: 'تم' })
        }
      })
    },
    doAfterReload (data, table) {
      console.log('data reloaded')
    },
    doCreating (comp, el) {
      console.log('creating')
    },
    doCreated (comp) {
      console.log('created')
    },
    doSearch () {
      this.$refs.table.search(this.quickSearch)
    },
    doExport (type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
    },
    formatCode (zipcode) {
      return zipcode.split('-')[0]
    }
  }
}
</script>
