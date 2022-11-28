import React from "react";
import './Home.css'
import Title from '../components/Title'
import {Button1, Button2} from "../components/Button";

export const Home = () =>{

        return(
            <div className="Home">
                <Title/>

                <div>
                    <Button1></Button1>
                </div>
                <div>
                    <Button2></Button2>
                </div>
            </div>

        );
}
