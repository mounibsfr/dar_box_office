<template>
    <div>
        <br/>
        <div class="w3-left w3-container w3-light-black w3-cell-row w3-round-large">       
                <!-- div pour l'utilisateur avec son nom et son email  -->
            <div class="w3-cell">
                <h2 class="w3-hover-indigo">
                    {{friend.name}}
                </h2>
                    
                <h3 class="w3-hover-indigo">
                    {{friend.email}}
                </h3>
            </div>

            <!-- bouton pour affiché les messages  -->
            <div class="w3-cell w3-border">
                <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-round-large" @click="afficheMessageEnvoye(friend.email)" >
                    Sended
                </button>
                <br/>
                <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-round-large" @click="afficheMessageRecu(friend.email)" >
                    Recieved
                </button>
                <br/>
                <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-round-large" @click="leChat(friend.email)" >
                    Chat
                </button>
                <br/>
            </div>
            <div class="w3-cell w3-center">
                <br/>
                <!-- bouton pour ecrire de nouveaux mail  -->
                <textarea type="text" v-model="sms" class="w3-white" />
                <br/>
                <button class="w3-btn w3-light-blue w3-hover-blue w3-large w3-border-red w3-round-large" @click="newMessage(sms, friend.email)" >
                    nouveau message
                </button>                
            </div>
            <div v-if="true" class="w3-container w3-border-red">
                <div v-for="(mes,index) in messages" :key="index" >
                    <h3>
                        From: {{mes.emailFrom}}
                        <br/>
                        To {{mes.emailTo}}
                    </h3>
                    <h5>
                        Time: {{mes.datetime}}
                        <br/>
                        texte: {{mes.text}}
                    </h5>
                </div>
            </div>
        </div>
        <br/>
    </div>
</template>


<script>
import axios from "axios";

export default {
    data: function() {
        return {
            sms: '',
            messages: [],
            yetsec: false
        };
    },
    props: ['friend'],
    methods: {
        async afficheMessageRecu(mailamis){
            this.messages = []
            this.changeYetsec();
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
            this.changeYetsec();
            
        },

        async afficheMessageEnvoye(mailamis){
            this.messages = [];
            this.changeYetsec();
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
            this.changeYetsec();

        },

        async leChat(mailamis){
            this.changeYetsec();
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
            this.messages = datacheck.data.messages;
            this.changeYetsec();
        },

        async newMessage(messa, mailamis){
            console.log("messa ",messa);
            console.log("mailamis", mailamis);
            var ema = sessionStorage.getItem("email");
            console.log("ema", ema);
            
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

        changeYetsec(){
            this.yetsec = !this.yetsec
        }
  }
};
</script>