<template>
    <div class="w3-sidebar w3-bar-block w3-dark-grey " style="width:15%, background-color:#0000FF  ">

        <button class="w3-btn w3-bar-item w3-button w3-large w3-hover-red" @click="goHome()" >
            Home Profile
        </button>

        <button class="w3-btn w3-bar-item w3-button w3-large w3-hover-red" @click="goMessagerie()">
            Messagerie
        </button>

        <button class="w3-btn w3-bar-item w3-button w3-large w3-hover-red" @click="goParametre()" >
            Parametre
        </button>
    </div>
</template>



<script>

export default {
    methods :{
        goMessagerie() {
            this.$router.push("Messagerie");
        },
        goHome() {
            this.$router.push("HomeProfile");
        },
        goParametre(){
            this.$router.push("Parametre");
        }
    }
}
</script>
