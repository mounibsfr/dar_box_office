<template>
<div>
<button class="w3-btn w3-large w3-hover-amber w3-round-large" @click="getCommentsByMovie(filmId)"> Show commentary</button>
    {{commentaries.length}}
    <div v-for="comment in commentaries" :key="comment.author.date">
        <h4>nom du monsieur</h4> -->
         {{comment.author.name}}
            <br/>
            <h5>texte :</h5>
            {{comment.text}}
                        </div>
            <form class="w3-container" @submit.prevent="newMessage(avis, filmId)">
                            <label class="w3-text-blue"><b>Commentaire</b></label>
                            <input class="w3-input w3-border" type="text" v-model="avis">
                            <button class="w3-btn w3-orange w3-hover-blue " type="submit" >Send Commentary</button>
                        </form>  
                        </div>
</template>

<script>
import axios from "axios";

export default {
    data: function() {
        return {
            commentaries: []
        };
    },
  props: ['filmId'],
  methods: {
    async getCommentsByMovie(film) {
      var ema = sessionStorage.getItem("email");
      let datacheck;
      try {
        console.log("try commentary movie ", film.toString());
        datacheck = await axios.post(
          "https://darboxoffice.herokuapp.com/getCommentsByMovie",
          { email: ema, idMovie: film.toString() },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
      console.log("commentary return: ", datacheck.data.comments);
      this.commentaries = datacheck.data.comments;
    },

    async newMessage(avis, film) {
      var ema = sessionStorage.getItem("email");
      let datacheck;
      try {
        console.log("try commentary movie ", film.toString());
        datacheck = await axios.post(
          "https://darboxoffice.herokuapp.com/addCommentary",
          { email: ema, idMovie: film.toString(), text: avis },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
      console.log("commentary return: ", datacheck);
      this.avis = "";
    }
  }
};
</script>
