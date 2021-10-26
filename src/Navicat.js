import React from "react";
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import {Button, Grid} from "@mui/material"
import CryptoJS from "crypto-js"
import Strings from "locutus/php/strings"
import CssBaseline from '@mui/material/CssBaseline';


export default class Navicat extends React.Component {
    state = {
        aesKey: CryptoJS.enc.Utf8.parse("libcckeylibcckey"),
        aesIv: CryptoJS.enc.Utf8.parse("libcciv libcciv "),
        decodeTwelve: "",
        encodeTwelve: "",
    }

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.encryptTwelve(event.target.value)
        this.decryptTwelve(event.target.value)
    }

    // 加密
    encryptTwelve = (str) => {
        let options = {
            iv: this.state.aesIv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
        let encrypted = CryptoJS.AES.encrypt(str, this.state.aesKey, options)
        let encryptedString = encrypted.toString();
        let base64 = CryptoJS.enc.Base64.parse(encryptedString).toString().toUpperCase();
        this.setState({
            encodeTwelve: base64
        })
    }

    // 解密
    decryptTwelve = (str) => {
        let low = Strings.strtolower(str)
        let decode64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(low))
        let decrypted = CryptoJS.AES.decrypt(decode64, this.state.aesKey, {
            mode: CryptoJS.mode.CBC,
            iv: this.state.aesIv,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        this.setState({
            decodeTwelve: decryptedString
        })
    }

    handleCopy = (value) => {
        console.log('dd')
        console.log(value)
        if (typeof window.utools == 'object') {
            window.utools.copyText(value)
            window.utools.hideMainWindow()
        }
    }

    render() {
        return (
            <Container maxWidth="md">
                <TextField label="navicat密文" onChange={this.handleChange} variant="filled" fullWidth="true"/>
                <CssBaseline />
                <Grid container spacing={1}>
                    <Grid item md={12}>
                        {this.state.decodeTwelve}---
                        <Button onClick={() => this.handleCopy(this.state.decodeTwelve)}>点击复制</Button>
                    </Grid>
                </Grid>
                <CssBaseline />
            </Container>
        )
    }
}