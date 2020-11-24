import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, Redirect, Link } from 'react-router-dom'
import QRCode from "react-qr-code";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button'
import companyName from './CompanyName.json'
import './Main.css'

function QRShow(){

    const amountConvert = (amount) =>{
        let display = "0.00"
        let value = "00"
        if(amount.includes(".")){
            let amountToTwo = parseFloat(amount).toFixed(2).toString()
            let dotIndex = amountToTwo.indexOf('.')
            let length = amountToTwo.length
            let intNum = amountToTwo.substring(0, dotIndex)
            let decimalNum = amountToTwo.substring(dotIndex+1, length)
            
            if(decimalNum.length >= 2){
                display = parseFloat(amountToTwo).toLocaleString('en-US')
                value = intNum + decimalNum
            }else{
                display = amountToTwo
                value = intNum + decimalNum + "0"
            }
        }else if(amount !== ""){
            display = parseFloat(amount).toLocaleString('en-US').toString() + ".00"
            value = amount + "00"
        }
        else{
            display = "0.00"
            value = "00"
        }

        return { display: display, value: value }
    }

    const location = useLocation()

    let ref1 = ""
    let ref2 = ""
    let amount = ""
    let amountData
    let company = 0

    try{
        ref1 = location.state.reference1
        ref2 = location.state.reference2
        company = location.state.company
        amount = location.state.amount
        amountData = amountConvert(amount)
    }catch(e){
        console.log(e)
    }

    var qrValue = "|"+companyName[company].taxid+"\n"+ref1+"\n"+ref2+"\n"+amountData.value

    return(
        <>
            <Container>
                {   ref1 === "" && ref2 === "" ?
                    <Redirect to="/"/> : null
                }
                <div className="topbar">
                    <Button color="default" component={Link} to="/" style={{marginLeft: 0, color: '#6daa5a'}}>
                        <ArrowBackIcon/>
                    </Button>
                    
                </div>
                <div className="d-flex justify-content-center" style={{marginTop: 10}}>
                    
                    <div className="main">
                        <h1 className="head-title">
                            {companyName[company].company_name}
                        </h1>
                        <div className="content">
                            <div>
                                <span className="content-title">Reference 1 : </span>
                                {ref1}
                            </div>
                            <div>
                                <span className="content-title">Reference 2 : </span>
                                {ref2}
                            </div>
                            <div>
                                <span className="content-title">จำนวนเงิน : </span>
                                {amountData.display} บาท
                            </div>
                        </div>
                        
                        
                        <div>
                            <QRCode value={qrValue} size={200}/>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default QRShow
