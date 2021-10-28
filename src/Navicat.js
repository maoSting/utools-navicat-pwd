import React from "react";
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import {Button, Grid, Stepper, Step, StepLabel, Link} from "@mui/material"
import CryptoJS from "crypto-js"
import Strings from "locutus/php/strings"


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

    // 复制数据
    handleCopy = (value) => {
        if (typeof window.utools == 'object') {
            window.utools.copyText(value)
            window.utools.hideMainWindow()
        }
    }

    // 打开外部链接
    handleOpen = (url) => {
        if (typeof window.utools == 'object') {
            window.utools.shellOpenExternal(url)
        }
    }

    render() {
        const decodeTwelve = this.state.decodeTwelve;
        return (
            <Container maxWidth="md">
                <TextField label="navicat密文" onChange={this.handleChange} variant="filled" fullWidth="true"/>
                <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
                    <Grid item md={3}>
                        <Button  variant="outlined" size="large" onClick={() => this.handleCopy(decodeTwelve)}>
                            {decodeTwelve ? decodeTwelve + " | " : ""}
                            点击复制明文
                        </Button>
                    </Grid>
                </Grid>
                如何获取密文？<Button onClick={()=> this.handleOpen("https://github.com/maoSting/utools-navicat-pwd")}>打开主页</Button>
                <Stepper activeStep={["1", "2", "3"]}>
                    <Step key={"1"} completed={true}>
                        <StepLabel>
                            点击【文件】菜单 - 导出连接
                        </StepLabel>
                    </Step>
                    <Step key={"2"} completed={true}>
                        <StepLabel>
                            选中破解密码的连接，并勾选导出密码
                        </StepLabel>
                    </Step>
                    <Step key={"2"} completed={true}>
                        <StepLabel>
                            打开导出文件，查看xml中为Password既为密文
                        </StepLabel>
                    </Step>
                </Stepper>
            </Container>
        )
    }
}