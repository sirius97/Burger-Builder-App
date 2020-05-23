import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <BackDrop show = {props.open} backdrop={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;