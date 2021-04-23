import React from 'react';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import * as fromBillsApi from '../api/bills'
import Modal from 'react-bootstrap4-modal'
import { Link } from 'react-router-dom'

class CreateBill extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Bills : [],
            rows:[],
            dateHF: "",
            libelle: 0,
            nightsQty :0 ,
            repasQty :0 ,
            klmQty : 0,
            montantHF : 0
    }
}

async postFiche(){
    let klm = await fromBillsApi.postBills({idutilisateur: 'a132' , mois:'202103', idFraisForfait:'KLM', quantite:this.state.klmQty})
    let repas = await fromBillsApi.postBills({idutilisateur: 'a132', mois:'202103', idFraisForfait:'REP', quantite:this.state.repasQty})
    let nigths = await fromBillsApi.postBills({idutilisateur: 'a132', mois:'202103', idFraisForfait:'NUI', quantite:this.state.nightsQty})
    this.state.rows.map(async (f, i) => {
        let horsforfait = await fromBillsApi.postBillsHF({idutilisateur: 'b132', mois:'202004', libelle : f.libelleHF, date: f.date, montant: f.montantHF})

    })
}


  
async componentDidMount() {
  let bills = await fromBillsApi.getBills()
  this.setState({ bills: bills.result }, () => console.log(this.state))
}
ShowModal() {
  this.setState({
      visible: !this.state.visible
  })

}
addRows = () => {
  this.setState({
      rows: [...this.state.rows, { name: '', date: '', qty: '', files: '' }]
  })
}
removeRows = (i) => {
  let newRows = this.state.rows
  newRows.splice(i, 1)
  this.setState({
      rows: newRows
  })
}
handleChange(e) {
  e.preventDefault()
  let name = e.target.name
  this.setState({
      [name]: e.target.value    // [] fonction generique
  }, () => console.log(this.state))
}

handleRowsChange(e, i) {
  e.preventDefault()
  console.log(e)
  console.log(e.target)
  let { name, value } = e.target
  let rows = [...this.state.rows]
  rows[i] = {
      ...rows[i],
      [name]: value
  }
  this.setState({
      rows: rows
  }, () => console.log(this.state.rows))
}


  render(){  
  return (

    <body class="d-flex flex-column h-100">
        <Header />
        <body visible={this.state.visible} dialogClassName="modal-80w font-size center modal-dialog-scrollable">  
                        <div className="modal-header">
                            <h4 className="modal-title">Ajouter Fiche Frais ANNEE / MOIS </h4>
                           
                        </div>
                        <div className="modal-body">
                        <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type</th>
                                            <th scope="col">Qte</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nuitées</th>
                                            <td><input className="form-control form-control-sm" type="text" name='nightsQty' placeholder="Qte" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>80€</td>
                                            <td> {this.state.nightsQty * 80}   </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Repas</th>
                                            <td><input className="form-control form-control-sm" type="text" name='repasQty' placeholder="Qte" value={this.state.repasQty} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>29€</td>
                                            <td> {this.state.repasQty * 29}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kilométrage</th>
                                            <td><input className="form-control form-control-sm" type="text" name='klmQty' placeholder="Qte" value={this.state.klmQty} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>0,8€</td>
                                            <td> {this.state.klmQty * 0.8}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="fraishorsforfait">
                                        <h3>Frais hors forfait</h3>
                                        <button className="btn btn-info" onClick={()=> this.addRows()}>Ajouter frais hors forfait</button>
                                    </div>
                                
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Libelle</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Justificatifs</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                      this.state.rows.map((r, i) =>{
                                          return (
                                            <tr key={i}>
                                            <td><input type="date" /></td>
                                            <td><input type="text" /></td>
                                            <td><input type="number" /></td>
                                            <td> <input type="file" /></td>
                                            <td>
                                                
                                                <button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" onClick={() => this.removeRows(i)}>
                                                    <i className="fas fa-trash"></i>  
                                                </button>


                                            </td>
                                        </tr>
                                          )
                                      })
                                        }
                                    
                                    </tbody>
                                </table>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                        <button className="btn-btn-lg btn-success" onClick={() => this.postFiche()}> Enregistrer</button>
                       </div>
                       
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success">
                                Enregistrer
                            </button>
                            <button type="button" className="btn btn-light" onClick={() => this.ShowModal()}>
                                Annuler
                            </button>
                        </div>
                    </body>


        <Footer/>
    
    
        <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    
          
      </body>
  )
  }
}

export default CreateBill;
