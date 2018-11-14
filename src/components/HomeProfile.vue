<template>
<div >
    <Sidebar/>
    <div style="margin-left:25%;  margin-right:15%">
        <!-- <button class="w3-btn w3-button w3-hover-red w3-border w3-border-purple w3-round-large" >
            homepage
        </button> -->
        <br>
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
            <div class="mb-3 w3-center">
                <div class="w3-center">
                    <div class="w3-center">
                    <input type="text" class="form-control w3-center" v-if="getrChoix() === 'titre'" aria-label="Text input with dropdown button" placeholder="Search" v-model="search">
                    <input type="text" class="form-control w3-center" v-if="getrChoix() === 'keyword'" aria-label="Text input with dropdown button" placeholder="Keyword" v-model="search">
                    </div>
                    <button class="btn btn-outline-secondary dropdown-toggle w3-hover-red w3-cente" v-if="getrChoix() === 'genre'" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{genre}}</button>
                        <div class="dropdown-menu">
                        <a class="w3-bar-item w3-button w3-btn w3-hover-indigo" @click="ceGenre('Action')" >Action</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-indigo" @click="ceGenre('Adventure')" >Adventure</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-indigo" @click="ceGenre('Comedy')" >Comedy</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-indigo" @click="ceGenre('Crime')" >Crime</a>

                        <div role="separator" class="dropdown-divider"/>

                        <a class="w3-bar-item w3-button w3-btn w3-hover-deep-purple" @click="ceGenre('Drama')" >Drama</a>              
                        <a class="w3-bar-item w3-button w3-btn w3-hover-deep-purple" @click="ceGenre('Fantasy')" >Fantasy</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-deep-purple" @click="ceGenre('History')" >History</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-deep-purple" @click="ceGenre('Horror')" >Horror</a>

                        <div role="separator" class="dropdown-divider"/>

                        <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="ceGenre('Music')" >Music</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="ceGenre('Mystery')" >Mystery</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="ceGenre('Romance')" >Romance</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-purple" @click="ceGenre('Science Fiction')" >Science Fiction</a>
                        
                        <div role="separator" class="dropdown-divider"/>

                        <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="ceGenre('Thriller')" >Thriller</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="ceGenre('War')" >War</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-pink" @click="ceGenre('Western')" >Western</a>
                        
                        <div role="separator" class="dropdown-divider"/>
                        
                        <a class="w3-bar-item w3-button w3-btn w3-hover-aqua" href="#" @click="ceGenre('Animation')">Animation</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-aqua" @click="ceGenre('Documentary')" >Documentary</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-aqua" @click="ceGenre('Family')" >Family</a>
                        <a class="w3-bar-item w3-button w3-btn w3-hover-aqua" @click="ceGenre('TV Movie')" >TV Movie</a>
                        </div>
                </div>
                <div v-if="getrChoix() === 'date'" class="w3-center" >
                    <input type="text" class="form-control w3-center" aria-label="Text input with dropdown button" placeholder="YYYY-MM-DD" v-model="search">
                </div>
            </div>
            <div class="w3-center">
                <button class="w3-btn w3-hover-red w3-center" type="submit" @click="changelook(true)" >Give me the movie I'm looking for</button>
                <button class="w3-btn w3-hover-red w3-center" type="button" @click="rechercheByRandom(); changelook(true)" >Just Give me Movies PLEASE !!!!!</button>
            </div>
        </form>

        <!-- /* 
        ici nous affichons les resultats de la recherche
        */ -->

        <div v-if="yet()">
            <br>
            <button @click="changelook(false); emptySearch()" class="w3-xlarge w3-black w3-hover-red w3-round-large w3-btn">Nouvelle recherche</button>
            <div>
                <ul class="w3-ul">
                    <li v-for="movie in movies" :key="movie.id">
                    <div role="separator" class="w3-panel w3-card-4 w3-deep-orange w3-round-xlarge w3-xlarge w3-serif ">
                        <br/><h2>
                        titre : </h2>
                        {{movie.title}}
                        <!-- <h2>
                        Id : </h2>
                        {{movie.id}}
                        <br/><h2>
                        poster path : </h2>
                        {{movie.poster_path}}
                        <br/><h2>
                        overview : </h2>
                        {{movie.overview}} -->
                        <br/><h4>
                        langue : </h4>
                        {{movie.original_language}}
                        <br/><h4>
                        titre original : </h4>
                        {{movie.original_title}}
                        <br/><h4>
                        date de sortie : </h4>
                        {{movie.release_date}}
                        <br/><h4>
                        nombre de votant</h4>
                        {{movie.vote_count}}
                        <br/><h4>
                        moyenne vote : </h4>
                        {{movie.vote_average}}
                        <br/><h4>
                        popularité : </h4>
                        {{movie.popularity}}
                        <br/><h4>
                        image : </h4>
                        <img :src='getPicMovie(movie)' class="w3-small" >
                        <br/>
                        <br/>
                        
                        <commentaire :filmId="movie.id"/>
                        
                        <br/>
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
import Commentaire from "./Commentaire"
import axios from "axios";

export default {
    name: "HomeProfile",
    components: {Sidebar, Commentaire},
    data: function() {
        return {
            choix: "keyword",
            genre: 'Genre',
            search: '',
            rechercheEffectue: false,
            movies: [],
            commentaries: [],
            avis: ''
        
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
                console.log("try date");
                datacheck = await axios.post(
                "https://darboxoffice.herokuapp.com/getMoviesByReleasedDate",
                {email: ema, release_date: search},
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
                { email: ema, keyWord: search}
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
                this.movies = value.data.movies;
                console.log("movies: ", this.movies);
                this.emptySearch()
            }else{
                console.log("No movie find!!!!!!!!");
            }
            
        },
        afficheFilmRecuR(value){
            console.log("affichage de film", this.search);
            const success = value.data.success;
            if(success){
                this.movies = value.data.movies.results;
                console.log("movies: ", this.movies);
                this.emptySearch()
            }else{
                console.log("No movie find recur!!!!!!!!");
            }
            
        }
    }
    
}
</script>
