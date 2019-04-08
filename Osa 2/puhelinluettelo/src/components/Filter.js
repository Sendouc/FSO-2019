import React from 'react'

const Filter = ( {nameFilter, handleFilterChange} ) => {
    return (
        <>
            rajaa näytettäviä <input value={nameFilter} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter