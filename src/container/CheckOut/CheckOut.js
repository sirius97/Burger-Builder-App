import React, {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import ContactData from '../CheckOut/ContactData/ContactData';

class CheckOut extends Component{

    cancelHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckOutSummary 
                ingridiants = {this.props.ings}
                cancel = {this.cancelHandler}
                continue = {this.continueHandler} />
                <Route path={this.props.match.url + '/contact-data'} 
                component = {ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingridiants
    }
}

export default connect(mapStateToProps)(CheckOut);