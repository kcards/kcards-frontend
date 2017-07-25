import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import RoomPrompt from "./RoomPrompt";
import NamePrompt from "./NamePrompt";

class App extends Component {

    constructor() {
        super();
        this.state = {
            activeRoom: null,
            name: null
        };
        this.setActiveRoom = this.setActiveRoom.bind(this);
        this.setName = this.setName.bind(this);
        this.getPanel = this.getPanel.bind(this);
    }

    setActiveRoom(newRoom) {
        this.setState({activeRoom: newRoom})
    }

    setName(newName) {
        this.setState({name: newName})
    }

    static getStatusMessage(activeRoom) {
        if (activeRoom === null) {
            return (<p>You're not currently in a room. Enter one below!</p>)
        } else {
            return (<p>You're in room {activeRoom}!</p>)
        }
    }

    static getNameMessage(name) {
        if (name === null) {
            return (<p>We haven't met yet!</p>)
        } else {
            return (<p>Welcome {name}!</p>)
        }
    }

    getPanel() {
        if (this.state.activeRoom === null) {
            return (<RoomPrompt setActiveRoom={this.setActiveRoom}/>)
        } else if (this.state.name === null) {
            return (<NamePrompt setName={this.setName}/>)
        } else {
            return (<p>This should be done sometime!</p>)
        }
    }

    lobbyButton() {
        return (<button className="btn btn-primary" onClick={() => this.setActiveRoom(null)}>Return to Lobby</button>)
    }

    forgetButton() {
        return (<button className="btn btn-warning" onClick={() => this.setName(null)}>Forget me!</button>)
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to K-Cards!</h2>
                </div>
                <div className="info-pane">
                    {this.lobbyButton()}
                    {this.forgetButton()}
                    {App.getStatusMessage(this.state.activeRoom)}
                    {App.getNameMessage(this.state.name)}
                </div>
                <div className="view-pane">
                    {this.getPanel()}
                </div>
            </div>
        );
    }
}

export default App;
