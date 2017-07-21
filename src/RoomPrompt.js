import React, {Component} from "react";
import "./RoomPrompt.css";

class RoomPrompt extends Component {
    constructor() {
        super();
        this.state = {
            roomCode: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }


    createRoom() {
        fetch("/api/rooms/", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"code": this.state.roomCode})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('Request succeeded with JSON response', data.code);
            this.props.setActiveRoom(data.code);
        }).catch((error) => {
            console.log('Request failed', error);
        });
    }

    handleInputChange(event) {
        this.setState({roomCode: event.target.value});
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">

                        <h3>What room would you like to join?</h3>

                        <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="room-code"
                                   value={this.state.roomCode}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-inline">
                            <button type="submit" className="form-control" name="goto">Go to Room</button>
                            <button type="submit" className="form-control" name="create"
                                    onClick={() => this.createRoom()}>Create Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomPrompt;