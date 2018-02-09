import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import PickerColumn from './PickerColumn';

class PickerMask extends Component {

    constructor(props){
        super(props);
        const { defaultSelectIndexs, data } = props;

        this.state = {
            selectIndexs: defaultSelectIndexs || Array(data.length).fill(-1),
            closing: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        //there may think about props.data change
    }

    handleClose(callback){
        this.setState({ closing: true }, () => setTimeout( ()=> {
            this.setState({ closing: false });
            if (callback) callback();
        }, 300));
    }

    handleChange(item, i, columnIndex){
        const {onChange} = this.props;
        let {selectIndexs} = this.state;

        selectIndexs[columnIndex] = i;
        this.setState({ selectIndexs }, ()=>{
            if (onChange) onChange(item, i, columnIndex, selectIndexs, this);
        });
    }

    renderActions(){
        const { lang, onCancel, onOk } = this.props;
        return (
            <div className="weui-picker__hd">
                <a key='0' className="weui-picker__action" onClick={e => this.handleClose( () => { if (onCancel) onCancel(e);} )}> { lang.leftBtn }</a>
                <a key='1' className="weui-picker__action" onClick={e => this.handleClose( ()=> { if (onOk) onOk(this.state.selectIndexs, this); } )}> { lang.rightBtn }</a>
            </div>
        );
    }

    render(){
        const { className, show, data, datamap, defaultSelectIndexs, onChange, lang, onOk, onCancel } = this.props;
        const { selectIndexs, closing } = this.state;

        const cls = classNames('weui-picker', {
            'weui-animate-slide-up': show && !closing,
            'weui-animate-slide-down': closing
        }, className);

        const maskCls = classNames({
            'weui-animate-fade-in': show && !closing,
            'weui-animate-fade-out': closing
        });

        return show && (
            <div>
                <Mask
                    className={maskCls}
                    onClick={e => this.handleClose( ()=> {if (onCancel) onCancel(e);} )}
                />
                <div className={cls}>
                    { this.renderActions() }
                    <div className="weui-picker__bd">
                        {
                            data.map( (column, i) => {
                                return <PickerColumn key={i} data={column} datamap={datamap} onChange={this.handleChange} columnIndex={i} defaultIndex={selectIndexs[i]} />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PickerMask.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    datamap: PropTypes.object,
    defaultSelectIndexs: PropTypes.array,
    onChange: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    show: PropTypes.bool,
    lang: PropTypes.object,
};

PickerMask.defaultProps = {
    data: [],
    show: false,
    lang: { leftBtn: '取消', rightBtn: '确定' },
}

export default PickerMask;





/**
 * screen mask, use in `Dialog`, `ActionSheet`, `Popup`.
 *
 */
class Mask extends React.Component {


    render() {
        const {transparent, className} = this.props;
        const clz = classNames({
            'weui-mask': !transparent,
            'weui-mask_transparent': transparent
        }, className);

        return (
            <div className={clz}></div>
        );
    }
}

static propTypes = {
    /**
     * Whather mask should be transparent (no color)
     *
     */
    transparent: PropTypes.bool
};

static defaultProps = {
    transparent: false
};

export default Mask;