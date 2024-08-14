import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {getCategoryById, createCategory, updateCategory } from "../services/category";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function CategoryForm() {
    let { id } = useParams();

    useEffect(()=>{
        if(id!=="-1"){
            getCategoryById(id).then(rs=>{
                const data = rs.data.data;
                document.querySelector("input[name='name']").value = data.type;
            });
        }   
    },[]);

    const handleSubmit = () => {
        if(id==="-1"){
            const name = document.querySelector("input[name='name']").value;
            createCategory({"type":name}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Thêm danh mục",
                        message:"Thêm danh mục thành công"
                    });
                }
                else{
                    notification.error({
                        title:"Thêm danh mục",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            const name = document.querySelector("input[name='name']").value;
            console.log({"id":id,"type":name})
            updateCategory({"id":id,"type":name}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Cập nhật danh mục",
                        message:"Cập nhật danh mục thành công"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật danh mục",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form category-form">
            <h1> {id==="-1"?"Thêm danh mục":"Sửa danh mục"} </h1>
            <div className="form-group">
                <label>Tên danh mục</label>
                <input type="text" name="name" placeholder="Nhập tên danh mục"/>
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default CategoryForm;