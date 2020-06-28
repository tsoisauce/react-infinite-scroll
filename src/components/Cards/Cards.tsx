import React from "react"

//@ts-ignore
const Card = props => {
  return (
    <div className="cards">
      {
        //@ts-ignore
        props.items.map((item, index) => (
          <div key={index} className="card">
            <div className="info">
              <div className="email">{item.id}) {item.email}</div>
              <div className="name">{item.name}</div>
              <div className="comment">{item.body}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card