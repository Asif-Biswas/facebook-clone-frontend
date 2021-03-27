import React, { Component } from 'react';
import JoinedGroupNameContainer from './JoinedGroupNameContainer';

class SomeJoinedGroupContainer extends Component {
    constructor() {
        super()
        this.state={
            someGroup:[],
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getsomejoinedgroup/?format=json'
        fetch(url,{
            method:'GeT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            this.setState({someGroup: result})
        }))
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    render() {
        if(this.state.someGroup.length){
            var list = this.state.someGroup
            const s = list.map((l,i)=>{
                return(
                    <JoinedGroupNameContainer groupHome={this.props.groupHome} key={i} 
                        name={l['name']} id={l['id']}
                    />
                )
            })
            return(
                <div className='container'>
                <h4 style={{color:'white'}}>Your Groups</h4>
                    {s}
                </div>
            )
        }else{
            return (
                <div className='container'>
                </div>
            );
        }
        
    }
}

export default SomeJoinedGroupContainer;