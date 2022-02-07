import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants';
import globalStyles from '../styles/global';
import { createTask } from '../store/actions/taskActions';


const AddTaskScreen = ({ navigation }) => {
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.task);
    const { activeListId } = useSelector(state => state.list);

    const submitHandler = () => {
        if (name.trim() === '') {
            return Alert.alert('Validation', 'Task name is required!');
        }
        
        const alreadyExist = tasks.find(t => t.name.toLowerCase() == name.trim().toLowerCase() && t.listId === activeListId);
        
        if (alreadyExist) {
            return Alert.alert('Validation', 'This task already exists in this list!');
        };

        dispatch(createTask(
            name,
            activeListId,
            () => { 
                ToastAndroid.show(`Task "${name}" created!`, ToastAndroid.LONG);
                Keyboard.dismiss();
                navigation.goBack();
            },
            () => { 
                ToastAndroid.show('Something went wrong, please try again...', ToastAndroid.LONG);

            },
        ));

    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <TextInput style={globalStyles.input} value={name} onChangeText={(val) => setName(val)}
                    placeholder="Task name" placeholderTextColor={Colors.terciary}/>
                    <CustomButton text="Create Task" onPress={submitHandler} round/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: "#FFF",
    }
});

export default AddTaskScreen;