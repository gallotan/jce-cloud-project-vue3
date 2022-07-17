
<template>




<TableData :columns="columns" :entries="entries" /> 




	
</template>

<script>
import { getPredictions } from "../utils/api";
import TableData from '../components/table/TableData.vue'


export default {
	name: "PredictionsHistory",
	


	components: {
		TableData
		
	},
	data() {
		return {
		columns: [
			{ name: 'manufacturer', text: 'Manufacturer'},
			{ name: 'model', text: 'Model'},
			{ name: 'transmission', text: 'Transmission'},
			{ name: 'year', text: 'Year'},
			{ name: 'condition', text: 'Condition'},
			{ name: 'odometer', text: 'Mileage'},
			{ name: 'cylinder', text: 'Cylinder'},
			{ name: 'drive', text: 'Drive'},
			{ name: 'fuel', text: 'Fuel'},
			{ name: 'color', text: 'Color'},
			{ name: 'predicted_price', text: 'Price Predicrion'},
			{ name: 'image_url', text: 'Photo'},
			{ name: 'plate_text', text: 'Plate Number'},




		],
		entries: []
		};

	},
	created() {
		this.getData().then(res =>{
			console.log("*RETURNED DATA:*");
			console.log(res);


			this.entries = res;
		})
	
		
		

	},

	mounted() {
		
	},
	methods: {
		async getData() {
			const user_id = this.$store.state.user.uid;
			console.log("*AWS EC2 CALL - GET PREDICTIONS DATA FROM DynamoDB:*");

			const response = await getPredictions(user_id);
		

			
			return response.json();
		}
	
		

		
			


	},
	watch: {},
};
</script>

<style scoped>
.container-card {
	width: 85%;
	height: 100%;
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
