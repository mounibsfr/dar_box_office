<template>
    <div>
        <Sidebar/>
        <div style="margin-left:18%; margin-right:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
            messagerie
        </button> -->
        <br>
            <form class="w3-container w3-center" @submit.prevent="findEmailTo(emailTo)">  
                <input class="w3-input w3-hover-blue w3-border-blue w3-border " placeholder="Destinataire" type="text" v-model="emailTo">
                <br>
                <button class="w3-btn w3-black w3-hover-red" type="submit"> Find </button>
            </form> 
        </div>

    <!-- affichage des utilisateurs  -->

        <div v-if="yet()" class="w3-padding-large">
            <div v-for="mec in persons" :key="mec">
                <h2>
                    {{mec}}
                </h2>
                

            </div>
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
            emailTo:'',
            done: false,
            persons: []
        }
    },
    methods: {
        async findEmailTo(value){
            console.log(value);
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try find user");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/findOtherUser",
                {email: ema, friend: value},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("user search result: ", datacheck);
            if(datacheck.data.success){
            this.changeYet(true);
            this.persons = datacheck.data.users
            }
            
            //on affiche les gens retourner
        },
        yet(){
            return this.done;
        },
        changeYet(value){
            this.done = value;
            console.log("done is ", this.done);
            
        }

    }

}
</script>
