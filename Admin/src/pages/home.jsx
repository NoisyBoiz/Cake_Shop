import React, { useEffect, useState } from "react";
import {getDetailBillByCreatedDate} from "../services/bill.js";
import { getCakeById } from "../services/cake.js";
import Graph from "../components/Graph.jsx";
import "../assets/styles/home.css"
function Home() {

    const [revenue, setRevenue] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);

    useEffect(() => {
        let startDate = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
        startDate = new Date(startDate).toISOString();
        let endDate = new Date().toISOString();

        getDetailBillByCreatedDate(startDate, endDate).then((res) => {
            let data = res.data.data.sort((a, b) => b.id - a.id);
            let limit = 5;
            let preDate = null;
            let save = {};
            let bSeller = {};
         
            for(let i = data.length - 1; i >= 0; i--) {
                let date = new Date(data[i].created_at);
                date = date.getDate() + "/" + (date.getMonth() + 1);
                if(date !== preDate) {
                    limit--;
                    if(limit < 0) break;
                    save[date] = 0;
                    preDate = date;
                }
                data[i].Orders.forEach(element => {
                    save[date] += element.quantity * element.CakeSize.price;
                    if(element.id_cake in bSeller) bSeller[element.id_cake] += Number(element.quantity);
                    else bSeller[element.id_cake] = Number(element.quantity);
                });
            }

            let rs = []
            let bs = 0;
            let bsC = 0;
            for(let i in bSeller) if(bSeller[i] > bsC){
                bsC = bSeller[i];
                bs = i;
            }
            for(let i in save) rs.push({name: i, value: save[i]});
            rs.sort((a,b) =>a.name.localeCompare(b.name));
            setRevenue(rs);
            getCakeById(bs).then(rs => {
                setBestSeller({data:rs.data.data[0], quantity: bsC});
            });
        });

    }, []);

    return (
        <div className="home-container">
            <Graph data={revenue}/>

            {bestSeller!=null?
                <div className="best-seller">
                    <h1> Bán chạy nhất </h1>
                    <div class="best-seller-infor">
                        <img src={bestSeller.data.list_image[0].image} alt="best seller" />
                        <div>
                            <h2> {bestSeller.data.name} </h2>
                            <h1> Đã bán: {bestSeller.quantity} </h1>
                        </div>
                    </div>
                </div>
            :""} 
            
        </div>
    );
}

export default Home;