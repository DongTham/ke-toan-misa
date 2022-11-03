<template>
    <div class="main">
                <div class="main-header">
                    <div class="main__header-wrapper">
                        <div class="main__header-title">
                            <span>Nhân viên</span>
                        </div>
                        <div class="main__header-add">
                            <button class="btn btn-add">Thêm mới nhân viên</button>
                        </div>
                    </div>
                </div>
                <div class="main-body">
                    <div class="main__body-function">
                        <div class="function-left">
                            <button class="btn batch-operation">
                                    <div class="button-text align-center">
                                        <span>Thực hiện hàng loạt</span>
                                        <div class="btn-icon btn-batch-operation"></div>
                                    </div>
                                </button>
                        </div>
                        <div class="function-right">
                            <div class="function__search">
                                <input type="text" class="input-main" placeholder="Tìm theo mã, tên nhân viên">
                                <button class="btn-icon btn-search"></button>
                            </div>
                            <button class="btn-icon main__icon btn-reload"></button>
                            <button class="btn-icon main__icon btn-export"></button>
                            <button class="btn-icon main__icon btn-filter"></button>
                        </div>

                    </div>
                    <div class="main__body-table">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        <input type="checkbox">
                                    </th>
                                    <th>MÃ NHÂN VIÊN</th>
                                    <th>TÊN NHÂN VIÊN</th>
                                    <th>GIỚI TÍNH</th>
                                    <th>NGÀY SINH</th>
                                    <th>SỐ CMND</th>
                                    <th>NƠI CẤP</th>
                                    <th>TÊN ĐƠN VỊ</th>
                                    <th>SỐ TÀI KHOẢN</th>
                                    <th>TÊN NGÂN HÀNG</th>
                                    <th>CHI NHÁNH TK NGÂN HÀNG</th>
                                    <th>CHỨC NĂNG</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in employeeList" :key="index">
                                    <td></td>
                                    <td>
                                        <input type="checkbox">
                                    </td>
                                    <td>{{item.EmployeeCode}}</td>
                                    <td>{{item.EmployeeName}}</td>
                                    <td>{{item.Gender == 0 ? 'Nam': item.Gender == 1 ? 'Nữ' : item.Gender == 2 ? 'Khác' : item.Gender }}</td>
                                    <td>{{date(item.DateOfBirth)}}</td>
                                    <td>{{item.IdentityNumber}}</td>
                                    <td>{{item.IdentityPlace}}</td>
                                    <td>{{item.DepartmentName}}</td>
                                    <td>{{item.BankAccountNumber}}</td>
                                    <td>{{item.BankName}}</td>
                                    <td>{{item.BankBranchName}}</td>
                                    <td class="td-context-menu">
                                        <button class="btn-edit">Sửa</button>
                                        <div class="select-contextmenu">
                                            <the-button class="btn-selectdown combobox__button" @click="handleSelectContextMenu(index)"></the-button>
                                            <div class="combobox__data" v-show="showSelectContextMenu == index ? true : false">
                                                <div class="data-item">Nhân bản</div>
                                                <div class="data-item">Xóa</div>
                                                <div class="data-item">Ngừng sử dụng</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                    <div class="main__body-footer">
                        <div class="body__footer-left">
                            <p>Tổng số: <b>{{numberRecords}}</b> bản ghi</p>
                        </div>
                        <div class="body__footer-right">
                            <div class="combobox select-record">
                                <input type="text" class="input-main combobox__input select__record-input" v-bind:value="pageSize + ' bản ghi trên 1 trang'" readonly>
                                <button class="btn-selectdown combobox__button" @click="handleShowPageSize"></button>
                                <div class="combobox__data" v-show="showSelectPageSize" >
                                    <div class="data-item" v-for="(item, index) in selectPageSize" :key="index" @click="handleSelectPageSize(item.Value)" v-bind:class="item.Value == pageSize ? 'active-item' : ''">{{item.Value}} bản ghi trên 1 trang</div>
                                </div>
                            </div>
                            
                            <button class="btn btn-prev" v-bind:disabled="pageNumber == 1 ? disableButtonPrev : !disableButtonPrev" @click="handleChangePage(pageNumber - 1)">Trước</button>
                            <div class="pagination">
                                <div class="btn-pagination" v-for="(item, index) in totalPages" :key="index" @click="handleChangePage(item)" v-bind:class="item == pageNumber ? 'active-item' : ''">{{item}}</div>
                            </div>
                            
                            <button class="btn btn-next" v-bind:disabled="pageNumber == totalPages ? !disableButtonNext : disableButtonNext" @click="handleChangePage(pageNumber + 1)">Sau</button>
                        </div>
                    </div>
                </div>
            </div>
</template>
  
<script>
import TheButton from '../base/TheButton.vue'
import {selectPageSize} from '../../i18n/i18nCommon'
import moment from 'moment';

export default {
    name:"TheContent",
    components: {
        TheButton
    },
    props: {

    },
    emits:[],
    created() {
        const me = this;
        me.getAllData();
    },
    methods:{
        getAllData(){
            const me = this;
            fetch(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${me.pageSize}&pageNumber=${me.pageNumber}`,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
            }).then((res) => res.json()).then((data) =>{
                me.employeeList = data.Data;
                me.numberRecords = data.TotalRecord;
                me.totalPages = data.TotalPage;
            })
        },

        date(date) {
            return date ? moment(date).format('DD/MM/YYYY') : date;
        },

        handleShowPageSize(){
            const me = this;
            me.showSelectPageSize = me.showSelectPageSize ? false : true;
        },
        
        handleSelectContextMenu(index){
            const me = this;
            me.showSelectContextMenu = index;
        },

        handleSelectPageSize(el){
            const me = this;
            me.showSelectPageSize = false;
            me.pageSize = el;
            me.getAllData();
        },

        handleChangePage(el){
            const me = this;
            me.pageNumber = el;
            me.getAllData();
        }
    },
    data(){
        return{
            showSelectPageSize: false, 
            showSelectContextMenu: -1,
            employeeList: [],
            pageSize: 20,
            pageNumber: 1,
            numberRecords: 0,
            totalPages: 0,
            selectPageSize: selectPageSize,
            disableButtonPrev: true,
            disableButtonNext: false
        }
    }
}
</script>

<style scoped>
@import url(../../style/main.css);
@import url(../../style/layout/footer.css);
</style>