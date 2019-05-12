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
const minValue = min => value =>
    value && value.length < min ? `Deve conter pelo menos ${min} caracteres.` : undefined;
const minValue4 = minValue(4);
const minValue8 = minValue(8);
const minValue6 = minValue(6);
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
        this.props.cadastrar(
            this.props.nome,
            this.props.email,
            this.props.senha
        );
    }

    renderInput({input:{value,onChange,maxLength,...restInput},label,type,autoCapitalize,icon,secureTextEntry, meta: { touched, error, warning } }){
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
                       maxLength={maxLength}
                       {...restInput}/>
                   {(error && touched) ? <Icon style={style.iconError}  name="close"/> : <Text/>}
               </Item>
               {(error && touched) ? <Text style={style.textError}>{error}</Text> : <Text/>}
           </View>
       )
    }

    renderError(){
        if(this.props.error){
            return (
            <View style={style.content_error}>
                <Text style={style.content_error_text}>{this.props.error}</Text>
            </View>
            );
        }
        return <Text/>;
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
                    {this.renderError()}
                        <View style={style.formContent}>
                            <Form>
                                <KeyboardAwareScrollView>
                                    <Field
                                        component={this.renderInput}
                                        name="nome"
                                        icon="person"
                                        label="Nome"
                                        maxLength={50}
                                        type="default"
                                        autoCapitalize={true}
                                        validate={[required,minValue4]}
                                        style={{marginBottom: 5}}
                                    />
                                    <Field
                                        component={this.renderInput}
                                        name="email"
                                        icon="mail"
                                        label="E-mail"
                                        maxLength={30}
                                        type="email-address"
                                        autoCapitalize={false}
                                        validate={[required,email,minValue8]}
                                        style={{marginBottom: 5}}
                                    />
                                    <Field
                                        component={this.renderInput}
                                        name="senha"
                                        icon="lock"
                                        label="Senha"
                                        maxLength={25}
                                        type="default"
                                        autoCapitalize={false}
                                        secureTextEntry={true}
                                        validate={[required,minValue6]}
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
    return {
        cadastrar: (nome,email,senha) => dispatch(actions.autenticacao.efetuarCadastro(nome,email,senha)),
    };
}

function mapStateToProps(state : States) {
    const email =  selector(state,'email');
    const nome = selector(state,'nome');
    const senha = selector(state,'senha');
    const error = state.autenticacao.error;
    return {
        email,
        nome,
        senha,
        error
    };
}

CadastroView = connect(mapStateToProps,mapDispatchToProps)(CadastroView);
export default reduxForm({
    form: 'cadastro',
})(CadastroView);

