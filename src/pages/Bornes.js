import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faChargingStation, faEuroSign } from '@fortawesome/free-solid-svg-icons';

const PATH_BASE   = 'https://bornes-irve.philnoug.com';
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

    if (value.length > 3) {
        // Lire la liste des bornes à proximité de la ville saisie
        this.fetchBornesData(value);
    }
  }

  componentDidMount() {
    // Afficher la liste au chargement de la page 
    this.fetchBornesData(this.state.currentLocation);
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
                    <form>
                        <input
                            type="text"
                            onChange={ this.onLocationChange }
                            value={ currentLocation }
                            size="8"
                        />  
                    </form> 
                </h1>

                { error && 
                    <h3>Pas de réseau :/</h3>  
                }

            </div>

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
                          Liste limitée à { result.length } bornes dans un rayon de 20 kms
                      </div>
                  </div>
                </span> 
            }
          </div>
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
              <a href={ `${PATH_BASE}/bornes/${ item.id }` } rel="noopener noreferrer">
                { item.n_station }
              </a>
              <br />
              <small>
                ~ { item.distance | 0 } km
              </small>
          </td>
          <td>
              <FontAwesomeIcon icon={ faChargingStation } style={{ marginRight: 10 }} />
              { parseInt(item.puiss_max) | 0 } kWh
              <br />  

              <FontAwesomeIcon icon={ faPlug } style={{ marginRight: 10 }} />
              { item.type_prise }
              <br /> 

              <FontAwesomeIcon icon={ faEuroSign } style={{ marginRight: 10 }} />
              { item.acces_recharge }
          </td>
        </tr>
      )}
    </tbody>
  </table>

export default Bornes;
