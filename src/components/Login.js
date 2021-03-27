import React, { Component } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import CheckLogin from './CheckLogin';

class Login extends Component {
    constructor(){
        super()
        this.state={
            username: null,
            email: '',
            password: null,
            login: false,
            store: null,
            data: '',
            invalid:false,
            password1:'',
            password2:'',
            errorusername:'',
            erroremail:'',
            errorpass1:'',
            non_field_errors:'',

            signupCard: true,
            loading: false,
        }
    }
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
    csrftoken = this.getCookie('csrftoken');

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        this.setState({store: store})
        if(store && store.login){
            this.setState({login: true})
        }
    }

    loginClicked=(e)=>{
        this.setState({loading:true})
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/rest-auth/login/', {
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'username':this.state.username,
                'password': this.state.password
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                if (result.key !== undefined){
                    localStorage.setItem('login', JSON.stringify({login: true,token:result.key}))
                    var store = {login: true,token:result.key}
                    this.setState({login: true, store: store})
                }else{
                    this.setState({invalid: true, loading:false})
                }
            })
        })
        
    }

    signupClicked=(e)=>{
        this.setState({loading:true})
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/rest-auth/registration/', {
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'username':this.state.username,
                'email': this.state.email,
                'password1': this.state.password1,
                'password2': this.state.password2
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                if (result.key !== undefined){
                    localStorage.setItem('login', JSON.stringify({login: true,token:result.key}))
                    var store = {login: true,token:result.key}
                    this.setState({login: true, store: store})
                }else{
                    this.setState({loading:false})
                    if(result.username !== undefined){this.setState({errorusername: result.username})}
                    if(result.email !== undefined){this.setState({erroremail: result.email})}
                    if(result.password1 !== undefined){this.setState({errorpass1: result.password1})}
                    if(result.non_field_errors !== undefined){this.setState({non_field_errors: result.non_field_errors})}
                }
            })
        })
    }

    loginUsername=(e)=>{
        this.setState({username: e.target.value})
    }
    loginPassword=(e)=>{
        this.setState({password: e.target.value})
    }

    signupCard=()=>{
        this.setState({signupCard:!this.state.signupCard, loading:false})
    }

    render() {
        return (
            <div>
            {this.state.login?(
                <CheckLogin/>
            ):(
                <div style={{backgroundColor:'rgb(246,246,246)', height:'100vh'}}>
                
                <div className='row container'>
                <div>
                    <br/><span className='hide-medium hide-small'><br/><br/><br/></span>
                    <h1 style={{fontSize:'36px', fontWeight:'bolder', textAlign:'center', color:'blue'}} className='hide-large text-blue'>Facebook</h1>
                    <br/><br/>
                </div>
                    <div className='col l6 text-blue hide-medium hide-small' style={{paddingLeft:'200px'}}>
                    <br/><br/><br/>
                    <h1 style={{fontWeight:'bolder', fontSize:'48px', fontFamily:'inherit'}}>facebook</h1>
                    <p style={{color:'black', fontSize:'16px'}}>
                        Facebook helps you connect and<br/>
                        share with people in your life.
                    </p>
                    </div>

                    <div className='col l6' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <br/>
                        {this.state.signupCard?(
                            <div className='card-4 animate-right' style={{padding:'30px 50px', borderRadius:'10px'}}>
                            {this.state.invalid?(
                                <li className='text-red'>Username or Password invalid</li>
                            ):(
                                null
                            )}
                            <div className='text-blue'>
                                <h2 style={{textAlign:'center'}} className='text-blue'>Login</h2>
                                <h3>{this.state.invalid}</h3>
                                    <form>
                                        <input placeholder='Username' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={this.loginUsername} type="text" name="loginusername"/>
                                        <br/><br/>
                                        <input placeholder='Password' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={this.loginPassword} type="password" name="loginpassword"/>
                                        <p style={{borderRadius:'5px', display:'flex', justifyContent:'center'}} className='button blue' onClick={this.loginClicked}>Login {this.state.loading?(<AiOutlineLoading3Quarters className='spin' style={{fontSize:'16px'}}/>):null}</p>
                                    </form>
                                    
                                    <p style={{textAlign:'center'}}>or</p>
                                    <h4>Don't have an Account? <span onClick={this.signupCard} style={{textDecoration:'underline', cursor:'pointer', fontWeight:'bold'}} className='hover-blue'>Sign up</span> here.</h4>
                                </div>
                            </div>
                        ):(
                            <div>
                                
                                <div className='card-4 text-blue animate-right' style={{padding:'30px 50px', borderRadius:'10px'}}>
                                    <h2 style={{textAlign:'center'}}>Sign up</h2>
                                    <p style={{color:'red'}}>{this.state.errorusername}</p>
                                    <p style={{color:'red'}}>{this.state.erroremail}</p>
                                    <p style={{color:'red'}}>{this.state.errorpass1}</p>
                                    <p style={{color:'red'}}>{this.state.non_field_errors}</p>
                                    <form>
                                        <input placeholder='Username' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={(e)=>{this.setState({username:e.target.value})}} type="text" id="username" name="username" required /><br/><br/>
                                        <input placeholder='Email' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={(e)=>{this.setState({email:e.target.value})}} type="email" id="email" name="email" required /><br/><br/>
                                        <input placeholder='Password' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={(e)=>{this.setState({password1:e.target.value})}} type="password" id="password1" name="password1" required /><br/><br/>
                                        <input placeholder='Confirm password' style={{borderRadius:'5px', border:'solid 2px dodgerblue', height:'40px', width:'100%', padding:'8px 4px'}} onChange={(e)=>{this.setState({password2:e.target.value})}} type="password" id="password2" name="password2" required /><br/>
                                        <p style={{borderRadius:'5px', display:'flex', justifyContent:'center'}} className='button blue' onClick={this.signupClicked}>Sign up {this.state.loading?(<AiOutlineLoading3Quarters className='spin' style={{fontSize:'16px'}}/>):null}</p>
                                        
                                    </form>
                                    <h4>Already have an Account? <span onClick={this.signupCard} style={{textDecoration:'underline', cursor:'pointer', fontWeight:'bold'}} className='hover-blue'>Login</span> here.</h4>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
                </div>
            )}
                
                
            
            
            </div>
        );
    }
}

export default Login;


/*
<div>
                    <p style={{textAlign:'center', fontSize:'18px'}} className='hide-large'>Don't have an account?</p>
                    <div className='border-blue border' style={{padding:'30px 50px', borderRadius:'10px'}}>
                        <h2 style={{textAlign:'center'}}>Sign up</h2>
                        <p style={{color:'red'}}>{this.state.errorusername}</p>
                        <p style={{color:'red'}}>{this.state.erroremail}</p>
                        <p style={{color:'red'}}>{this.state.errorpass1}</p>
                        <p style={{color:'red'}}>{this.state.non_field_errors}</p>
                        <form>
                            <p style={{fontSize:'20px'}}>Username: <br/><input onChange={(e)=>{this.setState({username:e.target.value})}} type="text" id="username" name="username" required /></p>
                            <p style={{fontSize:'20px'}}>Email: <br/><input onChange={(e)=>{this.setState({email:e.target.value})}} type="email" id="email" name="email" required /></p>
                            <p style={{fontSize:'20px'}}>Password: <br/><input onChange={(e)=>{this.setState({password1:e.target.value})}} type="password" id="password1" name="password1" required /></p>
                            <p style={{fontSize:'20px'}}>Confirm password: <br/><input onChange={(e)=>{this.setState({password2:e.target.value})}} type="password" id="password2" name="password2" required /></p>
                            <input onClick={this.signupClicked} type="submit" name="Submit" id="submit"/>
                        </form>
                    </div>
                </div>
*/