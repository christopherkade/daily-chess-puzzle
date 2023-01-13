const getInitialColor = (gameMovesString) => {
    if (!gameMovesString) return;

    const split = gameMovesString.split(' ');
    const isOdd = split.length % 2;

    return isOdd ? 'black' : 'white'
}

export default getInitialColor;
