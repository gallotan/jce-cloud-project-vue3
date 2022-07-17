<template id="app">
	<!-- <form class="login">
			<p class="login-register">
				Don't have an account?
				<router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
			</p>
			<h2>Login to our project</h2>
			<div class="inputs">
				<div class="input">
					<input type="text" placeholder="Email" v-model="email" />
					<email class="icon" />
				</div>
				<div class="input">
					<input type="password" placeholder="Password" v-model="password" />
					<password class="icon" />
				</div>
				<div class="error" v-show="error">{{ this.errorMsg }}</div>
			</div>
			<router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>
			<button @click.prevent="signIn">SIGN IN</button>
		</form> -->

	<div class="container-card">
		<div class="inner-card">
			<h1 class="title">Welcome to our second hand cars price prediction site.</h1>
			<h3 class="subtitle">Who we are?</h3>
			<p class="message">5 Students with a passion for cars, developed an algorithm to estimate second-hand car prices. <br /> We'll do our best to ensure you get the best price on your next new car, and we hope you enjoy it!</p>
			<p class="message">We promise to keep all the details private and secure.</p>

			<form class="form-wrapper">
				<p>Don't have an account? <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link></p>
				<h3 class="subtitle">Login to our project</h3>
				<div class="input-box">
					<email class="icon" />
					<input type="text" placeholder="Email" v-model="email" class="input-field" />
				</div>
				<div class="input-box">
					<password class="icon" />
					<input type="password" placeholder="Password" v-model="password" class="input-field" />
				</div>
				<div class="error-message" v-show="error">{{ this.errorMsg }}</div>
			<button @click.prevent="signIn" class="submitbtn">Login</button>
			</form>
			<p>
				Forgot your password?
				<router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">click here</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "Login",
	components: {
		email,
		password,
	},
	data() {
		return {
			email: "",
			password: "",
			error: null,
			errorMsg: "",
		};
	},
	methods: {
		signIn() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then((user) => {
					this.$store.commit("updateUser", user.user);
					
					this.$router.push({ name: "Home" });
					this.error = false;
					this.errorMsg = "";
				})
				.catch((err) => {
					this.error = true;
					this.errorMsg = err.message;
				});
		},
	},
};
</script>

<style scoped>
.inner-card {
	display:flex;
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

<style lang="scss">
.subtitle {
	font-size: 20px;
	width: 100%;
}

.message {
	font-size: 18px;
	width: 100%;
}

.form-wrapper {
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	justify-content: center;
	row-gap: 15px;
	width: 70%;
}

.icon {
	width: 16px;
	height: 16px;
	position: absolute;
	left: 30px;
	top: 11px;
	z-index: 10;
}

// .form-wrap {
// 	overflow: hidden;
// 	display: flex;
// 	height: 100vh;
// 	justify-content: center;
// 	align-self: center;
// 	margin: 0 auto;
// 	width: 90%;
// 	@media (min-width: 900px) {
// 		width: 100%;
// 	}

// 	.login-register {
// 		margin-bottom: 32px;

// 		.router-link {
// 			color: black;
// 		}
// 	}

// 	form {
// 		padding: 0 10px;
// 		position: relative;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: center;
// 		flex: 1;
// 		@media (min-width: 900px) {
// 			padding: 0 50px;
// 		}

// 		h2 {
// 			text-align: center;
// 			font-size: 32px;
// 			color: #303030;
// 			margin-bottom: 40px;
// 			@media (min-width: 900px) {
// 				font-size: 40px;
// 			}
// 		}

// 		.inputs {
// 			width: 100%;
// 			max-width: 350px;

// 			.input {
// 				position: relative;
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				margin-bottom: 8px;
// 				input {
// 					width: 100%;
// 					border: none;
// 					background-color: #f2f7f6;
// 					padding: 4px 4px 4px 30px;
// 					height: 50px;

// 					&:focus {
// 						outline: none;
// 					}
// 				}
// .icon {
// 	width: 12px;
// 	height: 12px;
// 	position: absolute;
// 	left: 6px;
// }
// 			}
// 		}

// 		.forgot-password {
// 			text-decoration: none;
// 			color: black;
// 			cursor: pointer;
// 			font-size: 14px;
// 			margin: 16px 0 32px;
// 			border-bottom: 1px solid transparent;
// 			transition: 0.5s ease all;

// 			&:hover {
// 				border-color: #303030;
// 			}
// 		}
// 	}
// 	button {
// 		display: inline-block;
// 		background: #303030;
// 		color: white;
// 		width: 120px;
// 		height: 35px;
// 		border-radius: 30px;
// 		white-space: nowrap;
// 		margin: 10px auto;

// 		&:hover {
// 			cursor: pointer;
// 		}
// 	}
// }
//
</style>
