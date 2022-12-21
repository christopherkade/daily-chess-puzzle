const highlightSquare = (square, color = "red") => {
  let i = 0;
  let originalNodeColor;

  const moveNode = document.querySelector(`[data-square="${square}"]`);

  const intervalId = setInterval(() => {
    if (moveNode.style.backgroundColor === color) {
      moveNode.style.backgroundColor = originalNodeColor;
    } else {
      originalNodeColor = moveNode.style.backgroundColor;
      moveNode.style.backgroundColor = color;
    }

    shouldClearInterval();
    i++;
  }, 200);

  const shouldClearInterval = () => {
    if (i === 3) {
      clearInterval(intervalId);
    }
  };
};

export default highlightSquare;
