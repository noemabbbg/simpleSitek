import {Button} from "react-bootstrap";
import React from "react";
import './styles.css'

const inputField = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск'}) => {
    return <div className="inputfield">
        <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <Button className="BtnSearch" disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
 }

 export default inputField;
