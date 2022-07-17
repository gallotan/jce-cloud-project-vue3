<template>
	<div class="container-card">
		<div class="inner-card">
			<h1 class="title">Car Image</h1>
			<input hidden id="fileUpload" type="file" @change="onFileSelected">

			<div style="margin-top:-50px; width:300px;">
			<b-spinner v-show="spinner_status" variant="primary" type="grow" label=""></b-spinner>

			<img v-show="image_status" style="width:300px;border: 2px solid #ffffff;" v-bind:src="url" >
			</div >

			<div style=" font-weight:900; margin-bottom:15px; align-items: left;">

				<button  class="submitbtn" @click = "onUpload" style="background-color:#34779e;  height:30px; font-size: 12px; margin-top:-50px; margin-left:-150px "> 
				<upload class="icon" style="background-color:#34779e;" />
			
				Upload 
				</button>
			</div>

			<div style="background-color: white; width: 300px; height:100px;	align-items: left; padding:10px; border-radius: 5px; margin-top:-80px ">

			<div style=" font-weight:900; margin-bottom:15px">
			Registartion Plate:
			</div>

			<div v-show="image_status" style="color:#e48921; font-weight:900;margin-bottom:10px">
				{{text_detected}}

			</div>
			<div v-show="image_status" style=" font-size: 12px;font-weight:900;">
				confidence: {{confidence}} 

			</div>
</div>

	<button class="submitbtn" @click = "savePredictions" style="background-color:#208a5e;  height:50px; font-size: 15px; margin-top:-30px"> 
			
			Save Prediction Result </button>
		</div>
	</div>
</template>

<script>
import upload from "../assets/Icons/upload.svg";
import { savePredictions } from "../utils/api";

import { uploadImage } from "../utils/api";

export default {
	name: "Result",
	components: {
		upload,
	},
	data() {
		return {
		url: "https://mapandan.gov.ph/wp-content/uploads/2018/03/no_image.jpg",
		confidence: null,
		text_detected: null,
		uploadStatus:false,
		spinner_status: false,
		image_status: true,


		};

	},
	created() {
		if (this.$store.state.predictedPrice === null) {
			this.$router.push({ name: "Home" });
		}
	},
	beforeUnmount() {
		this.$store.commit("resetePredictedPrice");
	},
	mounted() {},
	methods: {
		getFormatedResult() {
			const unformattedPrice = Number(this.$store.state.predictedPrice);
			return unformattedPrice.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});
		},

		onFileSelected(event){
			this.image_status = false;
			this.spinner_status = true;
			console.log(event);
			const selectedFile=event.target.files[0];
			console.log("*AWS EC2 CALL - SAVE FILE IN S3, FILE:*");
			console.log(selectedFile);


			uploadImage(selectedFile)
			.then((res) => res.json())
					.then(async (data) => {
						console.log("*RETURNED IMAGE URL WITH TEXT ANALYSIS:*");
						console.log(data);
						this.url = data['url'];
						this.confidence = Number(data['confidence']);
						this.confidence = String(Math.round(this.confidence * 100) / 100)+" "+"%"
						this.text_detected = data['text_detected'];
						this.uploadStatus = true;
						this.spinner_status = false;
						this.image_status = true;

		



					})			



		},
		savePredictions(){
			let preparedData = JSON.stringify(this.$store.state.preparedData);
			const predictedPrice = String(this.$store.state.predictedPrice);
			const price = Number(predictedPrice)
			const formatted_price = String(Math.round((price + Number.EPSILON) * 100) / 100);
			console.log(formatted_price);


			const user_id = this.$store.state.user.uid;


			preparedData = JSON.parse(preparedData);
			preparedData["confidence"] = this.confidence;
			preparedData["text_detected"] = this.text_detected;
			preparedData["user_id"] = user_id;
			preparedData["image_url"] = this.url;
			preparedData["predicted_price"] = formatted_price;
		

			console.log("*AWS EC2 CALL - SAVE DATA TO DynamoDB:*");
			console.log(preparedData);

			savePredictions(preparedData).then(()=>{
				this.$router.push({ name: "PredictionsHistory" });
			});
			



		},
		onUpload(){
			document.getElementById("fileUpload").click()

		}
			


	},
	watch: {},
};
</script>

<style scoped>
.container-card {
	width: 50%;
}

.inner-card {
	display: flex;
	width: 100%;
	row-gap: 70px;
	align-items: center;
	margin-bottom: 20px;
}

.subtitle {
	text-align: center;
}

.input-field {
	font-size: 25px;
	cursor: text;
}

.icon {
	position: static;
	display: flex;
	height: 20px;
	width: 20px;
	background: gray;
	padding: 1px 1px;
	border-radius: 100%;
	margin-right: 20px;
	border: solid 1px white;
}

.submitbtn {
	display: flex;
	text-decoration: none;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	
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
