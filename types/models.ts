export interface GolfCourse {
  id: string;
  name: string;
  location: string;
  holes: HoleInfo[];
}

export interface HoleInfo {
  number: number;
  par: number;
  yardage: number;
  teeLatitude: number;
  teeLongitude: number;
  pinLatitude: number;
  pinLongitude: number;
}

export interface BallPosition {
  id: string;
  latitude: number;
  longitude: number;
  holeNumber: number;
  shotNumber: number;
  timestamp: string;
}

export interface Round {
  id: string;
  courseId: string;
  startTime: string;
  endTime?: string;
  holes: Hole[];
}

export interface Hole {
  number: number;
  par: number;
  yardage: number;
  score?: number;
  shots: BallPosition[];
}
