import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

type Hole = {
  number: number;
  par: number;
  score: number;
};

const ScorecardScreen = () => {
  const navigation = useNavigation();
  const [holes, setHoles] = useState<Hole[]>([]);
  const [currentHole, setCurrentHole] = useState(1);

  // Initialize 18 holes
  useEffect(() => {
    const initialHoles = Array.from({ length: 18 }, (_, i) => ({
      number: i + 1,
      par: i % 3 === 0 ? 5 : i % 2 === 0 ? 3 : 4, // Alternating pars
      score: 0,
    }));
    setHoles(initialHoles);
  }, []);

  const updateScore = (holeNumber: number, adjustment: number) => {
    setHoles(prevHoles =>
      prevHoles.map(hole =>
        hole.number === holeNumber
          ? { ...hole, score: Math.max(0, hole.score + adjustment) }
          : hole
      )
    );
  };

  const calculateTotals = () => {
    const totalScore = holes.reduce((sum, hole) => sum + hole.score, 0);
    const totalPar = holes.reduce((sum, hole) => sum + hole.par, 0);
    return { totalScore, totalPar, relativeToPar: totalScore - totalPar };
  };

  const { totalScore, totalPar, relativeToPar } = calculateTotals();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scorecard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <MaterialIcons name="golf-course" size={28} color="#2e8b57" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{totalScore}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Par</Text>
          <Text style={styles.summaryValue}>{totalPar}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>+/-</Text>
          <Text style={[
            styles.summaryValue,
            relativeToPar > 0 ? styles.overPar : styles.underPar
          ]}>
            {relativeToPar > 0 ? `+${relativeToPar}` : relativeToPar}
          </Text>
        </View>
      </View>

      <FlatList
        data={holes}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.holeItem,
            item.number === currentHole && styles.activeHole
          ]}>
            <Text style={styles.holeNumber}>Hole {item.number}</Text>
            <Text style={styles.holePar}>Par {item.par}</Text>
            
            <View style={styles.scoreControls}>
              <TouchableOpacity 
                onPress={() => updateScore(item.number, -1)}
                style={styles.scoreButton}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.holeScore}>{item.score}</Text>
              
              <TouchableOpacity 
                onPress={() => updateScore(item.number, 1)}
                style={styles.scoreButton}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  overPar: {
    color: '#e74c3c',
  },
  underPar: {
    color: '#2e8b57',
  },
  holeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeHole: {
    borderColor: '#2e8b57',
    borderWidth: 2,
  },
  holeNumber: {
    fontWeight: 'bold',
    width: '30%',
  },
  holePar: {
    width: '30%',
    textAlign: 'center',
  },
  holeScore: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
  scoreControls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-end',
  },
  scoreButton: {
    backgroundColor: '#2e8b57',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScorecardScreen;
