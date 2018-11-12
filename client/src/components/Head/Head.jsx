import React, {Component} from 'react'
import { connect } from 'react-redux'
import './_head.scss'

class Head extends Component {
    componentDidMount() {

    }
    // $(function () {
    //     var socket = io();
    //     $('form').submit(function(){
    //       socket.emit('chat message', $('#m').val());
    //       $('#m').val('');
    //       return false;
    //     });
    //     socket.on('chat message', function(msg){
    //       $('#messages').append($('<li>').text(msg));
    //       window.scrollTo(0, document.body.scrollHeight);
    //     });
    //   });
    render() {
        return (
            
            <div className="head">
                Your name:
                {
                    /* Your score: { " " + this.props.gameStates.score } */
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state,
        gameStates: state.gameStates
    })
)(Head)