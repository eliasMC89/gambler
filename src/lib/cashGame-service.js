import axios from 'axios';

class CashGameService {
  constructor () {
    this.cash = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
  }

  create(game) {
    const { currentPlayerList, pot, remainingPot, isPlaying, owner } = game;
    return this.cash.post('/cash-game/create', { currentPlayerList, pot, remainingPot, isPlaying, owner })
      .then(({ data }) => data);
  }

  getMyGames() {
    return this.cash.get('/cash-game/my-games')
      .then((res)=>{
        return res.data;
      })
  }

  getDetail(id) {
    return this.cash.get(`/cash-game/${id}`)
      .then((res) => {
        return res.data
      }) 
  }

  newPlayer(id, newRebuy, currentPlayerList) {
    return this.cash.put(`/cash-game/${id}/new-player`, { newRebuy, currentPlayerList })
      .then((res)=>{
        return res.data;
      })
  }

  updateStack(id, playerId, finalStack) {
    return this.cash.put(`/cash-game/${id}/player-stack/${playerId}`, {finalStack})
      .then((res)=>{
        return res.data;
      })
  }

  updateRebuy(id, playerId, rebuy) {
    return this.cash.put(`/cash-game/${id}/player-rebuy/${playerId}`, {rebuy})
      .then((res)=>{
        return res.data;
      })
  }

  endGame(id) {
    return this.cash.put(`/cash-game/${id}/end-game`)
      .then((res)=>{
        return res.data;
      })
  }

  deleteGame(id) {
    return this.cash.delete(`/cash-game/${id}`)
      .then((res)=>{
        return res.data;
      })
  }

  shareGame (gameId, shareUserId) {
    return this.cash.put(`/cash-game/${gameId}/share/${shareUserId}`)
      .then((res)=>{
        return res.data;
      })
  }
}

const cashGameService = new CashGameService();

export default cashGameService;