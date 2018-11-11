<template>
    <div>
        <Sidebar/>
        <div style="margin-left:25%; margin-right:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
            messagerie
        </button> -->
        <br>
            <form class="w3-container" @submit.prevent="findEmailTo(emailTo)">
                
                <input class="w3-input w3-hover-blue" placeholder="Destinataire" type="text" v-model="emailTo">
                <button class="w3-btn w3-black w3-hover-red" type="submit" >Find</button>
            </form> 
        </div>
    </div>
</template>

<script>
import Sidebar from "./SideBar";
import axios from "axios";

export default {
    components: {Sidebar},
    data: function(){
        return{
            emailTo:''
        }
    },
    methods: {
        findEmailTo(value){
            console.log(value);
            
        }

    }

}
</script>
