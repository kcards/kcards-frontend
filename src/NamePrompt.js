import React, {Component} from "react";
import "./NamePrompt.css";

class NamePrompt extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.setName = this.setName.bind(this);
    }


    setName() {
        this.props.setName(this.state.name);
        this.setState({name: ""});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">

                        <h3>What's your name?</h3>

                        <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="First Last"
                                   value={this.state.name}
                                   onChange={this.handleNameChange}></input>
                        </div>
                        <div className="form-inline">
                            <button type="submit" className="form-control" name="setName"
                                    onClick={() => this.setName()}>Create Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NamePrompt;