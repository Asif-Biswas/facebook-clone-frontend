import React, { Component } from 'react';

class SearchInput extends Component {
    constructor() {
        super()
        this.state={
            input:''
        }
    }
    clicked=()=>{
        if(this.state.input.length){
            this.props.searchInput(this.state.input)
        }
    }
    render() {
        return (
            <div className=''>
                <div className='row container' style={{}}>
                    <button onClick={this.clicked} className='col button blue' style={{width:'80px', float:'right', marginLeft:'8px', borderRadius:'5px'}}>Search</button>
                    <div className='rest'>
                        <input onChange={(e)=>{this.setState({input:e.target.value})}} type='text' placeholder='Search...'
                            style={{width:'100%', height:'38px', borderRadius:'25px', paddingLeft:'8px'}}
                            value={this.state.input} id="searchInput"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchInput;