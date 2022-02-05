import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', response: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value, response: this.state.response});
  }

  handleSubmit(event) {
    request
      .get("https://jason-test-api.herokuapp.com/greeting")
      .query({name: this.state.value})
      .set('Accept', 'application/json')
      .end((err, resp) => {
        if(!err) {
          const data = JSON.parse(resp.text);
          this.setState({value: this.state.value, response: data.content})
        } else {
          this.setState({value: this.state.value, response: "Error"})
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <p>{this.state.response}</p>

          <form onSubmit = {this.handleSubmit}>
            <label>Name:</label>
            <br/>
            <input type="text" value = {this.state.value} onChange = {this.handleChange} />
            <br/>
            <input type="submit" value="Request" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
