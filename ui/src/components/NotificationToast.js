import { useState, useEffect } from 'react';
import {Toast} from 'bootstrap';
import "../style/NotificationToast.css"

export default function FlagNotification(props) {
    useEffect(() => {
        document.getElementById("toast-header").style.backgroundColor = props.color;
        document.getElementById("toast-header").style.color = "white";


        const ele = document.getElementById('myToast');
        var ove = document.getElementById('overlay');
        const toastOption = {autohide: false ,animation: true, delay: 4000}
        var toastElement = new Toast(ele,toastOption);
        toastElement.show();
        ove.style.display = "block";

        setTimeout(()=>{
            if(props.display){
                toastElement.hide();
                ove.style.display = "none";
                props.action()
            }
        },4000);
    }, [props]);

    const handleClostToast = ()=>{
        props.action();
    }

    return(
        <div>
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
            <div class="overlayFull"></div>
        </div>
    );
}
