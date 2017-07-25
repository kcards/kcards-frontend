import React, {Component} from "react";
export const Card = ({name, color, big}) => {
    let bigDisplay = big ? "This is big" : "Not big";
    return (
        <div className="card" style={{color: color}}>
            {bigDisplay}
            {name} - {color}
        </div>
    )
}
export default Card;