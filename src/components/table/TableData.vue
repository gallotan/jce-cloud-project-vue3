<template>
	<div class="container-card">
		<div class="inner-card">
			<h1 class="title">Predictions History</h1>

        <table class="table" style="table-layout: fixed; max-width: 1500px; min-width: 1400px;  ">
        <thead>
            <tr>
            <th v-for="(th, idx) in tableHeader" :key="idx" scope="col">{{th.text}}</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="(td, idx)  in tableData" :key="idx" scope="row">
            <td>{{td.manufacturer}}</td>
            <td>{{td.model}}</td>
            <td>{{td.transmission}}</td>
            <td>{{td.year}}</td>
            <td>{{td.condition}}</td>
            <td>{{td.odometer}}</td>
            <td>{{td.cylinders}}</td>
            <td>{{td.drive}}</td>
            <td>{{td.fuel}}</td>
            <td>{{td.paint_color}}</td>
            <td>{{td.predicted_price}}</td>
            <td>
            <div style="width:100px;">
			<img style="width:100px;border: 2px solid #ffffff;" v-bind:src="td.image_url" >
			</div > 
            </td>
            <td>{{td.text_detected}}</td>



            </tr>
            
        </tbody>
        </table>





		</div>
	</div>
    
</template>




<script>
export default {
    name: 'TableData',
    props: {
        columns: Array,
        entries: Array
    },
    data() {
		return {
		spinner_status: true,
        table_status: true,
		};

	},
    computed: {
        tableHeader(){

            return this.columns || []
        },
        tableData(){
       
            return this.entries || []
        }
        
    }

}

</script>


<style scoped>

.container-card {
	width: 100%;
}

.td_size {    
  width:100px; 
  height:20px;
  max-width:100px;
  min-width:100px; 
  max-height:20px; 
  min-height:20px;
}

.inner-card {
	display: flex;
	width: 100%;
	row-gap: 70px;
	align-items: center;
	margin-bottom: 20px;
}
@media (max-width: 1500px) {
	.container-card {
		width: 100%;
	}
}

@media (max-width: 640px) {
	.container-card {
		width: 100%;
		margin-top: 0;
	}
}

</style>

