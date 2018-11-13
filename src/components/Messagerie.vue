<template>
    <div>
        <Sidebar/>
        <div style="margin-left:18%; margin-right:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
            messagerie
        </button> -->
        <br>
            <form class="w3-container w3-center" @submit.prevent="findEmailTo(emailTo)">  
                <input class="w3-input w3-hover-blue w3-border-blue w3-border w3-round-large" placeholder="Destinataire" type="text" v-model="emailTo">
                <br>
                <button class="w3-btn w3-black w3-hover-red w3-round-large" type="submit"> Find </button>
            </form> 
        

    <!-- affichage des utilisateurs  -->

        <div v-if="yet()" class="w3-padding-large">
            <div v-for="(mec, index) in persons" :key="index">
                <br>
                <div class="w3-left w3-container w3-border-black w3-light-blue w3-cell-row w3-round-large">
                
                <!-- div pour l'utilisateur avec son nom et son email  -->
                <div class="w3-cell">
                    <h2 class="w3-hover-indigo">
                    {{mec.name}}
                    </h2>
                    
                    <h3 class="w3-hover-indigo">
                    {{mec.email}}
                    </h3>
                </div>
                <!-- bouton pour affiché les email envoyé  -->
                <div class="w3-cell w3-hover-blue">
                    <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-border-red w3-round-large" @click="afficheMessageEnvoye(mec.email)" >
                        message sended
                    </button>

                <!-- bouton pour affiché le mail recu  -->
                    <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-border-red w3-round-large" @click="afficheMessageRecu(mec.email)" >
                        message recieved
                    </button>
                    <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-border-red w3-round-large" @click="leChat(mec.email)" >
                        Chat
                    </button>
                    <br>




                </div>
                <div class="w3-cell">
                <!-- bouton pour ecrire de nouveaux mail  -->
                    <textarea type="text" v-model="sms" class="w3-white"/>
                    <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-border-red w3-round-large" @click="newMessage(sms, mec.email)" >
                        nouveau message
                    </button>
                
                
                </div>
                </div>
                <div v-if="yetsec()" class="w3-border-brown">
                    <div v-for="(mes,index) in messages" :key="index" >
                        <h3>
                            {{index}}
                        </h3>
                        <h5>
                            {{mes.text}}
                        </h5>

                    </div>
                </div>
                <br>
            </div>
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
            affmes:false,
            persons: [],
            sms: '',
            messages: []
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
            
        },
        yetsec(){
            return this.affmes;
        },
        changeYetsec(value){
            this.affmes = value
        },

        async afficheMessageRecu(mailamis){
            this.changeYetsec(false);
            console.log("reception");
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("les message recu");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/recevedMessages",
                {emailFrom: ema, emailTo: mailamis},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("return des sms recu: ", datacheck);
            this.messages = datacheck.data.messages;
            this.changeYetsec(true);
            
        },

        async afficheMessageEnvoye(mailamis){
            this.changeYetsec(false);
            console.log("emission");
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("les message envoye");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/sendMessages",
                {emailFrom: ema, emailTo: mailamis},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("return des sms envoye: ", datacheck);
            this.messages = datacheck.data.messages;
            this.changeYetsec(true);

        },

        async newMessage(messa, mailamis){
            console.log("messa ",messa);
            console.log("mailamis", mailamis);

            console.log("new message to", mailamis);
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("envoie de message");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/addMessage",
                {emailFrom: ema, emailTo: mailamis, text: messa },
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("return du back newmessaget: ", datacheck);

        },
        
        async leChat(mailamis){
            console.log("new chat to", mailamis);
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try chat");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/messagesList",
                {emailFrom: ema, emailTo: mailamis},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("return du back chat: ", datacheck);
        }

    }

}
</script>
