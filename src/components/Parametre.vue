<template>
    <div>
        <Sidebar/>
        <div style="margin-left:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large">
           T'es dans parametre et c'est ce que je dois modifié
        </button> -->
        

        <form class="w3-dropdown-hover" @click="sendPreference(pref)" style="margin-top:3%">
            <button class="w3-button w3-hover-orange ">Choose your new preference</button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('action')" >Action</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('biopic')" >Biopic</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('comedy')" >Comedy</a>
                <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="setPref('drama')" >Drama</a>
                <div class="dropdown-divider"></div>
                <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="setPref('Animation')" >Animation</a>
            </div>
        </form>
        <br>
        <br>
        <div class="w3-left"> 
            <h2>Your preference are:</h2>
            {{getPreference()}}
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
            pref:'',
            vosPref:'lala land'
        };
    },
    methods: {
        sendPreference(value){
            console.log(value);
        },
        setPref(value){
            this.pref = value
        },
        getPreference(){
            return this.vosPref
        }
    }
}
</script>
