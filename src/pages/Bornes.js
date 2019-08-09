import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faChargingStation, faEuroSign } from '@fortawesome/free-solid-svg-icons';

const PATH_BASE   = 'https://bornes-irve.philnoug.com';
//const PATH_BASE   = 'http://localhost:3030';

const PATH_SEARCH = '/api/v1/bornes.json';
const PARAM_KEY1  = 'location=';

class Bornes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      loading: false,
      error: false,
      currentLocation: '',
    }

    this.setBornesResult = this.setBornesResult.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.fetchBornesData = this.fetchBornesData.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocationSubmit = this.onLocationSubmit.bind(this);
  }

  setBornesResult(result) {
    if (result.length) {
        this.setState({ result });
    } else {
        this.setState({ result: [] });
    }
  }

  setLoading(isLoading) {
    this.setState({ loading: isLoading })
  }

  fetchBornesData(_location) {

    this.setLoading(true);

    // Liste des bornes à proximité
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_KEY1}${_location}`)
      .then(response => response.json())
      .then(result => this.setBornesResult(result))
      .then(ret => this.setLoading(false))
      .catch(error => this.setState({ error }));
  }

  onLocationChange(event) {
    const value =  event.target.value;
    this.setState({ currentLocation: value });
  }

  onLocationSubmit(event) {
    event.preventDefault();

    // si un chargement de données n'est pas déjà en cours
    if (!this.loading) {
      // Si le nom de la ville fait plus de 3 lettres
      if (this.state.currentLocation.length > 3) {
        // On charge les données
        this.fetchBornesData(this.state.currentLocation);
        
      }
    }
  }

  render() {
    const { result, loading, error, currentLocation} = this.state;

    return (
        <div className="container">
          <br />
          <div className="card">
            <div className="card-header">
                <h1>
                    <small className="text-info">Bornes autour de</small>
                    <form onSubmit={ this.onLocationSubmit }>
                        <input
                            type="text"
                            onChange={ this.onLocationChange }
                            value={ currentLocation }
                            size="8"
                            placeholder="ville ?"
                        />
                    </form> 
                </h1>
            </div>

            { (currentLocation.length === 0) &&
                <span>
                    Entrez le nom d'une ville d'arrivée pour voir 
                    les bornes de recharge à proximité...  
                </span>
            }
            
            { error &&
                <span>Pas de réseau ?!?</span>  
            }

            { (loading && !error) &&
                <div className="colored_div">Chargement...</div>
            }  

            { (!loading && result.length > 0) &&
                <span>
                  <div className="card-body">
                    <ListeBornes 
                        list ={ result }
                    />
                  </div>
        
                  <div className="card-footer">
                    <div className="colored_div">
                        <small>
                          Liste limitée à { result.length } bornes dans un rayon de 20 kms.
                          Cliquez sur le nom d'une borne pour en voir les détails.
                      </small>
                    </div>
                  </div>
                </span> 
            }
          </div>
          <br />
      </div>
    );
  }
}

const ListeBornes = ({ list }) =>
  <table className="table table-condensed">
    <tbody>
      {list.map(item => 
        <tr key={ item.id }>
          <td>
              <small>
                ~ { item.distance | 0 } km
              </small>
              <br />
              <a href={ `${PATH_BASE}/bornes/${ item.id }` } rel="noopener noreferrer">
                { item.n_station }
              </a>
              <br />
              <FontAwesomeIcon icon={ faChargingStation } style={{ marginRight: 5 }} />
              { parseInt(item.puiss_max) | 0 } kWh

              <FontAwesomeIcon icon={ faPlug } style={{ marginLeft: 15, marginRight: 5 }} />
              { item.type_prise }

              <FontAwesomeIcon icon={ faEuroSign } style={{ marginLeft: 15, marginRight: 5 }} />
              { item.acces_recharge }
          </td>
        </tr>
      )}
    </tbody>
  </table>

export default Bornes;
