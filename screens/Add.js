import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {Button, Heading, FormControl, Input, TextArea} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = async () => {
    try {
      if (!title || !body) {
        return alert("title and body can't be empty");
      } else {
        const noteToAdd = {
          id: shortid.generate(),
          title,
          body,
          date: new Date(),
        };

        const storedNotes = await AsyncStorage.getItem('@notes');
        const prevNote = await JSON.parse(storedNotes);

        if (!prevNote) {
          const newNote = [noteToAdd];
          await AsyncStorage.setItem('@notes', JSON.stringify(newNote));
        } else {
          prevNote.push(noteToAdd);
          await AsyncStorage.setItem('@notes', JSON.stringify(prevNote));
        }
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1, padding: 10}}>
      <FormControl isRequired>
        <Input
          variant="unstyled"
          style={styles.input}
          isFullWidth
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.nativeEvent.text)}
        />
      </FormControl>
      <FormControl isRequired>
        <TextArea
          value={body}
          onChange={e => setBody(e.nativeEvent.text)}
          h={100}
          variant="unstyled"
          placeholder="write something"
        />
      </FormControl>
      <Button onPress={addNote} variant="unstyled" size="md">
        <Text style={{color: '#070D59'}}>Save</Text>
      </Button>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    flex: 1,
    justifyContent: 'center',
  },

  formItem: {
    marginBottom: 20,
  },
});
