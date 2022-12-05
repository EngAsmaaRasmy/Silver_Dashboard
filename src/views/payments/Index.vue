
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
               {{$t('message.payment')}}
            </CCol>
             <CCol col="6" style="text-align: left;" class="cardButton">
                <CButton  to="/payments/create" square color="primary">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  {{$t('message.create_payment')}}
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
  name: 'payments',
  components: { VdtnetTable },
  data () {
    return {
      delete: 'delete',
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'payments',
          dataSrc: (json) => {
            return json.data.original.data
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
            exportOptions: {
              columns: 'th:not(:last-child)'
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
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: false,
        fixedHeader: true,
        saveState: true,
        select: {
          style: 'multi'
        }
      },
      fields: {
        id: {
          label: this.$t('message.payment_id'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        amount: {
          label: this.$t('message.amount'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        worker_name: {
          label: this.$t('message.worker_name'),
          sortable: false,
          searchable: true,
          defaultContent: 'worker undefine',
          defaultOrder: 'SORT_ASC '
        },
        customer_name: {
          label: this.$t('message.customer_name'),
          sortable: false,
          searchable: true,
          defaultContent: 'customer undefine',
          defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: this.$t('message.date'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        actions: {
          isLocal: true,
          label: this.$t('message.operation'),
          defaultContent: '<a href="javascript:void(0);" data-action="show" class="btn btn-info btn-sm" title="عرض الطلب"><i class="mdi mdi-square-show-outline"></i>' + this.$t('message.show') + ' </button>' +
            '&ensp;<a href="javascript:void(0);" data-action="edit" class="btn btn-dark btn-sm"><i class="mdi mdi-square-edit-outline"></i>' + this.$t('message.update') + ' </a>' +
          '&ensp;<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete" @click="swal"></i>' + this.$t('message.delete') + ' </span>'
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'payments',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAlertShow (data) {
      this.$router.push({ path: `payments/${data.id}/show`, params: { id: data.id } })
    },
    doAlertEdit (data) {
      this.$router.push({
        path: `/payments/${data.id}/edit`,
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
              `${this.$hostUrl}payments/${data.id}`,
              { _method: 'delete' }
            )
            .then((response) => {
              console.log(response)
              localStorage.payments = Number(localStorage.payments) - 1
              jquery('#payments_badge').text(localStorage.payments)
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
