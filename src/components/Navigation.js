import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/facebook.png'
import { AiFillHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";

import Home2 from './Home2'
import Friend from './Friend'
import Group from './Group'
import Message from './Message'
import Notification from './Notification'
import Menu from './Menu'
import Search from './Search';
import UserDetails from './UserDetails';
import PostDetails from './PostDetails';


class Navigation extends Component {
    constructor(){
        super()
        this.state={
            home: true,
            group: false,
            friend: false,
            message: true,
            notification: false,
            search: false,
            menu: false,
            mhome: true,
            mfriend:false,
            mgroup:false,
            mmessage: false,
            mnotification: false,
            msearch: false,
            mmenu: false,

            userDetails: false,
            muserDetails: false,
            userId: null,
            groupId: null,
            postId: null,

            postDetails:false,
            groupsPost: false,

            counter:1,
            counter2:1,

            messageId: null,

            input:'',
            
        }
    }
    homeClicked=()=>{
        this.setState({home:true, group:false, friend:false, search:false, userDetails:false, postDetails:false, groupId: null, counter:this.state.counter+1})
    }
    groupClicked=()=>{
        this.setState({home:false, group:true, friend:false, search:false, userDetails:false, postDetails:false, groupId: null, counter:this.state.counter+1})
    }
    friendClicked=()=>{
        this.setState({home:false, group:false, friend:true, search:false, userDetails:false, postDetails:false, groupId: null, counter:this.state.counter+1})
    }
    messageClicked=()=>{
        this.setState({message:true, notification:false, menu:false, counter2:this.state.counter2+1, messageId:null})
    }
    notificationClicked=()=>{
        this.setState({message:false, notification:true, menu:false, messageId:null, counter2:this.state.counter2+1})
    }
    searchClicked=(event)=>{
        if(event.key==='Enter'){
            this.setState({home:false, group:false, friend:false, search:true, userDetails:false, postDetails:false, groupId: null, counter:this.state.counter+1})
        }
        
    }
    menuClicked=()=>{
        this.setState({message:false, notification:false, menu:true, messageId:null})
    }
    mmessageClicked=()=>{
        this.setState({mhome:false, mfriend:false, mmessage:true, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:false, groupId: null, counter:this.state.counter+1, postDetails:false, messageId:null})
    }
    mnotificationClicked=()=>{
        this.setState({mhome:false, mfriend:false, mmessage:false, mnotification:true, msearch:false, mmenu:false, muserDetails:false, mgroup:false, groupId: null, messageId:null, counter:this.state.counter+1, postDetails:false})
    }
    msearchClicked=()=>{
        this.setState({mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:true, mmenu:false, muserDetails:false, mgroup:false, groupId: null, messageId:null, postDetails:false})
    }
    mmenuClicked=()=>{
        this.setState({mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:true, muserDetails:false, mgroup:false, groupId: null, messageId:null, counter:this.state.counter+1, postDetails:false})
    }
    mhomeClicked=()=>{
        this.setState({mhome:true, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:false, groupId: null, messageId:null, counter:this.state.counter+1, postDetails:false})
    }
    mfriendClicked=()=>{
        this.setState({mhome:false, mfriend:true, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:false, groupId: null, messageId:null, counter:this.state.counter+1, postDetails:false})
    }
    mgroupClicked=()=>{
        this.setState({mhome:false, mfriend:false, mgroup:true, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:false, groupId: null, messageId:null, counter:this.state.counter+1, postDetails:false})
    }
    userDetails=(id)=>{
        this.setState({home:false, group:false, friend:false, search:false, userDetails:true, userId:id, postDetails:false, groupId: null, counter:this.state.counter+1,
            mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:true, mgroup:false, messageId:null})
    }
    muserDetails=(id)=>{
        this.setState({mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:true, userId:id, mgroup:false, groupId: null, messageId:null})
    }
    groupHome=(id)=>{
        this.setState({home:false, group:true, friend:false, search:false, userDetails:false, groupId:id, postDetails:false, counter:this.state.counter+1,
            mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:true,})
    }
    postDetails=(id, n)=>{
        if(n===1){
            this.setState({groupsPost: true})
        }
        this.setState({home:false, group:false, friend:false, search:false, userDetails:false, postDetails:true, postId:id, groupId: null,
            mhome:false, mfriend:false, mmessage:false, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:false})
    }
    conversation=(userId)=>{
        this.setState({messageId:userId,message:true, notification:false, menu:false, counter2:this.state.counter2+1,
            mhome:false, mfriend:false, mmessage:true, mnotification:false, msearch:false, mmenu:false, muserDetails:false, mgroup:false, groupId: null, counter:this.state.counter+1, postDetails:false,})
        //this.messageClicked()
        //this.mmessageClicked()
    }
    
    render() {
        return (
            <div style={{backgroundColor:'rgb(70,70,70)', height: '100vh', overflowY:'hidden'}}>
            
            <div className='bar dark-grey' style={{height:'50px'}}>
                <div onClick={this.homeClicked} className='bar-item hide-small hide-medium'>
                <Link to='/' className='' style={{marginLeft:'-5px'}}>
                    <img style={{borderRadius: '50%', margin:'-3px'}} src={logo} width='40px' alt='logo'/>
                </Link>
                </div>
                <div className='bar-item hide-medium hide-small'>
                    <input onKeyPress={this.searchClicked} onChange={(e)=>{this.setState({input:e.target.value})}} className='border-0' 
                    style={{height:'32px', borderRadius:'25px', paddingLeft:'8px'}} 
                    type='text' placeholder='Search'/>
                </div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div onClick={this.homeClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <AiFillHome style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.mhomeClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <AiFillHome style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.groupClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <HiOutlineUserGroup style={{fontSize:'30px'}}/>
                    </div>
                    <div onClick={this.mgroupClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <HiOutlineUserGroup style={{fontSize:'30px'}}/>
                    </div>
                    <div onClick={this.friendClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <FaUserFriends style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.mfriendClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <FaUserFriends style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.messageClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <BsChatDotsFill style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.mmessageClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <BsChatDotsFill style={{fontSize:'30px'}}/>
                    </div>


                    <div onClick={this.notificationClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <MdNotifications style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.mnotificationClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <MdNotifications style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.searchClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large hide-small hide-medium'>
                        <RiSearchLine style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.msearchClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <RiSearchLine style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.menuClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-small hide-medium'>
                        <TiThMenuOutline style={{fontSize:'30px'}}/>
                    </div>

                    <div onClick={this.mmenuClicked} style={{borderRadius:'10px', cursor:'pointer'}} className='bar-item hover-black hide-large'>
                        <TiThMenuOutline style={{fontSize:'30px'}}/>
                    </div>
                </div>
            </div>
            
            <div className='row' style={{marginTop:'-10px'}}>
                <div className='col l7 hide-small hide-medium'>
                {this.state.home?(<Home2 key={this.state.counter} counter={this.state.counter} userDetails={this.userDetails} userdata={this.props.userdata} token={this.props.token}/>):null}
                {this.state.group?(<Group key={this.state.counter} counter={this.state.counter} groupId={this.state.groupId} userDetails={this.userDetails} muserDetails={this.muserDetails} />):null}
                {this.state.friend?(<Friend key={this.state.counter} userDetails={this.userDetails}/>):null}
                {this.state.search?(<Search userDetails={this.userDetails} key={this.state.counter} input={this.state.input} groupHome={this.groupHome} conversation={this.conversation}/>):null}
                {this.state.userDetails?(<UserDetails key={this.state.counter} conversation={this.conversation} userdata={this.props.userdata} token={this.props.token} userDetails={this.userDetails} muserDetails={this.muserDetails} userId={this.state.userId}/>):null}
                {this.state.postDetails?(<PostDetails groupHome={this.groupHome} groupsPost={this.state.groupsPost} postId={this.state.postId} token={this.props.token} userDetails={this.userDetails} muserDetails={this.muserDetails} userId={this.state.postId}/>):null}
                </div>
                <div className='hide-large'>
                    {this.state.mhome?(<Home2 key={this.state.counter} counter={this.state.counter} muserDetails={this.muserDetails} userdata={this.props.userdata} token={this.props.token}/>):null}
                    {this.state.mfriend?(<Friend key={this.state.counter} muserDetails={this.muserDetails}/>):null}
                    {this.state.mmessage?(<Message key={this.state.counter} messageId={this.state.messageId}/>):null}
                    {this.state.mnotification?(<Notification key={this.state.counter} postDetails={this.postDetails} groupHome={this.groupHome} mgroupHome={this.mgroupHome}/>):null}
                    {this.state.muserDetails?(<UserDetails key={this.state.counter} conversation={this.conversation} userdata={this.props.userdata} token={this.props.token} userDetails={this.userDetails} muserDetails={this.muserDetails} userId={this.state.userId}/>):null}
                    {this.state.mmenu?(<Menu userDetails={this.userDetails} key={this.state.counter} logOut={this.props.logOut} userdata={this.props.userdata}/>):null}
                    {this.state.msearch?(<Search muserDetails={this.muserDetails} groupHome={this.groupHome} conversation={this.conversation}/>):null}
                    {this.state.mgroup?(<Group key={this.state.counter} counter={this.state.counter} groupId={this.state.groupId} userDetails={this.userDetails} muserDetails={this.muserDetails} />):null}
                    {this.state.postDetails?(<PostDetails groupHome={this.groupHome} mgroupHome={this.mgroupHome} groupsPost={this.state.groupsPost} postId={this.state.postId} token={this.props.token} userDetails={this.userDetails} muserDetails={this.muserDetails} userId={this.state.postId}/>):null}
                </div>
                
                <div className='col l5 hide-small hide-medium'>
                
                <div className='card' style={{height: '94vh'}}>
                    {this.state.message?(<Message key={this.state.counter2} messageId={this.state.messageId}/>):null}
                    {this.state.notification?(<Notification key={this.state.counter2} postDetails={this.postDetails} groupHome={this.groupHome}/>):null}
                    {this.state.menu?(<Menu userDetails={this.userDetails} userdata={this.props.userdata} key={this.state.counter} logOut={this.props.logOut}/>):null}
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Navigation;