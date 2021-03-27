import React, { Component } from 'react';
import GroupNameContainer from './GroupNameContainer';

class AllGroupName extends Component {
    constructor(){
        super()
        this.state={
            group:[],
            pageNumber: 1,
            maxPage:1,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getallgroup/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.count%10!==0){
                var maxPage = parseInt(result.count/10)+1
            }else{
                maxPage = result.count/10
            }
            this.setState({group: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getallgroup/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.group
                st.push(result.results[i])
                //this.setState({status:[...this.state.status, result.results[i]], pageNumber:this.state.pageNumber+1})
            }
            this.setState({group: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=()=>{
        //const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if(this.state.pageNumber!==this.state.maxPage+1){
            this.loadMore()
        }
    }
    render() {
        if(this.state.group.length){
            var list = this.state.group
            const s = list.map((l,i)=>{
                return(
                    <GroupNameContainer groupHome={this.props.groupHome} key={i} 
                        name={l['name']} id={l['id']}
                    />
                )
            })
            return(
                <div className='container'>
                    {this.state.form?(
                        <div>
                        
                        <div className='card-2 padding' style={{textAlign:'center'}}>
                            <input id='i' onChange={(e)=>{this.setState({groupName:e.target.value})}} style={{width:'50%',height:'40px', border:'none', borderRadius:'25px', paddingLeft:'9px'}} type='text' placeholder='Enter Group name'/>
                            <button onClick={this.createGroup} className='button blue' style={{marginLeft:'8px', border:'none', borderRadius:'10px'}}>Create Group</button>
                        </div>
                        </div>
                    ):null}
                    <br/>
                    {s}
                    <button onClick={this.handleScroll}>More Group</button>
                </div>
            )
        }else{
            return(
                <div className='container'>
                <br/>
                    <h4>Loading...</h4>
                </div>
            )
        }
        
    }
}

export default AllGroupName;