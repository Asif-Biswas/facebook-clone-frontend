import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

class Search extends Component {
    constructor() {
        super()
        this.state={
            input:'',
            key:0,
            searchResult: false,
        }
    }
    searchInput=(str)=>{
        this.setState({input:str, searchResult:true, key:this.state.key+1})
    }
    componentDidMount(){
        try {
            if(this.props.input.length){
                //this.search(this.props.input)
                this.setState({input:this.props.input, searchResult:true, key:this.state.key+1})
            }
        }catch{
            
        }
    }
    render() {
        return(
            <div className='margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
            <br/>
                <span className='hide-large'><SearchInput searchInput={this.searchInput}/></span>
                <div className='container'>
                    <hr className='panel hide-large'/>
                </div>
                {this.state.searchResult?(
                    <SearchResult key={this.state.key} input={this.state.input}
                        userDetails={this.props.userDetails} groupHome={this.props.groupHome}
                        muserDetails={this.props.muserDetails} conversation={this.props.conversation}
                    />
                ):null}
            </div>
        )
    }
}

export default Search;