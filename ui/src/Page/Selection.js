import React from 'react'
import './Selection.css'
import {Link} from 'react-router-dom'
import * as core from '@material-ui/core';

export default function Selection() {
    return (
        <div>
            <div className="selection">
                {/* coding like this just to show that the element does wrap around */}
                {/* map data to this button format */}
                <Link to={'./challenge_1'} className='cards'>challenge 1</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 2</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 3</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 4</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 5</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 6</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 7</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 8</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 9</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 10</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 11</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 12</Link>
                <Link to={'./challenge_1'} className='cards'>challenge 13</Link>
            </div>
        </div>
    )
}
