<template>
  <div class="cont_principal">
  <div class="cont_centrar">
  <div class="cont_login">
    <form action="">
    <div class="cont_tabs_login">
      <ul class='ul_tabs'>
        <li class="active">
          <button @click.prevent="changePage('login')">SIGN IN</button>
          <span class="linea_bajo_nom"></span>
        </li>
        <li>
          <button  @click.prevent="changePage('inscription')">SIGN UP</button>
          <span class="linea_bajo_nom"></span>
        </li>
      </ul>
    </div>
      <div class="cont_text_inputs">
          <input type="text" class="input_form_sign" v-if="page === 'inscription'" placeholder="NAME" v-model="name" name="name_us" />
          <input type="text" class="input_form_sign d_block active_inp" placeholder="EMAIL" v-model="email" name="emauil_us" />
          <input type="password" class="input_form_sign d_block  active_inp" placeholder="PASSWORD" v-model="password" name="pass_us" />  
          <input type="password" class="input_form_sign" v-if="page === 'inscription'" placeholder="CONFIRM PASSWORD" v-model="confipass" name="conf_pass_us" />
          <div class="terms_and_cons d_none">
          <!-- <p><input type="checkbox" name="terms_and_cons" /> <label for="terms_and_cons">Accept  Terms and Conditions.</label></p> -->
        </div>
      </div>
      <div class="cont_btn">
        <button class="btn_sign" @click.prevent="envoie(name,email,password,confipass)">SUBMIT</button>
      </div>
    </form>
    </div>  
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      page: 'login',
      test: 'test',
      name: '',
      email: '',
      password: '',
      confipass: '',
    }
  },
  props: {
    msg: String
  },
  methods:{
    changePage(value) {
      console.log(value);
      this.page = value;
    },
    async envoie(name,email,password,confipass){
      if(this.page === 'login'){
        console.log(this.email);
        console.log(this.password);
        
        const datacheck = await axios.post('url_darouna',
          {email: this.email, password: this.password},
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        );
      }else{
        console.log(name);
        console.log(this.email);
        console.log(this.password);
        console.log(this.confipass);
        if(this.password != this.confipass){
          this.name = '';
          this.email = '';
          this.password = '';
          this.confipass = ''
        }else{
        const datacheckk = await this.$http.post('url_darouna',
         {name: this.name, email: this.email, password: this.password},
         {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
        }
        if (this.page === 'login') {
          console.log(datachek);

          if(JSON.parse(datacheck.data).success){
            sessionStorage.setItem("email",email)
            this.$router.push('HomeProfile')
          }
        } else {
          if(JSON.parse(datacheck.data).success){
            this.$router.push('HomeProfile')
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
