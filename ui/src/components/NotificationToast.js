import { useState, useEffect } from 'react';
import {Toast} from 'bootstrap';
import "../style/NotificationToast.css"

export default function FlagNotification(props) {
    useEffect(() => {
        var bgcolor = (props.message === "Incorrect flag. Try again") ? "#FFA600" : "#33691E";
        //document.getElementById("toast-header").style.backgroundColor = props.color;
        document.getElementById("toast-header").style.backgroundColor = bgcolor;
        document.getElementById("toast-header").style.color = "white";


        const ele = document.getElementById('myToast');
        const toastOption = {autohide: false ,animation: true, delay: 4000}
        var toastElement = new Toast(ele,toastOption);
        toastElement.show();

        setTimeout(()=>{
            if(props.display){
                toastElement.hide();
                props.action()
            }
        },4000);
    }, [props]);

    const handleClostToast = ()=>{
        props.action();
    }

    return(
        <div className="toastContainer">
            <div id="myToast" className="toast">
                <div id="toast-header" className="toast-header">
                    <strong className="mr-auto text-primary">Toast Header</strong>
                    <button type="button" className="ml-2 mb-1 close" onClick={handleClostToast}>&times;</button>
                </div>
                <div className="toast-body">
                    {props.message}
                </div>
            </div>
        </div>
    );
}
