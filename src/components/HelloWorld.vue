<template>
  <div class="cont_principal">
      <form @submit.prevent="envoie(name,email,password,confipass)">
        <div class="form-group">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-lg btn-primary" @click.prevent="changePage('login')">SIGN IN</button>
              <button type="button" class="btn btn-lg btn-primary" @click.prevent="changePage('inscription')">SIGN UP</button>
            </div>
          <p/>
        <div class="form-group">
          <input type="text" 
            class="form-control" 
            v-if="page === 'inscription'" 
            placeholder="NAME" 
            v-model="name" 
            name="name_us" />
        </div>
        <div class="form-group">
          <input type="text" 
            class="form-control" 
            placeholder="EMAIL" 
            v-model="email" 
            name="emauil_us" 
            aria-describedby="inputGroup-sizing-lg" />
        </div>
        <div class="form-group">
          <input type="password" 
            class="form-control" 
            placeholder="PASSWORD" 
            v-model="password" 
            name="pass_us" 
            aria-describedby="inputGroup-sizing-lg" />
        </div>
        <div class="form-group">
          <input type="password" 
            class="form-control" 
            v-if="page === 'inscription'" 
            placeholder="CONFIRM PASSWORD" 
            v-model="confipass" 
            name="conf_pass_us" />
        </div>
        <div>
          <button type="submit" class="btn btn-lg btn-primary btn-block" >SUBMIT</button>
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
<style>
élément {
background-color: #28a745
}
label {

    display: inline-block;
    margin-bottom: .5rem;

}
*, ::after, ::before {

    box-sizing: border-box;

}
.form-signin .checkbox {

    font-weight: 400;

}
.text-center {

    text-align: center !important;

}
body {

    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;

}
:root {

    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;

}
html {

    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;

}
</style>
