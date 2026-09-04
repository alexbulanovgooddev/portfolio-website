<script setup lang="ts">
import type { SubmissionContext, GenericObject } from 'vee-validate'

import * as Yup from 'yup'

const emits = defineEmits<{
	(e: 'submit-success'): void
	(e: 'submit-failure', error: unknown): void
}>()

const schema = toTypedSchema(
	Yup.object().shape({
		name: Yup.string().trim().required('Это поле обязательно'),
		email: Yup.string()
			.trim()
			.email('Некорректный email')
			.required('Это поле обязательно'),
		message: Yup.string().trim().required('Это поле обязательно')
	})
)

const pending = ref<boolean>(false)

interface FormData {
	name: string
	email: string
	message: string
}

const formState = reactive<FormData>({
	name: '',
	email: '',
	message: ''
})

async function handleSubmit(
	values: GenericObject,
	actions: SubmissionContext<GenericObject>
) {
	try {
		pending.value = true

		await $fetch(`/api/callback/`, {
			method: 'POST',
			body: {
				...values
			}
		})

		actions.resetForm()
		emits('submit-success')
	} catch (error: unknown) {
		emits('submit-failure', error)
	} finally {
		pending.value = false
	}
}
</script>

<template>
	<Form
		class="contact-form"
		:validation-schema="schema"
		as="form"
		@submit="handleSubmit"
	>
		<div class="contact-form__wrapper">
			<Field
				v-slot="{ componentField, meta, errorMessage }"
				v-model="formState.name"
				class="contact-form__field"
				as="div"
				name="name"
			>
				<UIInput
					v-bind="componentField"
					label="Ваше имя"
					autocomplete="name"
					placeholder="Имя"
					:disabled="pending"
				/>

				<UIHelpMessage
					v-if="meta.validated && !meta.valid"
					class="contact-form__help-message"
					:message="errorMessage"
					status="error"
				/>
			</Field>

			<Field
				v-slot="{ componentField, meta, errorMessage }"
				v-model="formState.email"
				class="contact-form__field"
				as="div"
				name="email"
			>
				<UIInput
					v-bind="componentField"
					label="Ваш email"
					autocomplete="email"
					placeholder="Email"
					:disabled="pending"
				/>

				<UIHelpMessage
					v-if="meta.validated && !meta.valid"
					class="contact-form__help-message"
					:message="errorMessage"
					status="error"
				/>
			</Field>

			<Field
				v-slot="{ componentField, meta, errorMessage }"
				v-model="formState.message"
				class="contact-form__field"
				as="div"
				name="message"
			>
				<UITextarea
					v-bind="componentField"
					label="Сообщение"
					placeholder="Ваше сообщение"
					:disabled="pending"
				/>

				<UIHelpMessage
					v-if="meta.validated && !meta.valid"
					class="contact-form__help-message"
					:message="errorMessage"
					status="error"
				/>
			</Field>

			<div
				class="contact-form__form-group form-group"
				:class="{ disabled: pending }"
			>
				<UIButton label="Отправить" type="submit" :disabled="pending" />
			</div>
		</div>
	</Form>
</template>

<style lang="scss" scoped>
.contact-form {
	display: block;
	width: 100%;

	&__wrapper {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;

		@media screen and (min-width: $md) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	&__field {
		display: flex;
		flex-direction: column;
	}

	&__field:last-of-type,
	&__field:nth-child(n + 3) {
		@media screen and (min-width: $md) {
			grid-column: span 2 / span 2;
		}
	}
}
</style>
