import React, {Component} from "react";
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { actions, States } from '../../Modules';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import style from './style';
import Video from 'react-native-video';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Container,
    Icon,
    View,
    Form,
    Input,
    Label,
    Item,
    Button,
    Text,
    H1
} from 'native-base';

const videoBg = require('Corrida/assets/Sunset-Desert-Run.mp4');


const required = value => value ? undefined : 'Campo Obrigatorio.';
const maxLength = max => value =>
    value && value.length > max ? `Deve ter no máximo  ${max} caracteres ou menos.` : undefined;
const minValue = min => value =>
    value && value < min ? `Deve ser pelo menos ${min} caracteres.` : undefined;
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'E-mail inválido' : undefined;


class CadastroView extends Component {


    efetuarCadastro(){
        if(!this.props.valid){
            Alert.alert(
                'Erro',
                'Todos os campos são obrigatórios.',
                [
                    {text:'OK'}
                ],
                { cancelable: false }
            );
            return;
        }

        //disparar cadastro....
    }

    renderInput({input:{value,onChange,...restInput},label,type,autoCapitalize,icon,secureTextEntry, meta: { touched, error, warning } }){
       return (
           <View>
               <Item style={style.itemForm} error={error && touched} floatingLabel>
                   <Icon name={icon} style={(error && touched) ? style.iconError : style.icon} />
                   <Label style={(error && touched) ? style.labelError : style.label}>{label}</Label>
                   <Input
                       style={style.input}
                       autoCorrect={false}
                       autoCapitalize={(autoCapitalize) ? 'sentences' : 'none'}
                       keyboardType={type}
                       secureTextEntry={(secureTextEntry) ? true : false}
                       onChangeText={(value) => onChange(value)}
                       value={value}
                       {...restInput}/>
                   {(error && touched) ? <Icon style={style.iconError}  name="close"/> : <Text/>}
               </Item>
               {(error && touched) ? <Text style={style.textError}>{error}</Text> : <Text/>}
           </View>
       )
    }

    render(){
        return (
            <Container>
                <View style={style.container}>
                    <Video repeat source={videoBg} resizeMode="cover" style={StyleSheet.absoluteFill} />
                    <View style={style.viewOpacity}/>
                    <View style={style.titleContent}>
                        <H1 style={style.title}>Registre-se</H1>
                    </View>
                        <View style={style.formContent}>
                            <Form>
                                <KeyboardAwareScrollView>
                                    <Field
                                        component={this.renderInput}
                                        name="nome"
                                        icon="person"
                                        label="Nome"
                                        type="default"
                                        autoCapitalize={true}
                                        validate={[required]}
                                        style={{marginBottom: 5}}
                                    />
                                    <Field
                                        component={this.renderInput}
                                        name="email"
                                        icon="mail"
                                        label="E-mail"
                                        type="email-address"
                                        autoCapitalize={false}
                                        validate={[required,email]}
                                        style={{marginBottom: 5}}
                                    />
                                    <Field
                                        component={this.renderInput}
                                        name="senha"
                                        icon="lock"
                                        label="Senha"
                                        type="default"
                                        autoCapitalize={false}
                                        secureTextEntry={true}
                                        validate={[required]}
                                        style={{marginBottom: 5}}
                                    />
                                </KeyboardAwareScrollView>
                            </Form>
                            <Button onPress={() => this.efetuarCadastro()} block style={style.botao}>
                                <Text style={{color:"#000"}}>Registrar</Text>
                            </Button>
                        </View>
                </View>
            </Container>
        );
    }
}

const selector = formValueSelector('cadastro');
function mapDispatchToProps(dispatch) {
    return {};
}

function mapStateToProps(state : States) {
    const email =  selector(state,'email');
    const nome = selector(state,'nome');
    const senha = selector(state,'senha');
    return {
        email,
        nome,
        senha
    };
}

CadastroView = connect(mapStateToProps,mapDispatchToProps)(CadastroView);

export default  reduxForm({
    form: 'cadastro',
})(CadastroView);
