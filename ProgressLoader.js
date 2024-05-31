import React from 'react';

import {ActivityIndicator, Dimensions, Modal, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class ProgressLoader extends React.Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        isModal: PropTypes.bool.isRequired,
        barHeight: PropTypes.number,
        color: PropTypes.string,
        hudColor: PropTypes.string,
        isHUD: PropTypes.bool,
        isLottie: PropTypes.bool

    };
    static defaultProps = {
        visible: false,
        isModal: true,
        barHeight: 64,
        color: "#FFFFFF",
        hudColor: '#FFFFFF',
        isHUD: false,
        isLottie:true
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            visible: this.props.visible,
            isModal: this.props.isModal,
            color: this.props.color,
            barHeight: this.props.barHeight,
            isHUD: this.props.isHUD,
            hudColor: this.props.hudColor,
            isLottie:this.isLottie!=undefined ? this.isLottie : true
        }
    }

    renderWithModal() {
        return (

            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.visible}
                onRequestClose={() => {
                    console.log('close modal')
                }}>
                <Animatable.View style={styles.modalBackground}>
                    <View
                        style={[styles.activityIndicatorWrapper, {backgroundColor: (this.props.isHUD ? (this.props.hudColor) : ("transparent"))}]}>
                        {this.renderActivityIndicator()}
                    </View>
                </Animatable.View>
            </Modal>
        )
    }

    renderActivityIndicator() {
        const loaderColor = this.props.color;
        return (
            this.props.isLottie ? 
            <LottieView
                    style={styles.lottieView}
                    source={require('./bluewings_loader.json')}
                    loop={true}
                    speed={0.8}
                    autoPlay={true}
                />
            : 
            this.props.isModal ? (
                <ActivityIndicator
                    size="small"
                    color={loaderColor}
                    style={{zIndex: 100}}
                    animating={this.props.visible}/>
            ) : (
                <ActivityIndicator
                    size="small"
                    color={loaderColor}
                    style={{zIndex: 100, marginBottom: this.props.barHeight}}
                    animating={this.props.visible}/>
            )
        
        )
    }

    renderWithView() {
        return (
            <View style={{
                height: (height - this.props.barHeight), width: width, position: 'absolute', zIndex: 5,
                justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'
            }}
            >
                {this.renderActivityIndicator()}
            </View>
        )
    }

    goEmpty() {
        return (<View/>);
    }

    render() {

        return (
            this.props.isModal ? (this.renderWithModal()) : (this.props.visible ? (this.renderWithView()) : (this.goEmpty()))           
        )
    }


}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 60,
        width: 60,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    lottieView:{
        width: '70%',
        aspectRatio: 1,                        
    }
});
