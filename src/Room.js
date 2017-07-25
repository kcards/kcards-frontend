import React, {Component} from "react";
import "./Room.css";
import Card from "./Card";
import Options from "./Options";

class Room extends Component {
    constructor() {
        super();
        this.state = {
            showOptions: false,
            queue: [],
        };
        this.startPolling = this.startPolling.bind(this)
    };

    componentDidMount() {
        this.startPolling();
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    startPolling() {
        console.log("Polling Started");
        this._timer = setInterval(this.getCurrentQueue.bind(this), 500);
    }


    getCurrentQueue() {
        fetch("/api/rooms/" + this.props.roomCode, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('Request succeeded with JSON response', data);
            this.setState({queue: data.queue})
        }).catch((error) => {
            console.log('Request failed', error);
        });
    }

    addCard(name, color) {
        this.setState({queue: [...this.state.queue, {name: name, color: color}]})
        fetch("/api/rooms/" + this.props.roomCode + "/queue", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "color": color,
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('Request succeeded with JSON response', data.code);
            this.props.setActiveRoom(data.code);
        }).catch((error) => {
            console.log('Request failed', error);
        });
    }

    nextSpeaker(name) {
        fetch("/api/rooms/" + this.props.roomCode + "/next", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('Request succeeded with JSON response', data.code);
            this.props.setActiveRoom(data.code);
        }).catch((error) => {
            console.log('Request failed', error);
        });
    }


    render() {
        if (this.state.showOptions) {
            return (<Options roomCode={this.props.roomCode} name={this.props.name} closeOptions={() => this.setState({showOptions:false})}/>)
        } else {
            let cards = this.state.queue.map((card, index) => {
                return (
                    <li key={index}>
                        <Card name={card.name} color={card.color} big={index === 0}/>
                    </li>
                )
            });

            return (
                <div className="container">
                    <h1>{this.props.roomCode}</h1>
                    <ul>{cards}</ul>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-inline">
                                <button type="submit" className="form-control" name="new-topic"
                                        onClick={() => this.addCard(this.props.name, "green")}>New Topic
                                </button>
                                <button type="submit" className="form-control" name="followup"
                                        onClick={() => this.addCard(this.props.name, "yellow")}>Followup
                                </button>
                                <button type="submit" className="form-control" name="interrupt"
                                        onClick={() => this.addCard(this.props.name, "red")}>Interruption
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <button type="submit" className="form-control" name="interrupt"
                                        onClick={() => this.nextSpeaker(this.props.name)}>Next Speaker
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <button type="submit" className="form-control" name="options"
                                        onClick={() => this.setState({showOptions:true})}>Options
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Room;