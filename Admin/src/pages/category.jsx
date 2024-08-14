import React, {useEffect, useState} from "react";
import { getAllCategorys,deleteCategory } from "../services/category.js";
import Pagination from "../components/pagination.jsx";
import { Link } from "react-router-dom";
import "../assets/styles/list.css";
import Load from "../components/Load.jsx";
import Notification from "../components/notication.jsx";

const notification = new Notification();
function Category(){ 
    let [allData,setAllData] = useState(null);
    let [dataSlice, setDataSlice] = useState(null);
    let [page,setPage] = useState(1);
    let [totalRs,setTotalRs] = useState(0);
    let [query,setQuery] = useState("");

    const limitRows = 10;

    useEffect(()=>{
        getAllCategorys().then(rs=>{   
            let data = rs.data.sort((a,b)=>a.id-b.id);
            setAllData(data);
            setDataSlice(data.slice((page-1)*limitRows,page*limitRows));
            setTotalRs(Math.ceil(data.length/limitRows));
        });
    },[]);

    useEffect(()=>{
        if(allData !==null) {
            if(query === "") {
                setDataSlice(allData.slice((page-1)*limitRows,page*limitRows));
                setTotalRs(Math.ceil(allData.length/limitRows));
            }
            else{
                let rs = allData.filter(item=>item.id.includes(query));
                if(rs.length>0){
                    setDataSlice(rs.slice((page-1)*limitRows,page*limitRows));
                    setTotalRs(Math.ceil(rs.length/limitRows));
                }
                else{
                    setDataSlice([]);
                }
            }
        }
    },[page,query]);

    const handleDeleteData = (id) => {
        deleteCategory(id).then(rs=>{
            if(rs.status===200){
                let newData = allData.filter(item=>item.id_type!==id);
                setAllData(newData);
                setDataSlice(newData.slice((page-1)*limitRows,page*limitRows));
                setTotalRs(Math.ceil(newData.length/limitRows));
                notification.success({
                    title:"Xóa danh mục",
                    message:"Xóa danh mục thành công!"
                });
            }
            else{
                notification.error({
                    title:"Xóa danh mục",
                    message:"Xóa danh mục thất bại!"
                });
            }
        });
    }

    return(
        <div className="list-content">
           
            {(allData!==null&&allData.length>0)&&
                <div className="list-top">
                    <h1> Danh mục </h1>
                    <input className="list-box-search" 
                        placeholder="Tìm kiếm theo Id" 
                        defaultValue={query}
                        onChange={e=>{
                            setQuery(e.target.value);
                            setDataSlice(null);
                            setPage(1);
                    }}/>
                </div>
            }

            {dataSlice!==null&&dataSlice.length>0?
                <> 
                    <div className="list-container">
                        <div className="list-table">  
                            <ul className="list-header list-header-category"> 
                                <li> Id </li>
                                <li> Tên </li>
                                <li> Sửa </li>
                                <li> Xóa </li>
                            </ul>
                            {dataSlice.map((item,index)=>{
                                return(
                                    <ul key={index} className="list-row list-row-category"> 
                                        <li> {item.id_type} </li>
                                        <li> {item.type} </li>
                                        <li> <Link to={"/categoryForm/"+item.id_type} > <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Edit"><g><path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path><path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path></g></g></svg> </Link></li>
                                        <li onClick={()=>{
                                            notification.confirm({
                                                title:"Xóa danh mục",
                                                message:"Bạn có chắc chắn xóa danh mục này?",
                                                handleAccept:()=>{handleDeleteData(item.id_type)},
                                                handleCancel:()=>{console.log("cancel")},
                                                titleAccept:"Có",
                                                titleCancel:"Không"
                                            })
                                        }}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg> </li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                    {totalRs>1?<Pagination totalPages={totalRs} indexPage={page} setIndexPage={setPage}/>:""}
                </>
                :(dataSlice===null?
                    <Load/>:
                    (query===""?
                    <div className="empty-data"> 
                        <div className="empty-data-content">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M511.9 175c-9.1-75.6-78.4-132.4-158.3-158.7C390 55.7 416 116.9 416 192h28.1L327.5 321.5c-2.5-.6-4.8-1.5-7.5-1.5h-48V192h112C384 76.8 315.1 0 256 0S128 76.8 128 192h112v128h-48c-2.7 0-5 .9-7.5 1.5L67.9 192H96c0-75.1 26-136.3 62.4-175.7C78.5 42.7 9.2 99.5.1 175c-1.1 9.1 6.8 17 16 17h8.7l136.7 151.9c-.7 2.6-1.6 5.2-1.6 8.1v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-2.9-.9-5.4-1.6-8.1L487.1 192h8.7c9.3 0 17.2-7.8 16.1-17z"></path></svg>
                            <h1> Trống! <p> Có vẻ như không có dữ liệu nào! </p> </h1> 
                        </div>
                    </div>
                    :
                    <div className="notfound-data"> 
                        <div className="notfound-data-content">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 5h2v3h10V5h2v5h2V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2H5V5zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"></path><path d="M20.3 18.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S12 14 12 16.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l2.7 2.7 1.4-1.4-2.7-2.7zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"></path></svg>   
                             <h1> Không tìm thấy! <p> Không tìm thấy dữ liệu phù hợp với Id {query} </p> </h1>
                        </div>
                    </div>
                    )
                )
            }
           
            <Link to="/categoryForm/-1" className="add-data"> + </Link>
        </div>
    );
}

export default Category;