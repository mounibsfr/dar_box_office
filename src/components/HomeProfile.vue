<template>
<div>
    <Sidebar/>
    <div style="margin-left:25%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large" >
            homepage
        </button> -->
        <form class="w3-container w3-card-4" @submit.prevent="envoiRecherche(search)" >
        <p>Recherche de film par:</p>
        <div class="custom-control custom-radio custom-control-inline">
            
            <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('titre')" >
            <label>Titre</label>
            <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('genre')" >
            <label>Genre</label>
            <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('date')" >
            <label>Date</label>
        </div>
        
        <p></p>
        <div class="input-group mb-3">
            <div class="input-group-prepend w3-center">
                <div v-if="getrChoix() === 'titre'" class="w3-center">
                    <input type="text" class="form-control w3-center" aria-label="Text input with dropdown button" placeholder="Search" v-model="search">
                </div>
                <button class="btn btn-outline-secondary dropdown-toggle w3-hover-red w3-center" v-if="getrChoix() === 'genre'" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Genre</button>
                    <div class="dropdown-menu">
                    <a class="dropdown-item w3-hover-red" href="#" @click="ceGenre('action')" >Action</a>
                    <a class="dropdown-item w3-hover-red" href="#" @click="ceGenre('biopic')" >Biopic</a>
                    <a class="dropdown-item w3-hover-red" href="#" @click="ceGenre('guerre')" >Guerre</a>
                    <div role="separator" class="dropdown-divider"/>
                    <a class="dropdown-item w3-hover-orange" href="#" @click="ceGenre('animation')">Animation</a>
                    </div>
                </div>
                <div v-if="getrChoix() === 'date'">

                </div>
            </div>
            <div class="input-group-append w3-center">
                <button class="btn btn-outline-secondary w3-hover-red w3-center" type="submit" >GO</button>
                <button class="btn btn-outline-secondary w3-hover-red w3-center" type="button" @click="getMoviesRandom()" >Just Give me Movies PLEASE !!!!!</button>
            </div>
        </form>
    </div>
</div>
</template>


<script>
import Sidebar from "./SideBar";
import axios from "axios";

export default {
    name: "HomeProfile",
    components: {Sidebar},
    data: function() {
        return {
        choix: '',
        genre: "titre",
        search: ''
        
        };
    },
    methods: {
        choisiRecherche(value) {
            this.choix = value;
            console.log(this.choix);
        },
        getrChoix(){
            return this.choix;
        },
        ceGenre(value){
            this.genre = value;
            console.log(this.genre);
            
        },

        async rechercheByTitre(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try titre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByTitle",
                { email: ema, title: this.search}
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
            console.log("title movie result: " + datacheck);
            
        },

        async rechercheByGenre(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try genre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByGenre",
                {email: ema, genre: this.search}
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
            console.log("genre movie result: " + datacheck);
        },

        async rechercheByRandom(){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try genre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesRandom",
                {email: ema},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                    }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("random result: " + datacheck);
        },

        async rechercheByDate(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try genre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByReleasedDate",
                {email: ema, genre: this.search},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("date movie result: " + datacheck);
        },

        envoiRecherche(search){
            console.log(this.choix);
            console.log(this.search);
            if(this.choix === 'titre' ){
                console.log("recherche par titre");
                rechercheByTitre(search)
            }else{
                if (this.choix === 'genre') {
                    console.log("recherche par genre");
                    rechercheByGenre(search)
                } else {
                    if (this.choix === 'date'){
                        console.log("recherche par date");
                        rechercheByDate(search)
                    }else{
                    console.log("recherche par preference d'utilisateur");
                    rechercheByRandom()
                    }
                }
            }   
        }
    }
    
}
</script>
