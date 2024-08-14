import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getCakeById, createCake, updateCake} from "../services/cake.js";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function CakeForm() {
    let { id } = useParams();
    const [size, setSize] = useState([ 
    <li> 
        <input type="text" placeholder="Nhập kích thước"/>
        <input type="text" placeholder="Nhập giá"/>
        <input type="text" placeholder="Nhập giá gốc"/>
        <button onClick={(e)=>removeSize(e)}>x</button> 
    </li>
    ]);

    useEffect(()=>{
        if(id!=="-1"){
            getCakeById(id).then(rs=>{
                const data = rs.data.data[0];
                console.log(data);
                document.querySelector("input[name='idCategory']").value = data.id_type;
                document.querySelector("input[name='name']").value = data.name; 
                document.querySelector("input[name='description']").value = data.description;
                document.querySelector("input[name='image']").value = data.list_image[0].image;
                
                let size = []
                data.list_size.forEach(item=>{
                    size.push(
                        <li> 
                            <input type="text" placeholder="Nhập kích thước" defaultValue={item.size}/>
                            <input type="text" placeholder="Nhập giá" defaultValue={item.price}/>
                            <input type="text" placeholder="Nhập giá gốc" defaultValue={item.old_price}/>
                            <button onClick={(e)=>removeSize(e)}>x</button> 
                        </li>
                    );
                });
                setSize(size);
            });
        }   
    },[]);

    const addSize = () => {
        setSize([...size, 
            <li> 
                <input type="text" placeholder="Nhập kích thước"/>
                <input type="text" placeholder="Nhập giá"/>
                <input type="text" placeholder="Nhập giá gốc"/>
                <button onClick={(e)=>removeSize(e)}>x</button> 
            </li>
        ]);
    }

    const removeSize = (e) => {
        e.target.parentElement.remove();
    }

    const handleSubmit = () => {
        const idCategory = Number(document.querySelector("input[name='idCategory']").value);
            const name = document.querySelector("input[name='name']").value;
            const description = document.querySelector("input[name='description']").value;
            const image = document.querySelector("input[name='image']").value;
            const size = [];
            
            document.querySelectorAll(".list-size li").forEach(item=>{
                size.push({
                    "size":item.querySelector("input").value,
                    "price":item.querySelectorAll("input")[1].value,
                    "old_price":item.querySelectorAll("input")[2].value
                });
            });
        if(id==="-1"){
            createCake({"id_type":idCategory,"name":name,"description":description,"image":image,"size":size}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Thêm bánh",
                        message:"Thêm bánh thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Thêm bánh",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            updateCake({"id":id,"id_type":idCategory,"name":name,"description":description,"image":image,"size":size}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Cập nhật bánh",
                        message:"Cập nhật bánh thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật bánh",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form category-form">
            <h1> {id==="-1"?"Thêm bánh":"Sửa bánh"} </h1>
            <div className="form-group">
                <label>Id danh mục</label>
                <input type="text" name="idCategory" placeholder="Nhập danh mục"/>
            </div>
            <div className="form-group">
                <label>Tên</label>
                <input type="text" name="name" placeholder="Nhập tên"/>
            </div>
            <div className="form-group">
                <label>Mô tả</label>
                <input type="text" name="description" placeholder="Nhập mô tả"/>
            </div>
            <div className="form-group">
                <label>Hình ảnh</label>
                <input type="text" name="image" placeholder="Nhập hình ảnh"/>
            </div>
            <div className="cake-size">
                <div className="header-cake-size">
                    <label>Kích thước</label> <button onClick={() => addSize()}>Thêm</button>
                </div>
                <ul className="list-size">
                    {size.map((item,index)=>{
                        return item;
                    })} 
                </ul>
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default CakeForm;