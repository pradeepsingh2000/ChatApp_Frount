import React from 'react'
import {Helmet} from 'react-helmet-async'

function Title({title="Chat",description="this is Quick Chat"}) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
    </div>
  )
}

export default Title
