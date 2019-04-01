import React, { Component } from 'react';
import { WeatherWidget } from './components/WeatherWidget';
import { ReactComponent as Loader }  from './loader.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      weather: undefined, 
      error: null
    };
  }

  async componentDidMount() {
    try {
    const res = await fetch('http://api.openweathermap.org/data/2.5/group?id=2759794,5128581,524901,1850147,3369157,2147714&units=metric&APPID=3af2bc9c401bf739b14b4c8ac4b9f876');
    const json = await res.json();
    const weather = json.list;
    this.setState({weather});
    } catch(error) {
      this.setState({error});  
    } finally {
      this.setState({loading: false});
    }
  }

  render() {    
    return (      
          <div className="App">
            <header className="App-header">
              Wather App
            </header>
            <div className="Widget-wrapper">
            {this.state.loading ? <Loader /> : null}
            {this.state.error ? <p>{this.state.error.message}</p> : null}
            {this.state.weather ? this.state.weather.map((data, index) => <WeatherWidget data={data} key={data.id} index={index}/>) : null}
            </div>
          </div>)
    }
}

export default App;         