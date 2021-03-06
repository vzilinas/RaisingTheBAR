import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import RightHeader from './RightHeader';


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      categories: [],
      responseError: '',
      update: false,
      openDropDown: false
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handler = this.handler.bind(this);
    this.checkSubCategories = this.checkSubCategories.bind(this);
  }
  handler() {
    this.setState({
      update: true
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.islogged === nextProps.islogged || this.props.islogged !== nextProps.islogged) {
      return true;
    }
    if (this.state.open !== nextState.open) {
      return true;
    }
    if (this.state.update) {
      this.setState({ update: false });
      return true;
    }
    return false;
  }
  componentDidMount() {
    axios.get(`/api/Category/GetAllCategories`)
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        this.setState({ responseError: error.response.data });
      });
  }

  handleDrawerToggle = () => this.setState({ open: !this.state.open })

  handleDrawerClose = () => this.setState({ open: false });

  checkSubCategories(subCategories) {
    if (subCategories.length > 0) {
      return <hr />;
    }
  }

  render() {
    const styles = {
      title: {
        cursor: 'default',
      },
      align: {
        textAlign: 'left',
      },
      textStyle: {
        textTransform: 'none',
      },
      barStyle: {
        backgroundColor: '#929292'
      }
    };
    return (
      <div>
        <AppBar
          title={<Link to={"/shop"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
          titleStyle={styles.align}
          onLeftIconButtonClick={this.handleDrawerToggle}
          iconElementRight={<RightHeader action={this.handler} productAmount={this.props.productAmount} handleLogging={this.props.handleLogging} islogged={this.props.islogged} />}
          style={styles.barStyle}
        >
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <Link to={"/shop/products/all"} onClick={this.handleDrawerClose}><MenuItem style={{marginTop: '1px'}}>Everything</MenuItem></Link>
            <hr style={{marginTop: '0px'}} />
            {
              this.state.categories.map((category) => {
                return <MenuItem
                  key={category.id}
                  rightIcon={<ArrowDropRight />}
                  onClick={(openDropDown) => this.setState({ openDropDown: !openDropDown })}
                  menuItems={[
                    <Link to={"/shop/products/" + category.name}
                      onClick={this.handleDrawerClose}>
                      <MenuItem>Everything</MenuItem>
                      {this.checkSubCategories(category.children)}
                    </Link>,
                    category.children.map((subCategory) => {
                      return <Link to={"/shop/products/" + subCategory.name}><MenuItem onClick={this.handleDrawerToggle}>{subCategory.name}</MenuItem></Link>
                    })
                  ]}
                >{category.name}</MenuItem>
              })
            }
          </Drawer>
        </AppBar>
        <ErrorMessage responseError={this.state.responseError} />
      </div>
    );
  }
}