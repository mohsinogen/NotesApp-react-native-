import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Button, FormControl, Input, TextArea} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState(null);

  const updateNote = async () => {
    try {
      if (!title || !body) {
        return alert("title and body can't be empty");
      } else {
        const noteToUpdate = {
          id,
          title,
          body,
        };
        const storedNotes = await AsyncStorage.getItem('@notes');
        const note = await JSON.parse(storedNotes);

        note.map(n => {
          if (n.id == id) {
            n.title = title;
            n.body = body;
          }
          return n;
        });
        await AsyncStorage.setItem('@notes', JSON.stringify(note));
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {note} = route.params;
    const {title, body, id} = note;

    setId(id);
    setTitle(title);
    setBody(body);
  }, []);

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
      <Button onPress={updateNote} variant="unstyled" size="md">
        <Text style={{color: '#070D59'}}>Save</Text>
      </Button>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    flex: 1,
    justifyContent: 'center',
  },
});
