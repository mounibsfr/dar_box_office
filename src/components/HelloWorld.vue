<template>
  <div class="cont_principal" style="margin-right:20%; margin-left:20%">
    <br>
      <form @submit.prevent="envoie(name,email,password,confipass)">
        <div class="form-group">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="w3-btn btn btn-lg btn-primary w3-animate-fading" @click.prevent="changePage('login')">SIGN IN</button>
              <button type="button" class="w3-btn btn btn-lg btn-primary w3-animate-fading" @click.prevent="changePage('inscription')">SIGN UP</button>
            </div>
          <p/>
        <div class="form-group">
          <input type="text" 
            class="form-control w3-animate-opacity" 
            v-if="page === 'inscription'" 
            placeholder="NAME" 
            v-model="name" 
            name="name_us" />
        </div>
        <div class="form-group">
          <input type="text" 
            class="form-control w3-animate-opacity" 
            placeholder="EMAIL" 
            v-model="email" 
            name="emauil_us" 
            aria-describedby="inputGroup-sizing-lg" />
        </div>
        <div class="form-group">
          <input type="password" 
            class="form-control w3-animate-opacity" 
            placeholder="PASSWORD" 
            v-model="password" 
            name="pass_us" 
            aria-describedby="inputGroup-sizing-lg" />
        </div>
        <div class="form-group">
          <input type="password" 
            class="form-control w3-animate-opacity" 
            v-if="page === 'inscription'" 
            placeholder="CONFIRM PASSWORD" 
            v-model="confipass" 
            name="conf_pass_us" />
        </div>
        <div>
          <button type="submit" class="w3-btn btn-lg btn-primary btn-block" >SUBMIT</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: function() {
    return {
      page: "login",
      test: "test",
      name: "",
      email: "",
      password: "",
      confipass: ""
    };
  },
  props: {
    msg: String
  },
  methods: {
    changePage(value) {
      this.page = value;
    },
    async envoie(name, email, password, confipass) {
      let datacheck
      if (this.page === "login") {
        try {
          datacheck = await axios.post(
            "https://darboxoffice.herokuapp.com/login",
            { email: this.email, password: this.password }
            ,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
          console.log("dtc signin: ", datacheck);
        } catch (error) {
          console.log("errror  : ", error);
        }
      } else {
        if (this.password != this.confipass) {
          this.name = "";
          this.email = "";
          this.password = "";
          this.confipass = "";
        } else {
          try {
            console.log(this.email);
            datacheck = await axios.post(
              "https://darboxoffice.herokuapp.com/signUp",
              { name: this.name, email: this.email, password: this.password }
              ,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              } 
            );
            console.log("dtc singup : ", datacheck);
          } catch (error) {
            console.log(error);
          }
        }
      }
      const success = datacheck.data.success;
      if (this.page === "login") {
        console.log(datacheck.data.success);
        // console.log(JSON.parse(datacheck.data).success);
        if (success) {
          sessionStorage.setItem("email", email);
          this.$router.push("HomeProfile");
        }
      } else {
        if (success) {
          sessionStorage.setItem("email", email);
          this.$router.push("HomeProfile");
        }
      }
    }
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
