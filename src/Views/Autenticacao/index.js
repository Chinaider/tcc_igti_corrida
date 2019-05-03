import React, {Component} from "react";
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import Video from 'react-native-video';
import style from './style';
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
import {Alert, StyleSheet} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Field, formValueSelector, reduxForm} from "redux-form";

const videoBg = require('Corrida/assets/Sunset-Desert-Run.mp4');

const required = value => value ? undefined : 'Campo Obrigatorio.';
const minValue = min => value =>
    value && value.length < min ? `Deve conter pelo menos ${min} caracteres.` : undefined;
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'E-mail inválido' : undefined;

class AutenticacaoView extends Component {

   efetuarLogin(){
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
       this.props.doLogin(
           this.props.email,
           this.props.senha
       );
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
                {(label == 'Senha')
                    ?  <Button transparent style={style.botaoEsqueci}>
                        <Text style={style.textoEsqueci}>Esqueci minha senha</Text>
                    </Button> : null}
                {(error && touched) ? <Text style={style.textError}>{error}</Text> : <Text/>}
            </View>
        )
    }

    render() {
        return (
            <Container>
                <View style={style.container}>
                    <Video repeat source={videoBg} resizeMode="cover" style={StyleSheet.absoluteFill} />
                    <View style={style.viewOpacity}/>
                    <View style={style.titleContent}>
                        <H1 style={style.title}>Login</H1>
                    </View>
                    {this.renderError()}
                    <View style={style.formContent}>
                        <Form>
                            <KeyboardAwareScrollView>
                                <Field
                                    component={this.renderInput}
                                    name="email"
                                    icon="mail"
                                    label="E-mail"
                                    maxLength={30}
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
                                    maxLength={25}
                                    type="default"
                                    autoCapitalize={false}
                                    secureTextEntry={true}
                                    validate={[required]}
                                    style={{marginBottom: 5}}
                                />

                            </KeyboardAwareScrollView>
                        </Form>
                        <Button onPress={() => this.efetuarLogin()} block style={style.botao}>
                            <Text style={{color:"#000"}}>Entrar</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }

}

const selector = formValueSelector('login');
function mapDispatchToProps(dispatch) {
    return {
        doLogin: (usuario,senha) => dispatch(actions.autenticacao.login(usuario,senha))
    };
}


function mapStateToProps(state : States) {
    const email =  selector(state,'email');
    const senha = selector(state,'senha');
    const error = state.autenticacao.error;
    return {
        email,
        senha,
        error
    }
}

AutenticacaoView = connect(mapStateToProps,mapDispatchToProps)(AutenticacaoView);

export default reduxForm({
    form: 'login',
})(AutenticacaoView);
