import React from 'react'
import ReactDOM from 'react-dom'
import isEmpty from 'lodash/isEmpty'

import { objectToQueryString, removeHashFromUrl, locationHashParams } from './utils';
import FactoryFilter from './components/factory_filter'

import './stylesheets/style.scss';

class AppFilters extends React.Component {
  constructor(props) {
    super(props);

    this.localStoragePrefix = _.find(this.props.attributes, (attribute) => attribute.name === "name").value;

    this.state = {};
    this.filters().map((filter) => {
      this.state[filter.name] = this.initFilterValue(filter.name);
    });

    this.handleChange = this.handleChange.bind(this)
    this.reloadApp = this.reloadApp.bind(this)
    this.filters = this.filters.bind(this);
    this.setHashParams = this.setHashParams.bind(this);
  }

  componentDidMount() {
    this.updateLocationAndShareState();
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name
    console.log(`[handleChange] ${name}: ${value}` );

    this.setState({[event.target.name]: value}, () => {
      this.reloadApp()
    });

    this.storeField(name, value);
  }

  reloadApp() {
    this.updateLocationAndShareState();
    var table = $(`#${this.props.attributes["datatable-id"].value}`).DataTable();
    table.ajax.reload();
  }

  storeField(name, value) {
    let prefixedName = [this.localStoragePrefix, name].join("_")
    localStorage.setItem(prefixedName, value);
  }

  initFilterValue(name) {
    let hashParams = locationHashParams();

    if (_.isEmpty(hashParams)) {
      return this.restoreField(name, "");
    } else {
      return hashParams[name] ? hashParams[name] : "";
    }
  }

  restoreField(name, callback) {
    let prefixedName = [this.localStoragePrefix, name].join("_")

    let value = localStorage.getItem(prefixedName);

    if (value) {
      return value;
    } else if (_.isFunction(callback)) {
      return callback.call();
    } else {
      return callback;
    }
  }

  filters() {
    if (_.isEmpty(this.filters)) {
      const { attributes } = this.props;

      this._filters = _.filter(attributes, (attribute) => {
        return attribute.name.startsWith("data-");
      }).map((attribute) => {
        let data = JSON.parse(attribute.value);
        data.name = data.name || attribute.name.replace("data-", "");
        return data;
      })
    }

    return this._filters;
  }

  setHashParams() {
    const hashParams = objectToQueryString(this.state);
    if (!_.isEmpty(hashParams)) {
      location.hash = hashParams;
    } else {
      removeHashFromUrl();
    }
  }

  updateLocationAndShareState() {
    this.setHashParams();
    _.extend(window._reactState, this.state);
  }

  render() {
    return(
      <div className="col-xs-12 form-inline react-filters">
        {this.filters().map((filter) => {
          return(<FactoryFilter
            key={filter.label}
            filter={filter}
            handleChange={this.handleChange}
            selected={this.state[filter.name]}
          />)
        })}
      </div>
    )
  }
}

let rootElement = document.getElementById('react_filters');
ReactDOM.render(
  <AppFilters attributes={rootElement.attributes} />,
  rootElement
);
