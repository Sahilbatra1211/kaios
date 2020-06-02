import React from 'react';
import PropTypes from 'prop-types';
import { requireOneOf } from '../../../../kai-ui/src/utils';
import { useFocus } from '../../../../kai-ui/src/hooks';
import colors from '../../../../kai-ui/src/theme/colors.scss';


import './IconListItem.scss';

const prefixCls = 'kai-il';

const IconListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      icon,
      iconSrc,
      focusColor,
      forwardedRef,
      index,
      onFocusChange,
      iconSrc2,                  //if there are two icons pass the source of second icon
      areThere2Icons,            //if there are two icons(overlapped) pass true
      notification,             //if there is any notification pass true
      notificationTyp           //pass the type of notification
    } = props;
    
    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    const isFocused = useFocus(forwardedRef, handleFocusChange, false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary-${isFocused ? 'focused' : 'unfocused'}`;
    const secondaryCls = `${prefixCls}-secondary-${isFocused ? 'focused' : 'unfocused'}`;
    const notificationBox= `notificationBox-${isFocused ? 'focused' : 'unfocused'}`
    const notificationType3=`notificationBox3-${isFocused ? 'focused' : 'unfocused'}`
    const renderedIcon = iconSrc === null ?
        <span className={icon} /> :
        <img src={iconSrc}  alt="" />;
     
    let anyNotification=notification; 

    const overlappedIcons=(
      <div style={{width:'98px',height:'72px'}}>
        <img src={iconSrc2} className='firstIcon' alt="" />
        <img src={iconSrc} className='secondIcon' alt="" />
        
      </div>
    )
    //styling for vector top
    // const vectorStyling={
    //   display:'inline',
    //   position:'relative',
    //   right:'0em',
    //   bottom:'0em',
    //   width: '3px',
    //   height:'3px',  
    // }
    
    //functions below are to render different type of notification for different styles
    let styleForNotificationTwo={}
    const notificationType=(type)=>{
      if(type===1){
      return(
        <div>
          <h1>3</h1>
        </div>
      )
      
      }
      else if(type===2){
        return (<div style={{alignItems:'center',justifyContent:'center'}}>
          <img src={require('../../../assets/imageForNotification.png' ) } className='listTwoNotification1' />
          { <img src={require('../../../assets/imageForNotification2.png' )} className='listTwoNotification2'></img> }
          </div>);
      }
      else{
        return null;
      }
    }

    const styleForNotification=(type)=>{
      if(type===2){
        styleForNotificationTwo={
        backgroundColor:'#0078D4',
        border: '1px solid white'
        }
      }
      else if(type===3){
        anyNotification=false;
      }
      return null;
    }

    

    return (
     <div>
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        style={{ backgroundColor: isFocused ? '#0078D4' :colors.white}}
      >
        {areThere2Icons?overlappedIcons:<div className={iconCls} >
          {renderedIcon}
        </div>
        }
        <div className={lineCls} >
          {/*for styling of notification of box2  */}{styleForNotification(notificationTyp)}
      <span className={primaryCls}>{primary}{/*if its notification 3*/} {notificationTyp===3?<div className={notificationType3}></div>:null}{/*if its notification 1 or 2*/}{anyNotification?<div className={notificationBox} style={styleForNotificationTwo}>{notificationType(notificationTyp)}</div>:null}</span>
         
          <label className={secondaryCls}>{secondary}</label>
        </div>
      </div>
      </div>
    );
  }
);

const requireOneIcon = requireOneOf({
  icon: PropTypes.string,
  iconSrc: PropTypes.string
});

IconListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  icon: requireOneIcon,
  iconSrc: requireOneIcon,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  iconSrc2: requireOneIcon,
  areThere2Icons: PropTypes.bool
};

IconListItem.defaultProps = {
  secondary: null,
  icon: null,
  iconSrc: null,
  focusColor: colors.defaultFocusColor,
  iconSrc2: null,
  areThere2Icons: false,
  notification: false
};

export default React.forwardRef((props, ref) => (
  <IconListItem forwardedRef={ref} {...props} />
));