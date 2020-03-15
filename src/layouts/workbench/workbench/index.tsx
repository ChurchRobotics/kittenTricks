import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Layout } from '@ui-kitten/components';
import { TrainingCard } from './extra/training-card.component';
import { Training, TrainingLevel } from './extra/data';

export default ({navigation, trips}): React.ReactElement => {

  const trainings: Training[] = trips.map(o => new Training(
    o.mission.name,
    o.id,
    TrainingLevel.EASY,
    { uri: o.mission.missionPatch },
  ));
  
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
