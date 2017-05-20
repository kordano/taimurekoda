import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recording: false,
      selectedCustomer: "",
      selectedProject: "",
      selectedTask: "",
      startTime: null,
      duration: null,
      secondsElapsed: 0
    };
    this.onTrackingStartClick = this.onTrackingStartClick.bind(this);
    this.createSelection = this.createSelection.bind(this);
    this.tick = this.tick.bind(this)
  }
  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
  createSelection(options) { 
    return <select>
      {options.map(o => <option value={o}>{o}</option>)}
    </select>
  }
  onTrackingStartClick() {
    const {recording, startTime, secondsElapsed} = this.state;
    if(recording) {
      clearInterval(this.interval)
      const now = new Date()
      this.setState({
        recording: !recording,
        duration: now - startTime,
        endTime: new Date(),
        secondsElapsed: 0
      })
    } else {
      this.interval = setInterval(this.tick, 1000)
      this.setState({
        recording: !recording,
        startTime: new Date(),
      })
    }
  }
  render() {
    const customers = ["feeba", "wawibox", "replikativ", "the-heidelberg"];
    const projects = ["Database", "Webserver", "Android", "Web app"];
    const tasks = ["Coding", "Testing", "Reviewing", "Meeting"];
    const {duration, secondsElapsed, recording} = this.state
    return (
      <div className="App">
        <div className="Tracking-Input">
          <h2>
            Tracking
          </h2>
          { this.createSelection(customers) }
          { this.createSelection(projects) }
          { this.createSelection(tasks) }
          <button onClick={this.onTrackingStartClick}>{this.state.recording ? "Stop" : "Start"}</button>
        </div>
        <div>
          <h2> { recording ? "Tracking: " + secondsElapsed : "Last Duration: " +  Math.floor(duration / 1000) }
          </h2>
          
        </div>
      </div>
    );
  }
}

export default App;
