import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faChargingStation, faEuroSign } from '@fortawesome/free-solid-svg-icons';


//const PATH_BASE     = 'http://localhost:3000';
const PATH_BASE   = 'https://bornes.philnoug.com';
const PATH_SEARCH = '/bornes.json';
const PARAM_KEY1  = 'kms=';
const PARAM_KEY2  = 'puissance=';
const PARAM_KEY3  = 'location=';
const PARAM_KEY4  = 'stations=1';

class Bornes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      kms: 25,
      limit: 50,
      result: [],
      loading: false,
      searchTerm: '',
      error: false,
      currentLocation: 'Paris',
    }

    this.setBornesResult = this.setBornesResult.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.fetchBornesData = this.fetchBornesData.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  fetchBornesData(_autonomie, _puissance, _location) {

    this.setLoading(true);

    // Liste des bornes à proximité
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_KEY1}${_autonomie}&${PARAM_KEY2}${_puissance}&${PARAM_KEY3}${_location}&${PARAM_KEY4}`)
      .then(response => response.json())
      .then(result => this.setBornesResult(result))
      .then(ret => this.setLoading(false))
      .catch(error => this.setState({ error }));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onLocationChange(event) {
    const value =  event.target.value;
    this.setState({ currentLocation: value });

    if (value && !this.state.loading) {
        // Lire la liste des bornes limitée à la puissance  
        this.fetchBornesData(this.state.kms, this.state.puissance, value);
    }
  }

  componentDidMount() {
    // Afficher la liste au chargement de la page 
    this.fetchBornesData(this.state.kms, this.state.puissance, this.state.currentLocation);
  }

  handleOnChange(event) {
    const key = String(event.target.id);
    const value = event.target.value;

    // Conserve la valeur du slider (charge/speed/temp)
    this[key] = value;

    // Rafraichir l'affichage
    this.setState({ [key]: value });
  }

  handleOnPuissanceChange(event) {
    const value = event.target.value;
    this.setState({ puissance: value });

    // Lire la liste des bornes limitée à la puissance  
    this.fetchBornesData(this.state.kms, value, this.state.currentLocation);
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

                    { !loading &&
                        <div className="colored_div">
                            { bornes.length } bornes trouvées dans un rayon de { kms | 0 } km
                        </div>
                    }
                </div>

                <div className="card-body">
                    <form>
                        Filtre: <input
                            type="text"
                            onChange={ this.onSearchChange }
                            value={ searchTerm }
                        />  
                    </form> 

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
                            <a href='https://www.data.gouv.fr/fr/datasets/fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques/#' target="_blank" rel="noopener noreferrer">
                              Liste basée sur le jeu de données IRVE
                            </a>
                        </span>
                    }
                </div>
            </div>
      </div>
    );
  }
}

const ListeBornes = ({ list }) =>
  <table className="table table-striped table-condensed table-bordered">
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
            <a href={ `${PATH_BASE}/bornes/${ item.id }` } target="_blank" rel="noopener noreferrer">
              { item.ad_station }
            </a>
            <br />
            ~{ item.distance | 0 } km
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
