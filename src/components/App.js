import React, { Component } from 'react';
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import './App.css';

class App extends Component {
  
  async componentWillMount() {
    await this.loadBlockchainData()
  }

  async loadBlockchainData(dispatch) {

    //check if MetaMask exists
    if(typeof window.ethereum!=='undefined'){
      //assign values to variables: web3, netId, accounts
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      //console.log(web3, netId, accounts)

      //check if account is detected, then load balance&setStates, elsepush alert
       if(typeof accounts[0] !=='undefined'){
         const balance = await web3.eth.getBalance(accounts[0])
         //console.log(web3.utils.fromWei(balance))
         this.setState({account: accounts[0], balance, web3})
      } else {
        window.alert('Please login with MetaMask')
      }
    } else {
      //if MetaMask not exists push alert
      window.alert('You are visiting a blockchain website, please install MetaMask.')
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      balance: 0
    }
  }
  
  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main />
    }
    
    return (
      <div>
      <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://x"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
