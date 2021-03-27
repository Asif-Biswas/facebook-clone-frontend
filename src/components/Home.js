import React, { Component } from 'react';
import CheckName from './CheckName'

import Navigation from './Navigation';


class Home extends Component {
    constructor() {
        super()
        this.state={
            data:'',
            login: true,
            store:'',
            name: true,
            firstname:'',
            lastname:'',
            userdata:''
        }
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        this.setState({store: store})
        if(store && store.login){
            this.setState({login: true})
        }
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.firstname.length===0){
                this.setState({name: false})
            }else{
                this.setState({userdata:result})
            }
            
        }))
        
    }

    getapi=()=>{
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+this.state.store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({data: result})
        }))
    }

    render() {
        return (
            <div>
            {this.state.name?(
                <div>
                <Navigation userdata={this.state.userdata} token={this.state.store.token} logOut={this.props.logOut} />
                    
                    
                </div>
            ):(
                <div>
                    <CheckName token={this.state.store.token}/>
                </div>
            )}
                
                
            </div>
        );
    }
}

export default Home;