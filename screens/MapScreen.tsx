import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GolfCourse, BallPosition } from '../types/models';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [course, setCourse] = useState<GolfCourse | null>(null);
  const [ballPositions, setBallPositions] = useState<BallPosition[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleMarkBall = async () => {
    if (!location) return;
    
    const newBallPosition: BallPosition = {
      id: Date.now().toString(),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      holeNumber: 1, // Default to hole 1
      shotNumber: ballPositions.length + 1,
      timestamp: new Date().toISOString()
    };
    
    setBallPositions([...ballPositions, newBallPosition]);
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
        >
          {ballPositions.map((ball) => (
            <Marker
              key={ball.id}
              coordinate={{
                latitude: ball.latitude,
                longitude: ball.longitude,
              }}
              title={`Shot ${ball.shotNumber}`}
              pinColor="blue"
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      
      <TouchableOpacity style={styles.markButton} onPress={handleMarkBall}>
        <Text style={styles.markButtonText}>Mark Ball</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  markButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
