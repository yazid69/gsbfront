import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from 'react-bootstrap4-modal'
class BillsList extends React.Component {


  constructor(props){
    super(props)

	this.state = {
	bills : [],
	visible: false,
	rows:[],
    nightsQty :0 ,
    repasQty :0 ,
    klmQty : 0

	}
  }

  async componentDidMount() {
    let bills = await fromBillsApi.getBills()
    this.setState({ bills: bills.result }, () => console.log(this.state))
}

  handleChange(e) {
      e.preventDefault()
      let name = e.target.name
      this.setState ({
          [name]: e.target.value
      }, () => console.log(this.state))
  }
  
  handleRowsChange(e, i) {
      e.preventDefault()
      console.log(e)
      console.log(e.target)
      let { name, value} = e.target
      let rows = [...this.state.rows]
      rows[i] = {
          ...rows[i],
          [name]: value
      }
      this.setState({
          rows:rows
      }, () => console.log(this.state.rows))
  }

  
 /* async componentDidMount(){
      let bills = await fromBillsApi.getBills()
      this.setState({ bills: bills.result }, () => console.log(this.state))

}*/

showModal() {
	this.setState({ // setState pour modifier
		visible : !this.state.visible   // state pour afficher
	})
}

addRow() {
	this.setState({
		rows: [this.state.rows, {name: '', date:'', qty: '', file: ''}]
	})
}

removeRow(i){
	console.log(i)
	let newRows = this.state.rows
	newRows.splice(i,1)
	this.setState({
		rows:newRows
	})
}

render () {
    return (
            
            <main class="flex-shrink-0">
                <div class="container">
                <h1 class="mt-5">Bienvenue sur votre espace personnel</h1>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Mois</th>
                            <th>Justificatifs</th>
                            <th>Montant</th>
                            <th>Date de modification</th>
                            <th>Etat</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
        this.state.bills.map((bill, i) =>{
            return(
                <tr>
        <th scope="row">1</th>
        <td>{bill.mois}</td>
        <td>{bill.nbJustificatifs}</td>
        <td>{bill.montantValide}</td>
        <td>{bill.dateModif}</td>
        <td>{bill.idEtat}</td>
        <td><button type="button" class="btn btn-info btn-sm"  onClick={this.ShowModal}> <img src="edit.png" alt=""/></button>

            </td>
        </tr>
            )
        })
        }
        <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>


        <td> <button type="button" class="btn btn-info">Modifier</button></td>
        <td><button onClick = {() => this.showModal()}>modifier</button></td>
        <td><button type="button" class="btn btn-info btn-sm"  onClick={this.ShowModal}> <img src="edit.png" alt=""/>MODIFIER</button>

            </td>

 
        </tr>
        <tr>
	 <td> </td>
	 <td> </td>
	 <td> </td>
	 <td> </td>
	 <td> </td>
	 <td> <button type="button" class="btn btn-info">Ajouter</button></td>
	 </tr>
	 <tr>
		 <td> </td>
		 <td> </td>
		 <td> </td>
		 <td> </td>
		 <td> </td>
		 <td> <button type="button" class="btn btn-info">Supprimer</button> </td>
		 </tr>
		 </tbody>
		 </table>
                    <Modal dialogClassName="ok" visible={this.state.visible} onClickBackdrop={() => this.showModal()}>
                        <div className="modal-header">
                            <h5 className="modal-title">Red Alert!</h5>
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
                                            <td><input className="form-control form-control-sm" type="text" name="nightsQty" placeholder="Qte" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)}  /></td>
                                            <td>80€</td>
                                            <td>{this.state.nightsQty * 80}€</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Repas</th>
                                            <td><input className="form-control form-control-sm" type="text" name="repasQty" placeholder="Qte" value={this.state.repasQty} onChange={(e) => this.handleChange(e)}  /></td>
                                            <td>29€</td>
                                            <td>{this.state.repasQty * 29}€</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kilométrage</th>
                                            <td><input className="form-control form-control-sm" type="text" name="klmQty" placeholder="Qte" value={this.state.klmQty} onChange={(e) => this.handleChange(e)}  /></td>
                                            <td>0.8€</td>
                                            <td>{this.state.klmQty * 0.8}€</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
								<div className="col-12">
									<div className="fraishorsforfait">
										<h3>Frais hors forfait</h3>
										<button className="btn btn-info" onClick={() => this.addRow()}> Ajouter frais hors forfait</button>
										</div>
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
											this.state.rows.map((r, i) => {
												return (
													<tr key={i}>
												
                                            <th scope="row"><input type ='date' name="date" value={this.state.rows[i].date} onChange={(e) => this.handleRowsChange(e, i)} /></th>
                                            <td><input className="form-control form-control-sm" type="text" placeholder="Libelle" value={this.state.rows[i].libelle} onChange={(e) => this.handleRowsChange(e,i)} /></td>
                                            <td><input type="text" placeholder ="Libelle" name= "price" value={this.state.rows[i].price} onChange= {(e) => this.handleChange(e, i)}/></td>
											<td><input type ="file" /></td>
											<td><button className="btn btn-danger btn-sm" onClick={() => this.removeRow(i)}></button></td>
                                        </tr>
                                                )
                                                })
                                                }
										</tbody>

                                </table>
                            </div>
                            <p></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.onFirePhasers}>
                                Enregistrer
                             </button>
                            <button type="button" className="btn btn-secondary"onClick={() => this.showModal()} >
                                Annuler
                           </button>
                        </div>
                    </Modal>
                </div>

            </main>

      
  
    )
  }
}

export default BillsList;
