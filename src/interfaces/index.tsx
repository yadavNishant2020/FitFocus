export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  video_url: string;
}

export interface ExerciseListProps {
  item: Exercise;
  navigation: any; // Update the type of navigation as per your navigation setup
  
}
