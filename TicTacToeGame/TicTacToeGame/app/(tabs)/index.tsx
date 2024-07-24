import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index: number) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard)) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => (
    <Pressable 
      key={index} 
      style={styles.square} 
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </Pressable>
  );

  const winner = calculateWinner(board);
  let status = winner ? `Vencedor: ${winner}` : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {Array(3).fill(null).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
          </View>
        ))}
      </View>
    </View>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: '33%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  squareText: {
    fontSize: 24,
  },
  status: {
    marginBottom: 10,
    fontSize: 24,
  },
});

export default Index;
