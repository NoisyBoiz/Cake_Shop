import React from "react";
import "../assets/styles/graph.css";

function Graph({data}) {

    const limitRows = 5;
    const limitColumns = data.length;

    let maxValue = 0;
    data.forEach(item => {
        if(item.value > maxValue) {
            maxValue = item.value;
        }
    });
    maxValue = Math.ceil(maxValue/limitRows)*limitRows;

    let listColumnHeight = data.map(item => {
        return item.value/maxValue*100;
    });

    return (
        <div className="graph-container">
            <div className="graph-title">
                <h1>Doanh thu gần đây</h1>
            </div>
            <div className="graph-box"> 
                <ul className="graph-left"> 
                    {Array.from({length:limitRows}, (v,i) => {}).map((item,index) => {
                        return(
                            <li key={index} className="level-item"> 
                                <p className="level-value"> {maxValue/limitRows*(limitRows-index)} </p> 
                                {index==(limitRows-1)?<p className="level-value-0">0</p>:""} 
                            </li>
                        );
                    })}
                </ul>
                <div className="graph-right">
                    <ul className="bar-container">
                            {data.map((item, index) => {
                                return(
                                    <li key={index} className="bar-item"> 
                                        <p className="bar-title"> {item.value} </p>
                                        <div className="bar-fill" style={{height:listColumnHeight[index]+"%"}}> &nbsp; </div>
                                    </li>
                                );
                            })}
                    </ul>
                    <ul className="label-container">
                        {data.map((item,index)=>{
                            return(
                                <li key={index}>{item.name}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Graph;