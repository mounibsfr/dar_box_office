  <template>
    <div class="cont_principal">
    <div class="cont_centrar">
    <div class="cont_login">
      <form @submit.prevent="envoie(name,email,password,confipass)">
      <div class="cont_tabs_login">
        <ul class='ul_tabs'>
          <li class="active">
            <button class="btn btn-info" @click.prevent="changePage('login')">SIGN IN</button>
            <span class="linea_bajo_nom"></span>
          </li>
          <li>
            <button class="btn btn-info" @click.prevent="changePage('inscription')">SIGN UP</button>
            <span class="linea_bajo_nom"></span>
          </li>
        </ul>
      </div>
        <div class="cont_text_inputs">
            <input type="text" class="form-control" v-if="page === 'inscription'" placeholder="NAME" v-model="name" name="name_us" />
            <input type="text" class="input_form_sign d_block active_inp" placeholder="EMAIL" v-model="email" name="emauil_us" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            <input type="password" class="input_form_sign d_block  active_inp" placeholder="PASSWORD" v-model="password" name="pass_us" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />  
            <input type="password" class="form-control" v-if="page === 'inscription'" placeholder="CONFIRM PASSWORD" v-model="confipass" name="conf_pass_us" />
            <div class="terms_and_cons d_none">
            <!-- <p><input type="checkbox" name="terms_and_cons" /> <label for="terms_and_cons">Accept  Terms and Conditions.</label></p> -->
          </div>
        </div>
        <div class="cont_btn">
          <button class="btn_sign" >SUBMIT</button>
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
        this.page = value;
      },
      async envoie(name,email,password,confipass){
        let datacheck;
        if(this.page === 'login'){
          try {
            datacheck = await axios.post('https://darboxoffice.herokuapp.com/login',
            {email: this.email, password: this.password},
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          );
          console.log("dtc signin: " , datacheck);
          } catch (error) {
            console.log("errror  : ", error);
          }
        }else{
          if(this.password != this.confipass){
            this.name = '';
            this.email = '';
            this.password = '';
            this.confipass = ''
          }else{
            try{
          datacheck = await axios.post('https://darboxoffice.herokuapp.com/signUp',
            {name: this.name, email: this.email, password: this.password},
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
            );
            console.log("dtc singup : " , datacheck);
            } catch (error){
            console.log(error);
          }
          }
        }
        const success = datacheck.data.success;
          if (this.page === 'login') {
            
            console.log(datacheck.data.success);
            // console.log(JSON.parse(datacheck.data).success);
            if(success){
              sessionStorage.setItem("email",email);
              this.$router.push('HomeProfile')
            }
          } else {
            if(success){
              sessionStorage.setItem("email",email);
              this.$router.push('HomeProfile')
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
