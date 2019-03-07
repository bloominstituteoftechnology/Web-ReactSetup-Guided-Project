import React from 'react';
import { connect } from 'react-redux';
import './Container.less';


export function Container(props) {
  return (
    <div className='container-hello-world'>
      <button onClick={() => props.dispatch({ type: 'HELLO_SAGA' })}>salute saga</button>
    </div>
  );
}

export default connect(st => st)(Container);
