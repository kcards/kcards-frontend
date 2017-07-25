import React, {Component} from "react";
import "./Card.css"


let colorMap = {
    '#018E42': "green",
    '#F7D002': "yellow",
    '#BF1A2F': "red",

};


export const Card = ({name, color, big}) => {
    let bigDisplay = big ? "big-card jumbotron text-center" : "little-card";
    let colorClass = colorMap[color] || color
    return (
        <div className={"card " + colorClass + " " + bigDisplay}>
            {name}
        </div>
    )
};

export default Card;