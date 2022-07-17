<template>
	<div class="container-card">
		<div class="inner-card">
			<Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
			<Loading v-if="loading" />
			<form class="form-wrapper">
				<p>
					Back to
					<router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
				</p>
				<h2 class="title">Reset Password</h2>
				<p class="message">Forgot your password? Enter your email to reset it</p>
				<div class="input-box">
					<input type="email" placeholder="Email" v-model="email" required class="input-field"/>
					<email class="icon" />
				</div>
				<button @click.prevent="resetPassword" class="submitbtn">RESET</button>
			</form>
			<p class="error-message" v-if="error">{{ errorMessage }}</p>
		</div>
	</div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal";
import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "ForgotPassword",
	data() {
		return {
			email: '',
			error: false,
			errorMessage: '',
			modalActive: false,
			modalMessage: "",
			loading: null,
		};
	},
	components: {
		email,
		Modal,
		Loading,
	},
	methods: {
		resetPassword() {
			firebase
				.auth()
				.sendPasswordResetEmail(this.email)
				.then(() => {
					this.modalMessage = "if your account exists, you will recive an email";
					this.loading = false;
					this.modalActive = true;
					this.error = false;
					this.errorMessage = '';
				})
				.catch((err) => {
					this.modalMessage = err.message;
					this.loading = false;
					this.modalActive = true;
				});
		},

		closeModal() {
			this.modalActive = !this.modalActive;
			this.email = "";
		},
	},
};
</script>

<style lang="scss" scoped>
.inner-card {
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: 20px;
}

.submitbtn {
	margin-bottom: 0px;
}

.container-card {
	width: 50%;
}

.input-box {
	position: relative;
}

.input-field {
	width: 100%;
	justify-items: center;
	padding-left: 50px;
}

@media (max-width: 1024px) {
	.container-card {
		width: 90%;
	}
}

@media (max-width: 640px) {
	.container-card {
		width: 100%;
		margin-top: 0;
	}
}
</style>
