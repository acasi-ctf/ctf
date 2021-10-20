import React from 'react'
import '../style/Selection.css'
import {Link} from 'react-router-dom'
// import * as core from '@material-ui/core';

export default function Selection() {
    return (
        <div>
            <div className="selection">
                {/* coding like this just to show that the element does wrap around */}
                {/* map data to this button format */}
                <Link to={'./play/ciphers/caesar-cipher'}                   className='cards'>Caesar Cipher</Link>
                <Link to={'./play/ciphers/letter-to-number'}         className='cards'>Letter to Number Cipher</Link>
                <Link to={'./play/ciphers/morse-code'}               className='cards'>Morse Code Cipher</Link>
                <Link to={'./play/ciphers/reverse-cipher'}           className='cards'>Reverse Cipher</Link>
                <Link to={'./play/ciphers/comprehensive-challenge'}  className='cards'>Comprehensive Cipher</Link>
                {/* <Link to={'./directory-traversal'}      className='cards'>Directory Traversal</Link>
                <Link to={'./web-structure'}            className='cards'>Web Structure</Link> */}
            </div>
        </div>
    )
}
