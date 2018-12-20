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

  handleClickCard = (event) => {
    const { value } = event.target;
    const { playerCards } = this.state;
    let cards = '';
    switch (value) {
      case 'Spades':
        cards = playerCards + 's';
        break;
      case 'Hearts':
        cards = playerCards + 'h';
        break;
      case 'Clubs':
        cards = playerCards + 'c';
        break;
      case 'Diamonds':
        cards = playerCards + 'd';
        break;
      default:
        cards = playerCards + value;
        break;
    }
    this.setState({
      playerCards: cards,
    })
  }

  handleClickCardBoard = (event) => {
    const { value } = event.target;
    const { board } = this.state;
    let cards = '';
    switch (value) {
      case 'Spades':
        cards = board + 's';
        break;
      case 'Hearts':
        cards = board + 'h';
        break;
      case 'Clubs':
        cards = board + 'c';
        break;
      case 'Diamonds':
        cards = board + 'd';
        break;
      default:
        cards = board + value;
        break;
    }
    this.setState({
      board: cards,
    })
  }

  render() {
    const { playerCards, cardsArray, board, oddsCalculated, resultsArray, showBoard } = this.state;
      return (
        <div>
          <Navbar />
          <div className="container">
            <Header title="Odds calculator" />
            <div className="odds-instructions">
              <p className="text-instructions-odds">Select players' hands (two cards per hand):</p>
              <p> | <input value="A" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="K" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="Q" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="J" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="T" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="9" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="8" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="7" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="6" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="5" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="4" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="3" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="2" onClick={this.handleClickCard} className="card-btn" type="button"/> | </p>
              <hr/>
              <p> | <input value="Spades" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="Hearts" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="Clubs" onClick={this.handleClickCard} className="card-btn" type="button"/> | <input value="Diamonds" onClick={this.handleClickCard} className="card-btn" type="button"/> | </p>
            </div>
            <form onSubmit={this.handleSubmitCards} >
              <div className="cards-input-box">
                <label className="odds-label">Cards: </label>
                <input type="text" name="cards" value={playerCards} onChange={this.handleCardsChange} className="cards-input" placeholder="e.g. AsKs"/>
              </div>
              <div>
                <input type="submit" value="Add cards" className="add-cards-btn"/>
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
            <div className="odds-instructions">
              <p className="text-instructions-odds">Select board (three or four cards):</p>
              <p> | <input value="A" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="K" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="Q" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="J" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="T" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="9" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="8" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="7" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="6" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="5" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="4" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="3" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="2" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | </p>
              <hr/>
              <p> | <input value="Spades" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="Hearts" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="Clubs" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | <input value="Diamonds" onClick={this.handleClickCardBoard} className="card-btn" type="button"/> | </p>
            </div>
            <form onSubmit={this.handleSubmitBoard} >
              <div className="cards-input-box">
                <label className="odds-label">Board: </label>
                <input type="text" name="board" value={board} onChange={this.handleBoardChange} className="cards-input" placeholder="e.g. JcQd10h"/>
              </div>
              <div>
                <input type="submit" value="Add board" className="add-cards-btn"/>
              </div>
            </form>
            { showBoard ? <div className="add-player-card">{board}</div> : ''}
            { oddsCalculated ? this.showResults(resultsArray) : '' }
            <div className="get-odds-btn-box">
              <button onClick={this.getOdds}  className="end-game-btn">GET ODDS</button>
            </div>
            { oddsCalculated ?  <div className="more-odds-btn-box"><button onClick={this.refreshPage} className="more-odds-btn">More</button></div> : '' }
          </div>
        </div>
      )
    }
  
}

export default OddCalculator;