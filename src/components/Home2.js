import React, { Component } from 'react';
import Post from './Post';
import Status from './Status';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

class Home2 extends Component {
    constructor() {
        super()
        this.state={
            status:[],
            counter: 0,
            pageNumber: 1,
            maxPage:1,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/allpost/?format=json&page='+this.state.pageNumber
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
            this.setState({status: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
    }
    rerender=()=>{
        this.forceUpdate();
      };
      forceUpdate = () => {
        this.setState((state) => ({
          counter: state.counter + 1, pageNumber:1
          
        }));
        this.componentDidMount()
      };
    
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/allpost/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.status
                st.push(result.results[i])
            }
            this.setState({status: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.pageNumber!==this.state.maxPage+1
        if(bottom && next){
            this.loadMore()
        }
    }
    render() {
        if(Object.keys(this.state.status).length){
            var list = this.state.status
            const s = list.map((l,i)=>{
                return(
                    <Status userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                    key={i} name={l['user']['first_name']+' '+l['user']['last_name']}
                    body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                    id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} />
                )
            })
            return (
                <div key={this.props.counter}><br/>
                <div onScroll={this.handleScroll} style={{overflowY:'scroll', height:'92vh'}} className='hide-scrollbar'>
                    <Post rerender={this.rerender.bind(this)}
                     userdata={this.props.userdata} token={this.props.token} 
                     />
                    <div id="scroll" onScroll={this.handleScroll} key={this.state.counter}>{s}</div>
                    <span style={{display:'flex', justifyContent:'center'}}><AiOutlineLoading3Quarters className='spin' style={{fontSize:'36px'}}/></span>
                </div>
                </div>
            );
        }else {
            return (
                <div onScroll={this.handleScroll} style={{overflowY:'scroll', height:'92vh'}} key={this.props.counter}>
                <div key={this.state.counter}>
                <br/>
                    <Post userdata={this.props.userdata} token={this.props.token} name={'...'}/>
                    <p style={{textAlign:'center'}}>loading...</p>
                </div>
                </div>
            )
        }
    }
}

export default Home2;

