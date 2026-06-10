<template>
    <div>
        <div class="ui-title-3">
            <h3>비밀번호 찾기</h3>
        </div>
        <VeeForm
            ref="formRef"
            v-slot="{ values }"
            :validation-schema="schema"
            :initial-values="{}"
        >
        <div class="ui-section">
            <div class="tbl-reg-wrap half">
                <FormLine :labelText="'ID'" :required="true">
                    <div>
                        <VeeField v-slot="{ errors, handleChange }" name="id">
                            <InputText 
                                :inputPlaceholder="'ID을 입력하세요.'" 
                                :inputType="'text'" 
                                :model-value="values.projectName"
                                :error-messages="errors"
                                @update:model-value="handleChange"
                            />
                        </VeeField>
                    </div>
                </FormLine>
               
            </div>
        </div>
        </VeeForm>
    </div>
</template>

<script setup>
import { reactive, computed, nextTick, ref, onMounted, markRaw, onUnmounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useCommFunc } from '@/_setting/helper';
const {  dayJS, goToPage } = useCommFunc();
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'
import { rules } from '@/_setting/validate';

const $Modal = inject('$Modal');
const router = useRouter();
const route = useRoute();

const formRef = ref(null);

const schema = yup.object().shape({
    projectName: rules.create('ID').required(),
});

const validate = async () => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    console.log(valid)
    return valid
  }
  return false;
}

const editChange = async (e) => {
    const result = await validate();
    console.log(result)
    if(result){
        $Modal.simple({
            message: `${formRef.value.values.projectName} 이 수정 되었습니다.`,
            type: 'modalAlert',
            closeButtonHide: true,
            className:'confirm',
            buttonText: {
                ok: '확인',
                cancel: '취소',
            }
        })
        .then(success => {
            console.log(success);
            goToPage('/buildlist');
        })
        .catch(error => {
            console.log(error);
        });
    }
}
onMounted(() => {
    console.log('route.params:', route.params);
    console.log('route.query:', route.query);
    formRef.value?.setValues({
        id: 'WCZ75A11751_I',
    });
})
</script>

