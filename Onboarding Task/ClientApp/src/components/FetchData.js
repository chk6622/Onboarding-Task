import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
      this.state = { customers: [], loading: true };

      fetch('/customer/query')//'api/SampleData/WeatherForecasts'
      .then(response => response.json())
      .then(data => {
        this.setState({ customers: data, loading: false });
      });
  }

    static renderCustomersTable(customers) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer =>
            <tr>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : FetchData.renderCustomersTable(this.state.customers);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
