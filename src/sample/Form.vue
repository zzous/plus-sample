<template>
    <div>
        <div class="ui-title-3">
            <h3>전문이력 상세</h3>
        </div>
        <VeeForm
            ref="formRef"
            v-slot="{ values }"
            :validation-schema="schema"
            :initial-values="{}"
        >
        <div class="ui-section">
            <div class="tbl-reg-wrap half">
                <FormLine :labelText="'요청ID'" :required="true">
                    <div>
                        <VeeField v-slot="{ errors, handleChange }" name="projectName">
                            <SInput
                                label=""
                                placeholder="요청ID 를입력하세요"
                                size="medium"
                                 v-model="values.projectName" @input="handleChange" 
                            />
                            <!-- <input type="text" class="tbl-input" v-model="values.projectName" @input="handleChange" /> -->
                            <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
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
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'
import { rules } from '@/_setting/validate';
import FormLine from '@/components/ui/FormLine.vue'
import {
  SToastProvider,
  SButton,
  SInput,
  SSelect,
  STextarea,
  SCheckbox,
  SCheckboxGroup,
  SRadioGroup,
  SBadge,
  SChip,
  SCard,
  SModal,
  SPagination,
  SDatePicker,
  STypography,
} from '@zzou/vue-design-system'

// const $Modal = inject('$Modal');
const router = useRouter();
const route = useRoute();

const formRef = ref(null);

const schema = yup.object().shape({
    projectName: rules.create('전문 ID').required(),
    date: rules.create('전달일시').required(),
    prtype: rules.create('결과코드').required(),
    code: rules.create('업무코드').required(),
    register: rules.create('등록자').required(),
    date: rules.create('등록일시').required(),
    body: rules.create('요청BODY').required()
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
        console.log('유효성 검사 통과, 수정 로직 실행');
    }
}
onMounted(() => {
        code: 'KB1010',
    formRef.value?.setValues({
        projectName: 'WCZ75A11751_I',
        date: '2025-04-27 13:22:14',
        prtype: '200',
        code: 'KB1010',
        register: '김국민',
        date: '2025-04-27 13:22:14',
        body: '전문1 설명',
    });
})
</script>