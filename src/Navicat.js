import React from "react";
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import {Button} from "@mui/material"
import Strings from "locutus/php/strings"
import CryptoJS from "crypto-js"


export default class Navicat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aesKey: "libcckeylibcckey",
            aesIv:"libcciv libcciv ",
            decodeTweleve:"",
        }
    }
    handleChange = (event) => {
        this.inputChange(event.target.value)
    }
    inputChange = (str) => {
        this.encryptTweleve(str)
    }
    encryptEleven = (str) => {

    }
    encryptTweleve = (str) => {
        var decode = Strings.hex2bin(Strings.strtoupper(str))
        this.state.decodeTweleve = CryptoJS.AES.decrypt(str, this.state.aesKey, {iv:this.state.aesIv})
    }

    render() {
        const {label, value, index} = this.state
        return (
            <div>
                <Container maxWidth="sm">
                    <TextField label="navicat密文" onChange={this.handleChange} variant="filled" fullWidth="true"/>
                </Container>
                <Container maxWidth="sm">
                    <div>
                        {{index}}
                    </div>
                    <Button></Button>
                    <Button>复制</Button>
                </Container>
            </div>
        );
    }
}