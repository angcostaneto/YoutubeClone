import React from "react";
import './sidebarRow.css';
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core/SvgIcon/SvgIcon";

type SidebarRowType = { selected: boolean, Icon: OverridableComponent<SvgIconTypeMap>, title: string }

const SidebarRow = ({selected, Icon, title}: SidebarRowType) => {
    return (
        <div className={`sidebarrow ${selected ? 'selected': ''}`}>
            <Icon className='sidebarrow__icon'/>
            <h2 className='sidebarrow__title'>{title}</h2>
        </div>
    )
}

export default SidebarRow;