import React from 'react';
import CartTable from './CartTable';
import CartTotal from './CartTotal';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

export default class UserShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalCost: 0,
            totalAmountProducts: 0,
            responseError: '',
        }
        this.getData = this.getData.bind(this);
        this.getDataAmount = this.getDataAmount.bind(this);
        this.getNotLoggedData = this.getNotLoggedData.bind(this);
    }
    // NOT logged in/registered
    getNotLoggedData(array) {
        axios.post(`/api/Cart/GenerateCart`, JSON.parse(array))
            .then(res => {
                const cart = res.data;
                this.setState({ products: cart.products, totalCost: cart.completePrice });
                localStorage.setItem('totalCost', this.state.totalCost);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    // logged in/registered
    getData() {
        axios.get(`/api/Cart/GetCart`)
            .then(res => {
                const cart = res.data;
                this.setState({ products: cart.products, totalCost: cart.completePrice });
                localStorage.setItem('totalCost', this.state.totalCost);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    // logged in/registered
    getDataAmount() {
        axios.get(`/api/Cart/GetProductAmountInCart`)
            .then(res => {
                const totalAmountProducts = res.data;
                this.setState({ totalAmountProducts });
                localStorage.setItem('amount', totalAmountProducts);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        console.log('user Cart - ' + this.props.islogged);
        if (this.props.islogged === true) {
            // logged in/registered - amount is saved in 'amount'
            this.getData();
            this.getDataAmount();
            localStorage.setItem('amount', this.state.totalAmountProducts);
        } else {
            // NOT logged in/registered - amount is saved in 'productAmount'
            var am = localStorage.getItem('productAmount');
            if (am == null) {
                this.setState({ totalAmountProducts: 0 });
            } else {
                this.setState({ totalAmountProducts: am });
            }
            var array = localStorage.getItem('cartNotLogged');
            if (array !== null) {
                this.getNotLoggedData(array);
            } else {
                this.setState({ products: [], totalCost: 0, totalAmountProducts: 0 });
                localStorage.setItem('totalCost', this.state.totalCost);
            }
        }
    }
    shouldComponentUpdate() {
        if (this.state.totalAmountProducts !== localStorage.getItem('amount')
            || this.state.totalAmountProducts !== localStorage.getItem('productAmount')) {
            return true;
        }
        return false;
    }
    render() {
        if (this.props.mobile === false) {
            return (
                <div>
                    <ErrorMessage responseError={this.state.responseError} />
                    <CartTable handleAmount={this.props.handleAmount} cart={this.state.products} islogged={this.props.islogged} mobile={this.props.mobile} />
                    <CartTotal totalPrice={this.state.totalCost} totalAmount={this.props.productAmount} mobile={this.props.mobile} />
                </div>
            );
        } else {
            return (
                <div>
                    <ErrorMessage responseError={this.state.responseError} />
                    <CartTotal totalPrice={this.state.totalCost} totalAmount={this.props.productAmount} mobile={this.props.mobile} />
                    <CartTable handleAmount={this.props.handleAmount} cart={this.state.products} islogged={this.props.islogged} mobile={this.props.mobile} />
                </div>);

        }
    }
}
