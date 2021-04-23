import React from 'react'
import './Header.css';

class Header extends React.Component {

  constructor(props){
    super(props)
  }

  render () {
    return (
       
    
      <header>      
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div class="container-fluid">
            <div class="logo">
            <a href="#"><img src="https://fchevalierblog.files.wordpress.com/2017/04/gsb.png?w=640" height="50" width="50"></img></a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Mes fiches de frais</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/CreateBill">Créer une nouvelle fiche de frais</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Déconnexion</a>
                </li>
              </ul>            
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
