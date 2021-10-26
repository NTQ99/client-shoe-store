'use strict';
// Class definition

var KTDatatableDataLocalDemo = function() {
    // Private functions

    // demo initializer
    var demo = function() {
        var dataJSONArray = [{"RecordID":1,"OrderID":"0374-5070","productCode":"123456721","productName":"ABC","quantity":872,"capitalPrice":"70000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"https://giayxshop.vn/wp-content/uploads/2019/02/MG_4978.jpg","Actions":null},
            {"RecordID":2,"OrderID":"63868-257","productCode":"123463421","productName":"Giày","quantity":872,"capitalPrice":"80000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":3,"OrderID":"49288-0815","productCode":"123451221","productName":"Quần","quantity":872,"capitalPrice":"60000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":4,"OrderID":"49288-0039","productCode":"123422341","productName":"Áo","quantity":872,"capitalPrice":"60000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":5,"OrderID":"59762-0009","productCode":"145456721","productName":"Son","quantity":872,"capitalPrice":"50000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":6,"OrderID":"43419-020","productCode":"125846721","productName":"Phấn mắt","quantity":872,"capitalPrice":"40000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":7,"OrderID":"33261-641","productCode":"123489421","productName":"Áo khoác","quantity":872,"capitalPrice":"30000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":8,"OrderID":"68462-221","productCode":"123423321","productName":"Váy","quantity":872,"capitalPrice":"200000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":9,"OrderID":"68084-555","productCode":"123452456","productName":"Sữa rửa mặt","quantity":872,"capitalPrice":"50000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":10,"OrderID":"10565-013","productCode":"245556721","productName":"Kem trống nắng","quantity":872,"capitalPrice":"20000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null},
            {"RecordID":11,"OrderID":"68026-422","productCode":"134556721","productName":"Kem dưỡng da","quantity":872,"capitalPrice":"40000","retailPrice":"120000","wholesalePrice":"100000","productDetail":"Cordi Dodman","Actions":null}];

        var datatable = $('#product_datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                // height: 450, // datatable's body's fixed height
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#kt_datatable_search_query'),
                key: 'generalSearch'
            },

            // columns definition
            columns: [{
                field: 'RecordID',
                title: '#',
                sortable: false,
                width: 20,
                type: 'number',
                textAlign: 'center',
            }, {
                field: 'id',
                title: 'Order ID',
                visible: false,
            }, {
                field: 'productCode',
                title: 'Mã sản phẩm',
            }, {
                field: 'productName',
                title: 'Tên sản phẩm',
            }, {
                field: 'quantity',
                title: 'Tồn kho',
                type: 'number',
            }, {
                field: 'capitalPrice',
                title: 'Giá nhập',
                autoHide: true
            }, {
                field: 'retailPrice',
                title: 'Giá lẻ',
                autoHide: true
            }, {
                field: 'wholesalePrice',
                title: 'Giá sỉ',
                autoHide: true
            }, {
                field: 'productDetail',
                title: 'Chi tiết',
                autoHide: true,
                template: function(row) {
                    return `
                    <div class="d-flex" style="width: 700px">
                        <div class="col-sm-4">
                            <img src="${row.productDetail}" style="width: 200px" />
                        </div>
                        <div class="col-sm-8">
                            <h1>Giày Thể Thao Adidas Alphabounce beyond</h1>
                            Chất liệu cao cấp, bền đẹp theo thời gian. Thiết kế thời trang. Kiểu dáng phong cách. Độ bền cao. Dễ phối đồ.
                        </div>
                    </div>`
                }
            }, {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 125,
                overflow: 'visible',
                autoHide: false,
                template: function() {
                    return '\
							<div class="dropdown dropdown-inline">\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
	                                <span class="svg-icon svg-icon-md">\
	                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
	                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
	                                            <rect x="0" y="0" width="24" height="24"/>\
	                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
	                                        </g>\
	                                    </svg>\
	                                </span>\
	                            </a>\
							  	<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
	                                <ul class="navi flex-column navi-hover py-2">\
	                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
	                                        Choose an action:\
	                                    </li>\
	                                    <li class="navi-item">\
	                                        <a href="/" class="navi-link">\
	                                            <span class="navi-icon"><i class="la la-print"></i></span>\
	                                            <span class="navi-text">Print</span>\
	                                        </a>\
	                                    </li>\
	                                    <li class="navi-item">\
	                                        <a href="/" class="navi-link">\
	                                            <span class="navi-icon"><i class="la la-copy"></i></span>\
	                                            <span class="navi-text">Copy</span>\
	                                        </a>\
	                                    </li>\
	                                    <li class="navi-item">\
	                                        <a href="/" class="navi-link">\
	                                            <span class="navi-icon"><i class="la la-file-excel-o"></i></span>\
	                                            <span class="navi-text">Excel</span>\
	                                        </a>\
	                                    </li>\
	                                    <li class="navi-item">\
	                                        <a href="/" class="navi-link">\
	                                            <span class="navi-icon"><i class="la la-file-text-o"></i></span>\
	                                            <span class="navi-text">CSV</span>\
	                                        </a>\
	                                    </li>\
	                                    <li class="navi-item">\
	                                        <a href="/" class="navi-link">\
	                                            <span class="navi-icon"><i class="la la-file-pdf-o"></i></span>\
	                                            <span class="navi-text">PDF</span>\
	                                        </a>\
	                                    </li>\
	                                </ul>\
							  	</div>\
							</div>\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">\
	                            <span class="svg-icon svg-icon-md">\
	                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
	                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
	                                        <rect x="0" y="0" width="24" height="24"/>\
	                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero"\ transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>\
	                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>\
	                                    </g>\
	                                </svg>\
	                            </span>\
							</a>\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="Delete">\
	                            <span class="svg-icon svg-icon-md">\
	                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
	                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
	                                        <rect x="0" y="0" width="24" height="24"/>\
	                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
	                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
	                                    </g>\
	                                </svg>\
	                            </span>\
							</a>\
						';
                },
            }],
        });

    };

    return {
        // Public functions
        init: function() {
            // init dmeo
            demo();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableDataLocalDemo.init();
});
