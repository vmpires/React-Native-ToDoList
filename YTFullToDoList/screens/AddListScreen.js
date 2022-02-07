import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants';
import globalStyles from '../styles/global';
import { createList } from '../store/actions/listActions';
import Icon from 'react-native-vector-icons/Ionicons';


const AddListScreen = ({ navigation }) => {
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    const { lists } = useSelector(state => state.list);

    const submitHandler = () => {
        if (name.trim() === '') {
            return Alert.alert('Validation', 'List name is required!');
        }
        
        const alreadyExist = lists.find(l => l.name.toLowerCase() == name.trim().toLowerCase());
        
        if (alreadyExist) {
            return Alert.alert('Validation', 'This list already exists!');
        };

        dispatch(createList(
            name,
            () => { 
                ToastAndroid.show(`List "${name}" created!`, ToastAndroid.LONG);
                Keyboard.dismiss();
                navigation.navigate('Home');
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
                    placeholder="List name" placeholderTextColor={Colors.terciary}/>
                    <CustomButton text="Submit" onPress={submitHandler} round/>
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

export default AddListScreen;