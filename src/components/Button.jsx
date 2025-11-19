import React from 'react'

const Button = ({title, classContainer}) => {
  return (
    <div>
        <button className={`${classContainer}`}>{title}</button>
    </div>
  )
}

export default Button