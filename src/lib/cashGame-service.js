import axios from 'axios';

class CashGameService {
  constructor () {
    this.cash = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
  }

  create(game) {
    const { playerList, pot, isPlaying, owner } = game;
    return this.cash.post('/cash-game/create', { playerList, pot, isPlaying, owner })
      .then(({ data }) => data);
  }
}

const cashGameService = new CashGameService();

export default cashGameService;