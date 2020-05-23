import React, {Component} from 'react';
import Aux from '../../hoc/Auxi';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandeling from '../../hoc/withErrorHandling/withErrorHandling';
import * as actionType from '../../Store/action';


class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        error:false,
    }

    componentDidMount () {
        console.log(this.props)
      //axios.get('https://burger-builder-36244.firebaseio.com/Ingrediants.json')
      //        .then(response => {
      //            console.log(response.data)
      //            this.setState({ingridiants: response.data})
      //        }).catch(error => {
      //            this.setState({error: true})
      //        })
    }

    updatePurchasable(upingr) {
       /* this.setState({
            purchasable : upprice.toFixed(2) > 4
        })
        console.log("updatePurchasable:", upprice)*/
        let ingrediants = {...upingr}
        let sum = Object.keys(ingrediants)
                    .map(igkey => {
                        return ingrediants[igkey]
                    }).reduce((sum,el) => {
                        return sum + el
                    },0);
        return sum > 0
    

    }
  //   addIngrediantsHandler = (type) =>{
  //      let oldingrediants = {...this.state.ingridiants}
  //      oldingrediants[type] = oldingrediants[type] + 1
  //      let oldprice = this.state.totalPrice
  //      oldprice = oldprice + INGRIDIANT_PRICE[type]
  //      this.setState({
  //          ingridiants : oldingrediants,
  //          totalPrice : oldprice
  //      })
  //      console.log("addingr:", oldprice)
  //      this.updatePurchasable(oldingrediants)
  //  }
  //  removeIngrediantsHandler = (type) => {
  //      let oldingrediants = {...this.state.ingridiants}
  //      if(oldingrediants[type] <=0 ){
  //          return;
  //      }
  //      oldingrediants[type] = oldingrediants[type] - 1
  //      let oldprice = this.state.totalPrice
  //      oldprice = oldprice - INGRIDIANT_PRICE[type]
  //      this.setState({
  //          ingridiants : oldingrediants,
  //          totalPrice : oldprice
  //      })
  //      console.log("removeingr:", oldprice)
  //      this.updatePurchasable(oldingrediants)
  //  }

    orderNowHandler = () =>{
        this.setState({purchasing: true})
    }

    orderCanceledHandler = () => {
        this.setState({purchasing: false})
    }

    orderContinueHandler = () => {
        //alert("You clicked continue!")
       /* this.setState({
            loading: true
        })
        const order = {
            ingrediants: this.state.ingridiants,
            price : this.state.totalPrice,
            customer: {
                customerID : 123,
                name: "De Niro",
                street: "Heat 42nd avenue",
            },
            paymentMethod: "COD"
        }

        axios.post('/order.json',order)
                .then(response => {
                    this.setState({
                        loading: false,
                        purchasing:false
                    })
                })
                    .catch(error => {
                        this.setState({
                            loading: false,
                            purchasing:false
                        })
                    })*/
                    this.props.history.push('/checkout')
                    
    }

    

    render(){
        let disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.state.error ?<p>Can't Load Ingrediants!!</p> : <Spinner />
        let orderSummary = null
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingridiants = {this.props.ings}/>
                    <BuildControls 
                    addIngridiants = {this.props.onIngrediantAdd}
                    removeIngridiants = {this.props.onIngrediantRemove}
                    disabled = {disabledInfo}
                    price = {this.props.price}
                    purchasable = {this.updatePurchasable(this.props.ings)}
                    order = {this.orderNowHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingrediants = {this.props.ings} 
                                price = {this.props.price}
                                orderCancel = {this.orderCanceledHandler}
                                orderContinue = {this.orderContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} backclicked = {this.orderCanceledHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return{
        ings: state.ingridiants,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngrediantAdd: (ingName) => dispatch({type: actionType.ADD_INGREDIANT, ingrediantName : ingName}),
        onIngrediantRemove: (ingName) => dispatch({type: actionType.REMOVE_INGREDIANT, ingrediantName : ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandeling(BurgerBuilder,axios));