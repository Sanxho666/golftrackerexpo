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

  // Initialize 
