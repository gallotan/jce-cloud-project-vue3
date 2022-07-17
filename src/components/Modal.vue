<template>
    <div class="modal">
        <div class="modal-content inner-card">
            <p class="message">{{ this.modalMessage }}</p>
            <button @click="closeModal" class="submitbtn">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["modalMessage"],
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
    },
};
</script>

<style lang="scss" scoped>
.modal{
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);

    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 8px;
        width: 400px;
        padding: 40px 20px 20px;
        background-color: #fff;

    p{
        text-align: center;
    }

    button {
        align-self: center;
    }
  }
}




</style>

