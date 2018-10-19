import React from 'react';
import './style.css'
import PropTypes from 'prop-types';


const getValue = ()=> {
    let text = document.getElementsByName("InputValue")[0];
    return (text) ? text.value : undefined;
}

    const clearValue =() =>{
        let text = document.getElementsByName("InputValue")[0];
        text.value = '';
    }



export function Search ({url, func_search}) {
    return (
        <div>
            <input
                className='test-input'
                defaultValue=''
                placeholder='Enter value'
                name = "InputValue"
                onKeyPress={
                    (target) =>{
                    if(target && target.charCode===13)
                    {getValue() ? func_search(`${url}${getValue()}`, 'Action') : undefined}
                }}
            />

            <button className="btn btn-search" onClick={()=> getValue() ? func_search(`${url}${getValue()}`, 'Action') : undefined}>Search</button>
            {getValue() ? <button className="btn btn-search" onClick={()=>{clearValue()}}>Clear</button> : undefined}
        </div>
    )
}

Search.propTypes = {
    url: PropTypes.string.isRequired,
    func_search: PropTypes.func.isRequired,
}
