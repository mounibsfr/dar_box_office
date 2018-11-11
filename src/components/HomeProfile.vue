<template>
<div >
    <Sidebar/>
    <div style="margin-left:25%;  margin-right:5%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large" >
            homepage
        </button> -->
        <form class="w3-container w3-center w3-card-4" @submit.prevent="envoiRecherche(search)" v-if="!yet()" >
            <p style="margin-top:1%">Recherche de film par:</p>
            <div class="custom-control custom-radio custom-control-inline">
                <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('keyword'); emptySearch()" checked>
                <label>KeyWord</label>
                <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('titre'); emptySearch()" >
                <label>Titre</label>
                <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('genre'); emptySearch()" >
                <label>Genre</label>
                <input class="w3-radio" type="radio" name="kind" @click="choisiRecherche('date'); emptySearch()" >
                <label>Date</label>
            </div>
        
            <p></p>
            <div class="input-group mb-3 w3-center">
                <div class="input-group-prepend w3-center">
                    <div class="w3-center">
                    <input type="text" class="form-control w3-center" v-if="getrChoix() === 'titre'" aria-label="Text input with dropdown button" placeholder="Search" v-model="search">
                    <input type="text" class="form-control w3-center" v-if="getrChoix() === 'keyword'" aria-label="Text input with dropdown button" placeholder="Keyword" v-model="search">
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
                <div v-if="getrChoix() === 'date'" class="w3-center" >
                    <input type="text" class="form-control w3-center" aria-label="Text input with dropdown button" placeholder="Date" v-model="search">
                </div>
            </div>
            <div class="input-group-append w3-center">
                <button class="w3-btn w3-hover-red w3-center" type="submit" @click="changelook(true)" >GO</button>
                <button class="w3-btn w3-hover-red w3-center" type="button" @click="rechercheByRandom(); changelook(true); emptySearch()" >Just Give me Movies PLEASE !!!!!</button>
            </div>
        </form>

        <!-- /* 
        ici nous affichons les resultats de la recherche
        */ -->

        <div v-if="yet()">
            <button @click="changelook(false); emptySearch()" class="w3-xxlarge w3-amber w3-hover-red w3-round-xlarge w3-btn">Nouvelle recherche</button>
            <div>
                <ul class="w3-ul">
                    <li v-for="movie in movies">
                        <div role="separator" class="w3-panel w3-card-4 w3-pale-blue w3-round-xlarge w3-xlarge w3-serif ">
                        <br/><h2>
                        titre : </h2>
                        {{movie.title}}
                        <h2>
                        Id : </h2>
                        {{movie.id}}
                        <br/><h2>
                        poster path : </h2>
                        {{movie.poster_path}}
                        <br/><h2>
                        overview : </h2>
                        {{movie.overview}}
                        <br/><h2>
                        langue : </h2>
                        {{movie.original_language}}
                        <br/><h2>
                        titre original : </h2>
                        {{movie.original_title}}
                        <br/><h2>
                        date de sortie : </h2>
                        {{movie.release_date}}
                        <br/><h2>
                        nombre de votant</h2>
                        {{movie.vote_count}}
                        <br/><h2>
                        moyenne vote : </h2>
                        {{movie.vote_average}}
                        <br/><h2>
                        popularité : </h2>
                        {{movie.popularity}}
                        <br/><h2>
                        image : </h2>
                        <img src='getPicMovie(movie)' class="w3-round" >
                        </div>
                      </li>
                </ul>
            </div>


        </div>

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
        choix: "keyword",
        genre: '',
        search: '',
        rechercheEffectue: false,
        movies: []
        
        };
    },
    methods: {
        yet(){
            return this.rechercheEffectue;
        },
        changelook(value){
            this.rechercheEffectue = value;
        },
        choisiRecherche(value) {
            this.choix = value;
            /* console.log(this.choix); */
        },
        emptySearch(){
            this.search = '';
        },
        getrChoix(){
            return this.choix;
        },
        ceGenre(value){
            this.genre = value;
            // console.log(this.genre);
        },
        getPicMovie(value){
            var src = "https://image.tmdb.org/t/p/w500";
            src += value.poster_path;
            return src;
        },

        async rechercheByTitre(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try titre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByTitle",
                { email: ema, title: search}
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
            console.log("title movie result: ", datacheck);
            this.afficheFilmRecu(datacheck)
        },

        async rechercheByGenre(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try genre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByGenre",
                {email: ema, genre: search}
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
            console.log("genre movie result: ", datacheck);
            this.afficheFilmRecu(datacheck)
        },

        async rechercheByRandom(){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try random");
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
            console.log("random result: ", datacheck);
            this.afficheFilmRecu(datacheck)
        },

        async rechercheByDate(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try genre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByReleasedDate",
                {email: ema, genre: search},
                {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
            );   
            } catch (error) {
                console.log(error);
            }
            console.log("date movie result: ", datacheck);
            this.afficheFilmRecu(datacheck)
        },

        async rechercheByKeyword(search){
            var ema = sessionStorage.getItem("email");
            let datacheck
            try {
                console.log("try titre");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByKeyWord",
                { email: ema, keyword: search}
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
            console.log("keyword movie result: ", datacheck);
            this.afficheFilmRecu(datacheck)
        },

        envoiRecherche(search){
            console.log(this.choix);
            console.log(this.search);
            if(this.choix === 'titre' ){
                console.log("recherche par titre", this.search);
                this.rechercheByTitre(search)
            }else{
                if (this.choix === 'genre') {
                    console.log("recherche par genre: ", this.genre);
                    this.rechercheByGenre(this.genre)
                } else {
                    if (this.choix === 'date'){
                        console.log("recherche par date", this.search);
                        this.rechercheByDate(search)
                    }else{
                    console.log("recherche par keyword", this.search);
                    this.rechercheByKeyword(search)
                    }
                }
            }   
        },

        afficheFilmRecu(value){
            console.log("affichage de film", this.search);
            const success = value.data.success;
            if(success){
                this.movies = value.data.movies.results;
                console.log(this.movies);
            }else{
                console.log("No movie find!!!!!!!!");
                
            }
            
        }
    }
    
}
</script>
