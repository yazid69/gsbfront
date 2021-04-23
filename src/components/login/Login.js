import React from 'react'
import './login.css'
import {withRouter} from 'react-router-dom'
import {getToken } from '../../api/auth'

class Login extends React.Component {
    constructor(props) {
        super(props)

    }

    handleChange (e) {
        let{name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    
    async login() {
        let  {decoded, token} = await getToken({login: this.state.login, password: this.state.password})
        if(decoded){
        console.log(decoded)
        console.log(this.state.password, this.state.login)
        localStorage.setItem('id', decoded.id)
        localStorage.setItem('token', token)
        this.props.history.push('/bills')
    }
}

    render () {
        return (
            <main class="form-signin">

                <img class="mb-4" src="" alt="" width="72" height="57" />
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <label for="inputEmail" class="visually-hidden">Login</label>
                <input name="login" class="form-control" placeholder="Login" onChange ={(e) => this.handleChange(e)} />
                <label for="inputPassword" class="visually-hidden">Password</label>
                <input name="password" type="password" class="form-control" placeholder="Password" onChange ={(e) => this.handleChange(e)} />

                <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={() => this.login()}>Sign in</button>

            </main>
        )
    }
}

export default withRouter(Login);




/*import './Login.css'
import React, {Component} from 'react'
import logogsb from '../../login/LogoGsb.png'
import {withRouter } from "react-router-dom";



import Modal from 'react-bootstrap4-modal'
import * as fromBillsApi from '../../api/bills'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        login:'',
        mdp:'',
        visible:false
      }




    }

    handleChange(e){
     e.preventDefault()
      let name = e.target.name
      this.setState({
          [name]: e.target.value
      })
     
  }

  ShowModal(){
    this.setState({
        visible : !this.state.visible
    })
    
}
 async login(){
  
    let user= await fromUserApi.postUser({login:this.state.login, mdp:this.state.mdp})
    console.log(user)
    
    if(user.status=='abcde'){
      localStorage.setItem('token','abcde')
      this.props.history.push("/accueil");
    }else {
      this.setState({
        visible : !this.state.visible
    })
    }
  }


    render(){
    return (
      
      <div className="container-fluid">
          <div className="row no-gutter">
             
              <div className="col-md-6 d-none d-md-flex bg-image"><img className="logogsb" src={logogsb}></img></div>
              
              <div className="col-md-6 bg-light">
                  <div className="login d-flex align-items-center py-5">
                     
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-10 col-xl-7 mx-auto">
                                  <h3 className="display-4">Connexion</h3>
                                  <p className="text-muted mb-4">Votre espace utilisateur</p>
                                 
                                      <div className="form-group mb-3">
                                          <input id="inputEmail" type="email" name="login" placeholder="Email address" required="" value={this.state.login} onChange={(e) => this.handleChange(e)} autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div className="form-group mb-3">
                                          <input id="inputPassword" type="password" placeholder="Password" name="mdp" value={this.state.mdp} onChange={(e) => this.handleChange(e)} required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                      </div>
                                      <div className="custom-control custom-checkbox mb-3">
                                          <input id="customCheck1" type="checkbox" className="custom-control-input" />
                                          <label for="customCheck1" className="custom-control-label">Remember password</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={() => this.login()}>Sign in</button>
                                     
                                  
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Modal visible={this.state.visible} dialogClassName="modal-80w font-size modal-dialog-scrollable alertModal" onClickBackdrop={() => this.ShowModal()}>
          <div className="modal-body alert">
            Login ou mot de passe incorrect ! 
            
          </div>
          </Modal>
      </div>
   
        )
}
}
export default withRouter(Login);*/

