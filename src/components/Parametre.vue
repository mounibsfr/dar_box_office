<template>
    <div>
        <Sidebar/>
        <div style="margin-left:15%; margin-right:15%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
           T'es dans parametre et c'est ce que je dois modifié
        </button> -->
        

        <form class="w3-dropdown-hover" @click.prevent="sendPreference(prefe)" style="margin-top:3%">
            <button class="w3-button w3-hover-orange ">Choose your new preference</button>
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
        <div class="w3-center"> 
            <h2>Your preference are:</h2>
            
            <ul>
                <li v-for="(pre, index) in listPref" :key="index">
                    <h3>
                        {{pre}}
                    </h3>
                </li>
            </ul>
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
            listPref: []
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
            
        }
    }
}
</script>
