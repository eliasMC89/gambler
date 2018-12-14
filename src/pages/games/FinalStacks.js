// import React, { Component } from 'react';
// import cash from '../../lib/cashGame-service';

// class FinalStacks extends Component {

//   state = {
//     playerList: [],
//     pot: 0,
//     currentFinalStack: 0,
//   }

//   componentDidMount () {
//     const { id } = this.props.match.params;
//     cash.getDetail(id)
//       .then((cashGame)=>{
//         this.setState({
//           playerList: cashGame.playerList,
//           pot: cashGame.pot,
//         })
//       })
//   }

//   handleStackInputChange = (event) => {  
//     console.log(event.target.value)
//     const {value} = event.target;
//     this.setState({
//       currentFinalStack: value,
//     })
//   }

//   handleSubmitFinalStack = (playerId, finalStack) => {

//     cash.updateStack({playerId, finalStack})
//       .then((res)=>{
//         console.log(res)
//         // this.props.history.push(`/cash-game/${res.game._id}/playing`)
//       })
//       .catch( error => console.log(error) )
//   }

//   render() {
    
//     const { playerList, pot, currentFinalStack } = this.state;
//     console.log(playerList);
//     return (
//       <div>
//         <h1>Final Stacks</h1>
//         <h3>Pot: {pot}</h3>
//         <ul>
//           {playerList.map((player)=>{
//             return (
//               <li key={`id=${player._id}`}>
//                 <div>{player.name}, Buy In: {player.buyin}, Final: {player.finalStack}</div>
//                 <form onSubmit={(event) => {
//                   event.preventDefault();
//                   this.handleSubmitFinalStack(player._id, currentFinalStack);
//                   }} >
//                   <input type="number" value={currentFinalStack} name="currentFinalStack" onChange={this.handleStackInputChange} placeholder="Final stack" />
//                   <input type="submit" value="submit"/>
//                 </form>
//               </li>
              
//             )
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// export default FinalStacks;