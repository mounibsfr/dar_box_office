<template>
    <div>
        <Sidebar/>
        <div style="margin-left:15%">
        <form class="w3-dropdown-hover" @click.prevent="sendPreference(prefe)" style="margin-top:3%">
            <button class="w3-button w3-hover-orange w3-bar-block">Your preference</button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Action')" >Action</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Adventure')" >Adventure</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Comedy')" >Comedy</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Crime')" >Crime</a>          
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Drama')" >Drama</a>              
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Fantasy')" >Fantasy</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('History')" >History</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Horror')" >Horror</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Music')" >Music</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Mystery')" >Mystery</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Romance')" >Romance</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Science Fiction')" >Science Fiction</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Thriller')" >Thriller</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('War')" >War</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('Western')" >Western</a>
                <div class="dropdown-divider"></div>
                <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="setPref('Animation')" >Animation</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="setPref('Documentary')" >Documentary</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="setPref('Family')" >Family</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="setPref('TV Movie')" >TV Movie</a>
            </div>
        </form>
        <br>
        <br>
        <div class="w3-center"  style="width:80%"> 
            <h2 class="w3-container w3-border w3-border-amber">Your preference are:</h2>
            <ul>
                <li v-for="(pre, index) in listPref" :key="index">
                    <div class="w3-pale-yellow">
                    <h3>
                        {{pre}}
                    </h3>
                    </div>
                </li>
            </ul>
        </div>
        <br/>
        <!--  changer le mot de passe -->
        <div class="w3-form" style="margin-right:10%">
            <form @submit.prevent="envoieNewMdp(password,confipass)">
            <input type="password" 
            class="w3-input w3-border w3-hover-light-blue w3-hover-border-indigo w3-round-large " 
            placeholder="PASSWORD" 
            v-model="password" >
            <input type="password" 
            class="w3-input w3-border w3-hover-light-blue w3-hover-border-indigo w3-round-large " 
            placeholder="CONFIRM PASSWORD" 
            v-model="confipass" >
            <button type="submit" class="w3-hover-blue w3-button w3-btn w3-round-large w3-large">
                Modifier le mot de passe
            </button>
            </form>
            <div class="w3-panel w3-blue w3-display-container" v-if="reussite" >
                <span onclick="this.parentElement.style.display='none'"
                class="w3-button w3-large w3-display-topright">&times;</span>
                    <h3>Info</h3>
                    <p>Reussite de la modification du mot de passe</p>
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
        return {
            prefe:'',
            vosPref: '',
            listPref: [],
            password: '',
            confipass: '',
            reussite: false
        };
    },
    methods: {
        async sendPreference(value){
            console.log(value);
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try parametre");
                console.log(value)
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/addPreference",
                { email: ema, pref: value }
                ,
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("parametre ajoute ", datacheck);
            this.vosPref = datacheck.data.user.preferences;
            this.getHisPreference()

        },
        setPref(value){
            this.prefe = value
        },
        getpref(){
            return this.prefe
        },
        getHisPreference(){
            console.log(this.vosPref);
            
            this.listPref = this.vosPref.trim().split(" ");
            console.log(this.listPref);
        },
        async envoieNewMdp(password,confipass){
            var ema = sessionStorage.getItem("email");
            if (password === confipass) {
            let datacheck
            try {
                console.log("try new mdp");
                console.log(password)
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/changeProfil",
                { email: ema, password: this.confipass }
                ,
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("reussi?");
            if (datacheck.data.success) {
                this.reussite = true;
            }
            
            }
        }
    }
}
</script>
