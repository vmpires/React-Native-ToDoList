import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, TextInput, Switch, TouchableWithoutFeedback, Keyboard, 
ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import globalStyles from '../styles/global';
import { Colors } from '../constants';
import CustomButton from '../components/CustomButton';
import Tasks from '../components/Tasks';
import { getTasks, deleteTask, updateTask } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listActions';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskScreen = ({route, navigation}) => {
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.task);

    useEffect(() => {
        const taskFound = tasks.find(t => t.id === route.params.id);
        if (taskFound) {
            setName(taskFound.name);
            setCompleted(taskFound.completed);
            setTask(taskFound);
            setLoading(false);
        }
    }, [tasks, route.params.id]);



    const updateTaskClickHandler = () => {
        if (task.name === name && task.completed === completed){
            return Alert.alert('Nothing changed');
        }
        const updatedTask = {
            ...task,
            name,
            completed
        };

        dispatch(updateTask(
            updatedTask,
            () => {
                navigation.goBack();
                ToastAndroid.show('Task updated successfully!', ToastAndroid.LONG);
            },
            () =>{
                ToastAndroid.show('Something went wrong... Please try again!', ToastAndroid.LONG);
            }
        ))
    };

    const deleteTaskClickHandler = () => {
        Alert.alert(
            'Delete task?',
            'Are you sure?',
            [{text: 'Yes', onPress: () => deleteTaskHandler()}, {text: 'No'}]
        );
    };

    const deleteTaskHandler = () => {
        dispatch(deleteTask(
            task.id,
            () => {
                navigation.goBack();
                ToastAndroid.show(`Task "${task.name}" deleted successfully!`, ToastAndroid.LONG);
            },
            () => {
                ToastAndroid.show('Something went wrong... Please try again!', ToastAndroid.LONG);
            }
        ))
    };

    if (loading) {
        return <ActivityIndicator color={Colors.first} size="large" style={globalStyles.loader}/>
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TextInput value={name} onChangeText={(val) => setName(val)} placeholder="Task name"
                placeholderTextColor={Colors.quarternary} style={globalStyles.input} />
            <View style={globalStyles.switchContainer}>
                <Switch
                    value={completed}
                    onValueChange={(val) => setCompleted(val)}
                    thumbColor={completed ? Colors.first : Colors.secondary}
                    trackColor={{false : Colors.terciary, true: Colors.quarternary }}
                />
                <Text style={globalStyles.switchText}>Complete Task</Text>
            </View>
            <CustomButton text="Update Task" onPress={updateTaskClickHandler} round style={styles.spaceBottom} />
            <CustomButton text="Delete Task" onPress={deleteTaskClickHandler} round danger />
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
    },
    spaceBottom:{
        marginBottom: 30,
    }
});

export default TaskScreen;