import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => {
  useEffect(() =>{
    setTimeout(() => {

    }, 5000)
  }, [])
  return (
    <div>
     <FontAwesomeIcon icon={faSpinner} spinPulse/>
    </div>
  )
}

export default Spinner
