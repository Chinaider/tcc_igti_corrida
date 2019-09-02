import React,{Component} from 'react';
import {Container, View, Button, Text} from 'native-base';
import {StyleSheet} from "react-native";
import Video from 'react-native-video';
import style from './style';

const videoBg = require('./../../../assets/Sunset-Desert-Run.mp4');


export default class Home extends Component {


    render(){
        return (
            <Container>
                <View style={style.container}>
                    <Video repeat source={videoBg} resizeMode="cover" style={StyleSheet.absoluteFill} />
                    <View style={style.viewOpacity}/>
                    <View style={style.formContent}>
                        <Button onPress={() => this.props.navigation.navigate('Cadastro')} block rounded style={style.botao}>
                            <Text style={{color:"#000"}}>Resgistre-se</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('Login')} block rounded style={style.botao}>
                            <Text style={{color:"#000"}}>Já tenho uma conta</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}
