import React, { Component } from 'react';
import { CardGroup, OddsCalculator } from 'poker-odds-calculator';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

class OddCalculator extends Component {

  state = {
    playerCards: '',
    cardsArray: [],
    board: '',
    showBoard: false,
    oddsCalculated: false,
    resultsArray: [],
  }

  refreshPage = () => {
    this.setState({
      playerCards: '',
      cardsArray: [],
      board: '',
      showBoard: false,
      oddsCalculated: false,
      resultsArray: [],
    })
  }

  handleCardsChange = (e) => {
    const { value } = e.target;
    const playerCards = value;
    this.setState({
      playerCards,
    });
  }

  handleSubmitCards = (e) =>{
    e.preventDefault();
    const { playerCards, cardsArray } = this.state;
    const newCards = playerCards;
    const newCardsArray = cardsArray;
    newCardsArray.push(newCards);
    this.setState({
      cardsArray: newCardsArray,
      playerCards: '',
    })
  }

  handleBoardChange = (e) => {
    const { value } = e.target;
    const board = value;
    this.setState({
      board,
    });
  }

  handleSubmitBoard = (e) => {
    e.preventDefault();
    
    this.setState({
      showBoard: true,
    })
  }

  showResults = (results) => {
    return (
      <div className="odds-result">
        {results.map((result, index)=>{
          return (
            <li key={`id=${index}`} className="list-odds-result">
              {this.state.cardsArray[index]}: <span className="odds-percent">{result} %</span>
            </li>
          )
        })}
      </div>
    )
  }

  getOdds = () => {
    const { cardsArray, board } = this.state;

    if(!board) {
      const newCardsArray = this.state.cardsArray.map((cards)=>{
        return CardGroup.fromString(cards);
      })
      const result = OddsCalculator.calculate(newCardsArray)
      const newResultsArray = [];
      for (let i = 0; i < newCardsArray.length; i++){
        newResultsArray.push(result.equities[i].getEquity());
      }
      this.setState({
        resultsArray: newResultsArray,
        oddsCalculated: true,
      })
    } else {
      const newCardsArray = cardsArray.map((cards)=>{
        return CardGroup.fromString(cards);
      })
      const newBoard = CardGroup.fromString(board);
      const result = OddsCalculator.calculate(newCardsArray, newBoard);
      const newResultsArray = [];
      for (let i = 0; i < newCardsArray.length; i++){
        newResultsArray.push(result.equities[i].getEquity());
      }
      this.setState({
        resultsArray: newResultsArray,
        oddsCalculated: true,
      })
    }
 
    
  }

  render() {
    const { playerCards, cardsArray, board, oddsCalculated, resultsArray, showBoard } = this.state;
      return (
        <div>
          <Navbar />
          <div className="container">
            <Header title="Odds calculator" />
            <div className="odds-instructions">
              <p>Select hands (two cards per hand):</p>
              <p> · A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2</p>
              <p> · Spades: s, Hearts: h, Clubs: c, Diamonds: d</p>
              <p className="example-instructions">For example: Ace of spades: As</p>
            </div>
            <form onSubmit={this.handleSubmitCards} >
              <div className="cards-input-box">
                <label className="odds-label">Cards: </label>
                <input type="text" name="cards" value={playerCards} onChange={this.handleCardsChange} className="cards-input" placeholder="e.g. AsKs"/>
              </div>
              <div>
                <input type="submit" value="add cards" className="add-cards-btn"/>
              </div>
            </form>
            <div>
              {cardsArray.map((cards, index)=>{
                return (
                  <li key={`id=${index}`} className="add-player-card" >
                    {cards}
                  </li>
                )
              })}
            </div>
            <form onSubmit={this.handleSubmitBoard} >
              <div className="cards-input-box">
                <label className="odds-label">Board: </label>
                <input type="text" name="board" value={board} onChange={this.handleBoardChange} className="cards-input" placeholder="e.g. JcQd10h"/>
              </div>
              <div>
                <input type="submit" value="add board" className="add-cards-btn"/>
              </div>
            </form>
            { showBoard ? <div className="add-player-card">{board}</div> : ''}
            { oddsCalculated ? this.showResults(resultsArray) : '' }
            <div className="end-game-btn-box">
              <button onClick={this.getOdds}  className="get-odds-btn">GET ODDS</button>
            </div>
            { oddsCalculated ?  <div><button onClick={this.refreshPage} className="more-odds-btn">More</button></div> : '' }
            <div>
              <button onClick={this.props.history.goBack} className="back-btn">Back</button>
            </div>
          </div>
        </div>
      )
    }
  
}

export default OddCalculator;