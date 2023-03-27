import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {activateInLib} from "../components/requests";

const LibCard  = ({name, lib_id, object, library}) => {

    const [isActivated, setIsActivated] = useState(library.find(elem => elem.id === lib_id).is_activated);
    const [loading, setLoading] = useState(false);

    async function activate(){
        setLoading(true);
        let libObj = library.find(elem => elem.id === lib_id);
        libObj.is_activated = true;
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + (today.getMonth()+1) + "-" + today.getDate();
        libObj.activation_date = todayStr;
        console.log(libObj);
        activateInLib(libObj).then(() => {
            setIsActivated(true);
        }).catch(() => {alert("Ошибка")}).
        finally(() => setLoading(false));
    }

    return (
        <div>
            <Col>
                <div key={lib_id}>
                    <Card>
                        <Card.Body>
                            <div className="textStyle">
                                <Card.Title>{name}</Card.Title>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            {!isActivated ?
                                <Button variant='warning' onClick={activate} disabled={loading}>Активировать</Button>:
                                <Button variant='info'>Активировано</Button>
                            }
                        </Card.Footer>
                    </Card>
                </div>
            </Col>
        </div>
    );
};

export default LibCard;