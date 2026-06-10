<template>
    <header id="adminHeader">
      <h1>IQPlus</h1>
      <ul class="util">
        <li>
            <a href="#" class="util-item pw" @click="()=> state.modalType = !state.modalType">비밀번호 변경</a>
        </li>
        <li>
            <a href="#" class="util-item user">김국민</a>
        </li>
        <li>
            <a href="#" class="util-item session">세션만료 남은시간 <span>00:00:00</span></a>
        </li>
        <li>
            <a href="#" class="util-item logout" @click="logout()">로그아웃</a>
        </li>
    </ul>
    </header>
    <default-modal :is-show="state.modalType" :modal-title="'비밀번호 확인'" :button-confirm="'확인'" :button-cancel="'취소'" :modal-name="'modalAlert'" @modalclose="modalClose">
    <template #modalcontent>
        <component :is="markRaw(PasswordConfirm)" ref="buildFormRef" @modalClose="modalClose" />
    </template>
</default-modal>`
</template>
<script setup>
import { reactive, computed, nextTick, ref, onMounted, markRaw, onUnmounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommFunc } from '@/_setting/helper';
const {  dayJS, goToPage } = useCommFunc();
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'
import { rules } from '@/_setting/validate';   
import PasswordConfirm from '@/sample/PasswordConfirm.vue'
const router = useRouter();
const route = useRoute();
const logout = () => {
    $Modal.simple({
        message: 'alert 입니다',
        type: 'modalAlert',
        closeButtonHide: true,
        className:'confirm',
        buttonText: {
            ok: '확인',
            cancel: '취소',
        }
    })
    /** 버튼 이벤트 처리 */
    .then(success => {
        console.log(success);
        alert('확인');
    })
    .catch(error => {
        console.log(error);
    });
}
const state = reactive({
    modalType: false,
})
const buildFormRef = ref(null);
const modalClose =  async (type, name) => {
    console.log(type, name);
    if(type === 'modalconfirm'){
        buildFormRef.value?.editChange();

   
    }else{
        state.modalType = false;
    }
}
</script>