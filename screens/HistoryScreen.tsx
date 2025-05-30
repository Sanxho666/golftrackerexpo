import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Round = {
  id: string;
  date: string;
  course: string;
  score: number;
  par: number;
};

const HistoryScreen = () => {
  const [rounds, setRounds] = useState<Round[]>([
    { id: '1', date: '2023-05-15', course: 'Pebble Beach', score: 72, par: 72 },
    { id: '2', date: '2023-05-08', course: 'Augusta National', score: 78, par: 72 },
    { id: '3', date: '2023-05-01', course: 'St. Andrews', score: 75, par: 72 },
  ]);

  const renderItem = ({ item }: { item: Round }) => (
    <View style={styles.roundItem}>
      <View style={styles.roundHeader}>
        <Text style={styles.courseName}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.roundDetails}>
        <Text style={styles.score}>Score: {item.score}</Text>
        <Text style={styles.par}>Par: {item.par}</Text>
        <Text style={styles.relativeToPar}>
          {item.score - item.par > 0 ? '+' : ''}{item.score - item.par}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round History</Text>
      
      {rounds.length > 0 ? (
        <FlatList
          data={rounds}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="golf-course" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No rounds recorded yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
  },
  roundItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#666',
  },
  roundDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: '#333',
  },
  par: {
    color: '#666',
  },
  relativeToPar: {
    fontWeight: 'bold',
    color: '#2e8b57',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HistoryScreen;
