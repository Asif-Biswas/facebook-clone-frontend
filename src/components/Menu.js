import React, { Component } from 'react';

class Menu extends Component {
    constructor() {
        super()
        this.state={
            changeName: false,
            changePassword: false,
            firstname:'',
            lastname:'',
            oldPaddword:'',
            newPassword:'',
            confirmNewPassword:'',
            unMatched:false,
            wrongPass:false,

            nameChanged: false,
            passChanged: false,
        }
    }
    logout=()=>{
        try {
            this.props.logOut()
        } catch  {
            fetch('http://127.0.0.1:8000/api/rest-auth/logout/', {
                method:'POST'
            })
            .then(res=>{
                res.json()
                localStorage.removeItem('login')
                window.location.reload()
            })
        }
    }
    viewProfile=()=>{
        this.props.userDetails(this.props.userdata.user)
    }
    changeName=()=>{
        this.setState({changeName:!this.state.changeName})
    }
    changePassword=()=>{
        this.setState({changePassword:!this.state.changePassword})
    }
    changeNameClicked=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        fetch('http://127.0.0.1:8000/myapi/changename/', {
            method: 'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization': 'Token '+store.token
            },
            body:JSON.stringify({
                'first_name':this.state.firstname,
                'last_name': this.state.lastname
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                if(result.response==='ok'){
                    this.setState({nameChanged:true})
                }
            })
        })
    }
    changePassClicked=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        if(this.state.newPassword===this.state.confirmNewPassword){
            fetch('http://127.0.0.1:8000/api/change-password/', {
                method: 'PUT',
                headers:{
                    'content-type':'application/json',
                    'Authorization': 'Token '+store.token
                },
                body:JSON.stringify({
                    'old_password':this.state.oldPassword,
                    'new_password': this.state.newPassword,
                })
            })
            .then((response)=>{
                response.json().then((result)=>{
                    if(result.status==='success'){
                        this.setState({passChanged:true})
                    }else{
                        this.setState({wrongPass:true})
                    }
                })
            })
        }else{
            this.setState({unMatched:true})
        }
        
    }
    render() {
        return (
            <div>
                <div style={{overflowX:'scroll', height:'92vh'}} className='margin-top margin-bottom container hide-scrollbar'>
                    <h1 className='text-white'>Menu</h1>
                    <hr/>
                    <button onClick={this.viewProfile} className='button purple' style={{border:'none', borderRadius:'5px', fontSize:'24px'}}>View your Profile</button>
                    <br/><br/>
                    <button onClick={this.changeName} className='button blue' style={{border:'none', borderRadius:'5px', fontSize:'24px'}}>Change Name</button>
                    <br/>
                    {this.state.changeName?(
                        <div className='container margin'>
                            <div style={{borderRadius:'10px'}} className='container border border-white padding text-white'>
                                <h3>Change Name</h3>
                                {this.state.nameChanged?(
                                    <li className='margin-bottom'>Name Changed Successfully (Refresh the page).<br/></li>
                                ):null}
                                <div>
                                    <label style={{marginRight:'8px'}}>First Name:</label>
                                    <input onChange={(e)=>{this.setState({firstname:e.target.value})}} style={{borderRadius:'5px'}} type='text' />
                                    <br/><br/>
                                    <label style={{marginRight:'8px'}}>Last Name:</label>
                                    <input onChange={(e)=>{this.setState({lastname:e.target.value})}} style={{borderRadius:'5px'}} type='text' />
                                    <br/><br/>
                                    <button onClick={this.changeNameClicked} style={{border:'none', borderRadius:'5px'}} className='button blue'>Change Name</button>
                                </div>
                            </div>
                        </div>
                    ):null}
                    <br/>
                    <button onClick={this.changePassword} className='button green' style={{border:'none', borderRadius:'5px', fontSize:'24px'}}>Change Password</button>
                    <br/>
                    {this.state.changePassword?(
                        <div className='container margin'>
                            <div style={{borderRadius:'10px'}} className='container border border-white padding text-white'>
                                <h3>Change Password</h3>
                                {this.state.passChanged?(
                                    <li className='margin-bottom'>Password Changed Successfully.</li>
                                ):null}
                                {this.state.unMatched?(
                                    <li className='margin-bottom text-red'>Password didn't matched. Try again.</li>
                                ):null}
                                {this.state.wrongPass?(
                                    <li className='margin-bottom text-red'>Password didn't matched with your old password.</li>
                                ):null}
                                <div>
                                    <label style={{marginRight:'8px'}}>Old password:</label>
                                    <input onChange={(e)=>{this.setState({oldPassword:e.target.value})}} style={{borderRadius:'5px'}} type='password' />
                                    <br/><br/>
                                    <label style={{marginRight:'8px'}}>New password:</label>
                                    <input onChange={(e)=>{this.setState({newPassword:e.target.value})}} style={{borderRadius:'5px'}} type='password' />
                                    <br/><br/>
                                    <label style={{marginRight:'8px'}}>Confirm new password:</label>
                                    <input onChange={(e)=>{this.setState({confirmNewPassword:e.target.value})}} style={{borderRadius:'5px'}} type='password' />
                                    <br/><br/>
                                    <button onClick={this.changePassClicked} style={{border:'none', borderRadius:'5px'}} className='button green'>Change password</button>
                                </div>
                            </div>
                        </div>
                    ):null}
                    <br/>
                    <button className='button red' style={{border:'none', borderRadius:'5px', fontSize:'24px'}} onClick={this.logout}>Log out</button>
                </div>
            </div>
        );
    }
}

export default Menu;