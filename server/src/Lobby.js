export default class Lobby {
    constructor(lobbyID) {
        this.lobbyID = lobbyID;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(username) {
        let i = this.getPlayerIndex(username);
        if (i == -1)
            return false;

        // move the element to the last index
        this.#swap(this.players, i, this.players.length-1);
        // removes the last element
        this.players.pop();
    }

    /**
     * Searches the player-object with the same Username
     * @param username
     * @returns {number} -1 if username not found else the index
     */
    getPlayerIndex(username){
        let i = -1;
        this.players.forEach((currentValue, index) => {
            if (currentValue.username === username)
                i = index;
        });
        return i;
    }

    #swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}