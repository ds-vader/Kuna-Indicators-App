import React from 'react';
import { connect } from 'react-redux'
import { getIndicators, deleteIndicator, addNewIndicator, getPairs } from '../../Redux/indicator-reducer'
import Indicators from './Indicators'
import { compose } from 'redux'

class IndicatorsContainer extends React.Component {
    componentDidMount() {
        this.props.getIndicators();
        this.props.getPairs();

        this.ticker = setInterval(() => {
            //this bad practice, but this method help re-render app with new NOW value
            this.props.getIndicators();
        }, 10000);

        this.checkMarker = setInterval(() =>{
        this.markerListener();
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.ticker)
        clearInterval(this.checkMarker)
    }

    dataFormat() {
        let date = new Date();
        return `${date.getDate().toString().padStart(2, '0')}.${ // day
            (date.getMonth() + 1).toString().padStart(2, '0')}.${ // month
            date.getFullYear().toString().padStart(4, '0')} ${ // year
            date.getHours().toString().padStart(2, '0')}:${ // hours
            date.getMinutes().toString().padStart(2, '0')}:${ // minutes
            date.getSeconds().toString().padStart(2, '0')}` // seconds
    }

    markerListener() {
        this.props.indicators.forEach(indicator => {
            if (indicator.type === true) {
                if (indicator.now > indicator.marker) {
                    // alert(`Indicator ${indicator.id} worked!!!`)
                    document.getElementById(indicator.id).style.background = '#28a745';
                    document.getElementById(indicator.id).style.color = '#ffffff';
                } else {
                    document.getElementById(indicator.id).style.background = 'none';
                    document.getElementById(indicator.id).style.color = '#000000'
                }
            }

            if (indicator.type === false) {
                if (indicator.now < indicator.marker) {
                    // alert(`Indicator ${indicator.id} worked!!!`)
                    document.getElementById(indicator.id).style.background = '#28a745';
                    document.getElementById(indicator.id).style.color = '#ffffff';
                }else {
                    document.getElementById(indicator.id).style.background = 'none';
                    document.getElementById(indicator.id).style.color = '#000000'
                }
            }

        });
    }

    render() {
        return <>
            <Indicators indicators={this.props.indicators}
                deleteIndicator={this.props.deleteIndicator}
                addNewIndicator={this.props.addNewIndicator}
                pairs={this.props.pairs}
                currentData={this.dataFormat}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        indicators: state.indicatorsPage.indicators,
        pairs: state.indicatorsPage.pairs
    }
}

export default compose(
    //instead mapDispatchToProps use auto dispatch
    connect(mapStateToProps, { getIndicators, deleteIndicator, addNewIndicator, getPairs })
)(IndicatorsContainer)