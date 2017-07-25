import React, {Component} from "react";
import "./Room.css";

class Options extends Component {


    copyNameToClipboard() {

    }

    changeName() {

    }

    forceNextSpeaker(name) {
        fetch("/api/rooms/" + this.props.roomCode + "/next", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "force": true,
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('Request succeeded with JSON response', data.code);
            this.props.setActiveRoom(data.code);
        }).catch((error) => {
            console.log('Request failed', error);
        });
    }

    clearQueue(){
        fetch("/api/rooms/" + this.props.roomCode + "/queue", {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
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
        return (
            <div>
                <h1>Room Options</h1>
                <button onClick={this.props.closeOptions}>Back</button>
                <h2>Sharing</h2>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <input class="form-control" id="room-link" value={window.location.href + this.props.roomCode}/>
                        <button>Share</button>
                    </div>
                </div>
                <h2>Settings</h2>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <input class="form-control" id="name-change" value={this.props.name}/>
                        <button>Change Name</button>
                    </div>
                </div>
                <h2>Danger Zone</h2>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <button type="submit" className="form-control" name="force-next-speaker"
                                onClick={() => this.forceNextSpeaker(this.props.name)}>Next Speaker
                        </button>
                        <button type="submit" className="form-control" name="clear-queue"
                                onClick={() => this.clearQueue()}>Clear Queue
                        </button>
                        <button>Delete Room</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Options;