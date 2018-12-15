import axios from 'axios';

class CashGameService {
  constructor () {
    this.cash = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
  }

  create(game) {
    const { currentPlayerList, pot, isPlaying, owner } = game;
    return this.cash.post('/cash-game/create', { currentPlayerList, pot, isPlaying, owner })
      .then(({ data }) => data);
  }

  getDetail(id) {
    return this.cash.get(`/cash-game/${id}`)
      .then((res) => {
        return res.data
      }) 
  }

  updateStack(playerId, finalStack) {
    return this.cash.put(`/cash-game/player-stack/${playerId}`, {finalStack})
      .then((res)=>{
        return res.data;
      })
  }

  updateRebuy(playerId, rebuy) {
    return this.cash.put(`/cash-game/player-rebuy/${playerId}`, {rebuy})
      .then((res)=>{
        return res.data;
      })
  }
}

const cashGameService = new CashGameService();

export default cashGameService;