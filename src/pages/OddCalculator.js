import React, { Component } from 'react';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';
import Header from '../components/Header';

class OddCalculator extends Component {

  state = {
    playerCards: '',
    cardsArray: [],
    board: '',
    showBoard: false,
    oddsCalculated: false,
    resultsArray: [],
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
      <div>
        {results.map((result, index)=>{
          return (
            <li key={`id=${index}`}>
              <p>{result}%</p>
            </li>
          )
        })}
      </div>
    )
  }

  getOdds = () => {
    const { cardsArray, board } = this.state;

    if(!board) {
      const newCardsArray = cardsArray.map((cards)=>{
        return CardGroup.fromString(cards);
      })
      const result = OddsCalculator.calculate(newCardsArray);
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
    return(
      <div className="container">
        <Header title="Odds calculator:" />
        <form onSubmit={this.handleSubmitCards} >
          <div >
            <label>Cards: </label>
            <input type="text" name="cards" value={playerCards} onChange={this.handleCardsChange} />
          </div>
          <div>
            <input type="submit" value="add cards"/>
          </div>
        </form>
        <div>
          Cards:
        </div>
        <div>
          {cardsArray.map((cards, index)=>{
            return (
              <li key={`id=${index}`}>
                {cards}
              </li>
            )
          })}
        </div>
        <form onSubmit={this.handleSubmitBoard} >
          <div >
            <label>Board: </label>
            <input type="text" name="board" value={board} onChange={this.handleBoardChange} />
          </div>
          <div>
            <input type="submit" value="add board"/>
          </div>
        </form>
          { showBoard ? <div><p>Board: {board}</p></div> : ''}
        <div>
          <button onClick={this.getOdds}  className="button">GET ODDS</button>
        </div>
        <div>
        { oddsCalculated ? this.showResults(resultsArray) : '' }
        </div>
        <div>
          <button onClick={this.props.history.goBack}>Back</button>
        </div>
      </div>
    )
  }
}

export default OddCalculator;