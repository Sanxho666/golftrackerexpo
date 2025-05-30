import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Course = {
  id: string;
  name: string;
  location: string;
  holes: number;
  par: number;
};

const CourseSelectionScreen = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Pebble Beach', location: 'California, USA', holes: 18, par: 72 },
    { id: '2', name: 'St. Andrews', location: 'Fife, Scotland', holes: 18, par: 72 },
    { id: '3', name: 'Augusta National', location: 'Georgia, USA', holes: 18, par: 72 },
    { id: '4', name: 'TPC Sawgrass', location: 'Florida, USA', holes: 18, par: 72 },
  ]);

  const selectCourse = (course: Course) => {
    navigation.goBack();
    // You would typically set the selected course in your state/context here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Course</Text>
      
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.courseItem} 
            onPress={() => selectCourse(item)}
          >
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{item.name}</Text>
              <Text style={styles.courseLocation}>{item.location}</Text>
              <Text style={styles.courseDetails}>{item.holes} holes • Par {item.par}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseLocation: {
    color: '#666',
    marginBottom: 4,
  },
  courseDetails: {
    color: '#2e8b57',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default CourseSelectionScreen;
