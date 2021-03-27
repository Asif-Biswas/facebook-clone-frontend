import React, { Component } from 'react';
import GroupNameContainer from './GroupNameContainer';

class SomeGroupContainer extends Component {
    constructor() {
        super()
        this.state={
            someGroup:[],
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/getsomegroup/?format=json'
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
                    <GroupNameContainer groupHome={this.props.groupHome} key={i} 
                        name={l['name']} id={l['id']}
                    />
                )
            })
            return(
                <div className='container'>
                    {s}
                </div>
            )
        }else{
            return (
                <div className='container'>
                    <GroupNameContainer groupHome={this.props.groupHome} src='' name='...'/>
                    <GroupNameContainer groupHome={this.props.groupHome} src='' name='...'/>
                    <GroupNameContainer groupHome={this.props.groupHome} src='' name='...'/>
                </div>
            );
        }
        
    }
}

export default SomeGroupContainer;