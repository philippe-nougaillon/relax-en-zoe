import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faChargingStation, faEuroSign } from '@fortawesome/free-solid-svg-icons';


//const PATH_BASE   = 'http://localhost:3030';
const PATH_BASE   = 'https://bornes-irve.philnoug.com';
const PATH_SEARCH = '/api/v1/bornes.json';
const PARAM_KEY1  = 'location=';
const PARAM_KEY2  = 'kms=';


class Bornes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      kms: 20,
      limit: 10,
      result: [],
      loading: false,
      searchTerm: '',
      error: false,
      currentLocation: '',
    }

    this.setBornesResult = this.setBornesResult.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.fetchBornesData = this.fetchBornesData.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
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

  fetchBornesData(_location, _autonomie) {

    this.setLoading(true);

    // Liste des bornes à proximité
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_KEY1}${_location}&${PARAM_KEY2}${_autonomie}`)
      .then(response => response.json())
      .then(result => this.setBornesResult(result))
      .then(ret => this.setLoading(false))
      .catch(error => this.setState({ error }));
  }

  onLocationChange(event) {
    const value =  event.target.value;
    this.setState({ currentLocation: value });

    if (value && !this.state.loading) {
        // Lire la liste des bornes limitée à la puissance  
        this.fetchBornesData(value, this.state.kms);
    }
  }

  onFilterChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount() {
    // Afficher la liste au chargement de la page 
    this.fetchBornesData(this.state.currentLocation, this.state.kms);
  }

  render() {
    const { result, loading, searchTerm, error, currentLocation, limit, kms } = this.state;

    const isSearched = searchTerm => item =>
              item.ad_station.toLowerCase().includes(searchTerm.toLowerCase()); 

    const bornes = result.filter(isSearched(searchTerm));

    return (
        <div className="container">
          <br />
          <div className="card">
            <div className="card-header">
                <h1>
                    <small className="text-info">Bornes</small>
                    <form>
                    Autour de <input
                            type="text"
                            onChange={ this.onLocationChange }
                            value={ currentLocation }
                            size="6"
                        />  
                    </form> 
                </h1>

                { error && 
                    <h3>Pas de réseau :/</h3>  
                }

                { (!loading && bornes.length > 0) &&
                    <div className="colored_div">
                        Liste limitée à { bornes.length } bornes dans un rayon de { kms | 0 } km
                    </div>
                }
            </div>

            <div className="card-body">
                {  false &&
                  <form>
                      Filtrer: <input
                          type="text"
                          onChange={ this.onFilterChange }
                          value={ searchTerm }
                      />  
                  </form> 
                }

                { (loading && !error) &&
                    <div className="colored_div">Chargement...</div>
                }  

                { (bornes.length > 0 && !loading) &&
                    <span>
                        <br />
                        <ListeBornes 
                            list ={ bornes }
                            limit={ limit }
                        />
                    </span>
                }
            </div>

            <div className="card-footer">
            </div>

          </div>
      </div>
    );
  }
}

const ListeBornes = ({ list }) =>
  <table className="table table-condensed">
    <thead>
      <tr>
        <th>Adresse</th>
        <th>Puissance/Prix</th>
      </tr>
    </thead>
    
    <tbody>
      {list.map(item => 
        <tr key={ item.id }>
          <td>
              <a href={ `${PATH_BASE}/bornes/${ item.id }` } rel="noopener noreferrer">
                { item.n_station }
              </a>
              <br />
              <small>
                { item.ad_station }
                <br />
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
