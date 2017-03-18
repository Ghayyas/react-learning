import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
setTimeout(function() {
  console.clear();
}, 3000);
class App extends Component {
  
  constructor(props,id1){
   super(props);
   this.array =  [];
   this.id1 = 0;
   this.state = {
     id: this.id1,
     value: ""
   };

   this.handleChange = this.handleChange.bind(this);
   this.submit = this.submit.bind(this);
   this.clearAll = this.clearAll.bind(this);

}

handleChange(event){
    //  alert("events run" + this.state.value);
    this.setState({id:this.id1,value:event.target.value});
    
   }
submit(){
  //  this.state.id+1; 
  this.id1++;
   this.array.push(this.state);
   this.setState({value:""});
}
clearAll(){
  this.id1 = 0; 
   this.array = [];
   this.setState({});
     console.log("arrra",this.array);

}
clearSelected(i){
     this.array.splice(i,1);
     this.setState({});
}
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Creating Simple Todo list With React </h2>
        </div>
        <input type="text" className="App-intro" value={this.state.value} onChange={this.handleChange} placeholder="Enter any value"/>
        <button onClick={this.submit}>Submit</button>
        <button onClick={this.clearAll}>Clear all Items</button>
        <h3>List</h3>
       <ul>
        {this.array
        .map(item => (
          <li key={item.id}>{item.value} <span onClick={()=>{this.clearSelected(item)}} style={{position: 'absolute',right: '40px'}}>X</span></li>
       ))}
      </ul>
      </div>
    );
  }
}

export default App;
