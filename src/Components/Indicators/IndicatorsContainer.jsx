import React from 'react';
import {connect} from 'react-redux'
import {getIndicators, deleteIndicator, addNewIndicator} from '../../Redux/indicator-reducer'
import Indicators from './Indicators'
import {compose} from 'redux'

class IndicatorsContainer extends React.Component{
    componentDidMount(){
        this.props.getIndicators();
        
        this.ticker = setInterval(() => {
            //this bad practice, but this method help re-render app with new NOW value
            this.props.getIndicators();
          }, 10000);
    }
    
    componentWillUnmount(){
        clearInterval(this.ticker)
    }
    

    render(){
        return <>
            <Indicators indicators={this.props.indicators}
                        deleteIndicator={this.props.deleteIndicator}
                        addNewIndicator={this.props.addNewIndicator}
            />
        </>
    }
}

let mapStateToProps = (state) =>{
    return{
        indicators: state.indicatorsPage.indicators
    }
}

export default compose(
    //instead mapDispatchToProps use auto dispatch
    connect(mapStateToProps, {getIndicators, deleteIndicator, addNewIndicator})
)(IndicatorsContainer)