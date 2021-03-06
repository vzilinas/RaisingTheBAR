import React from 'react';
import AdminProductTable from './AdminProductTable';
import ProductSearchBar from './ProductSearchBar';
import axios from 'axios';
import update from 'immutability-helper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ErrorMessage from '../../User/ErrorMessage';
import Snackbar from 'material-ui/Snackbar';

export default class EditProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSaveDialog: false,
      openEditConflictDialog: false,
      filterText: "",
      products: [],
      inTransaction: false,
      responseError: '',
      openSnackbar: false
    }
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handlePosts = this.handlePosts.bind(this);
    this.handleEditConflict = this.handleEditConflict.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleTransactionState = this.handleTransactionState.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var uri = '/api/Administrator/GetProducts';
    axios.get(uri)
      .then(res => {
        const products = res.data;
        this.setState({ products: products });
      })
      .catch(error => {
        this.setState({ responseError: error.response.data });
      });
  }
  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false
    });
  }
  handleSnackbarOpen = () => {
    this.setState({
      openSnackbar: true
    });
  };
  handleSaveButtonClick = () => {
    this.handleTransactionState(true);
    this.handleSaveDialogClose();
    this.handleTransactionState(false);
    this.handlePosts();
  }
  handleImageChange(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          images: { $set: product.images },
        },
        [index]: {
          imageCount: { $set: product.imageCount }
        }
      })
    })
    product.isSaved = false
  }
  handleThumbnailChange(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          thumbnail: { $set: product.thumbnail }
        },
        [index]: {
          thumbnailCount: { $set: product.thumbnailCount }
        }
      })
    })
    product.isSaved = false
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleCheckedRowDisable(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          isEnabled: { $set: product.isEnabled },
        }
      })
    })
    product.isSaved = false
  };
  handleCheckedRowFeatured(product) {
    var index = this.state.products.indexOf(product);
    this.setState({
      products: update(this.state.products, {
        [index]: {
          isFeatured: { $set: product.isFeatured },
        }
      })
    })
    product.isSaved = false
  };
  handleTransactionState(val) {
    this.setState({ inTransaction: val });
  }
  handleEditConflict(product) {
    product.inConflict = true
    this.handleEditConflictDialogOpen()
  }
  handlePosts = () => {
    this.setState({ responseError: '' })
    var addUri = '/api/Product/AddProduct';
    var editUri = '/api/Product/EditProduct';
    var products = this.state.products.slice();
    products.forEach((product) => {
      var index = this.state.products.indexOf(product);
      if (product.isSaved !== undefined && product.isSaved === false) {
        if (product.isAdded === true && product.isAdded !== undefined) {
          axios.post(addUri, {
            displayName: product.displayName,
            images: product.images,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            discountedPrice: product.discountedPrice,
            isFeatured: product.isFeatured
          }).then((res) => {
            this.setState({
              products: update(this.state.products, {
                [index]: {
                  timestamp: { $set: res.data.timestamp },
                  id: { $set: res.data.id },
                  isAdded: { $set: undefined }
                }
              })
            })
            this.handleSnackbarOpen()
          }).catch(error => {
            product.isAdded = true
            this.setState({ responseError: error.response.data });
          });
        }
        if (product.isAdded === undefined) {
          axios.post(editUri, {
            id: product.id,
            displayName: product.displayName,
            images: product.images,
            thumbnail: product.thumbnail,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            timestamp: product.timestamp,
            isFeatured: product.isFeatured,
            isEnabled: product.isEnabled
          }).then((res) => {
            this.setState({
              products: update(this.state.products, {
                [index]: {
                  timestamp: { $set: res.data.timestamp },
                }
              })
            })
            this.handleSnackbarOpen()
          }).catch(error => {
            if (error.message) {
              this.setState({ responseError: error.message })
            }
            if (error.response.data === "Bad price") {
              this.setState({ responseError: error.response.data })
            }
            if (error.response.request.status === 409) {
              this.handleEditConflict(product);
            }
          });

        }
        product.isSaved = undefined
      }
    })
    this.setState({ products: products })
  };
  handleAddEvent() {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      displayName: "",
      images: [],
      thumbnail: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      isFeatured: false,
      isAdded: true,
      isEnabled: true
    }
    this.state.products.push(product);
    this.setState({ products: this.state.products });
  }
  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key === item.name && product.id === item.id) {
          product[key] = item.value;
          if(key === "discountedPrice" && item.value==="") {
            product[key] = 0
          }
          product.isSaved = false
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
  };
  handleSaveDialogOpen = () => {
    this.setState({ openSaveDialog: true });
  };
  handleSaveDialogClose = () => {
    this.setState({ openSaveDialog: false });
  };
  handleEditConflictDialogOpen = () => {
    this.setState({ openEditConflictDialog: true });
  };
  handleEditConflictDialogClose = () => {
    this.setState({ openEditConflictDialog: false });
    window.location.reload();
  };
  render() {
    const saveDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleSaveDialogClose()}
      />,
      <FlatButton
        label="Save changes"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleSaveButtonClick()}
        disabled={this.state.inTransaction}
      />,
    ];
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        <ProductSearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <AdminProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onCheckedRowDisable={this.handleCheckedRowDisable.bind(this)}
          onCheckedRowFeatured={this.handleCheckedRowFeatured.bind(this)}
          onImageChange={this.handleImageChange.bind(this)}
          onThumbnailChange={this.handleThumbnailChange.bind(this)}
          onSave={this.handleSaveDialogOpen.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
          onEditConflict={this.handleEditConflict.bind(this)}
        />
        <Dialog
          title="Save confirmation"
          actions={saveDialogActions}
          modal={false}
          open={this.state.openSaveDialog}
          onRequestClose={this.handleSaveDialogClose}
        >
          Do you really want to save changes?
        </Dialog>
        <Dialog
          title="Conflict with editing products"
          actions={
            <FlatButton
              label="Got it"
              primary={true}
              onClick={() => this.handleEditConflictDialogClose()}
            />}
          modal={false}
          open={this.state.openEditConflictDialog}
          onRequestClose={this.handleEditConflictDialogClose}
        >
          One or more product edits failed, because they had already been changed by somebody else. <b>We will refresh the page for you.</b>
        </Dialog>
        <Snackbar
          open={this.state.openSnackbar}
          message="Products were succesfully saved"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}


