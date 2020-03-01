import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Layout } from '@ui-kitten/components';
import { TrainingCard } from './extra/training-card.component';
import { Training } from './extra/data';

const trainings: Training[] = [
  Training.chestEasy(),
  Training.workoutEasy(),
  Training.personalizedEasy(),
  Training.bicepsMiddle(),
  Training.chestMiddle(),
  Training.personalizedMiddle(),
  Training.bicepsHard(),
  Training.workoutHard(),
  Training.chestHard(),
];

export default (): React.ReactElement => {

  const displayTrainings: Training[] = trainings.filter(training => training.level === 'Easy');

  const renderItem = (info: ListRenderItemInfo<Training>): React.ReactElement => (
    <TrainingCard
      style={styles.item}
      training={info.item}
    />
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={displayTrainings}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
});
