import React, {useState} from 'react'
import { Container } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done';
import './Main.css'
import companyName from './CompanyName.json'

const theme = createMuiTheme({
    
    overrides: {
        MuiFormLabel: {
            root: {
                fontFamily: 'Sukhumvit Set',
                "&$focused": {
                    color: "#6daa5a",
                },
            },
        },
        MuiInput: {
            root:{
                fontFamily: 'Sukhumvit Set'
            },
            underline: {
                  "&:after": {
                    borderBottom: '2px solid #6daa5a'
                  }
              },
        },
        MuiButton: {
            root:{
                fontFamily: 'Sukhumvit Set',
                fontSize: 20,
                outline: 'none'
            }
        },
    }
  });

export default function Main() {

    const history = useHistory()
    const [ref1, setRef1] = useState("")
    const [ref2, setRef2] = useState("")
    const [amount, setAmount] = useState("")
    const [isEnabled, setEnabled] = useState(false)
    const [company, setCompany] = useState(0)

    const handlerSubmit = () =>{
        history.push('/show', {reference1: ref1, reference2: ref2, amount: amount, company: company})
    }

    React.useEffect(()=>{
        if (ref1 !== "" && ref2 !== ""){
            setEnabled(true)
        }else{
            setEnabled(false)
        }
    }, [ref1, ref2])

    return (
        <ThemeProvider theme={theme}>
        <Container>
            <div className="d-flex justify-content-center">
                <div className="main" style={{marginTop: 50}}>
                    <Button 
                    style={{outline: 'none', marginRight: 10, color: company === 0 ? 'green': '#000000'}}
                    onClick={()=>setCompany(0)}>
                        {companyName[0].company_name}
                        {company === 0 ? <DoneIcon style={{marginLeft: 5}}/>: null}
                    </Button>
                    <Button 
                    style={{outline: 'none', color: company === 1 ? 'green': '#000000'}}
                    onClick={()=>setCompany(1)}>
                        {companyName[1].company_name}
                        {company === 1 ? <DoneIcon style={{marginLeft: 5}}/>: null}
                    </Button>
                    <div className="textfield-group">
                        <TextField 
                        className="textfield"
                        variant="standard"
                        color="primary"
                        label="Reference1"
                        onChange={(e)=>{
                            setRef1(e.target.value)
                        }}
                        style={{width: '100%', marginBottom: 10, fontFamily: 'Sukhumvit Set'}}/>
                    </div>
                    <div>
                        <TextField 
                        variant="standard"
                        className="textfield" 
                        label="Reference2" 
                        onChange={(e)=>{
                            setRef2(e.target.value)
                        }}
                        style={{width: '100%', marginBottom: 10}}/>
                    </div>
                    <div>
                        <TextField 
                        variant="standard"
                        className="textfield" 
                        label="จำนวนเงิน" 
                        type="number"
                        onChange={(e)=>{
                            setAmount(e.target.value)
                        }}
                        style={{width: '100%'}}/>
                    </div>
                    <div className="justify-content-center" style={{marginTop: 20}}>
                        <Button 
                        variant="contained"
                        color="primary" 
                        disabled={!isEnabled ? true: false}
                        onClick={()=>handlerSubmit()}
                        style={{backgroundColor: isEnabled ? '#6daa5a': null, width: 200, outline: 'none'}}>
                            สร้าง QRCode
                        </Button>
                        
                    </div>
                </div>
            </div>
        </Container>
        </ThemeProvider>
    )
}
