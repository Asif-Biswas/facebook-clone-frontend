import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
//import RouterComponent from './RouterComponent';

class CheckLogin extends Component {
    constructor(){
        super()
        this.state={
            store: null,
            login:false
        }
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        this.setState({store: store})
        if(store && store.login){
            this.setState({login: true})
        }
    }
    logOut=()=>{
        fetch('http://127.0.0.1:8000/api/rest-auth/logout/', {
            method:'POST'
        })
        .then(res=>{
            res.json()
            localStorage.removeItem('login')
            this.setState({login:false})
        })
    }

    render() {
        return (
            <div>
                {this.state.login?(
                    <div>
                        <BrowserRouter>
                            <Home logOut={this.logOut}/>
                            {/*<RouterComponent/>*/}
                        </BrowserRouter>
                    </div>
                ):(
                    <Login/>
                )}
            </div>
        );
    }
}

export default CheckLogin;