function printBoard(board){
  console.log("   1 2 3 ")
    board.forEach((row, i) => {
      console.log(`${(i+1).toString()} |${row[0]}|${row[1]}|${row[2]}|`)
    })
}

function checkIfWin(row, column){
  const rowWin = board[row].every(space => space === player)
  const columnWin = board.every(row => row[column] === player)
  const diagWin1 = board[0][0]===player && board[1][1]===player 
    && board[2][2]===player
  const diagWin2 = board[0][2]===player && board[1][1]===player && board[2][0]===player

  if(rowWin || columnWin || diagWin1 || diagWin2){
    console.log(`${player} wins!`)
    process.exit()
  }
}

function playGame(player){
  const board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]

  console.log("To begin, please type x,y coordinates and then press 'Enter'")
  printBoard(board)
  
  process.stdin.on("data", (location) => {
    const column = location.toString().trim().split(",")[0]-1
    const row = location.toString().trim().split(",")[1]-1

    if(row > 2 || column > 2 || !board[row] || !board[row][column] || board[row][column] != " "){
      console.log("Invalid input. Please select an empty space with x,y coordinates. \nFor example the bottom left space would be '1,3'")
    } else {
      board[row][column] = player
      printBoard(board)
      checkIfWin(row, column)

      player === "X" ? player = "O": player = "X"
      movesLeft--

      if (movesLeft === 0){
        console.log("It's a tie!")
        process.exit()
      }
    }
  })
}

playGame("X")


