import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /* useEffect(() => {
    axios.get('http://localhost:8080/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const addTask = () => {
    axios.post('http://localhost:8080/api/tasks', { title, description })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  }; */

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Task Manager</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        placeholder="Task title"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        placeholder="Task description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <Button title="Add Task" /* onPress={addTask}  *//>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default App;
