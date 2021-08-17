import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Fab, AddIcon} from 'native-base';
import {Heading, Row, Center, Spinner} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getNotes = async () => {
    setLoading(true);

    storedNotes = await AsyncStorage.getItem('@notes');
    if (!storedNotes) {
      setNotes([]);
    }
    const parsedNotes = JSON.parse(storedNotes);
    setNotes(parsedNotes);

    setLoading(false);
  };

  const deleteNote = async id => {
    const newNotes = await notes.filter(note => note.id !== id);
    await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  useEffect(() => {
    getNotes();
  }, [isFocused]);

  const dateParser = date => {
    let dt = new Date(date);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
  };

  const alertDialog = (text, id) => {
    return Alert.alert('', `Delete ${text} ?`, [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'delete', onPress: () => deleteNote(id)},
    ]);
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner color="#1F3C88" />
      </Center>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notes?.length == 0 ? (
        <Center flex={1}>
          <Heading size="sm">Nothing to show here</Heading>
        </Center>
      ) : (
        <>
          {notes?.map(note => (
            <View key={note.id} style={styles.noteContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Edit', {note})}
                onLongPress={() => alertDialog(note.title, note.id)}>
                <Row style={{flexGrow: 1, justifyContent: 'space-between'}}>
                  <Heading style={{color: 'white'}} size="sm">
                    {note.title}
                  </Heading>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {note.date && dateParser(note.date)}
                  </Text>
                </Row>
                <Text style={{color: 'white', marginTop: 5}}>
                  {note.body.length > 40
                    ? `${note.body.substring(0, 40)} ...`
                    : note.body}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <Fab
        renderInPortal={isFocused}
        bottom={10}
        right={7}
        icon={<AddIcon size="8" />}
        placement="bottom-right"
        style={{backgroundColor: '#070D59'}}
        onPress={() => navigation.navigate('Add')}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
  },
  noteContainer: {
    width: '90%',
    backgroundColor: '#5893D4',
    padding: 10,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 5,
  },
  heading: {
    textAlign: 'center',
    color: '#070D59',
    marginVertical: 15,
    marginHorizontal: 5,
  },
});
